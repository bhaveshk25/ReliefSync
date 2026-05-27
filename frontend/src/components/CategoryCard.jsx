import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/ui/button";

export function CategoryCard({ category }) {
  const Icon = category.icon;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={`glass-panel relative overflow-hidden rounded-3xl p-6`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${category.accent}`} />
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {category.incidents} live
          </span>
        </div>
        <h3 className="text-xl font-semibold">{category.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {category.responders} responders currently aligned with this emergency lane.
        </p>
        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Quick mobilization action</span>
          <span className="font-medium text-primary">{category.responders} active</span>
        </div>
        <Button asChild variant="secondary" className="mt-5 w-full justify-between">
          <Link to={category.ctaTo || "/dashboard"}>
            {category.cta}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
