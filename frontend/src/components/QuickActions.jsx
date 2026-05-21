import { Link } from "react-router-dom";
import { Brain, FilePlus2, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";

const actions = [
  { icon: FilePlus2, label: "Report a new incident", to: "/incidents/new", variant: "primary" },
  { icon: Brain, label: "Run AI severity analysis", to: "/ai-analysis", variant: "secondary" },
  { icon: ShieldCheck, label: "Review active emergencies", to: "/incidents", variant: "outline" },
  { icon: Users, label: "Coordinate volunteer teams", to: "/dashboard", variant: "ghost" },
];

export function QuickActions() {
  return (
    <Card className="rounded-3xl interactive hover-lift transition-all-smooth">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Essential emergency response tools
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div key={action.label} className="flex items-center space-x-3">
              <Button
                asChild
                variant={action.variant}
                className="flex-1 justify-start hover-lift transition-all-smooth"
              >
                <Link to={action.to}>
                  <Icon className="h-5 w-5" />
                  <span className="ml-3">{action.label}</span>
                </Link>
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
