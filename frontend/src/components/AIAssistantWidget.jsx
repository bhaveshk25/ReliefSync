import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, SendHorizontal, X } from "lucide-react";
import { assistantService } from "@/services/assistantService";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";
import { LoadingSpinner } from "@/ui/loading-spinner";
import { ScrollArea } from "@/ui/scroll-area";

const starterQuestions = [
  "How can I volunteer?",
  "What should I do during floods?",
  "How do I request emergency help?",
];

export function AIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "I’m the Relief Assistant. Ask me about volunteering, emergency prep, or where support is needed most.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const outbound = { id: crypto.randomUUID(), role: "user", content: message };
    setMessages((current) => [...current, outbound]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await assistantService.chat(message);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.reply || "I’ve logged that request for the response team.",
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I couldn't reach the assistant service right now, but you can still review incidents and submit AI analysis requests from the dashboard.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-glow transition hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-6 z-50 w-[calc(100%-2rem)] max-w-md"
          >
            <Card className="rounded-3xl">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Relief Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96 px-5 py-4">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {starterQuestions.map((question) => (
                        <button
                          key={question}
                          type="button"
                          onClick={() => sendMessage(question)}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                          message.role === "assistant"
                            ? "bg-white/5 text-foreground"
                            : "ml-auto bg-primary text-primary-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    ))}
                    {isLoading ? (
                      <div className="max-w-[70%] rounded-2xl bg-white/5 px-4 py-3 text-sm text-muted-foreground">
                        Typing response...
                      </div>
                    ) : null}
                  </div>
                </ScrollArea>
                <div className="flex gap-2 border-t border-white/10 p-4">
                  <Input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about volunteering, emergencies, or supplies..."
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        sendMessage(input);
                      }
                    }}
                  />
                  <Button size="icon" onClick={() => sendMessage(input)} disabled={isLoading}>
                    {isLoading ? <LoadingSpinner /> : <SendHorizontal className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
