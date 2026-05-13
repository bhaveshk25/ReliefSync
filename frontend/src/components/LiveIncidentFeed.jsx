import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { severityColors, statusColors } from "@/utils/constants";
import { cn } from "@/utils/cn";

export function LiveIncidentFeed({ incidents }) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Live Incident Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {incidents.map((incident) => (
          <div key={incident.id} className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-sm text-muted-foreground">{incident.id}</p>
              <h4 className="mt-1 font-medium">{incident.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{incident.location}</p>
            </div>
            <div className="space-y-2 text-right">
              <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", severityColors[incident.severity])}>
                {incident.severity}
              </span>
              <br />
              <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", statusColors[incident.status])}>
                {incident.status.replace("_", " ")}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
