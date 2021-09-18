import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import ListingCard from './components/ListingCard';
import NavBar from './components/NavBar';
import Mint from './components/Mint/Mint';


function App() {
   const [ page, setPage ] = useState(undefined);
   const [ auth, setAuth ] = useState(undefined);

   return (
      <div className="App">
         <NavBar  setPage={setPage} auth={auth} setAuth={setAuth}/>
         { (!page || (page && page === "Marketplace")) && (
            <>
               <br />
               <Grid container justifyContent="center" alignItems="center" spacing={2}>
                  <Grid item md={3}>
                     <ListingCard imageURL="/Users/Kenny/Desktop/projects/eState/src/assets/house.jpg"
                        imageAlt="house" address="123 NFT St Dallas, TX" price="1537592 XLM"
                        numRooms="3" numBath="1" sqFt="1500" />
                  </Grid>
                  <Grid item md={3}>
                     <ListingCard />
                  </Grid>
                  <Grid item md={3}>
                     <ListingCard />
                  </Grid>
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
