import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {headerStyle, modalStyle, submitButtonStyle} from "../Common/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from "@mui/material/FormHelperText";
import {useEffect} from "react";

export default function AddProcedureModal(props) {
  const [name, setName] = React.useState("");
  const [duration, setDuration] = React.useState(0);
  const [basic_price, setBasicPrice] = React.useState(0);

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const procedure = {name, duration:parseInt(duration), basic_price:parseInt(basic_price)}
    await props.addProcedure(procedure, props.handleClose);
  };

  useEffect(() => {
    const name_regex = /^[A-Za-z]+$/;
    if(!name.match(name_regex)) {
      props.errors["name"] = "Invalid input";
    }
    else {
      delete props.errors["name"];
    }
  },[name])

  useEffect( () => {
    const price_regex = /^[0-9]+$/;
    if(!String(basic_price).match(price_regex)) {
      props.errors["basic_price"] = "Invalid input";
    }
    if (String(basic_price).length > 5) {
      props.errors["basic_price"] = "Too long";
    }
    else {
      delete props.errors["basic_price"];
    }
  }, [basic_price])

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={headerStyle}>
          Add Procedure
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
            <FormControl fullWidth error={props.errors.hasOwnProperty("duration")}>
              <InputLabel id="duration-select-label">Duration</InputLabel>
              <Select
                labelId="duration-select-label"
                id="duration-select"
                value={duration}
                label="Duration"
                onChange={handleDurationChange}
              >
                <MenuItem value={30}>30-min</MenuItem>
                <MenuItem value={45}>45-min</MenuItem>
                <MenuItem value={60}>Hour</MenuItem>
                <MenuItem value={90}>90-min</MenuItem>
                <MenuItem value={120}>2 Hours</MenuItem>
              </Select>
              <FormHelperText>{props.errors["duration"]}</FormHelperText>
            </FormControl>
            <TextField
              error={props.errors.hasOwnProperty("basic_price")}
              id="outlined-multiline-flexible-size"
              label="Basic Price"
              multiline
              helperText={props.errors["basic_price"]}
              maxRows={4}
              value={basic_price}
              onChange={e => setBasicPrice(e.target.value)}
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