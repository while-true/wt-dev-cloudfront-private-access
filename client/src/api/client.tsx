import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const internalApiClient = axios.create({
  baseURL: import.meta.env.VITE_INTERNAL_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
