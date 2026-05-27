import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { incidentService } from "@/services/incidentService";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/utils/api";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { severityColors, statusColors } from "@/utils/constants";
import { cn } from "@/utils/cn";

export function IncidentsPage() {
  const toast = useToast();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({ search: "", sort: "createdAt,desc" });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["incidents", page, filters],
    queryFn: () => incidentService.list({ page, size: 8, sort: filters.sort }),
  });

  useEffect(() => {
    if (isError) {
      toast.error(getApiErrorMessage(error, "Unable to load incidents."));
    }
  }, [error, isError, toast]);

  const filteredContent =
    data?.content?.filter((incident) => {
      if (!filters.search) return true;
      const query = filters.search.toLowerCase();
      return (
        incident.title.toLowerCase().includes(query) ||
        incident.location.toLowerCase().includes(query) ||
        incident.status.toLowerCase().includes(query)
      );
    }) || [];

  return (
    <div className="space-y-4">
      <Card className="rounded-3xl">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>Incident Management</CardTitle>
          <Button asChild>
            <Link to="/incidents/new">Create Incident</Link>
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search incidents by title, location, or status"
              value={filters.search}
              onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
            />
          </div>
          <div className="w-full md:w-60">
            <Select value={filters.sort} onValueChange={(value) => setFilters((current) => ({ ...current, sort: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt,desc">Newest First</SelectItem>
                <SelectItem value="createdAt,asc">Oldest First</SelectItem>
                <SelectItem value="title,asc">Title A-Z</SelectItem>
                <SelectItem value="severity,desc">Severity High-Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {isLoading ? (
          <Card className="rounded-3xl">
            <CardContent className="p-6 text-sm text-muted-foreground">Loading incidents...</CardContent>
          </Card>
        ) : filteredContent.length === 0 ? (
          <Card className="rounded-3xl">
            <CardContent className="p-6 text-sm text-muted-foreground">
              No incidents matched your current filters.
            </CardContent>
          </Card>
        ) : (
          filteredContent.map((incident) => (
            <Card key={incident.id} className="rounded-3xl">
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{incident.location}</p>
                  <h3 className="mt-1 text-xl font-semibold">{incident.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{incident.description}</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", severityColors[incident.severity])}>
                    {incident.severity}
                  </span>
                  <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", statusColors[incident.status])}>
                    {incident.status.replace("_", " ")}
                  </span>
                  <Button asChild variant="secondary">
                    <Link to={`/incidents/${incident.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page + 1} of {Math.max(data?.totalPages || 1, 1)}
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" disabled={page === 0} onClick={() => setPage((current) => Math.max(current - 1, 0))}>
            Previous
          </Button>
          <Button
            variant="secondary"
            disabled={page + 1 >= (data?.totalPages || 1)}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
