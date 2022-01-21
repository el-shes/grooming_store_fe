import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import {useEffect} from "react";
import MyBackdrop from "../Common/MyBackdrop";
import {SERVER} from "../../App";

export default function ProcedureForm(props) {
  const [procedures, setProcedures] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  
  useEffect(async () => {
    setLoading(true);
    await SERVER.get("procedure").then(res => {
      setProcedures(res.data);
      setLoading(false);
    });
  }, []);

  const handleProcedureChange = (event) => {
    const selectedProcedure = procedures.find((p) => p.id === event.target.value);
    props.setSelectedProcedure(selectedProcedure);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select Procedure
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Select
            labelId="procedure-select-label"
            id="procedure-select"
            value={props.selectedProcedure.id}
            label="Procedure"
            onChange={handleProcedureChange}
          >
            {procedures.map((procedure) => {
              return <MenuItem key={procedure.id} value={procedure.id}>{procedure.name}</MenuItem>
            })}
          </Select>
        </Grid>
      </Grid>
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </React.Fragment>
  );
}