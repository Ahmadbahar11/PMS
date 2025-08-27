"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Divider,
  Paper,
} from "@mui/material";

const EmployeeRecordTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://686b6d88e559eba908727904.mockapi.io/api/EmployeeRecord")
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching records:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Employee Records
      </Typography>

      {records.map((record, index) => (
        <Paper elevation={3} key={index} sx={{ mb: 4, p: 3 }}>
          <Typography variant="h6" color="primary" mb={2}>
            Employee ID: {record.id}
          </Typography>

          {/* Basic Info */}
          <Typography variant="subtitle1" fontWeight="bold">
            Basic Information
          </Typography>
          <Table size="small">
            <TableBody>
              {Object.entries(record.basicInfo || {}).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          {/* Employment Details */}
          <Typography variant="subtitle1" fontWeight="bold">
            Employment Details
          </Typography>
          <Table size="small">
            <TableBody>
              {Object.entries(record.employmentDetails || {}).map(
                ([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          {/* Reporting Structure */}
          <Typography variant="subtitle1" fontWeight="bold">
            Reporting Structure
          </Typography>
          <Table size="small">
            <TableBody>
              {Object.entries(record.reportingStructure || {}).map(
                ([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          {/* Skills Info */}
          <Typography variant="subtitle1" fontWeight="bold">
            Skills & Qualifications
          </Typography>

          <Typography fontWeight="bold" mt={1}>
            Educations
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Degree</TableCell>
                <TableCell>Institute</TableCell>
                <TableCell>Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(record.skillsInfo?.educations || []).map((edu, idx) => (
                <TableRow key={idx}>
                  <TableCell>{edu.degree}</TableCell>
                  <TableCell>{edu.institute}</TableCell>
                  <TableCell>{edu.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography fontWeight="bold" mt={2}>
            Skills
          </Typography>
          <ul>
            {(record.skillsInfo?.skills || []).map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>

          <Typography fontWeight="bold" mt={2}>
            Certifications
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(record.skillsInfo?.certifications || []).map((cert, idx) => (
                <TableRow key={idx}>
                  <TableCell>{cert.name}</TableCell>
                  <TableCell>{cert.org}</TableCell>
                  <TableCell>{cert.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          {/* Documents */}
          <Typography variant="subtitle1" fontWeight="bold">
            Documents
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(record.documents || []).map((doc, idx) => (
                <TableRow key={idx}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ))}
    </Box>
  );
};

export default EmployeeRecordTable;
