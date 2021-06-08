import axios from "axios";
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://localhost:8001",
});

export default instance;
