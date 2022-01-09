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
import {SERVER, UserRoleContext} from "../../App";
import { useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";


const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();
  const context = useContext(UserRoleContext);
  const [error, setError] = useState({});
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await logIn(phone, password)
  };

  useEffect( () => {
    Cookies.remove("user");
  })

  useEffect( () => {
    const phone_regex = /^[0-9]+$/;
    if (phone.length !== 10 ||!phone.match(phone_regex)) {
      error["phone"] = "Must contain numeric symbols and be of length 10"
    }
    else {
      delete error["phone"];
    }
  }, [phone])

  const logIn = async (phone, password) => {
    await SERVER.post( '/login', JSON.stringify({phone : phone, password : password}))
      .then( res => {
        context.setRole(res.data.role);
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={error.hasOwnProperty("phone")}
              margin="normal"
              required
              fullWidth
              id="phone"
              helperText={error["phone"]}
              label="Contact Phone"
              name="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              autoComplete="phone"
              autoFocus
            />
            <TextField
              error={error.hasOwnProperty("password")}
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              helperText={error["password"]}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={Object.keys(error).length !== 0}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}