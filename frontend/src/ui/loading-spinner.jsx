import { LoaderCircle } from "lucide-react";
import { cn } from "@/utils/cn";

export function LoadingSpinner({ className }) {
  return <LoaderCircle className={cn("h-4 w-4 animate-spin", className)} />;
}
