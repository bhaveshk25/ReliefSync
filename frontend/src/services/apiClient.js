import axios from "axios";
import { authStorage } from "@/utils/storage";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  config.headers = config.headers || {};
  config.headers.Accept = "application/json";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStorage.clear();
    }

    if (import.meta.env.DEV) {
      const method = error.config?.method?.toUpperCase() || "REQUEST";
      const url = `${error.config?.baseURL || ""}${error.config?.url || ""}`;
      console.error(`[API ${method}] ${url}`, {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }

    return Promise.reject(error);
  },
);
