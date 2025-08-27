import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import SalaryTable from "./SalaryTable";

const SalaryInformation = ({ data = {}, onChange, employeeId }) => {
  const [formData, setFormData] = useState({
    employee_id: employeeId || "",
    pay_grade: "",
    salary_band: "",
    salary_amount: "",
    reason: "",
    updated_by: 2,   // 👈 default always 2
    actions: "",
    effective_date: "",
    action_id: 2,
  });

  // update employee_id if it comes later from parent
  useEffect(() => {
    if (employeeId) {
      setFormData((prev) => ({ ...prev, employee_id: employeeId }));
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...formData,
      [name]: value,
    };
    setFormData(updated);
    onChange(updated); // 🔥 lift state up immediately
  };

  return (
    <Box>
      <Typography sx={{ color: "#0F3B4C", fontWeight: 600 }} variant="h6" mb={2}>
        Compensation History
      </Typography>

      {/* Inline form (3 per row) */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Pay Grade"
            name="pay_grade"
            value={formData.pay_grade}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Salary Band"
            name="salary_band"
            value={formData.salary_band}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="number"
            label="Salary Amount"
            name="salary_amount"
            value={formData.salary_amount}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          />
        </Grid>

        {/* 👇 Removed Updated By input, since always 2 */}

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Actions"
            name="actions"
            value={formData.actions}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="date"
            label="Effective Date"
            name="effective_date"
            value={formData.effective_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {/* Salary history table (still static for now) */}
      <Box mt={3}>
        <SalaryTable />
      </Box>
    </Box>
  );
};

export default SalaryInformation;
