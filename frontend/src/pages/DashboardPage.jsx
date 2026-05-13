import { useQuery } from "@tanstack/react-query";
import { dashboardStats, chartData, activityFeed } from "@/data/mockData";
import { incidentService } from "@/services/incidentService";
import { StatsGrid } from "@/components/StatsGrid";
import { IncidentTable } from "@/components/IncidentTable";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
import { QuickActions } from "@/components/QuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";

export function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-incidents"],
    queryFn: () => incidentService.list({ page: 0, size: 5, sort: "createdAt,desc" }),
  });

  return (
    <div className="space-y-4">
      <StatsGrid items={dashboardStats} />
      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
        {isLoading ? (
          <Skeleton className="h-[28rem] rounded-3xl" />
        ) : (
          <IncidentTable incidents={data?.content || []} />
        )}
        <div className="space-y-4">
          <QuickActions />
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activityFeed.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <AnalyticsCharts chartData={chartData} />
    </div>
  );
}
