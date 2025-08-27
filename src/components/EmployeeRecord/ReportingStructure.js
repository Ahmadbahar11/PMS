"use client";

import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import FormSelect from "../SelectButton/FormSelect";
import {
  getReportingStructure,
  updateReportingStructure,
} from "../../services/employeeApi";

const ReportingStructure = ({ data, onChange, employeeId }) => {
  const [managers, setManagers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportingData = async () => {
      try {
        const res = await getReportingStructure(employeeId);
        console.log("📌 Reporting structure API response:", res);

        setManagers(res.managers || []);
        setTeams(res.teams || []);

        // ✅ prefill existing reporting structure
        if (res.reporting_structure) {
          onChange({
            reporting_manager_name: res.reporting_structure.reporting_manager_name,
            team_name: res.reporting_structure.team_name,
          });
        }
      } catch (err) {
        console.error("❌ Error loading reporting structure:", err);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchReportingData();
    }
  }, [employeeId]);

  if (loading) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {/* Reporting Manager dropdown */}
      <Grid item xs={12} md={4}>
        <FormSelect
          label="Reporting Manager"
          options={managers.map((m) => ({
            key: m.employee_id, // ✅ unique key
            label: m.employee_name,
            value: m.employee_name, // 👈 send name in payload
          }))}
          value={data?.reporting_manager_name ?? ""}
          onChange={(val) =>
            onChange({
              ...data,
              reporting_manager_name: val,
            })
          }
        />
      </Grid>

      {/* Team dropdown */}
      <Grid item xs={12} md={4}>
        <FormSelect
          label="Teams"
          options={teams.map((t) => ({
            key: t.team_id, // ✅ unique key
            label: t.team_name,
            value: t.team_name, // 👈 send team name in payload
          }))}
          value={data?.team_name ?? ""}
          onChange={(val) =>
            onChange({
              ...data,
              team_name: val,
            })
          }
        />
      </Grid>
    </Grid>
  );
};

export default ReportingStructure;
