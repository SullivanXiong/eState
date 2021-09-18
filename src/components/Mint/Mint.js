import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MintForm from './MintForm';
import './Mint.css'

function Mint() {
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
        }
    }
    
    const [estateName, setEstateName] = useState(undefined);
    const [adress, setAddress] = useState(undefined);

    return (
        <div className="Mint">
            <div className="MintPreview">
                <Typography style={style.previewHeader} variant="h4" component="div">
                    Preview of ESTATE
                </Typography>
                <div className="MintPreviewWrapper">
                    <Card sx={{ maxWidth: 256 }} style={style.card}>
                        <CardMedia
                            component="img"
                            height="256"
                            image="/houseLogo512x512.jpg"
                            alt="green iguana"
                        />
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
                            {!adress && (
                                <Typography variant="body2" color="text.secondary" style={style.defaultColor}>
                                    123 Address St
                                </Typography>
                            )}
                            {adress && (
                                <Typography variant="body2" color="text.secondary" style={style.defaultColor}>
                                    {adress}
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
                <MintForm setEstateName={setEstateName} setAddress={setAddress}></MintForm>
            </div>
        </div>
    );
}

export default Mint;
