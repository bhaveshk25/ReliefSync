import { apiClient } from "@/services/apiClient";

export const authService = {
  async login(payload) {
    const { data } = await apiClient.post("/auth/login", {
      email: payload.email.trim(),
      password: payload.password,
    });
    return data;
  },
  async register(payload) {
    const { data } = await apiClient.post("/auth/register", {
      fullName: payload.fullName.trim(),
      email: payload.email.trim(),
      password: payload.password,
      role: payload.role,
    });
    return data;
  },
};
