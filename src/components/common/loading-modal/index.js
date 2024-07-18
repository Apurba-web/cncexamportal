import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const LoadingModal = ({ show }) => {
  return (    
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingModal;
