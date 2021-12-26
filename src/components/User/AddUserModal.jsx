import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {headerStyle, modalStyle, submitButtonStyle} from "../Common/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function AddUserModal(props) {
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [phone, setContactPhone] = React.useState(0);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {first_name, last_name, role, phone}
    await props.addUser(user, props.handleClose);
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={headerStyle}>
          Add User
        </Typography>
        <form onSubmit={handleSubmit} encType={"application/json"}>
          <Stack spacing={2}>
            <TextField
              error={props.errors.hasOwnProperty("first_name")}
              id="outlined-multiline-flexible-name"
              label="First Name"
              multiline
              helperText={props.errors["first_name"]}
              maxRows={4}
              value={first_name}
              onChange={e => setFirstName(e.target.value)}
            />
            <TextField
              error={props.errors.hasOwnProperty("last_name")}
              id="outlined-multiline-flexible-name"
              label="Last Name"
              multiline
              helperText={props.errors["last_name"]}
              maxRows={4}
              value={last_name}
              onChange={e => setLastName(e.target.value)}
            />
            <FormControl fullWidth error={props.errors.hasOwnProperty("role")}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={role}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value={"CLIENT"}>Client</MenuItem>
                <MenuItem value={"MASTER"}>Master</MenuItem>
                <MenuItem value={"ADMIN"}>Admin</MenuItem>
              </Select>
              <FormHelperText>{props.errors["role"]}</FormHelperText>
            </FormControl>
            <TextField
              error={props.errors.hasOwnProperty("phone")}
              id="outlined-multiline-flexible-size"
              label="Contact Phone"
              multiline
              maxRows={4}
              helperText={props.errors["phone"]}
              value={phone}
              onChange={e => setContactPhone(e.target.value)}
            />
          </Stack>
          <div style={submitButtonStyle}>
            <Button type={"submit"} size="medium" variant={"contained"}>Save</Button>
          </div>
        </form>

      </Box>
    </Modal>
  );
}