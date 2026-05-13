import { apiClient } from "@/services/apiClient";

export const incidentService = {
  async list(params) {
    const { data } = await apiClient.get("/incidents", { params });
    return data;
  },
  async getById(id) {
    const { data } = await apiClient.get(`/incidents/${id}`);
    return data;
  },
  async create(payload) {
    const { data } = await apiClient.post("/incidents", payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await apiClient.put(`/incidents/${id}`, payload);
    return data;
  },
  async remove(id) {
    await apiClient.delete(`/incidents/${id}`);
  },
};
