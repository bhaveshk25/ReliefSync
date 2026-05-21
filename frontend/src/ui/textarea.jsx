import { cn } from "@/utils/cn";

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "input-enhanced",
        className,
      )}
      {...props}
    />
  );
}
