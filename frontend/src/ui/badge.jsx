import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium uppercase tracking-[0.2em]",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/5 text-foreground",
        success: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
        warning: "border-amber-400/30 bg-amber-500/15 text-amber-200",
        danger: "border-rose-400/30 bg-rose-500/15 text-rose-200",
        info: "border-sky-400/30 bg-sky-500/15 text-sky-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
