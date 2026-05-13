import { indiaEmergencyData, chartData } from "@/data/mockData";
import { IndiaHeatmap } from "@/components/IndiaHeatmap";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";

export function HeatmapPage() {
  return (
    <div className="space-y-4">
      <IndiaHeatmap data={indiaEmergencyData} />
      <AnalyticsCharts chartData={chartData} />
    </div>
  );
}
