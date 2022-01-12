import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {headerStyle, modalStyle} from "../Common/styles";
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import {LocalizationProvider} from "@mui/lab";
import {useEffect} from "react";


export default function AddTimeSlotModal(props) {
  const [masterId, setMasterId] = React.useState(props.masters.length > 0 ? props.masters[0].id : "");
  const [date, setDate] = React.useState(new Date());
  const [startingHour, setStartingHour] = React.useState(new Date(0,0,0,9, 0));
  const [endingHour, setEndingHour] = React.useState(new Date(0,0,0,21, 0));

  const handleMasterChange = (event) => {
    setMasterId(event.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const converted_date = ("0" + date.getDate()).slice(-2) + "/" + ("0"+(date.getMonth()+1)).slice(-2) + "/" +
      date.getFullYear();
    const converted_time_from = ("0" + startingHour.getHours()).slice(-2) + ":" + ("0" + startingHour.getMinutes()).slice(-2);
    const converted_time_to = ("0" + endingHour.getHours()).slice(-2) + ":" + ("0" + endingHour.getMinutes()).slice(-2);
    const time_slot = {master_id: masterId, date:converted_date, starting_hour: converted_time_from,
      ending_hour: converted_time_to}
    await props.addSlot(time_slot, props.handleClose);
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
          Add Time Slot
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Select
                  labelId="master-select-label"
                  id="master-select"
                  value={masterId}
                  label="Master"
                  onChange={handleMasterChange}
                >
                  {props.masters.map((master) => {
                    return <MenuItem key={master.id} value={master.id}>{master.name}</MenuItem>
                  })}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  minTime={new Date(0,0,0,9)}
                  maxTime={new Date(0,0,0,20, 30)}
                  label="Time From"
                  value={startingHour}
                  minutesStep={30}
                  onChange={handleStartTimeChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  minTime={new Date(0,0,0,9, 30)}
                  maxTime={new Date(0,0,0,21)}
                  label="Time To"
                  value={endingHour}
                  onChange={handleEndTimeChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Add
            </Button>
          </Box>
        </LocalizationProvider>
      </Box>
    </Modal>);
}
