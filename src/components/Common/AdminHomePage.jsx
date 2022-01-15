import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import {SERVER} from "../../App";
import AddTimeSlotModal from "../TimeSlot/AddTimeSlotModal";
import {useEffect, useState} from "react";
import MyBackdrop from "./MyBackdrop";
import AdminAddReservationModal from "../Reservation/AddReservationModal";

export default function AdminHomePage() {
  const [masters, setMasters] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const navBoxes = [
    {
      title: 'Time Slots',
      buttonText: 'Add a time slot',
      buttonVariant: 'contained',
      onClick: () => handleAddOpen()
    },
    {
      title: 'Reservations',
      buttonText: 'Create Reservation',
      buttonVariant: 'contained',
    },
  ];

  const handleAddOpen = () => {
    setOpenAddModal(true);
    setLoading(true);
    setError({});
  };

  const handleAddClose = () => {
    setOpenAddModal(false);
    setLoading(false);
  };

  useEffect(() => {
    getMasters().then(res => setMasters((res.data)));
  },[])

  const getMasters = async () => await SERVER.get("master");

  const addTimeSlot = async (timeSlot, postAction) => {
    await SERVER.post("time-slot", JSON.stringify(timeSlot))
      .then(async res => {
        console.log(res);
        postAction();
      }).catch(error => {
        console.log(error.response.data)
        setError(error.response.data)
      })
  };
  const addReservation = async (reservation, postAction) => {
    await SERVER.post("reservation", JSON.stringify(reservation))
      .then(async res => {
        console.log(res);
        postAction();
      })
  }

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Hello, Admin!
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {navBoxes.map((navBoxes) => (
            <Grid
              item
              key={navBoxes.title}
              xs={12}
              md={4}
            >
              <Card>
                <CardHeader
                  title={navBoxes.title}
                  titleTypographyProps={{ align: 'center' }}
                  action={navBoxes.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={navBoxes.buttonVariant} onClick={navBoxes.onClick}>
                    {navBoxes.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
      >
      </Container>
      <AddTimeSlotModal open={openAddModal} handleClose={handleAddClose} masters={masters} addSlot={addTimeSlot}
                        errors={error}/>
      {/*<AdminAddReservationModal open={openAddModal} handleClose={handleAddClose} addReservation={addReservation}/>*/}
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </React.Fragment>
  )
}
