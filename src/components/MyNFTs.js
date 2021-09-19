import React, { useEffect, useState, useCallback } from 'react';
import Grid from "@material-ui/core/Grid";
import ListingCard from './ListingCard';
import { Item } from './Carousel/components';
import IPFS from 'ipfs-mini';



const axios = require('axios');

async function getUserListings(pubkey) {
   console.log(pubkey)
   const res = await axios.get('https://40b3-97-105-8-140.ngrok.io/getMyNFTs?id='+ pubkey)
   return res
}

const MyNFTs = ({auth, setBuyPageData, setPage}) => {
   
   const [ listings, setListings ] = useState(undefined);
   const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

   useEffect(async () => {
      var res = await getUserListings(auth.pubkey)
      console.log("inside usereffect"+res)
      console.log(res.data)
      setListings(res.data)
   }, [])

   console.log("helooo")
   return(
      <div>
         <br />
         {listings && (
            <>
               <div className="Listings">
                  <p>Listings</p>
                  <Grid container justifyContent="center" alignItems="center" spacing={3} style={{'padding-left': '10rem', 'padding-right': '10rem'}}>
            {console.log("listing"+listings)}
                     {listings['sales'].map((nft) => {
                        console.log(nft.images)
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
                        nft.ipfs = []
                        if (Object.keys(nft).length - 6 > 0) {
                           for (let i = 0; i < Object.keys(nft).length-7; i++) {
                              nft.ipfs.push(nft[`${i}`])
                           }
                        }
                        return <Grid item md={4} 
                           onClick={() => { 
                           setPage("Buy")
                           setBuyPageData(nft)
                        }}>
                           <ListingCard images={nft.ipfs.map((ipfsCID, i) => {
                              ipfs.cat(ipfsCID, (err, res) => {
                                 console.log(res)
                                 let data = Buffer.from(res, 'binary')
                                 console.log(data)
                                 let image = new Blob(data, {type: 'image/jpeg'})
                                 console.log(image)
                                 console.log(URL.createObjectURL(image))
                                 return <Item img={image}/>
                              })
                           })} imageAlt={nft.alt} address={nft.address} price={nft.price}
                              numRooms={nft.numRooms} numBath={nft.numBath} sqFt={nft.sqFt} />
                        </Grid>
                     })}
                  </Grid>
               </div>
            </>
         )}
         {!listings && (
               <div>
                  <p>No Listings</p>
                  <p>No Assets</p>
               </div>
         )}
      {console.log(listings)}
      </div>
   )
}

export default MyNFTs;
