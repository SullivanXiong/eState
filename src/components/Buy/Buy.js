import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Carousel from '../Carousel/Carousel';
import { Item } from '../Carousel/components';
import './Buy.css'

function Buy({ buyPageData }) {
    const style = {
        card: {
            position: 'relative',
            margin: 'auto',
            'margin-top': '2vh'
        },
        buttonWrapper: {
            'margin-top': '1.5vh',
            'margin-left': 'auto',
            'margin-right': 'auto',
            width: '33%'
        },
        button: {
            width: '50%'
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
        <div className="Buy">
            <div className="BuyCard">
                <Typography style={style.previewHeader} variant="h4" component="div">
                    ESTATE Details
                </Typography>
                <div className="BuyCardWrapper">
                    <Card sx={{ maxWidth: 360 }} style={style.card}>
                        <Carousel title="Carousel">
                            {buyPageData.imageURLs.map((imageURL) => { return <Item img={imageURL}/> })}
                        </Carousel>
                        <CardContent>
                            
                            <Typography gutterBottom variant="h5" component="div">
                                {buyPageData.estateName}
                            </Typography>

                            <Typography gutterBottom variant="h5" component="div">
                                {buyPageData.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={style.solidColor}>
                                {buyPageData.address}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" style={style.solidColor}>
                                {buyPageData.numRooms} Bed(s)
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" style={style.solidColor}>
                                {buyPageData.sqFt} sq. Foot
                            </Typography>
                            
                        </CardContent>
                    </Card>
                </div>
                <Stack spacing={2} direction="row" style={style.buttonWrapper}>
                <Button variant="contained" style={style.button}>Mortgage</Button>
                <Button variant="contained" style={style.button}>Buy</Button>
                </Stack>
            </div>
        </div>
    );
}

export default Buy;
