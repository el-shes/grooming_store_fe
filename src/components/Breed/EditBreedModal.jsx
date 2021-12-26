import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import {SERVER} from "../../App";
import {Stack} from "@mui/material";
import {modalStyle} from "../Common/styles";

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const spaceStyle = {
  margin: '10px'
}

const buttonStyle = {
  margin: '10px',
  textAlign: 'center'
}

export default function EditBreedModal(props) {
  const [id, setId] = React.useState(props.breed.id);
  const [name, setName] = React.useState(props.breed.name);
  const [fur_coefficient, setFurCoefficient] = React.useState(props.breed.fur_coefficient);
  const [size_coefficient, setSizeCoefficient] = React.useState(props.breed.size_coefficient);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const breed = {
      name, fur_coefficient: parseFloat(fur_coefficient),
      size_coefficient: parseFloat(size_coefficient), image_link: props.breed.image_link
    }
    await props.updateBreed(id, breed, props.handleClose);
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <CardMedia
          component="img"
          height="340"
          image={props.breed.image_link}
          alt={props.breed.name}
          style={spaceStyle}
        />
        <Typography id="modal-modal-title" variant="h6" component="h2" style={spaceStyle}>
          Edit Breed
        </Typography>
        <form onSubmit={handleSubmit} encType={"application/json"}>
          <Stack spacing={2}>
            <TextField
              id="outlined-multiline-flexible-name"
              label="Name"
              multiline
              maxRows={4}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible-fur"
              label="Fur Coefficient"
              multiline
              maxRows={4}
              value={fur_coefficient}
              onChange={e => setFurCoefficient(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible-size"
              label="Size Coefficient"
              multiline
              maxRows={4}
              value={size_coefficient}
              onChange={e => setSizeCoefficient(e.target.value)}
            />
          </Stack>
          <div style={buttonStyle}>
            <Button type={"submit"} size="medium" variant={"contained"}>Save</Button>
          </div>
        </form>

      </Box>
    </Modal>
  );
}
