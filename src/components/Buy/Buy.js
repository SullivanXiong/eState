import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MintForm from './BuyForm';
import Carousel from '../Carousel/Carousel';
import './Buy.css'

function Buy() {
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
    
    
    const [newImages, setNewImages] = useState({ images: [] });
    const [carouselItems, setCarouselItems] = useState([])
    const [estateName, setEstateName] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [bedNumber, setBedNumber] = useState(undefined);
    const [sqFt, setSqFt] = useState(undefined);

    return (
        <div className="Mint">
            <div className="MintPreview">
                <Typography style={style.previewHeader} variant="h4" component="div">
                    Preview of ESTATE
                </Typography>
                <div className="MintPreviewWrapper">
                    <Card sx={{ maxWidth: 360 }} style={style.card}>
                        {!newImages.images.length && (
                            <CardMedia
                                component="img"
                                height="360"
                                image="/houseLogo512x512.jpg"
                                alt="default house"
                            />
                        )}
                        {newImages.images.length && (
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
                    Purchasing this Estate
                </Typography>
                <Divider>
                </Divider>
                <MintForm newImages={newImages} setNewImages={setNewImages} setCarouselItems={setCarouselItems} setEstateName={setEstateName} setAddress={setAddress} setBedNumber={setBedNumber} setSqFt={setSqFt}></MintForm>
            </div>
        </div>
    );
}

export default Buy;
