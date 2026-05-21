import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 active:scale-[0.98]",
        secondary:
          "border border-white/10 bg-white/5 text-foreground hover:bg-white/10 hover:-translate-y-0.5 active:scale-[0.98]",
        ghost: "text-muted-foreground hover:bg-white/5 hover:text-foreground hover:-translate-y-0.5 active:scale-[0.98]",
        outline: "border border-border bg-transparent hover:bg-white/5 hover:-translate-y-0.5 active:scale-[0.98]",
        danger: "bg-destructive text-white hover:bg-destructive/90 hover:-translate-y-0.5 active:scale-[0.98]",
        success: "bg-success text-white hover:bg-success/90 hover:-translate-y-0.5 active:scale-[0.98]",
        warning: "bg-warning text-white hover:bg-warning/90 hover:-translate-y-0.5 active:scale-[0.98]",
        info: "bg-info text-white hover:bg-info/90 hover:-translate-y-0.5 active:scale-[0.98]",
        violet: "bg-violet-600 text-white hover:bg-violet-600/90 hover:-translate-y-0.5 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-base",
        lg: "h-12 px-5 text-base",
        xl: "h-14 px-6 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className, "shine-effect")} {...props} />;
}
