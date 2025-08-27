// src/components/common/FormStepper.jsx

import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const FormStepper = ({
  steps = [],
  activeStep = 0,
  onStepClick = () => {},
  StepIconComponent = null,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        "& .MuiStepConnector-line": {
          borderTopWidth: 2,
        },
        "& .MuiStepLabel-label": {
          fontWeight: "bold",
          color: "#555",
          cursor: "pointer",
          fontSize: {
            xs: "0.65rem",
            sm: "0.75rem",
            md: "0.875rem",
          },
        },
        "& .MuiStepIcon-root": {
          fontSize: {
            xs: "1.2rem",
            sm: "1.4rem",
            md: "1.5rem",
          },
        },
        "& .MuiStepLabel-label.Mui-active": {
          color: "#055063",
        },
        "& .MuiStepIcon-root.Mui-active": {
          color: "#055063",
        },
        "& .MuiStepIcon-root.Mui-completed": {
          color: "#055063",
        },
      }}
    >
      {steps.map((label, index) => (
        <Step key={label} onClick={() => onStepClick(index)}>
          <StepLabel
            StepIconComponent={
              StepIconComponent
                ? (props) => <StepIconComponent {...props} icon={index + 1} />
                : undefined
            }
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default FormStepper;
