import axios from "axios";

const API_BASE_URL = "https://localhost:7119/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
