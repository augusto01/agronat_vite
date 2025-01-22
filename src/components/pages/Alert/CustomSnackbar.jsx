import React from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({ snackbarConfig, handleSnackbarClose }) => {
  return (
    <Snackbar
      open={snackbarConfig.open}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbarConfig.severity}
        sx={{ width: "100%" }}
      >
        {snackbarConfig.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
