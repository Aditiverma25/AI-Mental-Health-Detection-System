import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Brain, Send, Loader2, Heart, Smile, Frown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import * as api from "@/lib/api";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hi there 💜 I'm your MindCare Companion. I'm here to listen, support, and help you work through your thoughts using evidence-based techniques. How are you feeling today?",
    timestamp: new Date(),
  },
];

const cbtResponses: Record<string, string> = {
  sad: "I hear you, and it's okay to feel this way. Let's try a CBT technique called 'thought reframing.' Can you tell me one specific thought that's making you feel sad? We'll work through it together. 💙",
  anxious: "Anxiety can feel overwhelming, but you're not alone. Let's try a grounding exercise: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This helps bring you back to the present moment. 🌿",
  stressed: "Stress is your body's way of signaling it needs attention. Let's try box breathing together: Breathe in for 4 seconds, hold for 4, breathe out for 4, hold for 4. Repeat 3 times. Ready? 💆",
  happy: "That's wonderful to hear! 😊 Positive emotions are worth savoring. Take a moment to really notice what's contributing to your happiness right now. This builds emotional resilience over time. ✨",
  default: "Thank you for sharing that with me. I notice some important themes in what you're saying. Let's explore this together — what do you think is the core feeling behind these thoughts? Sometimes naming our emotions helps us understand them better. 🤍",
};

function getResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("sad") || lower.includes("down") || lower.includes("depressed") || lower.includes("cry")) return cbtResponses.sad;
  if (lower.includes("anxious") || lower.includes("anxiety") || lower.includes("worried") || lower.includes("panic")) return cbtResponses.anxious;
  if (lower.includes("stressed") || lower.includes("overwhelmed") || lower.includes("burnout") || lower.includes("pressure")) return cbtResponses.stressed;
  if (lower.includes("happy") || lower.includes("good") || lower.includes("great") || lower.includes("amazing")) return cbtResponses.happy;
  return cbtResponses.default;
}

function detectMood(text: string): { icon: typeof Smile; label: string } {
  const lower = text.toLowerCase();
  if (lower.includes("sad") || lower.includes("depressed") || lower.includes("cry")) return { icon: Frown, label: "Sadness detected" };
  if (lower.includes("harm") || lower.includes("end it") || lower.includes("suicide")) return { icon: AlertTriangle, label: "Crisis indicators" };
  if (lower.includes("happy") || lower.includes("good") || lower.includes("great")) return { icon: Smile, label: "Positive mood" };
  return { icon: Heart, label: "Processing" };
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await api.chat(input);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: res.reply,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Sorry, something went wrong.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const mood = messages.length > 1 ? detectMood(messages[messages.length - 1].content) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col container mx-auto px-4 pt-20 pb-4 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 py-4 border-b border-border mb-4"
        >
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-foreground">MindSense Companion</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-sage-dark animate-pulse-soft" />
              <span className="text-xs text-muted-foreground">
                {isTyping ? "Typing..." : "Online · CBT-Based Support"}
              </span>
            </div>
          </div>
          {mood && (
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender-light text-primary text-xs font-medium">
              <mood.icon className="w-3.5 h-3.5" />
              {mood.label}
            </div>
          )}
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "gradient-primary text-primary-foreground rounded-br-md"
                      : "gradient-card shadow-card text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="gradient-card shadow-card px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="glass rounded-2xl p-2 flex items-center gap-2 shadow-card">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Share how you're feeling..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Button
            variant="hero"
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="shrink-0 rounded-xl w-10 h-10"
          >
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>

        <p className="text-xs text-center text-warm-gray mt-3">
          ⚠️ This is not a substitute for professional mental health support.{" "}
          <a href="tel:988" className="text-primary font-medium">Crisis? Call 988</a>
        </p>
      </main>
    </div>
  );
};

export default Chatbot;
