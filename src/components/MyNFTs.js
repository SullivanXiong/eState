import React, { useState, useCallback } from 'react';
import Grid from "@material-ui/core/Grid";
import ListingCard from './ListingCard';
import NavBar from './NavBar';
import Mint from './Mint/Mint';
import { Item } from './Carousel/components';

const axios = require('axios');

async function getUserListings(pubkey) {
   const res = await axios.get('https://3d38-97-105-8-140.ngrok.io/getMyNFTs?id='+ pubkey)
   return res
}

const MyNFTs = ({auth}) => {
   
   const [ listings, setListings ] = useState(undefined);
   useCallback(async () => {
      setListings(await getUserListings(auth.pubkey))
   }, [])

   return(
      <div>
         <br />
         {listings && (
            <>
               <div className="Listings">
                  <p>Listings</p>
                  <Grid container justifyContent="center" alignItems="center" spacing={3} style={{'padding-left': '10rem', 'padding-right': '10rem'}}>
                     {listings['sales'].map((nft) => {
                        return <Grid item md={4}>
                           <ListingCard images={nft.data.ipfs} imageAlt={nft.data.alt} address={nft.data.address} price={nft.data.price}
                              numRooms={nft.data.numRooms} numBath={nft.data.numBath} sqFt={nft.data.sqFt} />
                        </Grid>
                     })}
                  </Grid>
               </div>
               <div className="Assets">
                  <p>Assets</p>
                  <Grid container justifyContent="center" alignItems="center" spacing={3} style={{'padding-left': '10rem', 'padding-right': '10rem'}}>
                     {listings['assets'].map((nft) => {
                        return <Grid item md={4}>
                           <ListingCard images={nft.ipfs} imageAlt={nft.alt} address={nft.address} price={nft.price}
                              numRooms={nft.numRooms} numBath={nft.numBath} sqFt={nft.sqFt} />
                        </Grid>
                     })}
                  </Grid>
               </div>
            </>
         )}
         {!listings && (
            <>
               <div>
                  <p>No Listings</p>
                  <p>No Assets</p>
               </div>
            </>
         )}
      </div>
   )
}

export default MyNFTs;
