import { motion } from "framer-motion";
import { Clock, Hash, DollarSign, Target, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { type TestRun, exportMetrics } from "@/lib/metrics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  runs: TestRun[];
}

export function MetricsDashboard({ runs }: Props) {
  const latest = runs[runs.length - 1];

  const avg = (fn: (r: TestRun) => number) =>
    runs.length ? runs.reduce((s, r) => s + fn(r), 0) / runs.length : 0;

  const cards = [
    {
      label: "Avg Response Time",
      value: `${Math.round(avg((r) => r.responseTimeMs))}ms`,
      icon: Clock,
    },
    {
      label: "Avg Token Count",
      value: Math.round(avg((r) => r.tokenCount)).toString(),
      icon: Hash,
    },
    {
      label: "Total Cost",
      value: `$${runs.reduce((s, r) => s + r.costEstimate, 0).toFixed(4)}`,
      icon: DollarSign,
    },
    {
      label: "Avg Relevance",
      value: `${(avg((r) => r.relevanceScore) * 100).toFixed(0)}%`,
      icon: Target,
    },
  ];

  const chartData = runs.map((r, i) => ({
    run: i + 1,
    BLEU: Math.round(r.bleuScore * 100),
    ROUGE: Math.round(r.rougeScore * 100),
    Relevance: Math.round(r.relevanceScore * 100),
  }));

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="rounded-lg gradient-indigo p-2.5">
                  <c.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <p className="text-xl font-bold">{runs.length ? c.value : "—"}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Eval scores */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Evaluation Scores (Latest Run)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "BLEU Score", value: latest?.bleuScore ?? 0 },
            { label: "ROUGE Score", value: latest?.rougeScore ?? 0 },
            { label: "Relevance Score", value: latest?.relevanceScore ?? 0 },
          ].map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{s.label}</span>
                <span className="font-semibold">{(s.value * 100).toFixed(0)}%</span>
              </div>
              <Progress value={s.value * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Chart */}
      {runs.length > 1 && (
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Metric Trends</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => exportMetrics(runs, "json")}>
                <Download className="h-3.5 w-3.5 mr-1" /> JSON
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportMetrics(runs, "csv")}>
                <Download className="h-3.5 w-3.5 mr-1" /> CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="run" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="BLEU" stroke="hsl(239 84% 67%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ROUGE" stroke="hsl(142 71% 45%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Relevance" stroke="hsl(38 92% 50%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {runs.length <= 1 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground text-sm">
            Run more prompts to see metric trends over time.
            {runs.length > 0 && (
              <div className="mt-4 flex justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => exportMetrics(runs, "json")}>
                  <Download className="h-3.5 w-3.5 mr-1" /> Export JSON
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportMetrics(runs, "csv")}>
                  <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
