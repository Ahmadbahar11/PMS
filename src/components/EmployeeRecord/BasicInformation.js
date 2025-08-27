import { Grid, Box, Typography } from "@mui/material";
import FormTextField from "../TextFields/FormTextField";
import FormSelect from "../SelectButton/FormSelect";

const BasicInformation = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" color="#073B4C" mb={2}>
        Basic Information
      </Typography>

      {/* Row 1 */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormTextField
            label="Employee Name"
            value={data.employee_name || ""}
            onChange={(e) => handleChange("employee_name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormTextField
            label="Father/Husband Name"
            value={data.employee_father_husband_name || ""}
            onChange={(e) =>
              handleChange("employee_father_husband_name", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormSelect
            label="Gender"
            value={data.gender_id || ""}
            onChange={(val) => handleChange("gender_id", Number(val))}
            options={[
              { label: "Male", value: 1 },
              { label: "Female", value: 2 },
            ]}
          />
        </Grid>
      </Grid>

      {/* Row 2 */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormSelect
            label="Marital Status"
            value={data.marital_status_id || ""}
            onChange={(val) => handleChange("marital_status_id", Number(val))}
            options={[
              { label: "Single", value: 1 },
              { label: "Married", value: 2 },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormSelect
            label="Employee Department ID"
            value={data.employee_department_id || ""}
            onChange={(val) => handleChange("employee_department_id", Number(val))}
            options={Array.from({ length: 7 }, (_, i) => ({ label: String(i + 1), value: i + 1 }))}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormTextField
            label="Contact Number"
            value={data.employee_contact_number || ""}
            onChange={(e) =>
              handleChange("employee_contact_number", e.target.value)
            }
          />
        </Grid>
      </Grid>

      {/* Row 3 */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormTextField
            label="Designation"
            value={data.employee_designation || ""}
            onChange={(e) => handleChange("employee_designation", e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicInformation;
