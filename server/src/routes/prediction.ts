import { Router } from "express";

const router = Router();

// For demo purposes we return a simple random score or simple classification.
router.post("/", async (req, res) => {
  const { type, data } = req.body;
  // type could be "journal", "phq" etc.
  // in a real application you would run your ML models here
  let result: any = {};

  if (type === "journal" && typeof data === "string") {
    // dummy sentiment: positive/negative based on presence of "happy"
    result = {
      mood: data.toLowerCase().includes("happy") ? "positive" : "neutral",
      score: Math.floor(Math.random() * 100),
    };
  } else if (type === "phq" && Array.isArray(data)) {
    const sum = data.reduce((a: number, b: number) => a + b, 0);
    result = {
      score: sum,
      severity: sum < 5 ? "minimal" : sum < 10 ? "mild" : "moderate",
    };
  } else {
    result = { message: "unknown data" };
  }

  res.json(result);
});

export default router;
