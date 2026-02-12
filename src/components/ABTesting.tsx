import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Trophy, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { runABTest } from "@/lib/streaming";
import { generateMetricsFromResponse, type TestRun } from "@/lib/metrics";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onMetrics?: (run: TestRun) => void;
}

export function ABTesting({ onMetrics }: Props) {
  const [promptA, setPromptA] = useState("You are a concise, technical assistant. Use bullet points and code examples.");
  const [promptB, setPromptB] = useState("You are a friendly, conversational assistant. Explain concepts simply with analogies.");
  const [testInput, setTestInput] = useState("");
  const [resultA, setResultA] = useState("");
  const [resultB, setResultB] = useState("");
  const [metricsA, setMetricsA] = useState<TestRun | null>(null);
  const [metricsB, setMetricsB] = useState<TestRun | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const runTest = async () => {
    if (!testInput.trim() || isLoading) return;
    setIsLoading(true);
    setResultA("");
    setResultB("");
    setMetricsA(null);
    setMetricsB(null);

    const startTime = Date.now();

    try {
      const result = await runABTest({
        messages: [{ role: "user", content: testInput }],
        systemPromptA: promptA,
        systemPromptB: promptB,
      });

      setResultA(result.a.content);
      setResultB(result.b.content);

      const mA = generateMetricsFromResponse(result.a.content, startTime);
      const mB = generateMetricsFromResponse(result.b.content, startTime);
      setMetricsA(mA);
      setMetricsB(mB);
      onMetrics?.(mA);
      onMetrics?.(mB);
    } catch (e: any) {
      toast({
        title: "A/B Test Error",
        description: e.message || "Failed to run test",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const winner =
    metricsA && metricsB
      ? metricsA.relevanceScore >= metricsB.relevanceScore
        ? "A"
        : "B"
      : null;

  return (
    <div className="space-y-6">
      {/* Prompt editors */}
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Version A", value: promptA, set: setPromptA },
          { label: "Version B", value: promptB, set: setPromptB },
        ].map(({ label, value, set }) => (
          <Card key={label}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                {label}
                {winner === label.slice(-1) && (
                  <Badge className="gap-1 bg-success text-primary-foreground">
                    <Trophy className="h-3 w-3" /> Winner
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={value}
                onChange={(e) => set(e.target.value)}
                className="min-h-[120px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Test input */}
      <Card>
        <CardContent className="pt-4">
          <Label className="text-sm font-medium mb-2 block">Test Message</Label>
          <div className="flex gap-2">
            <Input
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runTest()}
              placeholder="Enter test message for both versions..."
              disabled={isLoading}
            />
            <Button onClick={runTest} disabled={isLoading || !testInput.trim()} className="gradient-indigo gap-2">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              Run Test
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {(resultA || resultB) && (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "A", result: resultA, metrics: metricsA },
            { label: "B", result: resultB, metrics: metricsB },
          ].map(({ label, result, metrics }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Card className={winner === label ? "ring-2 ring-success" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">Response {label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ScrollArea className="h-[200px]">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
                  </ScrollArea>
                  {metrics && (
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="rounded-md bg-muted p-2 text-center">
                        <div className="text-muted-foreground">Relevance</div>
                        <div className="font-semibold text-foreground">{(metrics.relevanceScore * 100).toFixed(0)}%</div>
                      </div>
                      <div className="rounded-md bg-muted p-2 text-center">
                        <div className="text-muted-foreground">Tokens</div>
                        <div className="font-semibold text-foreground">{metrics.tokenCount}</div>
                      </div>
                      <div className="rounded-md bg-muted p-2 text-center">
                        <div className="text-muted-foreground">Time</div>
                        <div className="font-semibold text-foreground">{metrics.responseTimeMs}ms</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
