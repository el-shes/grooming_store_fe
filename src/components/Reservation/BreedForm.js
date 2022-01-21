import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import {useEffect} from "react";
import MyBackdrop from "../Common/MyBackdrop";
import {SERVER} from "../../App";

export default function BreedForm(props) {
  const [breeds, setBreeds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(async () => {
    setLoading(true);
    await SERVER.get("breed").then(res => {
      setBreeds(res.data);
      setLoading(false);
    });
  }, []);

  const handleBreedChange = (event) => {
    const selectedBreed = breeds.find((b) => b.id === event.target.value);
    props.setSelectedBreed(selectedBreed);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select Breed
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Select
            labelId="breed-select-label"
            id="breed-select"
            value={props.selectedBreed.id}
            label="Breed"
            onChange={handleBreedChange}
          >
            {breeds.map((breed) => {
              return <MenuItem key={breed.id} value={breed.id}>{breed.name}</MenuItem>
            })}
          </Select>
        </Grid>
      </Grid>
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </React.Fragment>
  );
}