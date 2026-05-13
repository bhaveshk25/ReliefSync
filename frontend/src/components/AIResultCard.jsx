import { Badge } from "@/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { severityColors } from "@/utils/constants";
import { cn } from "@/utils/cn";

export function AIResultCard({ result }) {
  if (!result) return null;

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>AI Emergency Brief</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-3">
          <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", severityColors[result.severity])}>
            {result.severity}
          </span>
          <Badge variant="info">{result.priority}</Badge>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Summary</p>
          <p className="mt-2 text-sm leading-7 text-foreground/90">{result.summary}</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Recommended Resources</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.recommendedResources?.map((resource) => (
              <Badge key={resource}>{resource}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
