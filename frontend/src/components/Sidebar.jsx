import { NavLink } from "react-router-dom";
import { APP_NAME, roleLabels, sidebarNavItems } from "@/utils/constants";
import { useAuth } from "@/hooks/useAuth";
import { BellRing, FileText, HandCoins, Home, LayoutDashboard, Map, PlusCircle, ShieldAlert, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";

const iconMap = {
  BellRing,
  FileText,
  HandCoins,
  Home,
  LayoutDashboard,
  Map,
  PlusCircle,
  ShieldAlert,
  Sparkles,
};

export function Sidebar({ mobile = false, className }) {
  const { user } = useAuth();

  return (
    <aside
      className={cn(
        "glass-panel w-72 shrink-0 rounded-3xl p-5",
        mobile ? "block" : "hidden lg:block",
        className,
      )}
    >
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Emergency OS</p>
        <h1 className="mt-2 text-2xl font-semibold">{APP_NAME}</h1>
      </div>

      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Signed In</p>
        <h2 className="mt-2 text-lg font-medium">{user?.fullName}</h2>
        <p className="text-sm text-muted-foreground">{roleLabels[user?.role] || "Responder"}</p>
      </div>

      <nav className="space-y-2">
        {sidebarNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground",
                  isActive && "bg-white/10 text-foreground",
                )
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
