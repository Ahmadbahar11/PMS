import { Grid } from "@mui/material";
import FormSelect from "../SelectButton/FormSelect";
import FormTextField from "../TextFields/FormTextField";

const EmploymentDetails = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Grid container spacing={2}>
      {/* Joining Date */}
      <Grid item xs={12} md={4}>
        <FormTextField
          label="Joining Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={data.employee_joining_date || ""}
          onChange={(e) => handleChange("employee_joining_date", e.target.value)}
        />
      </Grid>

      {/* Employment Type */}
      <Grid item xs={12} md={4}>
        <FormSelect
          label="Employment Type"
          value={data.employment_type_id || ""}
          onChange={(val) => handleChange("employment_type_id", Number(val))}
          options={[
            { label: "Full-Time", value: 1 },
            { label: "Intern", value: 2}
          ]}
        />
      </Grid>

      {/* Employment Status */}
      <Grid item xs={12} md={4}>
        <FormSelect
          label="Employment Status"
          value={data.employee_status_id || ""}
          onChange={(val) => handleChange("employee_status_id", Number(val))}
          options={[
            { label: "Active", value: 1 },
            { label: "Inactive", value: 2 },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default EmploymentDetails;
