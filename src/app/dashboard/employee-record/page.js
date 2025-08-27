"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import FormAlert from "@/components/Alerts/FormAlert";
import CustomStepIcon from "@/components/Stepper/CustomStepIcon";
import SkillsAndInformation from "@/components/EmployeeRecord/SkillsAndQualification";
import BasicInformation from "@/components/EmployeeRecord/BasicInformation";
import EmploymentDetails from "@/components/EmployeeRecord/EmploymentDetails";
import ReportingStructure from "@/components/EmployeeRecord/ReportingStructure";
import SalaryInformation from "@/components/EmployeeRecord/SalaryInformation";
import DocumentManagement from "@/components/EmployeeRecord/DocumentManagement";
import HistoryTracking from "@/components/EmployeeRecord/HistoryTracking";
import FormStepper from "@/components/Stepper/FormStepper";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import {
  postBasicInfo,
  postEducation,
  postSalaryInfo,
  postCertification,
  postEmployeeSkill,
  uploadDocument,
  updateReportingStructure,   // ✅ add reporting structure API
} from "../../../services/employeeApi";
import { postEmploymentDetails } from "../../../services/employeeDetails";

const steps = [
  "Basic Information",
  "Employment Details",
  "Skills And Qualifications",
  "Salary Info",
  "Documents",
  "Reporting Structure",
];

const EmployeeRecordPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: {},
    employmentDetails: {},
    skillsInfo: {},
    documents: [],
    reportingStructure: {},
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showBasicInfoDialog, setShowBasicInfoDialog] = useState(false);

  const handleNext = async () => {
    const isLastStep = activeStep === steps.length - 1;

    // 🚫 Guard: prevent moving forward without Basic Info
    if (activeStep > 0 && !formData.employee_id) {
      setShowBasicInfoDialog(true);
      return;
    }

    try {
      if (activeStep === 0) {
        const res = await postBasicInfo(formData.basicInfo);
        console.log("✅ Basic Info posted:", res);

        const employeeId = res.employee_id;
        if (employeeId) {
          setFormData((prev) => ({
            ...prev,
            employee_id: employeeId,
          }));
        }
      }

      if (activeStep === 1) {
        await postEmploymentDetails(
          formData.employee_id,
          formData.employmentDetails
        );
        console.log("✅ Employment Details posted");
      }

      if (activeStep === 2) {
        const { educations = [], certifications = [], skills = [] } =
          formData.skillsInfo;

        for (let edu of educations) {
          await postEducation(formData.employee_id, edu);
        }
        for (let cert of certifications) {
          await postCertification(formData.employee_id, cert);
        }
        for (let skillId of skills) {
          await postEmployeeSkill(formData.employee_id, skillId);
        }

        console.log("✅ Skills & Information posted successfully");
      }

      if (activeStep === 3) {
        const salaryData = formData.salaryInfo;
        if (salaryData) {
          await postSalaryInfo(formData.employee_id, salaryData);
          console.log("✅ Salary Info posted:", salaryData);
        }
      }

      if (activeStep === 4) {
        const docs = formData.documents || [];
        for (let doc of docs) {
          if (doc.file instanceof File) {
            await uploadDocument(formData.employee_id, doc.file, 1, 2);
          }
        }
        console.log("✅ Documents uploaded successfully");
      }

      if (activeStep === 5) {
        const payload = {
          reporting_manager_name: formData.reportingStructure.reporting_manager_name,
          team_name: formData.reportingStructure.team_name,
        };
        await updateReportingStructure(formData.employee_id, payload);
        console.log("✅ Reporting Structure posted:", payload);
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);

      if (isLastStep) {
        console.log("📌 Final submit placeholder:", formData);
      } else {
        setActiveStep((prev) => prev + 1);
      }
    } catch (err) {
      console.error("❌ Error in step submission:", err);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleStepClick = (index) => {
    if (index > 0 && !formData.employee_id) {
      setShowBasicInfoDialog(true);
      return;
    }
    setActiveStep(index);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicInformation
            data={formData.basicInfo}
            onChange={(data) =>
              setFormData((prev) => ({ ...prev, basicInfo: data }))
            }
          />
        );
      case 1:
        return (
          <EmploymentDetails
            data={formData.employmentDetails}
            onChange={(data) =>
              setFormData((prev) => ({ ...prev, employmentDetails: data }))
            }
          />
        );
      case 2:
        return (
          <SkillsAndInformation
            data={formData.skillsInfo}
            onChange={(data) =>
              setFormData((prev) => ({ ...prev, skillsInfo: data }))
            }
          />
        );
      case 3:
        return (
          <SalaryInformation
            data={formData.salaryInfo}
            onChange={(data) =>
              setFormData((prev) => ({ ...prev, salaryInfo: data }))
            }
            employeeId={formData.employee_id}
          />
        );
      case 4:
        return (
          <DocumentManagement
            data={formData.documents}
            onChange={(data) =>
              setFormData((prev) => ({ ...prev, documents: data }))
            }
          />
        );
      case 5:
        return (
          <ReportingStructure
            data={formData.reportingStructure}
            onChange={(data) =>
              setFormData((prev) => ({
                ...prev,
                reportingStructure: data,
              }))
            }
            employeeId={formData.employee_id}
          />
        );
      default:
        return "Unknown Step";
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Stack spacing={2}>
        {showSuccess && (
          <FormAlert
            severity="success"
            message="Employee record submitted successfully!"
          />
        )}
        {showError && (
          <FormAlert
            severity="error"
            message="Something went wrong. Please try again."
          />
        )}
      </Stack>

      <Box sx={{ width: "100%", mb: 4 }}>
        <FormStepper
          steps={steps}
          activeStep={activeStep}
          onStepClick={handleStepClick}
          StepIconComponent={CustomStepIcon}
        />

        <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>
          {steps[activeStep]}
        </Typography>

        <Box sx={{ minHeight: 200, p: 5 }}>{getStepContent(activeStep)}</Box>

        <Box display="flex" justifyContent="space-between" mt={3}>
          <PrimaryButton onClick={handleBack} disabled={activeStep === 0}>
            Previous
          </PrimaryButton>

          <PrimaryButton onClick={handleNext}>
            {activeStep < steps.length - 1 ? "Next" : "Submit"}
          </PrimaryButton>
        </Box>
      </Box>

      {/* 🚨 Dialog for blocking without Basic Info */}
      <Dialog
        open={showBasicInfoDialog}
        onClose={() => setShowBasicInfoDialog(false)}
      >
        <DialogTitle>Action Required</DialogTitle>
        <DialogContent>
          <Typography>
            ⚠️ Please complete <strong>Basic Information</strong> first before
            proceeding.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "#0F3B4C",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "white",
            }}
            onClick={() => setShowBasicInfoDialog(false)}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeRecordPage;
