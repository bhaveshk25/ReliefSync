import { HandCoins, HeartHandshake, PackageCheck, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Link } from "react-router-dom";

const donationNeeds = [
  { title: "Medical kits", amount: "180 units", icon: HeartHandshake },
  { title: "Dry ration packs", amount: "520 boxes", icon: ShoppingBag },
  { title: "Blankets and shelter sheets", amount: "310 sets", icon: PackageCheck },
];

export function DonationsPage() {
  return (
    <div className="space-y-6">
      <Card className="rounded-3xl">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Donation Coordination</p>
            <CardTitle className="mt-2 text-3xl">Support high-priority relief inventory gaps</CardTitle>
          </div>
          <Button asChild>
            <Link to="/reports">Review allocation reports</Link>
          </Button>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {donationNeeds.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="rounded-3xl">
              <CardContent className="space-y-4 p-6">
                <div className="w-fit rounded-2xl border border-white/10 bg-white/5 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Outstanding requirement: {item.amount}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HandCoins className="h-5 w-5 text-primary" />
            Donation action paths
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Button asChild className="justify-start">
            <Link to="/incidents">Match supplies to incidents</Link>
          </Button>
          <Button asChild variant="secondary" className="justify-start">
            <Link to="/alerts">Review urgent shortages</Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link to="/dashboard">Return to coordination dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
