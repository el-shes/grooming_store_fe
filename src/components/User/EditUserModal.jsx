import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {headerStyle, modalStyle, submitButtonStyle} from "../Common/styles";
import {useEffect} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from "@mui/material/FormHelperText";


export default function EditUserModal(props) {
  const [id, setId] = React.useState(props.user.id);
  const [first_name, setFirstName] = React.useState(props.user.first_name);
  const [last_name, setLastName] = React.useState(props.user.last_name);
  const [role, setRole] = React.useState(props.user.role);
  const [phone, setContactPhone] = React.useState(props.user.phone);

  useEffect(() => {
    setId(props.user.id);
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setRole(props.user.role);
    setContactPhone(props.user.phone)
  }, [props.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {first_name, last_name, role, phone}
    await props.editUser(id, user, props.handleClose);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
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
          Edit User
        </Typography>
        <form onSubmit={handleSubmit} encType={"application/json"}>
          <Stack spacing={2}>
            <TextField
              error={props.errors.hasOwnProperty("first_name")}
              id="outlined-multiline-flexible-user-first-name"
              label="First Name"
              multiline
              maxRows={4}
              helperText={props.errors["first_name"]}
              value={first_name}
              onChange={e => setFirstName(e.target.value)}
            />
            <TextField
              error={props.errors.hasOwnProperty("last_name")}
              id="outlined-multiline-flexible-user-last-name"
              label="Last Name"
              multiline
              maxRows={4}
              helperText={props.errors["last_name"]}
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
              id="outlined-multiline-flexible-contact-phone"
              label="Phone"
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