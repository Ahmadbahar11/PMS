import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getCookie("token");

    // ✅ Only set JSON Content-Type if body is NOT FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);


export default axiosInstance;
