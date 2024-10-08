/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject(error),
);
