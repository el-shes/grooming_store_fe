import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {headerStyle, modalStyle, submitButtonStyle} from "../Common/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function DeleteProcedureModal(props) {

  const handleDelete = async () => {
    await props.deleteProcedure(props.procedure.id, props.handleClose);
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
          Are you sure you want to DELETE {props.procedure.name}?
        </Typography>
          <div style={submitButtonStyle}>
            <Button size="medium" variant={"contained"} onClick={props.handleClose}
                    style={{marginRight: 10 + 'px'}}>Cancel</Button>
            <Button size="medium" variant={"contained"} onClick={handleDelete}>Delete</Button>
          </div>
      </Box>
    </Modal>
  );
}

