export const APP_NAME = import.meta.env.VITE_APP_NAME || "ReliefSync AI";

export const appRoutes = {
  landing: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  incidents: "/incidents",
  createIncident: "/incidents/new",
  aiAnalysis: "/ai-analysis",
  heatmap: "/heatmap",
  reports: "/reports",
  alerts: "/alerts",
  donations: "/donations",
};

export const publicNavItems = [
  { label: "Home", to: appRoutes.landing },
  { label: "Reports", to: appRoutes.reports },
  { label: "Alerts", to: appRoutes.alerts },
  { label: "Donations", to: appRoutes.donations },
];

export const sidebarNavItems = [
  { label: "Overview", to: appRoutes.dashboard, icon: "LayoutDashboard" },
  { label: "Incidents", to: appRoutes.incidents, icon: "ShieldAlert" },
  { label: "Report Incident", to: appRoutes.createIncident, icon: "PlusCircle" },
  { label: "AI Analysis", to: appRoutes.aiAnalysis, icon: "Sparkles" },
  { label: "Heatmap", to: appRoutes.heatmap, icon: "Map" },
  { label: "Reports", to: appRoutes.reports, icon: "FileText" },
  { label: "Alerts", to: appRoutes.alerts, icon: "BellRing" },
  { label: "Donations", to: appRoutes.donations, icon: "HandCoins" },
  { label: "Landing", to: appRoutes.landing, icon: "Home" },
];

export const roleLabels = {
  ROLE_ADMIN: "Admin",
  ROLE_COORDINATOR: "Coordinator",
  ROLE_VOLUNTEER: "Volunteer",
  ROLE_USER: "User",
};

export const severityColors = {
  LOW: "text-emerald-300 bg-emerald-500/15 border-emerald-400/30",
  MEDIUM: "text-amber-200 bg-amber-500/15 border-amber-400/30",
  HIGH: "text-orange-200 bg-orange-500/15 border-orange-400/30",
  CRITICAL: "text-rose-200 bg-rose-500/15 border-rose-400/30",
};

export const statusColors = {
  REPORTED: "text-sky-200 bg-sky-500/15 border-sky-400/30",
  IN_PROGRESS: "text-amber-200 bg-amber-500/15 border-amber-400/30",
  RESOLVED: "text-emerald-200 bg-emerald-500/15 border-emerald-400/30",
};
