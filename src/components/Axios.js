import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://54.162.156.134", // ✅ Ensure this is correct
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default AxiosInstance;
