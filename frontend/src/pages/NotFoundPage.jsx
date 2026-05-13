import { Link } from "react-router-dom";
import { Button } from "@/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel max-w-lg rounded-[2rem] p-10 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Route Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The response view you requested is unavailable. Return to the live coordination workspace.
        </p>
        <Button asChild className="mt-8">
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
