import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import ListingCard from './components/ListingCard';
import NavBar from './components/NavBar';
import Mint from './components/Mint/Mint';
import { Item } from './components/Carousel/components';

const testData = [
   {
      'imageURLs': ["/houseLogo512x512.jpg", "/houseLogo512x512.jpg", "/houseLogo512x512.jpg"],
      'imageAlt': "house",
      'address': "123 NFT St Dallas, TX",
      'price': "1537592 XLM",
      'numRooms': "3",
      'numBath': "1",
      'sqFt': "1500",
   },
   {
      'imageURLs': ["/houseLogo512x512.jpg"],
      'imageAlt': "house2",
      'address': "456 NFT St Dallas, TX",
      'price': "1537592 XLM",
      'numRooms': "3",
      'numBath': "1",
      'sqFt': "1500",
   },
   {
      'imageURLs': ["/houseLogo512x512.jpg"],
      'imageAlt': "house3",
      'address': "789 NFT St Dallas, TX",
      'price': "1537592 XLM",
      'numRooms': "3",
      'numBath': "1",
      'sqFt': "1500",
   },
   {
      'imageURLs': ["/houseLogo512x512.jpg"],
      'imageAlt': "house4",
      'address': "1011 NFT St Dallas, TX",
      'price': "38974543894325 XLM",
      'numRooms': "3",
      'numBath': "1",
      'sqFt': "1500000000000",
   }
]

function App() {
   const [ page, setPage ] = useState(undefined);
   const [ auth, setAuth ] = useState(undefined);

   console.log(auth);

   return (
      <div className="App">
         <NavBar  setPage={setPage} auth={auth} setAuth={setAuth}/>
         { (!page || (page && page === "Marketplace")) && (
            <>
               <br />
               <Grid container justifyContent="center" alignItems="center" spacing={3} style={{'padding-left': '10rem', 'padding-right': '10rem'}}>
                  {testData.map((nft) => {
                     return <Grid item md={4}>
                        <ListingCard images={nft.imageURLs.map((imageURL) => { return <Item img={imageURL}/> })}
                           imageAlt={nft.house} address={nft.address} price={nft.price}
                           numRooms={nft.numRooms} numBath={nft.numBath} sqFt={nft.sqFt} />
                     </Grid>
                  })}
               </Grid>
            </>
         )}
         {page && page === "Mint" && (
            <Mint />
         )}
      </div>
   );
}

export default App;
