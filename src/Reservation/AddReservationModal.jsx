import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {headerStyle, modalStyle, submitButtonStyle} from "../components/Common/styles";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

export default function AddReservationModal(props) {
  const [master, setMaster] = React.useState("");
  const [client, setClient] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [procedure, setProcedure] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [startingHour, setStartingHour] = React.useState(new Date());
  const [endingHour, setEndingHour] = React.useState(new Date());
  const [finalPrice, setFinalPrice] = React.useState(0);

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
            <Select
              labelId="master-select-label"
              id="master-select"
              value={master}
              label="Master"
              onChange={handleMasterChange}
            >
              {props.masters.map((master) => {
                return <MenuItem value={master.id}>{master.name}</MenuItem>
              })}
            </Select>
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