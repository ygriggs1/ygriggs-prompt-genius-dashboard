export interface TestRun {
  id: string;
  timestamp: Date;
  responseTimeMs: number;
  tokenCount: number;
  costEstimate: number;
  relevanceScore: number;
  bleuScore: number;
  rougeScore: number;
}

export function generateMetricsFromResponse(content: string, startTime: number): TestRun {
  const responseTimeMs = Date.now() - startTime;
  const tokenCount = Math.ceil(content.length / 4); // rough estimate
  const costEstimate = tokenCount * 0.000002; // illustrative

  // Simulated NLP metrics (in a real system these come from evaluation pipelines)
  const relevanceScore = 0.7 + Math.random() * 0.25;
  const bleuScore = 0.3 + Math.random() * 0.5;
  const rougeScore = 0.4 + Math.random() * 0.45;

  return {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    responseTimeMs,
    tokenCount,
    costEstimate,
    relevanceScore: Math.round(relevanceScore * 100) / 100,
    bleuScore: Math.round(bleuScore * 100) / 100,
    rougeScore: Math.round(rougeScore * 100) / 100,
  };
}

export function exportMetrics(runs: TestRun[], format: "json" | "csv") {
  if (format === "json") {
    const blob = new Blob([JSON.stringify(runs, null, 2)], { type: "application/json" });
    downloadBlob(blob, "metrics.json");
  } else {
    const headers = "id,timestamp,responseTimeMs,tokenCount,costEstimate,relevanceScore,bleuScore,rougeScore";
    const rows = runs.map(r =>
      `${r.id},${r.timestamp.toISOString()},${r.responseTimeMs},${r.tokenCount},${r.costEstimate.toFixed(6)},${r.relevanceScore},${r.bleuScore},${r.rougeScore}`
    );
    const blob = new Blob([headers + "\n" + rows.join("\n")], { type: "text/csv" });
    downloadBlob(blob, "metrics.csv");
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
