import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // ✅ Using local Django API
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default AxiosInstance;