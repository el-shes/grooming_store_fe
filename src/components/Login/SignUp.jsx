import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {SERVER} from "../../App";
import {useEffect, useState} from "react";


const theme = createTheme();

export default function SignUp() {
  let navigate = useNavigate();
  const [error, setError] = useState({});
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("call");
    await createAndLogIn(first_name, last_name, phone, password)
  };

  useEffect(() => {
    const first_name_regex = /^[A-Za-z\s'-]+$/;
    if(!first_name.match(first_name_regex)) {
      error["first_name"] = "Invalid input";
    }
    else {
      delete error["first_name"];
    }
  },[first_name])

  useEffect(() => {
    const last_name_regex = /^[A-Za-z\s'-]+$/;
    if(!last_name.match(last_name_regex)) {
      error["last_name"] = "Invalid input";
    }
    else {
      delete error["last_name"];
    }
  },[last_name])

  useEffect( () => {
    const phone_regex = /^[a-z0-9]+$/;
    if (phone.length !== 10 ||!phone.match(phone_regex)) {
      error["phone"] = "Must contain numeric symbols and be of length 10"
    }
    else {
      delete error["phone"];
    }
  }, [phone])

  useEffect(() => {
    if (password !== confirm_password) {
      error["confirm_password"] = "Doesn't match"
    }
  }, [password, confirm_password])


  const createAndLogIn = async (first_name, last_name, phone, password) => {
    await SERVER.post( '/user', JSON.stringify({first_name : first_name, last_name : last_name,
                                                              phone : phone, password : password}))
      .then( res => {
        navigate("../home", { replace: true })
      }).catch(error_result => {
        console.log(error_result.response.data)
        setError(error_result.response.data)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={error.hasOwnProperty("first_name")}
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  helperText={error["first_name"]}
                  value={first_name}
                  onChange={e => setFirstName(e.target.value)}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={error.hasOwnProperty("last_name")}
                  required
                  fullWidth
                  id="last_name"
                  helperText={error["last_name"]}
                  label="Last Name"
                  name="lastName"
                  value={last_name}
                  onChange={e => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.hasOwnProperty("phone")}
                  required
                  fullWidth
                  id="phone"
                  helperText={error["phone"]}
                  label="Contact Phone"
                  name="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.hasOwnProperty("password")}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={error["password"]}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.hasOwnProperty("confirm_password")}
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  value={confirm_password}
                  onChange={e => setConfirmPassword(e.target.value)}
                  helperText={error["confirm_password"]}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // disabled={Object.keys(error).length !== 0}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}