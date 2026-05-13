import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { severityColors, statusColors } from "@/utils/constants";
import { cn } from "@/utils/cn";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

export function IncidentTable({ incidents }) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Incident Monitoring</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-muted-foreground">
            <tr>
              <th className="pb-4">Title</th>
              <th className="pb-4">Location</th>
              <th className="pb-4">Severity</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Owner</th>
              <th className="pb-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id} className="border-t border-white/6">
                <td className="py-4 font-medium">{incident.title}</td>
                <td className="py-4 text-muted-foreground">{incident.location}</td>
                <td className="py-4">
                  <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", severityColors[incident.severity])}>
                    {incident.severity}
                  </span>
                </td>
                <td className="py-4">
                  <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", statusColors[incident.status])}>
                    {incident.status.replace("_", " ")}
                  </span>
                </td>
                <td className="py-4 text-muted-foreground">{incident.createdByName}</td>
                <td className="py-4 text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link to={`/incidents/${incident.id}`}>
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
