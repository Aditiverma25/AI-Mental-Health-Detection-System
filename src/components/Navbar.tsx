import logo from "../assets/mylogo.png";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import { useAuth } from "@/context/useAuth";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">

        {/* LEFT SIDE - LOGO + NAME */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MindCare Logo" className="h-10 w-auto" />
          <span className="font-display text-xl font-semibold text-foreground">
            MindCare
          </span>
        </Link>

        {/* CENTER NAV LINKS */}
        {isLanding && (
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* RIGHT SIDE BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="ghost" onClick={logout}>Logout</Button>
              <Link to="/dashboard">
                <Button variant="soft">Dashboard</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="ghost">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* mobile panel */}
      {mobileOpen && (
        <div className="md:hidden bg-background glass p-4">
          <nav className="flex flex-col gap-3 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <button onClick={logout} className="text-sm text-primary">Logout</button>
                <Link to="/dashboard" className="text-sm text-primary">Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-primary">Login</Link>
                <Link to="/register" className="text-sm text-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </motion.header>
  );
}