import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {headerStyle, modalStyle, submitButtonStyle} from "../Common/styles";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import {LocalizationProvider} from "@mui/lab";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TimePicker from "@mui/lab/TimePicker";

export default function AdminAddReservationModal(props) {
  const [masterId, setMasterId] = React.useState("");
  const [clientId, setClientId] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [procedure, setProcedure] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [startingHour, setStartingHour] = React.useState(new Date());
  const [endingHour, setEndingHour] = React.useState(new Date());
  const [finalPrice, setFinalPrice] = React.useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const converted_date = ("0" + date.getDate()).slice(-2) + "/" + ("0"+(date.getMonth()+1)).slice(-2) + "/" +
      date.getFullYear();
    const converted_time_from = ("0" + startingHour.getHours()).slice(-2) + ":" + ("0" + startingHour.getMinutes()).slice(-2);
    const converted_time_to = ("0" + endingHour.getHours()).slice(-2) + ":" + ("0" + endingHour.getMinutes()).slice(-2);
    const time_slot = {master_id: masterId, date:converted_date, starting_hour: converted_time_from,
      ending_hour: converted_time_to}
    await props.addReservation(time_slot, props.handleClose);
  };

  const handleMasterChange = (event) => {
    setMasterId(event.target.value)
  };

  const handleClientChange = (event) => {
    setClientId(event.target.value)
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value)
  };

  const handleProcedureChange = (event) => {
    setProcedure(event.target.value)
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleStartTimeChange = (startingHour) => {
    setStartingHour(startingHour);
  };

  const handleEndTimeChange = (endingHour) => {
    setEndingHour(endingHour);
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={headerStyle}>
          Create Reservation
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={handleSubmit} encType={"application/json"}>
            <Stack spacing={2}>
              <Select
                labelId="master-select-label"
                id="master-select"
                value={masterId}
                label="Master"
                onChange={handleMasterChange}
              >
                {props.masters.map((master) => {
                  return <MenuItem value={master.id}>{master.name}</MenuItem>
                })}
              </Select>
              <Select
                labelId="client-select-label"
                id="client-select"
                value={clientId}
                label="Client"
                onChange={handleClientChange}
              >
                {props.clients.map((client) => {
                  return <MenuItem value={client.id}>{client.name}</MenuItem>
                })}
              </Select>
              <Select
                labelId="breed-select-label"
                id="breed-select"
                value={breed}
                label="Breed"
                onChange={handleBreedChange}
              >
                {props.breeds.map((breed) => {
                  return <MenuItem value={breed.id}>{breed.name}</MenuItem>
                })}
              </Select>
              <Select
                labelId="procedure-select-label"
                id="procedure-select"
                value={procedure}
                label="Procedure"
                onChange={handleProcedureChange}
              >
                {props.procedures.map((procedure) => {
                  return <MenuItem value={procedure.id}>{procedure.name}</MenuItem>
                })}
              </Select>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                minTime={new Date(0,0,0,9)}
                maxTime={new Date(0,0,0,20, 30)}
                label="Time From"
                value={startingHour}
                minutesStep={30}
                onChange={handleStartTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                minTime={new Date(0,0,0,9, 30)}
                maxTime={new Date(0,0,0,21)}
                label="Time To"
                value={endingHour}
                onChange={handleEndTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <>
              </>
            </Stack>
            <div style={submitButtonStyle}>
              <Button type={"submit"} size="medium" variant={"contained"}>Save</Button>
            </div>
          </form>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
}