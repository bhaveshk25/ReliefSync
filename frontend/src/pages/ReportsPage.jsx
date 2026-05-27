import { FileText, MapPinned, ShieldCheck, Sparkles } from "lucide-react";
import { activityFeed, chartData, indiaEmergencyData } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Link } from "react-router-dom";

const reportCards = [
  {
    title: "Situation Summary",
    description: "Track the latest field updates, closures, and escalation notes from active response zones.",
    icon: FileText,
  },
  {
    title: "Volunteer Coverage",
    description: "Measure where responder capacity is strong and where reinforcements are still needed.",
    icon: ShieldCheck,
  },
  {
    title: "Regional Impact",
    description: "Compare hotspot states and deploy regional teams using the latest severity patterns.",
    icon: MapPinned,
  },
  {
    title: "AI Insights",
    description: "Use automated summaries to turn fragmented incident notes into action-ready reports.",
    icon: Sparkles,
  },
];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <Card className="rounded-3xl">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Reports Center</p>
            <CardTitle className="mt-2 text-3xl">Operational reports and field summaries</CardTitle>
          </div>
          <Button asChild>
            <Link to="/ai-analysis">Generate AI Report</Link>
          </Button>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reportCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="rounded-3xl">
              <CardContent className="space-y-4 p-6">
                <div className="w-fit rounded-2xl border border-white/10 bg-white/5 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Latest field notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activityFeed.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Regional demand snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {indiaEmergencyData.slice(0, 4).map((item) => (
              <div key={item.state} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{item.state}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.disasterType}</p>
                  </div>
                  <span className="text-sm text-primary">{item.volunteersNeeded} needed</span>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
              Weekly resolved incidents: {chartData.trend.reduce((sum, day) => sum + day.resolved, 0)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
