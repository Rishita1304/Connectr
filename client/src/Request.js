import axios from "axios";

export const publicRequest = axios.create({
    baseURL: "https://connectrbackend.onrender.com/",
  });