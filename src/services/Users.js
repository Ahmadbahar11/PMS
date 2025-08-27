import axiosInstance from "./axios";

// ✅ Use relative path so Vercel rewrite will handle it
const ApiBaseUrl = "/api";

const makeApiRequest = async (method, url, reqObject) => {
  try {
    const response = await axiosInstance[method](`${ApiBaseUrl}/${url}`, reqObject);
    return response.data;
  } catch (error) {
    return error.response && error.response.data
      ? error.response.data.error
      : error.message;
  }
};

export const loginUser = async (reqObject) => {
  return makeApiRequest("post", "login", reqObject);
};
