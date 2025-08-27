// src/components/common/FormAlert.jsx
import React from "react";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

const defaultIcons = {
  success: <CheckIcon fontSize="inherit" />,
  error: <ErrorOutlineIcon fontSize="inherit" />,
  info: <InfoIcon fontSize="inherit" />,
  warning: <WarningIcon fontSize="inherit" />,
};

const FormAlert = ({ severity = "success", message = "", icon = null }) => {
  return (
    <Alert
      icon={icon || defaultIcons[severity]}
      severity={severity}
      sx={{ mb: 2 }}
    >
      {message}
    </Alert>
  );
};

export default FormAlert;
