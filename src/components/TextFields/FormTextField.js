import { TextField } from "@mui/material";

const FormTextField = ({ label, ...props }) => (
  <TextField
    label={label}
    variant="outlined"
    size="small"
    fullWidth
    sx={{ mb: 2 }}
    {...props}
  />
);

export default FormTextField;
