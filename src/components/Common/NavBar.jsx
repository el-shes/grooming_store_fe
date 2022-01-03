import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import {useNaveBarStyles} from "./styles";
import {Link} from "react-router-dom";


export default function Navbar() {
  const classes = useNaveBarStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Grooming Store
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/user" className={classes.link}>
            Users
          </Link>
          <Link to="/procedure" className={classes.link}>
            Procedures
          </Link>
          <Link to="/breed" className={classes.link}>
            Breeds
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
