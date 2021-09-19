import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Carousel from '../Carousel/Carousel';
import { Item } from '../Carousel/components';
import TextField from '@mui/material/TextField';
import './Sell.css'

function Sell({ sellPageData }) {
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
            'margin-top': '1vh',
            width: '20%'
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

    const [price, setPrice] = useState(undefined);
    
    return (
        <div className="Sell">
            <div className="SellCard">
                <Typography style={style.previewHeader} variant="h4" component="div">
                    ESTATE Details
                </Typography>
                <div className="SellCardWrapper">
                    <Card sx={{ maxWidth: 360 }} style={style.card}>
                        <Carousel title="Carousel">
                            {sellPageData.imageURLs.map((imageURL) => { return <Item img={imageURL}/> })}
                        </Carousel>
                        <CardContent>
                            
                            <Typography gutterBottom variant="h5" component="div">
                                {sellPageData.estateName}
                            </Typography>

                            <Typography gutterBottom variant="h5" component="div">
                                {sellPageData.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={style.solidColor}>
                                {sellPageData.address}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" style={style.solidColor}>
                                {sellPageData.numRooms} Bed(s)
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" style={style.solidColor}>
                                {sellPageData.sqFt} sq. Foot
                            </Typography>
                            
                        </CardContent>
                    </Card>
                </div>
                <div className="SellFieldWrapper">
                    <TextField
                        required
                        id="outlined-required"
                        label="Price"
                        onChange={(event) => setPrice(event.target.value)}
                    />
                    <Button variant="contained" style={style.button}>List</Button>
                </div>
                
                
            </div>
        </div>
    );
}

export default Sell;
