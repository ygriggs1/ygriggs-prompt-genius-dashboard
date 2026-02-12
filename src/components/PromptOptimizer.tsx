import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FaissStatus } from "@/components/FaissStatus";
import { Msg, streamChat } from "@/lib/streaming";
import { generateMetricsFromResponse, type TestRun } from "@/lib/metrics";
import { useToast } from "@/hooks/use-toast";

interface Props {
  initialSystemPrompt?: string;
  onMetrics?: (run: TestRun) => void;
}

export function PromptOptimizer({ initialSystemPrompt, onMetrics }: Props) {
  const [systemPrompt, setSystemPrompt] = useState(
    initialSystemPrompt ||
      "You are a helpful AI assistant. Keep answers clear and concise."
  );
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (initialSystemPrompt) setSystemPrompt(initialSystemPrompt);
  }, [initialSystemPrompt]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const input = userInput.trim();
    if (!input || isLoading) return;

    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const startTime = Date.now();

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        systemPrompt,
        onDelta: upsertAssistant,
        onDone: () => {
          setIsLoading(false);
          if (onMetrics && assistantSoFar) {
            onMetrics(generateMetricsFromResponse(assistantSoFar, startTime));
          }
        },
      });
    } catch (e: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: e.message || "Failed to get response",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      {/* Left: System prompt + input */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">System Prompt</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-mono">
                  {systemPrompt.length} chars
                </Badge>
                <FaissStatus connected />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="min-h-[180px] font-mono text-sm resize-none"
              placeholder="Enter system prompt..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <Label className="text-sm font-medium mb-2 block">User Message</Label>
            <div className="flex gap-2">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <Button
                onClick={send}
                disabled={isLoading || !userInput.trim()}
                className="gradient-indigo shrink-0"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Conversation */}
      <Card className="flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-[400px] px-6 pb-4">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm py-20">
                Send a message to start the conversation
              </div>
            )}
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 h-7 w-7 rounded-full gradient-indigo flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3 mb-4">
                <div className="flex-shrink-0 h-7 w-7 rounded-full gradient-indigo flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-secondary rounded-xl px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
