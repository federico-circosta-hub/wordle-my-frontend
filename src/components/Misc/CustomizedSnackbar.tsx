import React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { AlertColor } from "@mui/material";

const CustomizedSnackbar = ({
  isOpen,
  setIsOpen,
  content,
  severity,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  severity: AlertColor;
}) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={1500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={Slide}
    >
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbar;
