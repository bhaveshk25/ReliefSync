import { apiClient } from "@/services/apiClient";

export const aiService = {
  async analyze(payload) {
    const { data } = await apiClient.post("/ai/analyze", payload);
    return data;
  },
};
