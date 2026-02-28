import { motion } from "framer-motion";
import { useState } from "react";
import { Brain, FileText, Mic, ClipboardList, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { RiskMeter } from "@/components/RiskMeter";
import { MoodScoreCard } from "@/components/MoodScoreCard";
import * as api from "@/lib/api";

type Tab = "journal" | "voice" | "test";

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself",
  "Trouble concentrating on things",
  "Moving or speaking slowly, or being fidgety",
  "Thoughts of self-harm or being better off dead",
];

const Assessment = () => {
  const [activeTab, setActiveTab] = useState<Tab>("journal");
  const [journalText, setJournalText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<null | "done">(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [phqAnswers, setPhqAnswers] = useState<number[]>(Array(9).fill(-1));

  const tabs = [
    { id: "journal" as Tab, label: "Journal", icon: FileText },
    { id: "voice" as Tab, label: "Voice", icon: Mic },
    { id: "test" as Tab, label: "PHQ-9 Test", icon: ClipboardList },
  ];

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      let res;
      if (activeTab === "journal") {
        res = await api.analyzeJournal(journalText);
      } else if (activeTab === "test") {
        res = await api.analyzePHQ(phqAnswers);
      } else {
        // voice stub
        res = { message: "voice analysis not implemented yet" };
      }
      setAnalysis(res);
      setResults("done");
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Brain className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Emotional Assessment</h1>
          <p className="text-muted-foreground">Share how you're feeling for AI-powered insights.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setResults(null); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "gradient-primary text-primary-foreground shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Journal Input */}
        {activeTab === "journal" && !results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="rounded-2xl gradient-card shadow-card p-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                How are you feeling today?
              </label>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Write about your thoughts, feelings, and experiences today..."
                className="w-full h-40 bg-muted/50 rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-muted-foreground">{journalText.length} characters</span>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={journalText.length < 10 || analyzing}
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Voice Input */}
        {activeTab === "voice" && !results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl gradient-card shadow-card p-8 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-lavender-light flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
              <Mic className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">Voice Analysis</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Speak about how you're feeling. Our AI will analyze tone, pace, and content.
            </p>
            <Button variant="hero" size="lg" onClick={handleAnalyze}>
              {analyzing ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Listening...</>
              ) : (
                "Start Recording"
              )}
            </Button>
          </motion.div>
        )}

        {/* PHQ-9 Test */}
        {activeTab === "test" && !results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="rounded-2xl gradient-card shadow-card p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">PHQ-9 Assessment</h3>
              <p className="text-sm text-muted-foreground mb-6">Over the last 2 weeks, how often have you been bothered by the following?</p>
              
              <div className="space-y-4">
                {phq9Questions.map((q, i) => (
                  <div key={i} className="p-4 rounded-xl bg-muted/30">
                    <p className="text-sm font-medium text-foreground mb-3">{i + 1}. {q}</p>
                    <div className="flex gap-2 flex-wrap">
                      {["Not at all", "Several days", "More than half", "Nearly every day"].map((opt, j) => (
                        <button
                          key={j}
                          onClick={() => {
                            const newAnswers = [...phqAnswers];
                            newAnswers[i] = j;
                            setPhqAnswers(newAnswers);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            phqAnswers[i] === j
                              ? "gradient-primary text-primary-foreground shadow-soft"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={phqAnswers.includes(-1) || analyzing}
                >
                  {analyzing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                  ) : (
                    <>Submit Assessment <ArrowRight className="w-4 h-4 ml-1" /></>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {results === "done" && analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-6 rounded-2xl gradient-card shadow-card"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Analysis Result</h3>
            <pre className="text-sm text-muted-foreground overflow-auto">{JSON.stringify(analysis, null, 2)}</pre>
          </motion.div>
        )}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <MoodScoreCard label="Depression" value={12} icon="💙" color="bg-lavender-light" />
              <MoodScoreCard label="Anxiety" value={28} icon="💛" color="bg-peach" />
              <MoodScoreCard label="Stress" value={35} icon="⚡" color="bg-pink-light" />
              <MoodScoreCard label="Burnout" value={18} icon="🔥" color="bg-sage" />
            </div>

            <RiskMeter level="low" score={22} />

            <div className="rounded-2xl gradient-card shadow-card p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">AI Insights</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-sage/30">
                  <p className="text-sm font-medium text-foreground">✅ Positive emotional polarity detected</p>
                  <p className="text-xs text-muted-foreground">Your language shows overall optimistic framing.</p>
                </div>
                <div className="p-3 rounded-xl bg-peach/30">
                  <p className="text-sm font-medium text-foreground">⚠️ Mild work-related stress pattern</p>
                  <p className="text-xs text-muted-foreground">Consider scheduling breaks and using grounding techniques.</p>
                </div>
                <div className="p-3 rounded-xl bg-lavender-light/50">
                  <p className="text-sm font-medium text-foreground">💡 Recommendation</p>
                  <p className="text-xs text-muted-foreground">Try the 7-day anxiety reduction plan in your wellness tab.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="hero" onClick={() => setResults(null)}>
                New Assessment
              </Button>
              <Button variant="soft" asChild>
                <a href="/chatbot">Talk to Companion</a>
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Assessment;
