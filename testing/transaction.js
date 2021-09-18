const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    

(async function main() {
    const senderPubKey = "GAY5PO25NWEIZ4WLTOXAALYG3FGCVH36ANX55PL6LZV3W5GSBBV5N5JM";
    const receiverPubKey = "GAEZ6NCPGLAFWHTYCGCNHC25X2RNUC2H7YBWI5GZOISGJEYWMQP46PYP";
    
    const senderPrivKey = "SDFPZXZOU3BZUBDKLYF5GZVL4Y3AEB4DCB5HMWSIA3GM7WQ3GCRHZQN2";
    const keyPair = StellarSdk.Keypair.fromSecret(senderPrivKey);

    const senderAccount = await server.loadAccount(senderPubKey);
    
    var transaction = new StellarSdk.TransactionBuilder(senderAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET
    })
        .addOperation(StellarSdk.Operation.payment({
            destination: receiverPubKey,
            asset: StellarSdk.Asset.native(),
            amount: "1000"
        }))
        .setTimeout(60)
        .build();

        transaction.sign(keyPair);

        try {
            const transactionResult = await server.submitTransaction(transaction);
            console.log(transactionResult);
        }
        catch (err) {
            console.error(err);
        }
})()