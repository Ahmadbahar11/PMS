"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../../../services/axios";  // ✅ reuse axios with token

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance.get(
          "http://115.186.185.230:9090/employees/basic"
        );
        setEmployees(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Employees
      </Typography>

      <Divider sx={{ my: 2 }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 2,
            width: "100%",
          }}
        >
          <Table sx={{ minWidth: "100%" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0F3B4C" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Father/Husband</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Gender</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Marital Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Department</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Designation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp) => (
                <TableRow
                  key={emp.employee_id}
                  sx={{
                    "&:hover": { backgroundColor: "#f9f9f9" },
                    "& td": { fontSize: "0.9rem" },
                  }}
                >
                  <TableCell>{emp.employee_id}</TableCell>
                  <TableCell>{emp.employee_name}</TableCell>
                  <TableCell>{emp.employee_father_husband_name}</TableCell>
                  <TableCell>{emp.gender}</TableCell>
                  <TableCell>{emp.marital_status}</TableCell>
                  <TableCell>{emp.employee_contact_number}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.employee_designation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default EmployeesPage;
