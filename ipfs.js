const IPFS = require('ipfs-mini');
const fs = require('fs')
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// const reader = new FileReader();
// reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
// reader.onloadend = function() {

// }
// const imgdata = fs.readFileSync('../Dogecoin_Logo.png');
// fetch("file://")
ipfs.add("hello world").then(console.log).catch(console.log);