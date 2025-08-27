import axiosInstance from "./axios";

// Use environment variable, fallback to localhost for dev
const ApiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090";

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
