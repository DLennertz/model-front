import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/h/",
  auth: { username: "usuario", password: "123456" },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;
