import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PromptOptimizer } from "@/components/PromptOptimizer";
import { ABTesting } from "@/components/ABTesting";
import { MetricsDashboard } from "@/components/MetricsDashboard";
import { PromptLibrary } from "@/components/PromptLibrary";
import { type TestRun } from "@/lib/metrics";
import { Sparkles, FlaskConical, BarChart3, Library } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("optimizer");
  const [loadedPrompt, setLoadedPrompt] = useState<string | undefined>();
  const [testRuns, setTestRuns] = useState<TestRun[]>([]);

  const addRun = (run: TestRun) => setTestRuns((prev) => [...prev, run]);

  const handleLoadTemplate = (systemPrompt: string) => {
    setLoadedPrompt(systemPrompt);
    setActiveTab("optimizer");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg gradient-indigo flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">LLM Optimizer</h1>
              <p className="text-xs text-muted-foreground">Prompt Engineering Dashboard</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full justify-start gap-1 bg-transparent p-0">
            {[
              { value: "optimizer", label: "Optimizer", icon: Sparkles },
              { value: "ab", label: "A/B Testing", icon: FlaskConical },
              { value: "metrics", label: "Metrics", icon: BarChart3 },
              { value: "library", label: "Prompt Library", icon: Library },
            ].map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="gap-2 rounded-lg border border-transparent px-4 py-2 data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="optimizer">
            <PromptOptimizer initialSystemPrompt={loadedPrompt} onMetrics={addRun} />
          </TabsContent>
          <TabsContent value="ab">
            <ABTesting onMetrics={addRun} />
          </TabsContent>
          <TabsContent value="metrics">
            <MetricsDashboard runs={testRuns} />
          </TabsContent>
          <TabsContent value="library">
            <PromptLibrary onLoadTemplate={handleLoadTemplate} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
