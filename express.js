const express = require('express')
var bodyParser = require('body-parser');
// import * as Stellar from './stellar';
var stellar = require('./stellar')
const app = express()
const port = 3000
const fs = require('fs');
app.use(bodyParser.json());

const StellarSdk = require('stellar-sdk');

const errMessages = {
    privatePublicKey: "Private key and public key don't match",
    insufficientBalance: "Insufficient balance",
}

var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const mintNFT = async (creatorPublicKey, creatorPrivateKey, NFTName) => {
    var creator = StellarSdk.Keypair.fromSecret(creatorPrivateKey)
    var err = await checkAccount(creatorPublicKey, creatorPrivateKey)
    if (err != '') {
        return [null, err]
    }
    const { transactionOutput, NFT, issuerPrivateKey, issuerPublicKey } = await createIssuer(server, creator, NFTName);
    // TODO IPFS
    const output = await submitNFT(issuerPrivateKey, creator.publicKey(), server, "ipfs_test.jpg", NFT)
    return [output, '']

}

const submitNFT = async (issuerPrivateKey, creatorPublicKey, server, ipfsHash, NFT) => {
    const issuerKeypair = StellarSdk.Keypair.fromSecret(issuerPrivateKey);
    const issuer = await server.loadAccount(issuerKeypair.publicKey())
    const fee = StellarSdk.BASE_FEE;
        
    const networkPassphrase = StellarSdk.Networks.TESTNET
    const transaction = new StellarSdk.TransactionBuilder(issuer, { fee, networkPassphrase })
        .addOperation(
            StellarSdk.Operation.manageData({
                name: 'ipfs',
                value: ipfsHash
            })
        )
        .addOperation(
            StellarSdk.Operation.manageData({
                name: 'address',
                value: "dallas"
            })
        )
        .addOperation(
            StellarSdk.Operation.payment({
                destination: creatorPublicKey,
                asset: NFT,
                amount: '1',
            })
        )
        .addOperation(
            StellarSdk.Operation.setOptions({
                masterWeight: 0
            })
        )
        .setTimeout(600)
        .build();
    transaction.sign(issuerKeypair);

    var transactionOutput = null
    try {
        transactionOutput = await server.submitTransaction(transaction, {skipMemoRequiredCheck: true});
    } catch (err) {
        console.log("error submitting trasnaction")
        console.log(err.response)
    }
    return transactionOutput
}

const checkAccount = async (creatorPublicKey, creatorPrivateKey) => {
    var account = ''
    const creator = StellarSdk.Keypair.fromSecret(creatorPrivateKey)
    if (creator.publicKey() != creatorPublicKey) {
        return errMessages.privatePublicKey
    }
    try {
        account = await server.loadAccount(creatorPublicKey);
    } catch (err) {
        return err.response.detail
    }
    const balance = account.balances.find(balance => balance.asset_type == 'native')
    if(balance < 2){
        return errMessages.insufficientBalance
    }
    return ''
}

const createIssuer = async (creator, NFTName) => {
    const issuer = StellarSdk.Keypair.random()
    const createAccount = ''
    try{
        creatorAccount = await server.loadAccount(creator.publicKey())
    } catch (err) {
        console.log(err)
        return
    }
    const NFT = new StellarSdk.Asset(NFTName, issuer.publicKey())
    const fee = StellarSdk.BASE_FEE;
    const networkPassphrase = StellarSdk.Networks.TESTNET;
    const transaction = new StellarSdk.TransactionBuilder(creatorAccount, { fee, networkPassphrase })
        .addOperation(
            StellarSdk.Operation.createAccount({
                destination: issuer.publicKey(),
                startingBalance: '5'
            })
        )
        .addOperation(
            StellarSdk.Operation.changeTrust({
                asset: NFT,
                limit: '1',
            })
        )
        .setTimeout(500)
        .build();
    transaction.sign(creator)
    const transactionOutput = await server.submitTransaction(transaction, {skipMemoRequiredCheck: true});
    return {
        transactionOutput,
        NFT,
        issuerPrivateKey: issuer.secret(),
        issuerPublicKey: issuer.publicKey(),
    }
}

const createSellOffer = async (sellerPublicKey, sellerPrivateKey, NFTName, issuer, price) => {

    const keyPair = StellarSdk.Keypair.fromSecret(sellerPrivateKey)
    const NFT = new StellarSdk.Asset(NFTName, issuer)
    const sellerAccount = await server.loadAccount(sellerPublicKey);

    var transaction = new StellarSdk.TransactionBuilder(sellerAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET
    })
    .addOperation(StellarSdk.Operation.manageSellOffer({
        selling: NFT,
        buying: StellarSdk.Asset.native(),
        amount: "1",
        price: price,
    }))
    .setTimeout(500)
    .build();

    transaction.sign(keyPair)

    try {
        const transactionOutput = await server.submitTransaction(transaction);
        console.log(transactionOutput);
    } catch (err) {
        console.log(err);
    }
}

const buyOffer = async (buyerPubKey, buyerPrivKey, nftName, issuer, price) => {
    const keyPair = StellarSdk.Keypair.fromSecret(buyerPrivKey);
    const NFT = new StellarSdk.Asset(nftName, issuer);
    const senderAccount = await server.loadAccount(buyerPubKey);
    
    var transaction = new StellarSdk.TransactionBuilder(senderAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET
    })
        .addOperation(StellarSdk.Operation.changeTrust({
            asset: NFT,
            limit: "1",
        }))
        .addOperation(StellarSdk.Operation.manageBuyOffer({
            selling: StellarSdk.Asset.native(),
            buying: NFT,
            buyAmount: "1",
            price: price
        }))
        .setTimeout(600)
        .build();

        transaction.sign(keyPair);

        try {
            const transactionResult = await server.submitTransaction(transaction);
            console.log(transactionResult);
        }
        catch (err) {
            console.error(err.response.data);
        }
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hi', (req, res) => {
    res.send('deez nuts!')
  })

app.post('/addNFT', (req, res) => {
    // open the file and get the data already in the file
    var fileData = fs.readFile('nftListings.json', 'utf8', function(err, data){    
        // Display the file content
        if (data) {
            fileData = JSON.parse(data)
        }
        else {
            fileData = {}
        }

        const nftData = req.body.nftData;
        var key = Object.keys(nftData)[0];
        fileData[key] = nftData[key];
        fs.writeFile('nftListings.json', JSON.stringify(fileData), function(err, result) {
            if (result) console.log("wrote NFT!")
        });
                
        res.send("wrote NFT!")
    });
})

app.get('/getAllNFTS', (req, res) => {
    // open the file
    // res.json(file_data)
    var fileData = fs.readFile('nftListings.json', 'utf8', function(err, data){    
        // Display the file content
        if (data) {
            res.json(data);
        }
        else {
            res.send(err);
        }
    });
})

const getOfferMetaData = async (offers) => {
    result = []
    for (var offer of offers) {
        console.log(offer)
        var metadata = (await server.loadAccount(offer.selling.asset_issuer)).data_attr
        for (var key of Object.keys(metadata)) {
            metadata[key] = Buffer.from(metadata[key], 'base64').toString()
        }
        result.push({
            offerId: offer.id,
            data: metadata,
            issuerId: offer.selling.asset_issuer,
        })
    }
    return result
}

const getAssetMetaData = async (assets) => {
    result = []
    for (var asset of assets) {
        var metadata = (await server.loadAccount(asset)).data_attr
        for (var key of Object.keys(metadata)) {
            metadata[key] = Buffer.from(metadata[key], 'base64').toString()
        }
        result.push({
            issuerId: asset,
            ...metadata,
        })
    }
    return result
}

app.get('/getMyNFTs', async (req, res) => {
    var account = ''
    var assets = new Array()
    var sales = new Array()
    if (!req.query.id) {
        res.status(400).send({
            message: 'This is an error!'
         });         
    }
    try {
        account = await server.loadAccount(req.query.id.toString())
    } catch (err) {
        res.status(400).send({
            message: err.response.detail
         });
         return
    }
    offers = await account.offers();
    offers.records.forEach((offer) => {
        sales.push(offer.selling.asset_issuer)
    })
    account.balances.forEach((asset) => {
        if (asset.asset_code == "boo" && asset.balance == "1.0000000" && sales.includes(asset.asset_issuer)) {
            assets.push(asset.asset_issuer)
        }
    })
    assetMetaData = await getAssetMetaData(assets)
    sales = await getOfferMetaData(offers.records)
    res.json({ "sales": sales, "assets": assetMetaData})
})

app.get('/createIssuer', async (req, res) => {
    if (!req.query.id || !req.body.data) {
        res.status(400).send({
            message: "error. Need more parameters"
        })
        return
    }
    var creatorAccount = ""
    try{
        creatorAccount = await server.loadAccount(req.query.id)
    } catch (err) {
        res.status(400).send({
            message: err
        })
        return
    }
    const issuer = StellarSdk.Keypair.random()
    const NFT = new StellarSdk.Asset("estate", issuer.publicKey())
    const fee = StellarSdk.BASE_FEE;
    const networkPassphrase = StellarSdk.Networks.TESTNET;
    const transaction = new StellarSdk.TransactionBuilder(creatorAccount, { fee, networkPassphrase })
        .addOperation(
            StellarSdk.Operation.createAccount({
                destination: issuer.publicKey(),
                startingBalance: '100'
            })
        )
        .addOperation(
            StellarSdk.Operation.changeTrust({
                asset: NFT,
                limit: '1',
            })
        )
        .setTimeout(500)
        .build();
    res.json({
        transaction: transaction.toXDR(),
        issuerPublicKey: issuer.publicKey(),
        issuerPrivateKey: issuer.secret()})
})

/*
body 
{
    issuerId:
    data: {
        address: ,
        name: ,
        images: [asdfsadfsa,
                asdfasfdsadf,
                sadfsadfa,]
    }
}
*/
app.post('/mintNFT', async (req, res) => {
    if (!req.body.data || !req.body.issuerPublicKey) {
        res.status(400).send({
            message: "error. Need required parameters (data, issuerId)"
        })
        return
    }
    const NFT = new StellarSdk.Asset("estate", req.body.issuerPublicKey)
    const issuerKeypair = StellarSdk.Keypair.fromSecret(req.body.issuerPrivateKey);
    const issuer = await server.loadAccount(issuerKeypair.publicKey())
    const fee = StellarSdk.BASE_FEE;
        
    const networkPassphrase = StellarSdk.Networks.TESTNET
    var transaction = new StellarSdk.TransactionBuilder(issuer, { fee, networkPassphrase })
    for (var key of Object.keys(req.body.data)) {
        if (key != "images") {
            transaction = transaction.addOperation(
                StellarSdk.Operation.manageData({
                    name: key,
                    value: req.body.data[key],
                })
            )
        }
    }
    for (let i = 0; i < req.body.data.images.length; i++) {
        transaction = transaction.addOperation(
            StellarSdk.Operation.manageData({
                name: i.toString(),
                value: req.body.data.images[i],
            })
        )
    }
    transaction = transaction.addOperation(
        StellarSdk.Operation.manageData({
            name: "imageLength",
            value: (req.body.data.images.length).toString(),
        })
    )
    transaction = transaction.addOperation(
            StellarSdk.Operation.payment({
                destination: req.body.creatorPublicKey,
                asset: NFT,
                amount: '1',
            })
        )
        .addOperation(
            StellarSdk.Operation.setOptions({
                masterWeight: 0
            })
        )
        .setTimeout(600)
        .build();
    transaction.sign(issuerKeypair);
    try {
        transactionOutput = await server.submitTransaction(transaction, {skipMemoRequiredCheck: true});
    } catch (err) {
        console.log("error submitting trasnaction")
        console.log(err.response)
    }
    res.json(transactionOutput)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})