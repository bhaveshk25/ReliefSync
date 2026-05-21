import { cn } from "@/utils/cn";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "input-enhanced",
        className,
      )}
      {...props}
    />
  );
}
