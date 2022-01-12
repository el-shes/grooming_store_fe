import React, {useContext} from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import {useNaveBarStyles} from "./styles";
import {Link, useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import Cookies from "js-cookie";
import {UserRoleContext} from "../../App";


export default function AdminNavBar() {
  const classes = useNaveBarStyles();
  let navigate = useNavigate();
  const context = useContext(UserRoleContext);

  const handleLogOut = () => {
    context.setRole("");
    Cookies.remove("user");
    navigate("../login", {replace: true})
  }

  return (
    <AppBar position="static">
      <CssBaseline/>
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Grooming Store
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/home" className={classes.link}>
            Home
          </Link>
          <Link to="/user" className={classes.link}>
            Users
          </Link>
          <Link to="/procedure" className={classes.link}>
            Procedures
          </Link>
          <Link to="/breed" className={classes.link}>
            Breeds
          </Link>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleLogOut} startIcon={<LogoutIcon/>}>
              Log out
            </Button>
          </Stack>
        </div>
      </Toolbar>
    </AppBar>
  );
}
