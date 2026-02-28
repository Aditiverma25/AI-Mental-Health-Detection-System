import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Shield, Heart, BarChart3, MessageCircle, Sparkles, ChevronRight, Check, Zap, Users, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import heroBg from "@/assets/hero-bg.jpg";


const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const features = [
  { icon: Brain, title: "AI Mood Detection", desc: "Multi-input analysis through text, voice, and structured assessments" },
  { icon: MessageCircle, title: "CBT Therapy Chatbot", desc: "Evidence-based cognitive behavioral therapy companion" },
  { icon: BarChart3, title: "Behavioral Tracking", desc: "Weekly trends, emotional heatmaps, and pattern insights" },
  { icon: Shield, title: "Crisis Detection", desc: "Real-time monitoring with smart escalation protocols" },
  { icon: Heart, title: "Wellness Plans", desc: "Personalized 7-14 day plans that adapt to your journey" },
  { icon: Sparkles, title: "AI Explainability", desc: "Transparent scoring with clear reasoning for every assessment" },
];

const steps = [
  { num: "01", title: "Share Your State", desc: "Journal, speak, or take structured assessments" },
  { num: "02", title: "AI Analyzes", desc: "Multi-model AI detects emotional patterns and risk factors" },
  { num: "03", title: "Get Insights", desc: "Receive personalized recommendations and wellness plans" },
];

const pricing = [
  {
    name: "Free",
    price: "$0",
    desc: "Get started with basics",
    features: ["5 assessments/month", "Basic chatbot", "Limited analytics", "Mood tracking"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    desc: "For personal wellness",
    features: ["Unlimited assessments", "Full analytics", "Wellness plans", "Priority support", "Emotional reports"],
    cta: "Start Pro",
    popular: true,
  },
  {
    name: "Premium",
    price: "$39",
    desc: "Advanced AI therapy",
    features: ["Everything in Pro", "Voice emotion analysis", "Advanced CBT therapy", "Crisis monitoring", "PDF reports"],
    cta: "Go Premium",
    popular: false,
  },
];

const faqs = [
  { q: "Is MindSense a replacement for therapy?", a: "No. MindSense is a supplementary tool designed to help you track emotional patterns and provide evidence-based exercises. It's not a substitute for professional medical diagnosis or treatment." },
  { q: "How does the AI detect emotions?", a: "We use a multi-model approach combining NLP sentiment analysis, emotion classification, and behavioral pattern recognition to provide comprehensive emotional insights." },
  { q: "Is my data private?", a: "Absolutely. We use end-to-end encryption, offer anonymous mode, and follow HIPAA/GDPR compliance structures. We never sell your data." },
  { q: "What happens if crisis is detected?", a: "Our system immediately shows emergency helplines for your country, suggests nearby therapists, and activates supportive-only mode to ensure your safety." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender-light text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Emotional Intelligence
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
                Detect Emotional Patterns{" "}
                <span className="text-gradient">
                  Before They Become Disorders
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                MindSense AI uses advanced emotional analytics to help you understand your mental health,
                track behavioral patterns, and receive personalized support.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/assessment">
                  <Button variant="hero" size="xl">
                    Start Free Assessment
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="glass" size="lg">
                    Learn More
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     

      {/* Features */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Comprehensive AI Mental Health Suite
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Six powerful AI-driven modules designed to support your emotional well-being.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl gradient-card shadow-card p-6 hover:shadow-glow transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-lavender-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              How MindSense Works
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Three simple steps to start understanding your emotional health.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <span className="text-xl font-bold text-primary-foreground">{s.num}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < 2 && (
                  <ChevronRight className="w-6 h-6 text-primary mx-auto mt-4 hidden md:block rotate-0" />
                )}
              </motion.div>
            ))}
          </div>

          
        </div>
      </section>

      {/* AI Technology */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                Multi-Model AI Architecture
              </h2>
              <p className="text-muted-foreground mb-8">
                Our modular pipeline combines multiple AI layers for comprehensive emotional analysis.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, label: "NLP Sentiment Layer", desc: "Real-time text analysis" },
                  { icon: Brain, label: "Emotion Classification", desc: "Multi-label detection" },
                  { icon: BarChart3, label: "Behavioral Prediction", desc: "Pattern forecasting" },
                  { icon: Shield, label: "Crisis Detection", desc: "Safety-first monitoring" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    {...stagger}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-lavender-light flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="relative">
              <div className="rounded-3xl gradient-card shadow-glow p-8 space-y-6">
                <h3 className="font-display text-xl font-semibold text-foreground">Sample Analysis Output</h3>
                <div className="space-y-3">
                  {[
                    { label: "Depression Probability", val: "12%", bar: 12, color: "bg-sage-dark" },
                    { label: "Anxiety Score", val: "28%", bar: 28, color: "bg-yellow-500" },
                    { label: "Stress Level", val: "35%", bar: 35, color: "bg-primary" },
                    { label: "Emotional Polarity", val: "72%", bar: 72, color: "bg-sage-dark" },
                    { label: "Confidence Score", val: "94%", bar: 94, color: "bg-primary" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-foreground">{item.val}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.bar}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Privacy-First Architecture
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Your mental health data deserves the highest level of protection.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["End-to-End Encryption", "Anonymous Mode", "HIPAA/GDPR Ready", "Zero Data Selling"].map((item, i) => (
              <motion.div
                key={item}
                {...stagger}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5 shadow-card"
              >
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground">Start free, upgrade when you're ready.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...stagger}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 ${plan.popular ? "gradient-primary text-primary-foreground shadow-glow scale-105" : "gradient-card shadow-card"}`}
              >
                {plan.popular && (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-xs font-medium mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2 mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>/month</span>
                </div>
                <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{plan.desc}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "glass" : "hero"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Need enterprise features? <a href="#" className="text-primary font-medium hover:underline">Contact us →</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Sarah M.", role: "Therapist", text: "MindSense helps my clients track their progress between sessions. The AI insights are remarkably accurate." },
              { name: "James K.", role: "Software Engineer", text: "I use it daily for burnout tracking. The wellness plans helped me regain work-life balance." },
              { name: "Dr. Lisa Chen", role: "Psychiatrist", text: "The crisis detection feature gives me peace of mind for high-risk patients. Highly recommend." },
            ].map((t, i) => (
              <motion.div key={t.name} {...stagger} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 shadow-card">
                <p className="text-sm text-foreground mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                {...stagger}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl gradient-card shadow-card p-5 group"
              >
                <summary className="font-medium text-foreground cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-sm text-muted-foreground mt-3">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 gradient-primary text-center">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-4">
              Start Understanding Your Mind Today
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Join thousands who are taking proactive steps toward better mental health.
            </p>
            <Link to="/assessment">
              <Button variant="glass" size="xl" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                Begin Free Assessment
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground">MindSense AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 MindSense AI. All rights reserved. Not a medical device.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

