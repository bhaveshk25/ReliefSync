import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { incidentService } from "@/services/incidentService";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
import { LoadingSpinner } from "@/ui/loading-spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";

export function CreateIncidentPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "MEDIUM",
    location: "",
    status: "REPORTED",
  });

  const mutation = useMutation({
    mutationFn: incidentService.create,
    onSuccess: (data) => {
      toast.success("Incident created successfully.");
      navigate(`/incidents/${data.id}`);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to create incident."));
    },
  });

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Report New Incident</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-5 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            mutation.mutate(form);
          }}
        >
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="incident-title">Title</Label>
            <Input
              id="incident-title"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Flash flood near residential zone"
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="incident-description">Description</Label>
            <Textarea
              id="incident-description"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Describe the current emergency, impact radius, and immediate risks."
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Severity</Label>
            <Select value={form.severity} onValueChange={(value) => updateField("severity", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(value) => updateField("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REPORTED">Reported</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="incident-location">Location</Label>
            <Input
              id="incident-location"
              value={form.location}
              onChange={(event) => updateField("location", event.target.value)}
              placeholder="State, district, landmark, or relief zone"
              required
            />
          </div>
          <div className="md:col-span-2">
            <Button disabled={mutation.isPending}>
              {mutation.isPending ? <LoadingSpinner /> : null}
              {mutation.isPending ? "Submitting..." : "Create Incident"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
