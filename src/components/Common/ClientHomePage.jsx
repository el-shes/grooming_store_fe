import * as React from 'react';
import {SERVER} from "../../App";
import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import {capitalize} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MyBackdrop from "./MyBackdrop";
import AdminAddReservationModal from "../Reservation/AddReservationModal";
import DeleteReservationModal from "../Reservation/DeleteReservationModal";

const tableStyle = {
  width: '80%'
};

export default function ClientHomePage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState({});

  const handleAddOpen = () => {
    setOpenAddModal(true);
    setLoading(true);
  };
  const handleAddClose = () => {
    setOpenAddModal(false);
    setLoading(false);
  };
  const handleDeleteOpen = (reservation) => {
    setSelectedReservation(reservation);
    setOpenDeleteModal(true);
    setLoading(true);
  };
  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
    setLoading(false);
  };

  const getReservations = async () => await SERVER.get("reservation");

  const addReservation = async (reservation, postAction) => {
    await SERVER.post(`reservation`, JSON.stringify(reservation))
      .then(async res => {
        console.log(res);
        postAction();
        await getReservations().then(res => setReservations(res.data));
      })
  }
  const deleteReservation = async (reservation_id, postAction) => {
    await SERVER.delete(`/reservation/${reservation_id}`)
      .then(async res => {
        console.log(res);
        postAction();
        await getReservations().then(res => setReservations(res.data));
      })
  }

  useEffect(() => {
    getReservations().then(res => setReservations(res.data));
  }, []);

  return (
    <>
      <div align={"center"}>
        <TableContainer component={Paper} style={tableStyle}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Master</TableCell>
                <TableCell align="right">Breed</TableCell>
                <TableCell align="right">Procedure</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">From </TableCell>
                <TableCell align="right">To </TableCell>
                <TableCell align="right">Total </TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={handleAddOpen}>Make reservation</Button>
                </TableCell>
                <TableCell align="right"/>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow
                  key={reservation.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    {capitalize(reservation.master_name)}
                  </TableCell>
                  <TableCell align="right">{reservation.breed_name}</TableCell>
                  <TableCell align="right">{reservation.procedure_name}</TableCell>
                  <TableCell align="right">{reservation.date}</TableCell>
                  <TableCell align="right">{reservation.time_from}</TableCell>
                  <TableCell align="right">{reservation.time_to}</TableCell>
                  <TableCell align="right">{reservation.final_price}</TableCell>
                  <TableCell align="right"><Button variant="outlined" color="secondary" startIcon={<DeleteIcon/>}
                                                   onClick={() => handleDeleteOpen(reservation)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/*<AdminAddReservationModal open={openAddModal} handleClose={handleAddClose} addReservation={addReservation}/>*/}
        <DeleteReservationModal open={openDeleteModal} handleClose={handleDeleteClose} deleteReservation={deleteReservation}
                              reservation={selectedReservation}/>
      </div>
      <MyBackdrop loading={loading} setLoading={setLoading}/>
    </>
)
}
