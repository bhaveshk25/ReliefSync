import { Card, CardContent } from "@/ui/card";

export function StatsGrid({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="rounded-3xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-3xl font-semibold">{item.value}</span>
              <span className={`text-sm ${item.tone || "text-primary"}`}>{item.delta || item.trend}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
