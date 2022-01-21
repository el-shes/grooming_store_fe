import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {useEffect} from "react";
import MyBackdrop from "../Common/MyBackdrop";
import {SERVER} from "../../App";
import Button from "@mui/material/Button";

export default function TimeSlotForm(props) {
  const [timeSlots, setTimeSlots] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(async () => {
    setLoading(true);
    await SERVER.get(`/time-slot?procedure_id=${props.procedure_id}&master_id=${props.master_id}&date=${props.date}`)
      .then(res => {
      setTimeSlots(res.data);
      setLoading(false);
    });
  }, []);

  const handleTimeSelection = (start, end) => {
    props.setSelectedStartTime(start);
    props.setSelectedEndTime(end);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select Time Slot
      </Typography>
      <Grid container spacing={3}>
        <Grid container spacing={2} item xs={12}>
          {timeSlots.map((slot) => {
            if (slot.start === props.selectedStartTime && slot.end === props.selectedEndTime) {
              return <Grid key={"grid_"+slot.start + "_" + slot.end} item><Button variant="outlined" key={slot.start + "_" + slot.end}
                                               onClick={() => handleTimeSelection(slot.start, slot.end)}>
                {slot.start}-{slot.end}</Button></Grid>
            } else {
              return <Grid key={"grid_"+slot.start + "_" + slot.end} item><Button variant="contained" key={slot.start + "_" + slot.end}
                                               onClick={() => handleTimeSelection(slot.start, slot.end)}>
                {slot.start}-{slot.end}</Button></Grid>
            }
          })}
        </Grid>
      </Grid>
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </React.Fragment>
  );
}