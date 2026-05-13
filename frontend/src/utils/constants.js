export const APP_NAME = import.meta.env.VITE_APP_NAME || "ReliefSync AI";

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
