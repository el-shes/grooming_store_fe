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
import AddProcedureModal from "./AddProcedureModal";
import MyBackdrop from "../Common/MyBackdrop";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteProcedureModal from "./DeleteProcedureModal";
import EditProcedureModal from "./EditProcedureModal";
import EditIcon from '@mui/icons-material/Edit';

const tableStyle = {
  width: '60%'
}

export default function ProcedureTable() {
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState({});
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const handleAddOpen = () => {
    setOpenAddModal(true);
    setLoading(true);
  }
  const handleAddClose = () => {
    setOpenAddModal(false);
    setLoading(false);
  }

  const handleDeleteOpen = (procedure) => {
    setSelectedProcedure(procedure);
    setOpenDeleteModal(true);
    setLoading(true);
  }
  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
    setLoading(false);
  }

  const handleEditOpen = (procedure) => {
    console.log(procedure);
    setSelectedProcedure(procedure);
    setOpenEditModal(true);
    setLoading(true);
  }
  const handleEditClose = () => {
    setOpenEditModal(false);
    setLoading(false);
  }

  const getProcedures = async () => await SERVER.get("procedure");
  const addProcedure = async (procedure, postAction) => {
    await SERVER.post(`procedure`, JSON.stringify(procedure))
      .then(async res => {
        console.log(res);
        postAction();
        await getProcedures().then(res => setProcedures(res.data));
      })
  }
  const deleteProcedure = async (procedure_id,postAction) => {
    await SERVER.delete(`/procedure/${procedure_id}`)
      .then(async res => {
        console.log(res);
        postAction();
        await getProcedures().then(res => setProcedures(res.data));
      })
  }
  const editProcedure = async (procedure_id, procedure, postAction) => {
    await SERVER.put(`/procedure/${procedure_id}`, JSON.stringify(procedure))
      .then(async res => {
        console.log(res);
        postAction();
        await getProcedures().then(res => setProcedures(res.data));
      })
  }

  useEffect(() => {
    getProcedures().then(res => setProcedures(res.data));
  }, []);


  return (
    <>
      <div align={"center"}>
        <TableContainer component={Paper} style={tableStyle}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Procedure</TableCell>
                <TableCell align="right">Duration</TableCell>
                <TableCell align="right">Basic Price*</TableCell>
                <TableCell align="right"><Button variant="contained" onClick={handleAddOpen}>Add</Button></TableCell>
                <TableCell align="right"/>
                </TableRow>
            </TableHead>
            <TableBody>
              {procedures.map((procedure) => (
                <TableRow
                  key={procedure.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    {capitalize(procedure.name)}
                  </TableCell>
                  <TableCell align="right">{procedure.duration}</TableCell>
                  <TableCell align="right">{procedure.basic_price}</TableCell>
                  <TableCell align="right"><Button variant="outlined" startIcon={<EditIcon />}
                                                   onClick={() => handleEditOpen(procedure)}>Edit</Button></TableCell>
                  <TableCell align="right"><Button variant="outlined" color="secondary" startIcon={<DeleteIcon />}
                                                   onClick={() => handleDeleteOpen(procedure)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddProcedureModal open={openAddModal} handleClose={handleAddClose} addProcedure={addProcedure}/>
        <DeleteProcedureModal open={openDeleteModal} handleClose={handleDeleteClose} deleteProcedure={deleteProcedure}
                              procedure={selectedProcedure}/>
        <EditProcedureModal open={openEditModal} handleClose={handleEditClose} editProcedure={editProcedure}
                            procedure={selectedProcedure}/>
      </div>
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </>
  );
}
