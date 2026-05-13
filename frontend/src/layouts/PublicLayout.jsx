import { Outlet } from "react-router-dom";
import { AIAssistantWidget } from "@/components/AIAssistantWidget";

export function PublicLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Outlet />
      <AIAssistantWidget />
    </div>
  );
}
