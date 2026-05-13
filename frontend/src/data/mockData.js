import {
  Activity,
  Ambulance,
  Flame,
  HeartPulse,
  HousePlus,
  MapPinned,
  PersonStanding,
  Waves,
  Wind,
} from "lucide-react";

export const emergencyCategories = [
  {
    title: "Flood Relief",
    icon: Waves,
    incidents: 48,
    responders: 186,
    cta: "Deploy Boats",
    accent: "from-sky-400/25 to-cyan-400/5",
  },
  {
    title: "Earthquake Support",
    icon: Activity,
    incidents: 14,
    responders: 62,
    cta: "Assess Damage",
    accent: "from-amber-400/25 to-orange-400/5",
  },
  {
    title: "Medical Emergency",
    icon: HeartPulse,
    incidents: 73,
    responders: 240,
    cta: "Dispatch Medics",
    accent: "from-rose-400/25 to-red-400/5",
  },
  {
    title: "Fire Rescue",
    icon: Flame,
    incidents: 19,
    responders: 71,
    cta: "Send Fire Team",
    accent: "from-orange-400/25 to-rose-400/5",
  },
  {
    title: "Food & Shelter",
    icon: HousePlus,
    incidents: 31,
    responders: 102,
    cta: "Open Relief Hub",
    accent: "from-emerald-400/25 to-teal-400/5",
  },
  {
    title: "Missing Persons",
    icon: PersonStanding,
    incidents: 11,
    responders: 39,
    cta: "Start Search",
    accent: "from-violet-400/25 to-indigo-400/5",
  },
  {
    title: "Cyclone Response",
    icon: Wind,
    incidents: 9,
    responders: 55,
    cta: "Secure Coastline",
    accent: "from-blue-400/25 to-slate-400/5",
  },
  {
    title: "Heatwave Assistance",
    icon: Ambulance,
    incidents: 26,
    responders: 84,
    cta: "Activate Cooling Aid",
    accent: "from-yellow-400/25 to-orange-400/5",
  },
];

export const landingStats = [
  { label: "Active Emergencies", value: "128", delta: "+12% this hour" },
  { label: "Volunteers Mobilized", value: "3.4K", delta: "+241 today" },
  { label: "Relief Requests Closed", value: "92%", delta: "Average SLA 18m" },
  { label: "AI Analyses Generated", value: "14.8K", delta: "7 regions covered" },
];

export const liveIncidentFeed = [
  { id: "INC-1012", title: "Brahmaputra river overflow", location: "Assam", severity: "CRITICAL", status: "IN_PROGRESS" },
  { id: "INC-1024", title: "Urban fire cluster near market", location: "Delhi", severity: "HIGH", status: "REPORTED" },
  { id: "INC-1029", title: "Heat stress cases rising", location: "Rajasthan", severity: "MEDIUM", status: "IN_PROGRESS" },
  { id: "INC-1036", title: "Cyclone shelter activation", location: "Odisha", severity: "HIGH", status: "RESOLVED" },
];

export const testimonials = [
  {
    quote: "ReliefSync AI cut our emergency triage time by more than half during a statewide flood response.",
    name: "Ananya Rao",
    role: "State Response Coordinator",
  },
  {
    quote: "The AI summaries helped new volunteers understand what to bring and where to report instantly.",
    name: "Vikram Singh",
    role: "Volunteer Lead",
  },
];

export const dashboardStats = [
  { label: "Live Incidents", value: "128", trend: "+9%", tone: "text-sky-200" },
  { label: "Critical Cases", value: "26", trend: "+4%", tone: "text-rose-200" },
  { label: "Volunteer Units", value: "312", trend: "+11%", tone: "text-emerald-200" },
  { label: "Avg Response Time", value: "18m", trend: "-7%", tone: "text-primary" },
];

export const activityFeed = [
  "Odisha cyclone camp stocked with 2,400 food kits",
  "Assam flood rescue boats deployed to Sector 14",
  "AI analysis flagged landslide risk in Himachal corridor",
  "Medical volunteers reassigned to heatwave response in Jaipur",
];

export const chartData = {
  trend: [
    { name: "Mon", incidents: 42, resolved: 31 },
    { name: "Tue", incidents: 57, resolved: 38 },
    { name: "Wed", incidents: 53, resolved: 44 },
    { name: "Thu", incidents: 68, resolved: 51 },
    { name: "Fri", incidents: 83, resolved: 63 },
    { name: "Sat", incidents: 76, resolved: 59 },
    { name: "Sun", incidents: 88, resolved: 72 },
  ],
  categories: [
    { name: "Flood", value: 36 },
    { name: "Medical", value: 24 },
    { name: "Fire", value: 13 },
    { name: "Shelter", value: 19 },
    { name: "Cyclone", value: 8 },
  ],
  severity: [
    { name: "Low", value: 18 },
    { name: "Medium", value: 34 },
    { name: "High", value: 27 },
    { name: "Critical", value: 21 },
  ],
};

export const indiaEmergencyData = [
  {
    state: "Assam",
    x: "58%",
    y: "26%",
    disasterType: "Flood",
    severity: "CRITICAL",
    requiredHelp: ["Food Aid", "Medical Aid", "Rescue Boats"],
    volunteersNeeded: 120,
    status: "IN_PROGRESS",
  },
  {
    state: "Odisha",
    x: "51%",
    y: "46%",
    disasterType: "Cyclone",
    severity: "HIGH",
    requiredHelp: ["Shelter Kits", "Power Restoration"],
    volunteersNeeded: 72,
    status: "REPORTED",
  },
  {
    state: "Maharashtra",
    x: "35%",
    y: "56%",
    disasterType: "Medical Emergency",
    severity: "MEDIUM",
    requiredHelp: ["Mobile Clinics", "Cooling Centers"],
    volunteersNeeded: 34,
    status: "IN_PROGRESS",
  },
  {
    state: "Rajasthan",
    x: "29%",
    y: "40%",
    disasterType: "Heatwave",
    severity: "HIGH",
    requiredHelp: ["Water Supply", "Cooling Shelters"],
    volunteersNeeded: 48,
    status: "REPORTED",
  },
  {
    state: "Uttarakhand",
    x: "39%",
    y: "24%",
    disasterType: "Landslide",
    severity: "HIGH",
    requiredHelp: ["Excavation Team", "Medical Support"],
    volunteersNeeded: 28,
    status: "IN_PROGRESS",
  },
];
