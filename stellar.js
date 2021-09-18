const { NotFoundError } = require('stellar-sdk');
const StellarSdk = require('stellar-sdk');

const errMessages = {
    privatePublicKey: "Private key and public key don't match",
    insufficientBalance: "Insufficient balance",
}

var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const mintNFT = async (creatorPublicKey, creatorPrivateKey, NFTName) => {
    var creator = StellarSdk.Keypair.fromSecret(creatorPrivateKey)
    var err = await checkAccount(server, creatorPublicKey, creatorPrivateKey)
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
        console.log(JSON.stringify(err.response.data, null, 2))

    }
    return transactionOutput
}

const checkAccount = async (server, creatorPublicKey, creatorPrivateKey) => {
    var account = ''
    const creator = StellarSdk.Keypair.fromSecret(creatorPrivateKey)
    if (creator.publicKey() != creatorPublicKey) {
        console.log(creator.publicKey())
        console.log(creatorPublicKey)
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

const createIssuer = async (server, creator, NFTName) => {
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

// createIssuer("GC3FP3NOXKZAVWSYNV4FBADWN5UBWFZSPVUYBY4GVK5ZZ333D4FOGAIA", "testingagain").then((data) => console.log(data))
// mintNFT("GC3FP3NOXKZAVWSYNV4FBADWN5UBWFZSPVUYBY4GVK5ZZ333D4FOGAIA", "SBYYLANBRT3EWLDEHUBDHRXU5CKLOOIQVOY7ECPG2FEUPFFDR7E45O7F", "boo")
//     .then(([res, err]) => {
//         console.log("response", res)
//         console.log("error", err)
//     })

// createSellOffer("GC3FP3NOXKZAVWSYNV4FBADWN5UBWFZSPVUYBY4GVK5ZZ333D4FOGAIA", 
// "SBYYLANBRT3EWLDEHUBDHRXU5CKLOOIQVOY7ECPG2FEUPFFDR7E45O7F", 
// "nft4", "GAJ7V6BVKQLNC5WUUSVUWN4ME6L4KMIPRQEVHT6FFTKPX3DLZ2TOC4IH", "1000").then(() => console.log("success"))