import { motion } from "framer-motion";

interface RiskMeterProps {
  level: "low" | "moderate" | "high";
  score: number;
}

const config = {
  low: { color: "bg-sage-dark", label: "Low Risk", emoji: "🟢", description: "Your emotional state appears stable. Keep up your healthy habits!" },
  moderate: { color: "bg-yellow-500", label: "Moderate Risk", emoji: "🟡", description: "Some indicators suggest mild emotional distress. Consider exploring wellness resources." },
  high: { color: "bg-destructive", label: "High Risk", emoji: "🔴", description: "Elevated risk indicators detected. We recommend speaking with a mental health professional." },
};

export function RiskMeter({ level, score }: RiskMeterProps) {
  const c = config[level];

  return (
    <div className="rounded-2xl gradient-card shadow-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">Mental Health Risk Assessment</h3>
        <span className="text-2xl">{c.emoji}</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Risk Level</span>
          <span className="font-semibold text-foreground">{c.label}</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`h-full rounded-full ${c.color}`}
          />
        </div>
        <p className="text-sm text-muted-foreground">{c.description}</p>
      </div>

      <p className="text-xs text-warm-gray italic">
        ⚠️ This system is not a substitute for professional medical diagnosis. If you're in crisis, please contact emergency services.
      </p>
    </div>
  );
}
