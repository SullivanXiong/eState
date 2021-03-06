import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import ListingCard from './components/ListingCard';
import NavBar from './components/NavBar';
import Mint from './components/Mint/Mint';
import Buy from './components/Buy/Buy';
import Sell from './components/Sell/Sell';
import MyNFTs from './components/MyNFTs'
import { Item } from './components/Carousel/components';

const testData = [
   {
      'estateName': "Dandy's House",
      'imageURLs': ["/house1.jpg", "/house1.jpg", "/house1.jpg"],
      'imageAlt': "house",
      'address': "123 NFT St Dallas, TX",
      'price': "850000 XLM",
      'numRooms': "3",
      'numBath': "1",
      'sqFt': "1500",
   },
   {
      'estateName': "Sullivan's House",
      'imageURLs': ["/house2.jpg", "/house2.jpg", "/house2.jpg", "/house2.jpg"],
      'imageAlt': "house2",
      'address': "456 NFT St Dallas, TX",
      'price': "1500000 XLM",
      'numRooms': "3",
      'numBath': "1",
      'sqFt': "2000",
   },
   {
      'estateName': "Eddie's House",
      'imageURLs': ["/house3.jpg", "/house3.jpg", "/house3.jpg"],
      'imageAlt': "house3",
      'address': "789 NFT St Dallas, TX",
      'price': "690000 XLM",
      'numRooms': "3",
      'numBath': "1",
      'sqFt': "1500",
   },
   {
      'estateName': "Kenny's House",
      'imageURLs': ["/house4.jpg", "/house4.jpg", "/house4.jpg"],
      'imageAlt': "house4",
      'address': "1011 NFT St Dallas, TX",
      'price': "999000 XLM",
      'numRooms': "3",
      'numBath': "1",
      'sqFt': "1500000000000",
   }
]

function App() {
   const [ page, setPage ] = useState(undefined);
   const [ auth, setAuth ] = useState(undefined);
   const [ buyPageData, setBuyPageData ] = useState(undefined);
   const [ sellPageData, setSellPageData ] = useState(undefined);

   console.log(auth);

   return (
      <div className="App">
         <NavBar  setPage={setPage} auth={auth} setAuth={setAuth}/>
         { (!page || (page && page === "Marketplace")) && (
            <>
               <br />
               <Grid container justifyContent="center" alignItems="center" spacing={3} style={{'padding-left': '10rem', 'padding-right': '10rem'}}>
                  {testData.map((nft) => {
                     return <Grid
                        item md={4}
                        onClick={() => { 
                           setPage("Buy")
                           setBuyPageData(nft)
                        }}
                     >
                        <ListingCard images={nft.imageURLs.map((imageURL) => { return <Item img={imageURL}/> })}
                           estateName={nft.estateName}
                           imageAlt={nft.house} address={nft.address} price={nft.price}
                           numRooms={nft.numRooms} numBath={nft.numBath} sqFt={nft.sqFt} />
                     </Grid>
                  })}
               </Grid>
            </>
         )}
         {page && auth && page === "Mint" && (
            <Mint auth={auth}/>
         )}
         {page && page === "Buy" && (
            <Buy buyPageData={buyPageData}/>
         )}
         {page && page === "Sell" && (
            <Sell sellPageData={sellPageData}/>
         )}
      {page && auth && page === "MyNFTs" && (
         <MyNFTs auth={auth} setBuyPageData={setBuyPageData} setPage={setPage} />
      )}
      </div>
   );
}

export default App;
