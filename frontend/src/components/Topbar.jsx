import { LogOut, Menu, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export function Topbar({ onOpenMobileNav }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const toast = useToast();

  return (
    <header className="glass-panel flex items-center justify-between rounded-3xl px-5 py-4">
      <div className="flex items-center gap-3">
        <Button size="icon" variant="secondary" className="lg:hidden" onClick={onOpenMobileNav}>
          <Menu className="h-4 w-4" />
        </Button>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Live Coordination</p>
          <h2 className="text-xl font-semibold">Welcome back, {user?.fullName?.split(" ")[0]}</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 md:flex">
          <ShieldCheck className="h-4 w-4" />
          Response network online
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            logout();
            toast.info("You have been signed out.");
            navigate("/login");
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
