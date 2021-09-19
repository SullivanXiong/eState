import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Carousel from './Carousel/Carousel'


const ListingCard = (props) => {
   function getCurrentDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;
      return today;
   }
  return (
    <Card>
      <Carousel title="Carousel">
        {props.images}
      </Carousel>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.price} 
        </Typography>
        <Typography variant="inherit">
          {props.numRooms} bds {props.numBath} ba {props.sqFt} sqft 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Listing Posted: {getCurrentDate()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ListingCard;
