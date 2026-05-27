import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { aiService } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
import { LoadingSpinner } from "@/ui/loading-spinner";
import { AIResultCard } from "@/components/AIResultCard";

export function AIAnalysisPage() {
  const toast = useToast();
  const [description, setDescription] = useState("Flood water rising rapidly near residential area");

  const mutation = useMutation({
    mutationFn: aiService.analyze,
    onSuccess: () => {
      toast.success("AI analysis completed.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to run AI analysis."));
    },
  });

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>AI Emergency Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="analysis-description">Emergency Description</Label>
            <Textarea
              id="analysis-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the emergency scenario, observed impact, and context."
            />
          </div>
          <Button
            onClick={() => mutation.mutate({ description })}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <LoadingSpinner /> : null}
            {mutation.isPending ? "Analyzing..." : "Analyze Emergency"}
          </Button>
        </CardContent>
      </Card>
      <AIResultCard result={mutation.data} />
    </div>
  );
}
