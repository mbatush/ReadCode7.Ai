import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://readcode.ai", // Make sure it's not localhost!
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
