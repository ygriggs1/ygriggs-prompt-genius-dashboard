import { motion } from "framer-motion";
import { Copy, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { promptTemplates } from "@/lib/prompt-templates";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onLoadTemplate: (systemPrompt: string) => void;
}

export function PromptLibrary({ onLoadTemplate }: Props) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {promptTemplates.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">{t.category}</Badge>
              </div>
              <CardTitle className="text-base font-semibold mt-2">{t.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-3">{t.description}</p>
              <pre className="flex-1 rounded-md bg-muted p-3 text-xs font-mono text-muted-foreground overflow-hidden whitespace-pre-wrap line-clamp-4 mb-4">
                {t.systemPrompt}
              </pre>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => copyToClipboard(t.systemPrompt)}
                >
                  <Copy className="h-3.5 w-3.5" /> Copy
                </Button>
                <Button
                  size="sm"
                  className="flex-1 gap-1 gradient-indigo"
                  onClick={() => onLoadTemplate(t.systemPrompt)}
                >
                  <ArrowRight className="h-3.5 w-3.5" /> Load
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
