import { Link } from "react-router-dom";
import { BellRing, Brain, FilePlus2, FileText, HandCoins } from "lucide-react";
import { Button } from "@/ui/button";

const actions = [
  { icon: FilePlus2, label: "Report a new incident", to: "/incidents/new", variant: "primary" },
  { icon: Brain, label: "Run AI severity analysis", to: "/ai-analysis", variant: "secondary" },
  { icon: FileText, label: "Review situation reports", to: "/reports", variant: "outline" },
  { icon: BellRing, label: "Check active alerts", to: "/alerts", variant: "ghost" },
  { icon: HandCoins, label: "Manage donation needs", to: "/donations", variant: "secondary" },
];

export function QuickActions() {
  return (
    <div className="space-y-3">
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
    </div>
  );
}
