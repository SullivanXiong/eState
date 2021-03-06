import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MintForm from './MintForm';
import Carousel from '../Carousel/Carousel';
import albedo from '@albedo-link/intent'
import './Mint.css'

const axios = require('axios');


function Mint({auth}) {
    console.log("MINT " + auth);
      async function mintUserNFT(pubkey) {
         console.log("KILL ME " + pubkey);
         axios.get('https://8829-97-105-8-140.ngrok.io/createIssuer?id='+pubkey
         )
         .then(res => {
            console.log(res);
            albedo.tx({xdr: res.data.transaction, network: 'testnet', submit: true, })
            .then(out => {
               console.log(res.data.issuerPrivateKey)
               console.log(urlIPFS.urls)
               axios.post('https://8829-97-105-8-140.ngrok.io/mintNFT', {
                  "issuerPublicKey": res.data.issuerPublicKey,
                  "issuerPrivateKey": res.data.issuerPrivateKey,
                  "creatorPublicKey": pubkey,
                  "data": {
                     "address": address,
                     "name": estateName,
                     "images": urlIPFS.urls,
                     "bedNumber": bedNumber,
                     "sqFt": sqFt
                     
               }}) 
               console.log(res);
            })
         })
         .catch(err => {console.log(err)})

      }
    const style = {
        card: {
            position: 'relative',
            margin: 'auto',
            'margin-top': '33%'
        },
        previewHeader: {
            'margin-top': '2.5vh' 
        },
        formHeader: {
            'padding-top': '1vh',
            'padding-left': '1.5vw'
        },
        defaultColor: {
            color: 'grey'
        },
        solidColor: {
            color: 'black'
        }
    }
    
    const [carouselItems, setCarouselItems] = useState([])
    const [estateName, setEstateName] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [bedNumber, setBedNumber] = useState(undefined);
    const [bathroomNumber, setBathroomNumber] = useState(undefined);
    const [sqFt, setSqFt] = useState(undefined);
    const [urlIPFS, setUrlIPFS] = useState({ urls: []});


    return (
        <div className="Mint">
            <div className="MintPreview">
                <Typography style={style.previewHeader} variant="h4" component="div">
                    Preview of ESTATE
                </Typography>
                <div className="MintPreviewWrapper">
                    <Card sx={{ maxWidth: 360 }} style={style.card}>
                        {!carouselItems.length && (
                            <CardMedia
                                component="img"
                                height="360"
                                image="/houseLogo512x512.jpg"
                                alt="default house"
                            />
                        )}
                        {carouselItems.length && (
                            <Carousel title="Carousel">
                                {carouselItems}
                            </Carousel>
                        )}
                        <CardContent>
                            {!estateName && (
                                <Typography gutterBottom variant="h5" component="div" style={style.defaultColor}>
                                    Estate Name
                                </Typography>
                            )}
                            {estateName && (
                                <Typography gutterBottom variant="h5" component="div">
                                    {estateName}
                                </Typography>
                            )}
                            {!address && (
                                <Typography variant="body2" color="text.secondary" style={style.defaultColor}>
                                    123 Address St
                                </Typography>
                            )}
                            {address && (
                                <Typography variant="body2" color="text.secondary" style={style.solidColor}>
                                    {address}
                                </Typography>
                            )}
                            {!bedNumber && (
                                <Typography variant="body2" color="text.secondary" style={style.defaultColor}>
                                    0 Beds
                                </Typography>
                            )}
                            {bedNumber && (
                                <Typography variant="body2" color="text.secondary" style={style.solidColor}>
                                    {bedNumber} Bed(s)
                                </Typography>
                            )}
                            {!bathroomNumber && (
                                <Typography variant="body2" color="text.secondary" style={style.defaultColor}>
                                    0 Bathrooms
                                </Typography>
                            )}
                            {bathroomNumber && (
                                <Typography variant="body2" color="text.secondary" style={style.solidColor}>
                                    {bathroomNumber} Bathroom(s)
                                </Typography>
                            )}
                            {!sqFt && (
                                <Typography variant="body2" color="text.secondary" style={style.defaultColor}>
                                    0 sq. Foot
                                </Typography>
                            )}
                            {sqFt && (
                                <Typography variant="body2" color="text.secondary" style={style.solidColor}>
                                    {sqFt} sq. Foot
                                </Typography>
                            )}
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
            <div className="MintForm">
                <Typography variant="h4" style={style.formHeader}>
                    Mint a new Estate
                </Typography>
                <Divider>
                </Divider>
                <MintForm urlIPFS={urlIPFS} setUrlIPFS={setUrlIPFS} mintUserNFT={mintUserNFT} pubkey={auth.pubkey} setCarouselItems={setCarouselItems} setEstateName={setEstateName} setAddress={setAddress} setBedNumber={setBedNumber} setBathroomNumber={setBathroomNumber} setSqFt={setSqFt}></MintForm>
            </div>
        </div>
    );
}

export default Mint;
