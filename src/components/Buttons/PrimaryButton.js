// src/components/common/PrimaryButton.jsx
import { Button } from "@mui/material";

const PrimaryButton = ({ children, sx = {}, ...props }) => (
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#073B4C",
      color: "white",
      px: 4,
      py: 1.2,
      textTransform: "none",
      fontWeight: "bold",
      "&:hover": { backgroundColor: "#055063" },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Button>
);

export default PrimaryButton;
