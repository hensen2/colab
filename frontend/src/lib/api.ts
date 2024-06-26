/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { InternalAxiosRequestConfig } from "axios";
const BASE_URL = "http://localhost:8080/";
// const accessToken = localStorage.getItem("accessToken");

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // if (data?.accessToken) {
  //   config.headers.Authorization = `Bearer ${data.accessToken}`; // set in header
  // }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (axios.isAxiosError(error)) {
      const err = error.response;
      if (err?.status === 401 && !err.data.accessToken) {
        return;
      }
    }
    return Promise.reject(error);
  },
);
