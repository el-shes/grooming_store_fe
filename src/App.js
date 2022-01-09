import React, {createContext, useContext, useEffect, useState} from "react";
import {Container, styled} from "@mui/material";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BreedGrid from "./components/Breed/BreedGrid";
import ProcedureTable from "./components/Procedure/ProcedureTable";
import UserTable from "./components/User/UserTable";
import AdminNavBar from "./components/Common/AdminNavBar";
import SignIn from "./components/Login/SignIn";
import HomePage from "./components/Common/HomePage";
import Cookies from 'js-cookie';
import SignUp from "./components/Login/SignUp";

export const SERVER = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
});

const Root = styled(Container)(({theme}) => ({
  [theme.breakpoints.down("xl")]: {
    marginLeft: "15rem",
  }
}));

export const UserRoleContext = createContext(

);

const App = () => {
  const [role, setRole] = useState("");

  const verifyToken = async (token) => {
    await SERVER.post('/verify', JSON.stringify({token}))
      .then(res => {
        setRole(res.data.role);
      })
  }

  useEffect(async () => {
    const cookie = Cookies.get('user');
    if (!!cookie) {
      await verifyToken(cookie)
    }
  }, [])

  return (
    <BrowserRouter>
      <UserRoleContext.Provider value={{role, setRole}}>
        <Routes>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path="/login" element={<SignIn/>}/>
        </Routes>
        {role === "ADMIN" && (
          <>
            <AdminNavBar/>
            <Root sx={{mt: "1rem"}}>
              <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/breed" element={<BreedGrid/>}/>
                <Route path="/procedure" element={<ProcedureTable/>}/>
                <Route path="/user" element={<UserTable/>}/>
              </Routes>
            </Root>
          </>
        )}
      </UserRoleContext.Provider>
    </BrowserRouter>
  );
};

export default App;