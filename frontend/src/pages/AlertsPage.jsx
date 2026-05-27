import { BellRing, Siren, TriangleAlert } from "lucide-react";
import { liveIncidentFeed } from "@/data/mockData";
import { severityColors, statusColors } from "@/utils/constants";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Link } from "react-router-dom";

const alertActions = [
  "Escalate critical incidents to district coordinators",
  "Notify volunteer pool within nearest response radius",
  "Publish public advisory for shelter and medical aid",
];

export function AlertsPage() {
  return (
    <div className="space-y-6">
      <Card className="rounded-3xl">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Alert Board</p>
            <CardTitle className="mt-2 text-3xl">Monitor urgent incidents and response triggers</CardTitle>
          </div>
          <Button asChild>
            <Link to="/incidents/new">Create Alerting Incident</Link>
          </Button>
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Priority alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {liveIncidentFeed.map((incident) => (
              <div key={incident.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <BellRing className="h-4 w-4 text-primary" />
                      <p className="text-sm text-muted-foreground">{incident.id}</p>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">{incident.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{incident.location}</p>
                  </div>
                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", severityColors[incident.severity])}>
                      {incident.severity}
                    </span>
                    <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", statusColors[incident.status])}>
                      {incident.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Siren className="h-5 w-5 text-primary" />
                Recommended alert actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alertActions.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TriangleAlert className="h-5 w-5 text-primary" />
                Escalation shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link to="/reports">Open situation reports</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-start">
                <Link to="/heatmap">Review affected regions</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/ai-analysis">Run AI escalation summary</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
