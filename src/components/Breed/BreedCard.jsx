import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditBreedModal from "./EditBreedModal";
import MyBackdrop from "../Common/MyBackdrop";

export default function BreedCard(props) {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleEditOpen = () => {
    setOpenEditModal(true);
    setLoading(true);
  }
  const handleEditClose = () => {
    setOpenEditModal(false);
    setLoading(false);
  }

  return (
    <>
      <Card sx={{maxWidth: 345}}>
        <CardMedia
          component="img"
          height="240"
          image={props.breed.image_link}
          alt={props.breed.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.breed.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fur coefficient: {props.breed.fur_coefficient}<br/>
            Size coefficient: {props.breed.size_coefficient}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEditOpen}>Edit</Button>
        </CardActions>
      </Card>
      <EditBreedModal open={openEditModal} handleClose={handleEditClose} breed={props.breed}
                      updateBreed={props.updateBreed}/>
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </>
  );
}
