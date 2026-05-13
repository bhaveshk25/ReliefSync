import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/ui/button";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Frontend error boundary caught an error", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="glass-panel max-w-md rounded-3xl p-8 text-center">
            <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-amber-300" />
            <h1 className="text-2xl font-semibold">Interface Recovery Required</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              ReliefSync AI encountered an unexpected interface error. Refresh the page to restore the dashboard.
            </p>
            <Button className="mt-6" onClick={() => window.location.reload()}>
              Reload Platform
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
