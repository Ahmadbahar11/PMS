import axiosInstance from "./axios";

const ApiBaseUrl = "/api";  

const makeApiRequest = async (method, url, reqObject = {}) => {
  try {
    let response;

    // Handle GET with query params
    if (method === "get") {
      response = await axiosInstance.get(`${ApiBaseUrl}/${url}`, {
        params: reqObject,
      });
    } else {
      // ✅ If FormData, let Axios handle headers (don’t stringify)
      if (reqObject instanceof FormData) {
        response = await axiosInstance[method](`${ApiBaseUrl}/${url}`, reqObject, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Default JSON
        response = await axiosInstance[method](`${ApiBaseUrl}/${url}`, reqObject);
      }
    }

    return response.data;
  } catch (error) {
    return error.response && error.response.data
      ? error.response.data.error
      : error.message;
  }
};

export const postBasicInfo = async (data) => {
  try {
    console.log("📤 Sending Basic Info payload:", data);
    const response = await axiosInstance.post(
      `${ApiBaseUrl}/employees/register`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error posting basic info:", error.response?.data || error.message);
    throw error;
  }
};


// === Education API ===
export const postEducation = async (employeeId, data) => {
  return axiosInstance.post(`${ApiBaseUrl}/employees/${employeeId}/education`, data);
};

// === Certification API ===
export const postCertification = async (employeeId, data) => {
  return axiosInstance.post(`${ApiBaseUrl}/employees/${employeeId}/certifications`, data);
};

// === Skills APIs ===
export const getSkills = async () => {
  const res = await axiosInstance.get(`${ApiBaseUrl}/employees/skills`);
  return res.data;
};

export const postEmployeeSkill = async (employeeId, skillId) => {
  return axiosInstance.post(`${ApiBaseUrl}/employees/${employeeId}/skills`, {
    skill_id: skillId,
  });
};

// === Salary Info API ===

export const postSalaryInfo = async (employeeId, data) => {
  try {
    
    const payload = {
      employee_id: employeeId,
      pay_grade: data.pay_grade,
      salary_band: data.salary_band,
      salary_amount: data.salary_amount ? Number(data.salary_amount) : 0,
      reason: data.reason,
      updated_by: 2, // 👈 always default to 2
      actions: data.actions,
      effective_date: data.effective_date || null, // expects "YYYY-MM-DD"
      action_id: data.action_id || 2, // default 2
    };

    console.log("📤 Posting Salary Payload:", payload);
   const res = await axiosInstance.post(
      `${ApiBaseUrl}/employees/${employeeId}/salary`,
      payload
    );
    return res.data;
  } catch (error) {
    console.error(
      "❌ Error posting salary info:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const uploadDocument = async (employeeId, file, documentTypeId = 1, uploadedBy = 2) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type_id", documentTypeId);
    formData.append("uploaded_by", uploadedBy);

    const res = await axiosInstance.post(
      `${ApiBaseUrl}/employees/employee/${employeeId}/documents`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ override JSON default
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      "❌ Error uploading document:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// === Reporting Structure API ===
export const getReportingStructure = async (employeeId) => {
  try {
    const res = await axiosInstance.get(
      `${ApiBaseUrl}/employees/${employeeId}/reporting-structure`
    );
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching reporting structure:", error.response?.data || error.message);
    throw error;
  }
};

// === Update Reporting Structure API ===
export const updateReportingStructure = async (employeeId, payload) => {
  try {
    const res = await axiosInstance.put(
      `${ApiBaseUrl}/employees/${employeeId}/reporting-structure`,
      payload
    );
    return res.data;
  } catch (error) {
    console.error("❌ Error updating reporting structure:", error.response?.data || error.message);
    throw error;
  }
};
