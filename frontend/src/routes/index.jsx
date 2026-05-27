import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppShell } from "@/layouts/AppShell";
import { ProtectedRoute } from "@/hooks/useProtectedRoute";
import { Skeleton } from "@/ui/skeleton";

const LandingPage = lazy(() => import("@/pages/LandingPage").then((module) => ({ default: module.LandingPage })));
const LoginPage = lazy(() => import("@/pages/LoginPage").then((module) => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import("@/pages/RegisterPage").then((module) => ({ default: module.RegisterPage })));
const DashboardPage = lazy(() => import("@/pages/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const IncidentsPage = lazy(() => import("@/pages/IncidentsPage").then((module) => ({ default: module.IncidentsPage })));
const IncidentDetailPage = lazy(() => import("@/pages/IncidentDetailPage").then((module) => ({ default: module.IncidentDetailPage })));
const CreateIncidentPage = lazy(() => import("@/pages/CreateIncidentPage").then((module) => ({ default: module.CreateIncidentPage })));
const AIAnalysisPage = lazy(() => import("@/pages/AIAnalysisPage").then((module) => ({ default: module.AIAnalysisPage })));
const HeatmapPage = lazy(() => import("@/pages/HeatmapPage").then((module) => ({ default: module.HeatmapPage })));
const ReportsPage = lazy(() => import("@/pages/ReportsPage").then((module) => ({ default: module.ReportsPage })));
const AlertsPage = lazy(() => import("@/pages/AlertsPage").then((module) => ({ default: module.AlertsPage })));
const DonationsPage = lazy(() => import("@/pages/DonationsPage").then((module) => ({ default: module.DonationsPage })));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })));

function withSuspense(node) {
  return (
    <Suspense fallback={<div className="space-y-4"><Skeleton className="h-48 rounded-3xl" /><Skeleton className="h-80 rounded-3xl" /></div>}>
      {node}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: withSuspense(<LandingPage />) },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: withSuspense(<LoginPage />) },
      { path: "/register", element: withSuspense(<RegisterPage />) },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: withSuspense(<DashboardPage />) },
      { path: "/incidents", element: withSuspense(<IncidentsPage />) },
      { path: "/incidents/new", element: withSuspense(<CreateIncidentPage />) },
      { path: "/incidents/:incidentId", element: withSuspense(<IncidentDetailPage />) },
      { path: "/ai-analysis", element: withSuspense(<AIAnalysisPage />) },
      { path: "/heatmap", element: withSuspense(<HeatmapPage />) },
      { path: "/reports", element: withSuspense(<ReportsPage />) },
      { path: "/alerts", element: withSuspense(<AlertsPage />) },
      { path: "/donations", element: withSuspense(<DonationsPage />) },
    ],
  },
  {
    path: "*",
    element: withSuspense(<NotFoundPage />),
  },
]);
