import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import FormTextField from "../TextFields/FormTextField";

const initialRows = [
  {
    time: "12 July 2025, 11:30 AM",
    field: "Designation",
    oldVal: "Junior Developer",
    newVal: "Senior Developer",
    updatedBy: "Admin",
  },
  {
    time: "13 July 2025, 2:00 PM",
    field: "Department",
    oldVal: "Development",
    newVal: "Marketing",
    updatedBy: "HR Manager",
  },
  {
    time: "14 July 2025, 3:15 PM",
    field: "Email",
    oldVal: "john@example.com",
    newVal: "john.doe@example.com",
    updatedBy: "Admin",
  },
];

const HistoryTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = initialRows.filter((row) =>
    row.field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Edit History Log
      </Typography>

      {/* Search & Filter */}
      <Box display="flex" gap={2} mb={2}>
        <FormTextField
          label="Search by field Change"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormTextField label="Filter by" size="small" />
      </Box>

      {/* Styled Table */}
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#0F3B4C" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Date & Time
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Field Changed
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Old Value
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              New Value
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Updated By
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.field}</TableCell>
              <TableCell>{row.oldVal}</TableCell>
              <TableCell>{row.newVal}</TableCell>
              <TableCell>{row.updatedBy}</TableCell>
              <TableCell>
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    color: "#f9a825",
                    textTransform: "none",
                    fontWeight: 500,
                    minWidth: "auto",
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HistoryTracking;
