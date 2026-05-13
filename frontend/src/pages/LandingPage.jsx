import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BrainCircuit, ShieldCheck, Users2 } from "lucide-react";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { emergencyCategories, landingStats, liveIncidentFeed, testimonials, chartData } from "@/data/mockData";
import { SectionHeading } from "@/components/SectionHeading";
import { CategoryCard } from "@/components/CategoryCard";
import { LiveIncidentFeed } from "@/components/LiveIncidentFeed";
import { StatsGrid } from "@/components/StatsGrid";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";

export function LandingPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10 bg-hero-grid">
        <div className="section-shell grid min-h-[90vh] items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div {...fadeUp}>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">AI Disaster Command Center</p>
            <h1 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
              Coordinate relief faster with AI-powered emergency response intelligence.
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              ReliefSync AI brings incident monitoring, volunteer coordination, predictive severity analysis, and field-ready response workflows into one premium emergency platform.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/register">
                  Launch Response Hub
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { icon: BrainCircuit, label: "AI triage in seconds" },
                { icon: Users2, label: "Volunteer-first coordination" },
                { icon: ShieldCheck, label: "Enterprise-ready visibility" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="relative">
              <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
              <Card className="relative rounded-[2rem]">
                <CardContent className="space-y-8 p-8">
                  <StatsGrid items={landingStats.slice(0, 2)} />
                  <LiveIncidentFeed incidents={liveIncidentFeed.slice(0, 3)} />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-24">
        <SectionHeading
          eyebrow="Response Lanes"
          title="Emergency categories designed for rapid mobilization."
          description="Every response lane is visualized as an operational module with live statistics, quick actions, and contextual severity cues."
        />
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {emergencyCategories.map((category) => (
            <motion.div key={category.title} variants={fadeUp}>
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="section-shell py-12">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <LiveIncidentFeed incidents={liveIncidentFeed} />
          <Card className="rounded-3xl">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">AI Emergency Analysis</p>
              <h2 className="mt-4 text-3xl font-semibold">Turn chaotic field descriptions into prioritized action plans.</h2>
              <p className="mt-4 text-muted-foreground">
                ReliefSync AI generates severity classification, resource recommendations, and emergency briefings so field teams can move without waiting for manual coordination.
              </p>
              <div className="mt-8 space-y-3">
                {["Severity scoring", "Priority routing", "Resource recommendation", "Actionable summaries"].map((feature) => (
                  <div key={feature} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-shell py-24">
        <SectionHeading
          eyebrow="Operational Intelligence"
          title="Live analytics built for relief coordinators."
          description="From incident trends to severity distribution, the analytics layer helps leadership identify where to dispatch people, inventory, and medical support."
        />
        <div className="mt-12">
          <AnalyticsCharts chartData={chartData} />
        </div>
      </section>

      <section className="section-shell py-24">
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="rounded-3xl">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Volunteer Network</p>
              <h2 className="mt-4 text-3xl font-semibold">Make it easier for newcomers to contribute meaningfully.</h2>
              <p className="mt-4 text-muted-foreground">
                The built-in AI assistant helps first-time volunteers understand onboarding, supplies, emergency etiquette, and where to report.
              </p>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <Card key={item.name} className="rounded-3xl">
                <CardContent className="p-8">
                  <p className="text-lg leading-8 text-foreground/90">“{item.quote}”</p>
                  <div className="mt-8">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="section-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold">ReliefSync AI</h3>
            <p className="text-sm text-muted-foreground">AI-powered disaster relief and emergency coordination platform.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="secondary">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
