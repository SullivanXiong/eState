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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})