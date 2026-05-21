import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Bar,
  BarChart,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

const pieColors = ["#4EE3B7", "#3B82F6", "#F59E0B", "#FB7185", "#8B5CF6", "#EC4899"];

export function AnalyticsCharts({ chartData }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
      <Card className="rounded-3xl interactive hover-lift transition-all-smooth">
        <CardHeader>
          <CardTitle>Incident Trend</CardTitle>
          <p className="text-sm text-muted-foreground">
            Weekly incident patterns and resolution rates
          </p>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%" margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <AreaChart
              data={chartData.trend}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <defs>
                <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4EE3B7" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#4EE3B7" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.1)"
                tickSize={4}
                tickColor="rgba(255,255,255,0.1)"
                textAnchor="end"
                angle={-15}
                height={20}
              />
              <YAxis
                stroke="rgba(255,255,255,0.1)"
                tickSize={4}
                tickColor="rgba(255,255,255,0.1)"
                width={36}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "rgba(30, 30, 46, 0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                labelStyle={{ color: "#94A3B8", fontSize: 12 }}
                formatter={(value) => `${value}`}
                separator={": "}
              />
              <Area
                type="monotone"
                dataKey="incidents"
                stroke="#4EE3B7"
                strokeWidth={2}
                fill="url(#incidentGradient)"
                isAnimationActive={true}
                animationBegin={0}
                animationDuration={1500}
                easing="ease-out"
              >
                <dot
                  strokeWidth={2}
                  stroke="#4EE3B7"
                  fillOpacity={1}
                  radius={4}
                  onMouseEnter={(e) => {
                    // Optional: enhance interaction
                  }}
                  onMouseLeave={(e) => {
                    // Optional: enhance interaction
                  }}
                />
              </Area>
              <Area
                type="monotone"
                dataKey="resolved"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#resolvedGradient)"
                isAnimationActive={true}
                animationBegin={0}
                animationDuration={1500}
                easing="ease-out"
              >
                <dot
                  strokeWidth={2}
                  stroke="#3B82F6"
                  fillOpacity={1}
                  radius={4}
                />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        <Card className="rounded-3xl interactive hover-lift transition-all-smooth">
          <CardHeader>
            <CardTitle>Emergency Categories</CardTitle>
            <p className="text-sm text-muted-foreground">
              Distribution by incident type
            </p>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%" margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <BarChart
                data={chartData.categories}
                barSize={20}
              >
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  stroke="rgba(255,255,255,0.1)"
                  tickSize={4}
                  tickColor="rgba(255,255,255,0.1)"
                />
                <YAxis
                  stroke="rgba(255,255,255,0.1)"
                  tickSize={4}
                  tickColor="rgba(255,255,255,0.1)"
                  width={36}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(30, 30, 46, 0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                  labelStyle={{ color: "#94A3B8", fontSize: 12 }}
                  formatter={(value) => `${value} incidents`}
                />
                <Bar
                  dataKey="value"
                  fill="#3B82F6"
                  radius={[8, 8, 0, 0]}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={1200}
                  easing="ease-out"
                >
                  <dot
                    strokeWidth={1}
                    stroke="#3B82F6"
                    fillOpacity={0.7}
                    radius={6}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-3xl interactive hover-lift transition-all-smooth">
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">
              Incident severity breakdown
            </p>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%" margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <PieChart>
                <Pie
                  data={chartData.severity}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  startAngle={180}
                  endAngle={0}
                  padAngle={0.5}
                >
                  {chartData.severity.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={pieColors[index % pieColors.length]}
                    >
                      {(props) => {
                        const { cx, cy, midAngle, innerRadius, outerRadius, payload, percent } = props;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle);
                        const y = cy + radius * Math.sin(-midAngle);
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#ffffff"
                            textAnchor="middle"
                            fontSize={10}
                            fontWeight={600}
                            dy="4"
                          >
                            {entry.name}
                          </text>
                        );
                      }}
                    </Cell>
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(30, 30, 46, 0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                  labelStyle={{ color: "#94A3B8", fontSize: 12 }}
                  formatter={(value, name) => `${name}: ${value} incidents`}
                  formatter={(value, name, percent) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => `${value}`}
                  wrapperStyle={{}}
                  itemStyle={{
                    padding: "0 8px",
                    cursor: "default"
                  }}
                  itemTextStyle={{
                    color: "#94A3B8",
                    fontSize: 12
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
