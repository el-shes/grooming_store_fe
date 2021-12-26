import * as React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function MyBackdrop(props) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.loading}
            onClick={() => props.setLoading(!props.loading)}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}