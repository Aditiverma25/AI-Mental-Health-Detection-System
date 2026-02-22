import { motion } from "framer-motion";

interface MoodScoreCardProps {
  label: string;
  value: number;
  icon: string;
  color: string;
}

export function MoodScoreCard({ label, value, icon, color }: MoodScoreCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-2xl gradient-card shadow-card p-5 flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold font-display text-foreground">{value}%</p>
      </div>
    </motion.div>
  );
}
