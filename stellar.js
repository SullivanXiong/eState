const { NotFoundError } = require('stellar-sdk');
const StellarSdk = require('stellar-sdk');

const errMessages = {
    privatePublicKey: "Private key and public key don't match",
    insufficientBalance: "Insufficient balance",
}

const mintNFT = async (creatorPublicKey, creatorPrivateKey, NFTName) => {
    var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
    var creator = StellarSdk.Keypair.fromSecret(creatorPrivateKey)
    var err = await checkCreatorAccount(creatorPublicKey, creatorPrivateKey)
    if (err != '') {
        return [null, err]
    }
    const { transactionOutput, NFT, issuerPrivateKey, issuerPublicKey } = await createIssuer(creator, NFTName);
    // TODO IPFS
    
    return [{ transactionOutput, NFT, issuerPrivateKey, issuerPublicKey }, '']

}

const checkCreatorAccount = async (creatorPublicKey, creatorPrivateKey) => {
    var account = ''
    const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
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

const createIssuer = async (creator, NFTName) => {
    var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
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
                startingBalance: '1'
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

// createIssuer("GC3FP3NOXKZAVWSYNV4FBADWN5UBWFZSPVUYBY4GVK5ZZ333D4FOGAIA", "testingagain").then((data) => console.log(data))
mintNFT("GC3FP3NOXKZAVWSYNV4FBADWN5UBWFZSPVUYBY4GVK5ZZ333D4FOGAIA", "SBYYLANBRT3EWLDEHUBDHRXU5CKLOOIQVOY7ECPG2FEUPFFDR7E45O7F", "testingagain")
    .then(([res, err]) => {
        console.log("response", res)
        console.log("error", err)
    })