/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios";
const BASE_URL = "http://localhost:8080/";
// const accessToken = localStorage.getItem("accessToken");

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.defaults.headers.common["Content-Type"] = "application/json";

api.interceptors.request.use(
  (config) => config,
  function (err) {
    console.log(err);
    return Promise.reject(err);
  },
);

// api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   // if (data?.accessToken) {
//   //   config.headers.Authorization = `Bearer ${data.accessToken}`; // set in header
//   // }
//   return config;
// });

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);
