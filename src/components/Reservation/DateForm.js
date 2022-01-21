import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MyBackdrop from "../Common/MyBackdrop";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {LocalizationProvider} from "@mui/lab";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

export default function DateForm(props) {
  const [loading, setLoading] = React.useState(false);

  const handleDateChange = (newDate) => {
    props.setSelectedDate(newDate);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select Date
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="dd/MM/yyyy"
              value={props.selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </React.Fragment>
  );
}