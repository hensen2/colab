/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios";
const BASE_URL = "http://localhost:8080/";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
console.log(api.defaults);

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    if (response.data?.accessToken) {
      api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
    }

    return response.data;
  },
  (error) => Promise.reject(error),
);
