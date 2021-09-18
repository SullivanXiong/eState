const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 3000
const fs = require('fs');

app.use(bodyParser.json());

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
            console.log('data')
            console.log(JSON.parse)
            fileData = JSON.parse(data)
            
            const nftData = req.body.nftData;
            var key = Object.keys(nftData)[0];
            fileData[key] = nftData[key];
            // nftData: { NFT_NAME: ISSUER_ID}
            // { NFT_NAME: ISSUER_ID}
            fs.writeFile('nftListings.json', JSON.stringify(fileData), function(err, result) {
                if (result) console.log("wrote NFT!")
            });
                
            //append the nft posted to the original data
            // write the new dictionary with the appended data
                // JSON.stringify()
            res.send("wrote NFT!")
        }
        else {
            
            console.log('data')
            console.log(JSON.parse)
            fileData = {}
            
            const nftData = req.body.nftData;
            var key = Object.keys(nftData)[0];
            fileData[key] = nftData[key];
            // nftData: { NFT_NAME: ISSUER_ID}
            // { NFT_NAME: ISSUER_ID}
            fs.writeFile('nftListings.json', JSON.stringify(fileData), function(err, result) {
                if (result) console.log("wrote NFT!")
            });
                
            //append the nft posted to the original data
            // write the new dictionary with the appended data
                // JSON.stringify()
            res.send("wrote NFT!")
        }
    });
})

app.get('/getAllNFTS', (req, res) => {
    // open the file
    // res.json(file_data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})