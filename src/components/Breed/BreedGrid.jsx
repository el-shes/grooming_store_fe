import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";
import {SERVER} from "../../App";
import BreedCard from "./BreedCard";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {blue} from '@mui/material/colors';
import AddBreedModal from "./AddBreedModal";
import MyBackdrop from "../Common/MyBackdrop";
import {IconButton} from "@mui/material";

export default function BreedGrid() {
  const [breeds, setBreeds] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleAddOpen = () => {
    setOpenAddModal(true);
    setLoading(true);
  }
  const handleAddClose = () => {
    setOpenAddModal(false);
    setLoading(false);
  }

  const getBreeds = async () => await SERVER.get("breed");
  const addBreed = async (breed, postAction) => {
    await SERVER.post(`breed`, JSON.stringify(breed))
      .then(async res => {
        console.log(res);
        postAction();
        await getBreeds().then(res => setBreeds(res.data));
      })
  }
  const updateBreed = async (id, breed, postAction) => {
    await SERVER.put(`breed/${id}`, JSON.stringify(breed))
      .then(async res => {
        console.log(res);
        postAction();
        await getBreeds().then(res => setBreeds(res.data));
      })
  }

  useEffect(() => {
    getBreeds().then(res => setBreeds(res.data));
  }, []);

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
          {breeds.map(breed => (
            <Grid item xs={4} key={breed.id}>
              <BreedCard breed={breed} updateBreed={updateBreed}/>
            </Grid>
          ))}
          <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item xs={4}>
            <Grid>
              <IconButton color="secondary" onClick={handleAddOpen}>
                <AddCircleIcon>add_circle</AddCircleIcon>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <AddBreedModal open={openAddModal} handleClose={handleAddClose} addBreed={addBreed}/>
      </Box>
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </>
  );
}
