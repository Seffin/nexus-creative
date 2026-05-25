"use client";

import React, { useRef, useEffect } from "react";
import gsap from "@/app/lib/gsap";
import { useScrollVelocity } from "@/app/hooks/useScrollVelocity";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import AnimatedText from "@/app/components/AnimatedText";

const TESTIMONIALS_1 = [
  { text: "NEXUS delivered a visual tour-de-force that redefined our product aesthetic.", author: "CEO, AETHER" },
  { text: "Blindingly fast Next.js architectures that score a flawless 100 on Web Vitals.", author: "CTO, APEX" },
  { text: "Working with them felt like shaping a new dimension of immersive digital design.", author: "VP, HORIZON" },
];

const TESTIMONIALS_2 = [
  { text: "Their GSAP structures run at a perfectly fluid 60fps. Complete technical mastery.", author: "ARCHITECT, KRYPTON" },
  { text: "Highly scalable components combined with a premium design system that wows.", author: "DIRECTOR, SYNAPSE" },
  { text: "Bespoke animations and gorgeous dark-mode glassmorphic details. Phenomenal work.", author: "LEAD, CYCLONE" },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  
  const scrollVelocity = useScrollVelocity();
  const isReducedMotion = useReducedMotion();

  // Keep track of scroll velocity to apply to marquees
  const accumulatedPos1 = useRef(0);
  const accumulatedPos2 = useRef(0);
  
  const isHovered1 = useRef(false);
  const isHovered2 = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || isReducedMotion) return;

    const row1 = marquee1Ref.current;
    const row2 = marquee2Ref.current;

    if (!row1 || !row2) return;

    let rAFId: number;

    const animateMarquee = () => {
      // Calculate speed contribution from scroll velocity
      const velocityImpact = Math.abs(scrollVelocity) * 4;
      
      // Row 1 - Left direction
      const baseSpeed1 = isHovered1.current ? 0.2 : 1.25;
      const speed1 = baseSpeed1 + velocityImpact;
      accumulatedPos1.current -= speed1;
      
      // If translated past 50% (the cloned set), reset back to 0
      if (accumulatedPos1.current <= -50) {
        accumulatedPos1.current = 0;
      }
      gsap.set(row1, { xPercent: accumulatedPos1.current });

      // Row 2 - Right direction (starts at -50% and translates to 0)
      const baseSpeed2 = isHovered2.current ? 0.2 : 1.25;
      const speed2 = baseSpeed2 + velocityImpact;
      accumulatedPos2.current += speed2;
      
      if (accumulatedPos2.current >= 0) {
        accumulatedPos2.current = -50;
      }
      gsap.set(row2, { xPercent: accumulatedPos2.current });

      rAFId = requestAnimationFrame(animateMarquee);
    };

    // Initialize row positions
    gsap.set(row1, { xPercent: 0 });
    gsap.set(row2, { xPercent: -50 });

    rAFId = requestAnimationFrame(animateMarquee);

    return () => {
      cancelAnimationFrame(rAFId);
    };
  }, [scrollVelocity, isReducedMotion]);

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative w-full section-padding bg-[var(--bg-color)]/95 flex flex-col justify-center overflow-hidden z-10"
    >
      {/* Decorative vertical wire lines in background */}
      <div className="absolute inset-y-0 left-[15%] w-px bg-[var(--text-color)]/[0.03] z-0" />
      <div className="absolute inset-y-0 right-[25%] w-px bg-[var(--text-color)]/[0.03] z-0" />

      <div className="relative w-full max-layout-container container-padding z-10 mb-[var(--space-lg)]">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-bold tracking-[0.35em] uppercase text-[var(--accent-color)] mb-[var(--space-xs)]">
            Testimonials & Praise
          </span>
          <h2 className="text-[var(--text-color)] tracking-tight">
            <AnimatedText text="CLIENT REVIEWS" el="span" stagger={0.05} />
          </h2>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="relative w-full flex flex-col gap-[var(--space-sm)] z-10 py-4 overflow-hidden">
        
        {/* ROW 1: Moves Left */}
        <div
          className="marquee-container w-full whitespace-nowrap cursor-none"
          onMouseEnter={() => { isHovered1.current = true; }}
          onMouseLeave={() => { isHovered1.current = false; }}
          data-cursor="pointer"
        >
          <div
            ref={marquee1Ref}
            className="flex items-center gap-[var(--space-sm)] select-none will-change-transform"
            style={{ width: "fit-content" }}
          >
            {[...TESTIMONIALS_1, ...TESTIMONIALS_1].map((t, idx) => (
              <div
                key={idx}
                className="glass-panel card-padding rounded-3xl w-[350px] md:w-[480px] shrink-0 border border-[var(--border-color)] relative overflow-hidden"
              >
                <p className="text-sm md:text-base text-[var(--text-color)]/80 font-sans italic leading-relaxed mb-[var(--space-sm)] whitespace-normal">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-primary font-mono">
                    {t.author}
                  </span>
                  <span className="text-[10px] text-[var(--text-mute)]/40 font-mono">VERIFIED //</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Moves Right */}
        <div
          className="marquee-container w-full whitespace-nowrap cursor-none"
          onMouseEnter={() => { isHovered2.current = true; }}
          onMouseLeave={() => { isHovered2.current = false; }}
          data-cursor="pointer"
        >
          <div
            ref={marquee2Ref}
            className="flex items-center gap-[var(--space-sm)] select-none will-change-transform"
            style={{ width: "fit-content" }}
          >
            {[...TESTIMONIALS_2, ...TESTIMONIALS_2].map((t, idx) => (
              <div
                key={idx}
                className="glass-panel card-padding rounded-3xl w-[350px] md:w-[480px] shrink-0 border border-[var(--border-color)] relative overflow-hidden"
              >
                <p className="text-sm md:text-base text-[var(--text-color)]/80 font-sans italic leading-relaxed mb-[var(--space-sm)] whitespace-normal">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-secondary font-mono">
                    {t.author}
                  </span>
                  <span className="text-[10px] text-[var(--text-mute)]/40 font-mono">VERIFIED //</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
