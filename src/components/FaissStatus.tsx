import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Database } from "lucide-react";

export function FaissStatus({ connected = true }: { connected?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className={`gap-1.5 px-3 py-1 text-xs font-medium cursor-default transition-all ${
            connected
              ? "border-success/30 bg-success/10 text-success"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          <span className={`inline-block h-2 w-2 rounded-full ${connected ? "bg-success animate-pulse" : "bg-destructive"}`} />
          <Database className="h-3 w-3" />
          FAISS
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <p className="font-semibold">{connected ? "Vector DB Connected" : "Vector DB Disconnected"}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {connected
            ? "FAISS index loaded • 1,024 dimensions • L2 distance • 15,847 vectors indexed"
            : "Connection failed. Check FAISS server status."}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
