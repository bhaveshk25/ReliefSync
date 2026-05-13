import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Dialog, DialogContent } from "@/ui/dialog";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { AIAssistantWidget } from "@/components/AIAssistantWidget";

export function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="section-shell py-4 lg:py-6">
      <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <Sidebar />
        <div className="space-y-4">
          <Topbar onOpenMobileNav={() => setMobileNavOpen(true)} />
          <main className="min-h-[calc(100vh-9rem)]">
            <Outlet />
          </main>
        </div>
      </div>

      <Dialog open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <DialogContent className="p-0 lg:hidden">
          <Sidebar mobile className="w-full rounded-none border-0 bg-transparent shadow-none" />
        </DialogContent>
      </Dialog>
      <AIAssistantWidget />
    </div>
  );
}
