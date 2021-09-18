import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MintForm from './MintForm';
import './Mint.css'

function Mint() {
    const style = {
        card: {
            position: 'relative',
            margin: 'auto',
            top: '20vh'
        },
        previewHeader: {
            'margin-top': '2.5vh' 
        }
    }

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
                            <Typography gutterBottom variant="h5" component="div">
                                ESTATE
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
            <div className="MintForm">
                <MintForm></MintForm>
            </div>
        </div>
    );
}

export default Mint;
