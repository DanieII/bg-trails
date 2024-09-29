import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token;

  return config;
});

export default axiosInstance;
