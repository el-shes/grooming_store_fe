import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import {Stack} from "@mui/material";
import {headerStyle, modalStyle, submitButtonStyle} from "../Common/styles";
import {useEffect} from "react";


export default function AddBreedModal(props) {
  const [name, setName] = React.useState("");
  const [fur_coefficient, setFurCoefficient] = React.useState("1");
  const [size_coefficient, setSizeCoefficient] = React.useState("1");
  const [image_link, setImageLink] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const breed = {name, fur_coefficient: parseFloat(fur_coefficient),
      size_coefficient: parseFloat(size_coefficient), image_link}
    await props.addBreed(breed, props.handleClose);
  };

  useEffect(() => {
    const breed_regex = /^[A-Za-z ]+$/;
    if(!name.match(breed_regex)) {
      props.errors["name"] = "Invalid input";
    }
    else {
      delete props.errors["name"];
    }
  },[name])

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={headerStyle}>
          Add Breed
        </Typography>
        <form onSubmit={handleSubmit} encType={"application/json"}>
          <Stack spacing={2}>
            <TextField
              error={props.errors.hasOwnProperty("name")}
              id="outlined-multiline-flexible-name"
              label="Name"
              multiline
              helperText={props.errors["name"]}
              maxRows={4}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              error={props.errors.hasOwnProperty("fur_coefficient")}
              id="outlined-multiline-flexible-fur"
              label="Fur Coefficient"
              multiline
              helperText={props.errors["fur_coefficient"]}
              maxRows={4}
              value={fur_coefficient}
              onChange={e => setFurCoefficient(e.target.value)}
            />
            <TextField
              error={props.errors.hasOwnProperty("size_coefficient")}
              id="outlined-multiline-flexible-size"
              label="Size Coefficient"
              multiline
              helperText={props.errors["size_coefficient"]}
              maxRows={4}
              value={size_coefficient}
              onChange={e => setSizeCoefficient(e.target.value)}
            />
            <TextField
              error={props.errors.hasOwnProperty("image_link")}
              id="outlined-multiline-flexible-image"
              label="Link to image"
              multiline
              helperText={props.errors["image_link"]}
              maxRows={4}
              value={image_link}
              onChange={e => setImageLink(e.target.value)}
            />
          </Stack>
          <div style={submitButtonStyle}>
            <Button type={"submit"} size="medium" variant={"contained"}>Save</Button>
          </div>
        </form>

      </Box>
    </Modal>
  );
}
