import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import {useEffect} from "react";
import MyBackdrop from "../Common/MyBackdrop";
import {SERVER} from "../../App";

export default function MasterForm(props) {
  const [masters, setMasters] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(async () => {
    setLoading(true);
    await SERVER.get(`/master/procedure/${props.procedure_id}`).then(res => {
      setMasters(res.data);
      setLoading(false);
    });
  }, []);

  const handleProcedureChange = (event) => {
    const selectedMaster = masters.find((m) => m.id === event.target.value);
    props.setSelectedMaster(selectedMaster);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select Master
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Select
            labelId="master-select-label"
            id="master-select"
            value={props.selectedMaster.id}
            label="Master"
            onChange={handleProcedureChange}
          >
            {masters.map((master) => {
              return <MenuItem key={master.id} value={master.id}>{master.name}</MenuItem>
            })}
          </Select>
        </Grid>
      </Grid>
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </React.Fragment>
  );
}