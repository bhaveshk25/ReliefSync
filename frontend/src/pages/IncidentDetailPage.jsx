import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { incidentService } from "@/services/incidentService";
import { getApiErrorMessage } from "@/utils/api";
import { severityColors, statusColors } from "@/utils/constants";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

export function IncidentDetailPage() {
  const { incidentId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["incident", incidentId],
    queryFn: () => incidentService.getById(incidentId),
  });

  const createdDate = useMemo(() => {
    if (!data?.createdAt) return "";
    return new Date(data.createdAt).toLocaleString();
  }, [data?.createdAt]);

  if (isLoading) {
    return (
      <Card className="rounded-3xl">
        <CardContent className="p-6 text-sm text-muted-foreground">Loading incident details...</CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Unable to load incident</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {getApiErrorMessage(error, "The incident details could not be loaded.")}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", severityColors[data.severity])}>
              {data.severity}
            </span>
            <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", statusColors[data.status])}>
              {data.status.replace("_", " ")}
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Location</p>
              <p className="mt-2">{data.location}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Created By</p>
              <p className="mt-2">{data.createdByName}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Created At</p>
              <p className="mt-2">{createdDate}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
              <p className="mt-2">{data.createdByEmail}</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Description</p>
            <p className="mt-3 leading-8 text-foreground/90">{data.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
