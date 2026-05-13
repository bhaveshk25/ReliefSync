import { apiClient } from "@/services/apiClient";

const cannedAssistantReplies = [
  {
    keywords: ["volunteer", "join", "help"],
    response:
      "You can volunteer by registering an account, reviewing active incidents, and using the dashboard quick actions to respond where support is needed most.",
  },
  {
    keywords: ["flood", "water"],
    response:
      "During floods, move to higher ground, avoid fast-moving water, keep emergency supplies sealed, and monitor official updates before re-entering affected zones.",
  },
  {
    keywords: ["supplies", "needed"],
    response:
      "High-priority supplies usually include food packs, drinking water, medical kits, sanitation materials, blankets, and communication equipment.",
  },
];

function fallbackReply(message) {
  const normalized = message.toLowerCase();
  const matched = cannedAssistantReplies.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword)),
  );

  return {
    reply:
      matched?.response ||
      "ReliefSync AI can help you explore incidents, run AI emergency analysis, and coordinate volunteers. Share your situation and I’ll guide you through the next step.",
  };
}

export const assistantService = {
  async chat(message) {
    try {
      const { data } = await apiClient.post("/assistant/chat", { message });
      return data;
    } catch (error) {
      if (!error.response || error.response.status === 404) {
        return fallbackReply(message);
      }
      throw error;
    }
  },
};
