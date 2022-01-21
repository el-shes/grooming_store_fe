import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProcedureForm from "./ProcedureForm";
import BreedForm from "./BreedForm";
import MasterForm from "./MasterForm";
import DateForm from "./DateForm";
import TimeSlotForm from "./TimeSlotForm";
import Review from "./Review";
import {useEffect} from "react";
import {SERVER} from "../../App";

const steps = ['Select Procedure', 'Select Breed', 'Select Master', 'Select Date', 'Select Time', 'Review'];

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedProcedure, setSelectedProcedure] = React.useState({});
  const [selectedMaster, setSelectedMaster] = React.useState({});
  const [selectedBreed, setSelectedBreed] = React.useState({});
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedStartTime, setSelectedStartTime] = React.useState({});
  const [selectedEndTime, setSelectedEndTime] = React.useState({});
  const [finalPrice, setFinalPrice] = React.useState("");
  const [summary, setSummary] = React.useState([]);
  const [reservationNumber, setReservationNumber] = React.useState("");

  const date_object = new Date(selectedDate);
  const converted_date_for_url = date_object.getDate()+"-"+(date_object.getMonth() + 1)+"-"+date_object.getFullYear()
  const converted_date_for_body = date_object.getDate()+"/"+(date_object.getMonth() + 1)+"/"+date_object.getFullYear()

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ProcedureForm selectedProcedure={selectedProcedure} setSelectedProcedure={setSelectedProcedure}/>;
      case 1:
        return <BreedForm selectedBreed={selectedBreed} setSelectedBreed={setSelectedBreed}/>;
      case 2:
        return <MasterForm procedure_id={selectedProcedure.id} selectedMaster={selectedMaster} setSelectedMaster={setSelectedMaster}/>;
      case 3:
        return <DateForm selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>;
      case 4:
        return <TimeSlotForm selectedStartTime={selectedStartTime} master_id={selectedMaster.id}
                             procedure_id={selectedProcedure.id} setSelectedStartTime={setSelectedStartTime}
                             date={converted_date_for_url}
                             selectedEndTime={selectedEndTime} setSelectedEndTime={setSelectedEndTime}/>;
      case 5:
        return <Review finalPrice={finalPrice} summary={summary}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  useEffect(() => {
    const breed = {name: "Breed", value: selectedBreed.name}
    const procedure = {name: "Procedure", value: selectedProcedure.name}
    const master = {name: "Master", value: selectedMaster.name}
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = {name: "Date", value: new Date(selectedDate).toLocaleDateString("en-US", options)};
    const slot = {name: "Slot", value: selectedStartTime.toString() + "-" + selectedEndTime.toString()};
    setSummary([breed, procedure, master, date, slot]);
  }, [selectedProcedure, selectedMaster, selectedBreed, selectedDate, selectedStartTime, selectedEndTime]);

  useEffect(async () => {
    if (!!selectedProcedure.id && !!selectedBreed.id) {
      await SERVER.get(`/procedure/${selectedProcedure.id}/${selectedBreed.id}`).then(res => {
        setFinalPrice(res.data);
      });
    }

  }, [selectedProcedure, selectedBreed]);


  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await SERVER.post(`/reservation`, JSON.stringify({
        procedure_id: selectedProcedure.id, breed_id: selectedBreed.id, master_id: selectedMaster.id, date: converted_date_for_body,
        time_from: selectedStartTime.toString(), time_to : selectedEndTime.toString(), finalPrice : finalPrice
      })).then(res => {
        setReservationNumber(res.data);
        setActiveStep(activeStep + 1);
      });
    } else {
      setActiveStep(activeStep + 1);
    }

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            New Reservation
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" width={"80%"} sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your reservation.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{reservationNumber}.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place reservation' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}