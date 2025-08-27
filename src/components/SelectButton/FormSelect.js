import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FormSelect = ({ label, value, onChange, options = [] }) => (
  <FormControl size="small" sx={{ mb: 2, width: "300px" }}>
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label={label}
    >
      {options.map((option, index) => {
        const isObject = typeof option === "object";
        const val = isObject ? option.value : option;
        const lbl = isObject ? option.label : option;

        // Combine value and index to ensure uniqueness
        const key = `${val}-${index}`;

        return (
          <MenuItem key={key} value={val}>
            {lbl}
          </MenuItem>
        );
      })}
    </Select>
  </FormControl>
);

export default FormSelect;
