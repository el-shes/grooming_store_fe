import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import {SERVER} from "../../App";
import {capitalize} from "@mui/material";
import MyBackdrop from "../Common/MyBackdrop";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

const tableStyle = {
  width: '60%'
}

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [error, setError] = useState({});


  const handleAddOpen = () => {
    setOpenAddModal(true);
    setLoading(true);
    setError({});
  }
  const handleAddClose = () => {
    setOpenAddModal(false);
    setLoading(false);
  }

  const handleDeleteOpen = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
    setLoading(true);
  }
  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
    setLoading(false);
  }

  const handleEditOpen = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
    setLoading(true);
    setError({});
  }
  const handleEditClose = () => {
    setOpenEditModal(false);
    setLoading(false);
  }

  const getUsers = async () => await SERVER.get("user");
  const addUser = async (user, postAction) => {
    await SERVER.post(`user`, JSON.stringify(user))
      .then(async res => {
        console.log(res);
        postAction();
        await getUsers().then(res => setUsers(res.data));
      }).catch(error => {
        console.log(error.response.data)
        setError(error.response.data)
      })
  }
  const deleteUser = async (user_id, postAction) => {
    await SERVER.delete(`/user/${user_id}`)
      .then(async res => {
        console.log(res);
        postAction();
        await getUsers().then(res => setUsers(res.data));
      })
  }
  const editUser = async (user_id, user, postAction) => {
    await SERVER.put(`/user/${user_id}`, JSON.stringify(user))
      .then(async res => {
        console.log(res);
        postAction();
        await getUsers().then(res => setUsers(res.data));
      }).catch(error => {
        console.log(error.response.data)
        setError(error.response.data)
      })
  }

  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, []);

  return (
    <>
      <div align={"center"}>
        <TableContainer component={Paper} style={tableStyle}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right"><Button variant="contained"
                                                 onClick={handleAddOpen}>Add</Button></TableCell>
                <TableCell align="right"/>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    {capitalize(user.first_name)}
                  </TableCell>
                  <TableCell align="right">{capitalize(user.last_name)}</TableCell>
                  <TableCell align="right">{user.role}</TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right"><Button variant="outlined" startIcon={<EditIcon/>}
                                                   onClick={() => handleEditOpen(user)}>Edit</Button></TableCell>
                  <TableCell align="right"><Button variant="outlined" color="secondary"
                                                   startIcon={<DeleteIcon/>}
                                                   onClick={() => handleDeleteOpen(user)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddUserModal open={openAddModal} handleClose={handleAddClose} addUser={addUser}
                      errors={error}/>
        <DeleteUserModal open={openDeleteModal} handleClose={handleDeleteClose}
                              deleteUser={deleteUser}
                              user={selectedUser}/>
        <EditUserModal open={openEditModal} handleClose={handleEditClose} editUser={editUser}
                            user={selectedUser} errors={error}/>
      </div>
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </>
  );
}
