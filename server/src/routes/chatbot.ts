import { Router } from "express";

const router = Router();

// simple echo/CBT style response
const cbtResponses: Record<string, string> = {
  sad: "I hear you, and it's okay to feel this way. Let's try a technique together.",
  anxious: "Anxiety can feel overwhelming, but you're not alone. Try some deep breathing.",
  stressed: "Stress signals your system needs a break. Let's do a grounding exercise.",
  happy: "That's wonderful to hear! Take a moment to savor this feeling.",
  default: "Thanks for sharing. Tell me more about what's on your mind."
};

function getResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("sad") || lower.includes("depressed") || lower.includes("cry")) return cbtResponses.sad;
  if (lower.includes("anxious") || lower.includes("anxiety") || lower.includes("worried")) return cbtResponses.anxious;
  if (lower.includes("stressed") || lower.includes("overwhelmed")) return cbtResponses.stressed;
  if (lower.includes("happy") || lower.includes("good")) return cbtResponses.happy;
  return cbtResponses.default;
}

router.post("/", (req, res) => {
  const { message } = req.body;
  if (typeof message !== "string") {
    return res.status(400).json({ error: "message must be a string" });
  }
  const reply = getResponse(message);
  res.json({ reply });
});

export default router;
