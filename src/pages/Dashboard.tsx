import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, MessageCircle, TrendingUp, Calendar, BarChart3, Sparkles, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { MoodScoreCard } from "@/components/MoodScoreCard";
import { RiskMeter } from "@/components/RiskMeter";

const recentSessions = [
  { date: "Today", type: "Journal Entry", mood: "😊", summary: "Feeling optimistic about new project" },
  { date: "Yesterday", type: "Assessment", mood: "😐", summary: "Mild stress from work deadlines" },
  { date: "Feb 19", type: "Chat Session", mood: "😌", summary: "CBT exercise – thought reframing" },
  { date: "Feb 18", type: "Assessment", mood: "😊", summary: "Improved anxiety scores" },
];

const weeklyMoods = ["😊", "😐", "😌", "😊", "😔", "😊", "😌"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

import { useAuth } from "@/context/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">
            Welcome back{user ? `, ${user.email}` : ""} ✨
          </h1>
          <p className="text-muted-foreground">Here's your emotional wellness overview.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MoodScoreCard label="Mood Score" value={78} icon="😊" color="bg-lavender-light" />
          <MoodScoreCard label="Anxiety" value={22} icon="💆" color="bg-pink-light" />
          <MoodScoreCard label="Stress" value={35} icon="⚡" color="bg-peach" />
          <MoodScoreCard label="Resilience" value={85} icon="💪" color="bg-sage" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Meter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <RiskMeter level="low" score={18} />
            </motion.div>

            {/* Weekly Mood */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl gradient-card shadow-card p-6"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Weekly Mood Tracker</h3>
              <div className="flex items-end justify-between">
                {weeklyMoods.map((mood, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{mood}</span>
                    <div className="w-10 h-10 rounded-xl bg-lavender-light flex items-center justify-center">
                      <div
                        className="rounded-lg bg-primary"
                        style={{ width: "60%", height: `${30 + Math.random() * 70}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{days[i]}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl gradient-card shadow-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-foreground">Recent Sessions</h3>
                <Button variant="ghost" size="sm" className="text-primary">View All</Button>
              </div>
              <div className="space-y-3">
                {recentSessions.map((session, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <span className="text-2xl">{session.mood}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{session.summary}</p>
                      <p className="text-xs text-muted-foreground">{session.type} · {session.date}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl gradient-card shadow-card p-6 space-y-3"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">Quick Actions</h3>
              <Link to="/assessment">
                <Button variant="hero" className="w-full justify-start" size="lg">
                  <Plus className="w-5 h-5 mr-2" /> New Assessment
                </Button>
              </Link>
              <Link to="/chatbot">
                <Button variant="soft" className="w-full justify-start" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" /> Talk to Companion
                </Button>
              </Link>
              <Button variant="glass" className="w-full justify-start" size="lg">
                <Calendar className="w-5 h-5 mr-2" /> View Calendar
              </Button>
            </motion.div>

            {/* Wellness Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl gradient-card shadow-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">Today's Plan</h3>
              </div>
              <div className="space-y-3">
                {[
                  { time: "Morning", task: "5-min gratitude journaling", done: true },
                  { time: "Afternoon", task: "Box breathing exercise", done: false },
                  { time: "Evening", task: "Reflect on 3 positive moments", done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.done ? "bg-primary border-primary" : "border-border"}`}>
                      {item.done && <span className="text-primary-foreground text-xs">✓</span>}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.task}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Streak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl gradient-primary shadow-glow p-6 text-center"
            >
              <p className="text-4xl mb-2">🔥</p>
              <p className="text-2xl font-bold text-primary-foreground font-display">12 Day Streak</p>
              <p className="text-sm text-primary-foreground/80">Keep going! You're doing great.</p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
