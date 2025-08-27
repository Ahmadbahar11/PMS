import axiosInstance from "./axios";

export const postEmploymentDetails = async (employeeId, data) => {
  try {
    const response = await axiosInstance.post(
      `http://115.186.185.230:9090/employees/${employeeId}/employment-details`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error posting employment details:",
      error.response?.data || error.message
    );
    throw error;
  }
};
