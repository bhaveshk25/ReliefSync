import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { severityColors, statusColors } from "@/utils/constants";
import { cn } from "@/utils/cn";

export function IndiaHeatmap({ data }) {
  const [selected, setSelected] = useState(data[0]);

  const markers = useMemo(() => data, [data]);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="relative min-h-[540px] overflow-hidden rounded-3xl">
        <CardHeader>
          <CardTitle>India Relief Heatmap</CardTitle>
        </CardHeader>
        <CardContent className="relative h-[470px]">
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_30%,rgba(78,227,183,0.12),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
          <div className="absolute left-[16%] top-[8%] h-[78%] w-[58%] rounded-[44%_52%_40%_35%/28%_35%_48%_42%] border border-white/10 bg-slate-900/60 shadow-inner shadow-white/5" />
          {markers.map((marker) => (
            <motion.button
              key={marker.state}
              whileHover={{ scale: 1.08 }}
              onClick={() => setSelected(marker)}
              className="absolute z-10"
              style={{ left: marker.x, top: marker.y }}
            >
              <div className="relative">
                <span className="absolute inset-0 animate-pulse rounded-full bg-primary/20" />
                <span
                  className={cn(
                    "relative flex h-4 w-4 rounded-full border-2 border-slate-950",
                    marker.severity === "CRITICAL" && "bg-rose-400",
                    marker.severity === "HIGH" && "bg-orange-400",
                    marker.severity === "MEDIUM" && "bg-amber-400",
                    marker.severity === "LOW" && "bg-emerald-400",
                  )}
                />
              </div>
            </motion.button>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>{selected.state}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", severityColors[selected.severity])}>
              {selected.severity}
            </span>
            <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium", statusColors[selected.status])}>
              {selected.status.replace("_", " ")}
            </span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Disaster Type</p>
            <p className="mt-2 font-medium">{selected.disasterType}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Required Help</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.requiredHelp.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Volunteers Needed</p>
            <p className="mt-2 text-3xl font-semibold">{selected.volunteersNeeded}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
