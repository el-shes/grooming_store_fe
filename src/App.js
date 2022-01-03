import React, {createContext, useEffect, useState} from "react";
import {Container, styled} from "@mui/material";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BreedGrid from "./components/Breed/BreedGrid";
import ProcedureTable from "./components/Procedure/ProcedureTable";
import UserTable from "./components/User/UserTable";
import Navbar from "./components/Common/NavBar";
import SignIn from "./components/Login/SignIn";
import HomePage from "./components/Common/HomePage";

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

export const UserRoleContext = createContext({
        roles: [],
        setRoles: () => {
        }
    }
);

const App = () => {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    // const fetchUserRoles = async () => {
    //   return await SERVER.get("roles");
    // };

    // useEffect(() => {
    //   fetchUserRoles().then(res => {
    //     setRoles(res.data.roles);
    //     setLoading(false);
    //   });
    // }, []);

    return (
        <BrowserRouter>
          <Navbar/>
          {loading ? <div/> :
            // <UserRoleContext.Provider value={{roles, setRoles}}>
            //     <Root sx={{mt: "1rem"}}>
            <Routes>
              <Route path="/login" element={<SignIn/>}/>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/breed" element={<BreedGrid/>}/>
              <Route path="/procedure" element={<ProcedureTable/>}/>
              <Route path="/user" element={<UserTable/>}/>
            </Routes>
          }
          {/*</Root>*/}
          {/*   </UserRoleContext.Provider>}*/}
            </BrowserRouter>
    );
};

export default App;