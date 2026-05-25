"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Sun, Moon } from "lucide-react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import MagneticButton from "@/app/components/MagneticButton";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  // Load user preference on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // Default to dark mode
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);

    // Rotate theme toggle icon 360deg on toggle
    if (!isReducedMotion && iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { rotate: 0, scale: 0.5 },
        { rotate: 360, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  };

  // Avoid hydration mismatch by waiting until client-side mount is complete
  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <MagneticButton
        onClick={toggleTheme}
        className="w-12 h-12 rounded-full glass-panel border border-light/10 text-light shadow-lg flex items-center justify-center cursor-none bg-dark/20 backdrop-blur-md hover:border-primary/50 transition-all duration-300"
      >
        <div ref={iconRef} className="flex items-center justify-center">
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-accent" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </div>
      </MagneticButton>
    </div>
  );
}
