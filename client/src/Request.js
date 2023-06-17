import axios from "axios";

export const publicRequest = axios.create({
    // baseURL: "http://localhost:8800/api/",
    baseURL: "https://connectrbackend.onrender.com/api/",
  });