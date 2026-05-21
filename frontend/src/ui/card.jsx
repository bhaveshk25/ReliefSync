import { cn } from "@/utils/cn";

export function Card({ className, variant = "default", ...props }) {
  const variants = {
    default: "glass-panel rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-glow",
    elevated: "glass-panel rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-shadow duration-300",
    interactive: "glass-panel rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-glow hover-lift",
    outlined: "rounded-2xl border border-input bg-background/50",
  };

  return <div className={cn(variants[variant], className)} {...props} />;
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold text-foreground", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return <div className={cn("flex items-center gap-3 p-6 pt-0", className)} {...props} />;
}
