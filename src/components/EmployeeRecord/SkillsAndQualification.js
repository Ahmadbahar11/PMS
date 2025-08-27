"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  TableContainer,
  Paper,
} from "@mui/material";
import FormTextField from "../TextFields/FormTextField";
import { getSkills } from "../../services/employeeApi";

const SkillsAndInformation = ({ data, onChange }) => {
  const [education, setEducation] = useState({
    degree_name: "",
    institute_name: "",
    year_of_completion: "",
  });
  const [certification, setCertification] = useState({
    certification_name: "",
    issuing_organization: "",
    date_achieved: "",
  });
  const [skillsList, setSkillsList] = useState([]); // from API
  const [selectedSkill, setSelectedSkill] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getSkills();
        setSkillsList(res);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  // === Add Education ===
  const handleAddEducation = () => {
    if (
      education.degree_name &&
      education.institute_name &&
      education.year_of_completion
    ) {
      const parsedEdu = {
        ...education,
        year_of_completion: parseInt(education.year_of_completion, 10),
      };
      const newList = [...(data.educations || []), parsedEdu];
      onChange({ ...data, educations: newList });
      setEducation({
        degree_name: "",
        institute_name: "",
        year_of_completion: "",
      });
    }
  };

  const handleDeleteEducation = (idx) => {
    const updated = data.educations.filter((_, i) => i !== idx);
    onChange({ ...data, educations: updated });
  };

  // === Add Certification ===
  const handleAddCertification = () => {
    if (
      certification.certification_name &&
      certification.issuing_organization &&
      certification.date_achieved
    ) {
      const parsedCert = {
        ...certification,
        date_achieved: `${certification.date_achieved}T00:00:00Z`,
      };
      const newList = [...(data.certifications || []), parsedCert];
      onChange({ ...data, certifications: newList });
      setCertification({
        certification_name: "",
        issuing_organization: "",
        date_achieved: "",
      });
    }
  };

  const handleDeleteCertification = (idx) => {
    const updated = data.certifications.filter((_, i) => i !== idx);
    onChange({ ...data, certifications: updated });
  };

  // === Add Skill ===
  const handleAddSkill = () => {
    if (selectedSkill) {
      const skillId = parseInt(selectedSkill, 10);
      const newList = [...(data.skills || []), skillId];
      onChange({ ...data, skills: newList });
      setSelectedSkill("");
    }
  };

  const handleDeleteSkill = (idx) => {
    const updated = data.skills.filter((_, i) => i !== idx);
    onChange({ ...data, skills: updated });
  };

  // === Reusable Table Header Style ===
  const headerStyle = {
    backgroundColor: "#0F3B4C",
    "& th": {
      color: "white",
      fontWeight: "bold",
      fontSize: "0.95rem",
    },
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Skills & Qualifications
      </Typography>

      {/* === Education Section === */}
      <Typography fontWeight="bold" mt={2}>
        Education
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <FormTextField
          label="Degree"
          value={education.degree_name}
          onChange={(e) =>
            setEducation({ ...education, degree_name: e.target.value })
          }
        />
        <FormTextField
          label="Institute"
          value={education.institute_name}
          onChange={(e) =>
            setEducation({ ...education, institute_name: e.target.value })
          }
        />
        <FormTextField
          label="Year"
          value={education.year_of_completion}
          onChange={(e) =>
            setEducation({ ...education, year_of_completion: e.target.value })
          }
        />
      </Box>
      <Button variant="contained" sx={{
            backgroundColor: "#0F3B4C",
            textTransform: "uppercase",
            fontWeight: "bold",
          }} onClick={handleAddEducation}>
        + Add Education
      </Button>

      {data.educations?.length > 0 && (
        <TableContainer component={Paper} sx={{ borderRadius: 2, my: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={headerStyle}>
                <TableCell>Degree</TableCell>
                <TableCell>Institute</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.educations.map((edu, idx) => (
                <TableRow key={idx}>
                  <TableCell>{edu.degree_name}</TableCell>
                  <TableCell>{edu.institute_name}</TableCell>
                  <TableCell>{edu.year_of_completion}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      sx={{
            backgroundColor: "#0F3B4C",
            textTransform: "uppercase",
            color:"white",
            fontWeight: "bold",
          }}
                      onClick={() => handleDeleteEducation(idx)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* === Certification Section === */}
      <Typography fontWeight="bold" mt={2}>
        Certifications
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <FormTextField
          label="Name"
          value={certification.certification_name}
          onChange={(e) =>
            setCertification({
              ...certification,
              certification_name: e.target.value,
            })
          }
        />
        <FormTextField
          label="Organization"
          value={certification.issuing_organization}
          onChange={(e) =>
            setCertification({
              ...certification,
              issuing_organization: e.target.value,
            })
          }
        />
        <FormTextField
          type="date"
          label="Date Achieved"
          InputLabelProps={{ shrink: true }}
          value={certification.date_achieved}
          onChange={(e) =>
            setCertification({ ...certification, date_achieved: e.target.value })
          }
        />
      </Box>
      <Button variant="contained" sx={{
            backgroundColor: "#0F3B4C",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
           onClick={handleAddCertification}>
        + Add Certification
      </Button>

      {data.certifications?.length > 0 && (
        <TableContainer component={Paper} sx={{ borderRadius: 2, my: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={headerStyle}>
                <TableCell>Name</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.certifications.map((cert, idx) => (
                <TableRow key={idx}>
                  <TableCell>{cert.certification_name}</TableCell>
                  <TableCell>{cert.issuing_organization}</TableCell>
                  <TableCell>
                    {new Date(cert.date_achieved).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                       sx={{
            backgroundColor: "#0F3B4C",
            textTransform: "uppercase",
            color:"white",
            fontWeight: "bold",
          }}
                      onClick={() => handleDeleteCertification(idx)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* === Skills Section === */}
      <Typography fontWeight="bold" mt={2}>
        Skills
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <Select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Select Skill</MenuItem>
          {skillsList.map((s) => (
            <MenuItem key={s.skill_id} value={s.skill_id}>
              {s.skill_name}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained"
        sx={{
            backgroundColor: "#0F3B4C",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
           onClick={handleAddSkill}>
          + Add Skill
        </Button>
      </Box>

      {data.skills?.length > 0 && (
        <TableContainer component={Paper} sx={{ borderRadius: 2, my: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={headerStyle}>
                <TableCell>Skill Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.skills.map((s, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {skillsList.find((x) => x.skill_id === s)?.skill_name || s}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      sx={{
            backgroundColor: "#0F3B4C",
            textTransform: "uppercase",
            color:"white",
            fontWeight: "bold",
          }}
                      onClick={() => handleDeleteSkill(i)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SkillsAndInformation;
