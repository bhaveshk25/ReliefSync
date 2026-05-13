import { Link } from "react-router-dom";
import { Brain, FilePlus2, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";

const actions = [
  { icon: FilePlus2, label: "Report a new incident", to: "/incidents/new" },
  { icon: Brain, label: "Run AI severity analysis", to: "/ai-analysis" },
  { icon: ShieldCheck, label: "Review active emergencies", to: "/incidents" },
  { icon: Users, label: "Coordinate volunteer teams", to: "/dashboard" },
];

export function QuickActions() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button key={action.label} asChild variant="secondary" className="w-full justify-start">
              <Link to={action.to}>
                <Icon className="h-4 w-4 text-primary" />
                {action.label}
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
