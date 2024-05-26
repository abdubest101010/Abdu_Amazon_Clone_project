import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/project-f9575/us-central1/api",
  baseURL: "https://abdu-amazon-clone-api.onrender.com/"
});
export {axiosInstance}