import { useQuery } from "@tanstack/react-query";
import { dashboardStats, chartData, activityFeed } from "@/data/mockData";
import { incidentService } from "@/services/incidentService";
import { StatsGrid } from "@/components/StatsGrid";
import { IncidentTable } from "@/components/IncidentTable";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
import { QuickActions } from "@/components/QuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { useMemo } from "react";

export function DashboardPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard-incidents"],
    queryFn: () => incidentService.list({ page: 0, size: 5, sort: "createdAt,desc" }),
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  // Memoize stats to prevent unnecessary recalculations
  const memoizedStats = useMemo(() => dashboardStats, [dashboardStats]);
  const memoizedChartData = useMemo(() => chartData, [chartData]);
  const memoizedActivityFeed = useMemo(() => activityFeed, [activityFeed]);

  if (isError) {
    return (
      <div className="text-center py-12">
        <Card className="rounded-3xl inline-block w-full max-w-xl">
          <CardHeader>
            <CardTitle>Data Loading Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Unable to load dashboard data. Please check your connection and try again.
            </p>
            {/* In development, show error details */}
            {process.env.NODE_ENV === "development" && (
              <div className="text-xs text-destructive/50 bg-destructive/5 rounded p-3 mt-2">
                {error?.message || "Unknown error"}
              </div>
            )}
            <Button variant="outline" size="sm">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsGrid items={memoizedStats} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Main Content Area */}
        <div className="space-y-6">
          <Card className="rounded-3xl interactive hover-lift transition-all-smooth">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Incidents</CardTitle>
                <Button asChild size="sm" variant="outline">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[20rem] rounded-2xl" />
              ) : (
                <IncidentTable incidents={data?.content || []} />
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card className="rounded-3xl interactive hover-lift transition-all-smooth">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Essential emergency response tools
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <QuickActions />
              </CardContent>
            </Card>

            <Card className="rounded-3xl interactive hover-lift transition-all-smooth">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {memoizedActivityFeed.map((item, index) => (
                  <div
                    key={item}
                    className={`
                      rounded-2xl border border-white/10 bg-white/5 p-4
                      text-sm text-muted-foreground
                      transition-all duration-200
                      hover:bg-white/10
                      animate-fade-in
                      ${index > 0 && 'delay-100'}
                    `}
                  >
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-4">
          <AnalyticsCharts chartData={memoizedChartData} />
        </div>
      </div>
    </div>
  );
}
