/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { InternalAxiosRequestConfig } from "axios";
const BASE_URL = "http://localhost:8080/";
const accessToken = localStorage.getItem("accessToken");

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log(accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`; // set in header
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const response = await axios.post(`${BASE_URL}/refreshToken`, {
              refreshToken,
            });
            // don't use axious instance that already configured for refresh token api call
            const newAccessToken: string = response.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken); //set new access token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest); //recall Api with new token
          } catch (error) {
            // Handle token refresh failure
            // mostly logout the user and re-authenticate by login again
          }
        }
      }
    }

    return Promise.reject(error);
  },
);
