"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const DashboardCard = ({ icon, title, value, color }) => (
  <Card sx={{ p: 2, borderLeft: `5px solid ${color}`, boxShadow: 2 }}>
    <CardContent>
      <Box display="flex" alignItems="center" gap={2}>
        <Box color={color}>{icon}</Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Typography variant="h5" fontWeight="bold"  mb={2}>
        Employee Performance Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard
            icon={<PeopleIcon fontSize="large" />}
            title="Total Employees"
            value="128"
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard
            icon={<AssignmentTurnedInIcon fontSize="large" />}
            title="Tasks Completed"
            value="865"
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard
            icon={<AccessTimeIcon fontSize="large" />}
            title="Avg. Working Hours"
            value="7.8 hrs/day"
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard
            icon={<TrendingUpIcon fontSize="large" />}
            title="Performance Rating"
            value="4.3/5"
            color="#9c27b0"
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
