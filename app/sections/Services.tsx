"use client";

import React, { useRef } from "react";
import gsap from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, Cpu, Layers, Globe } from "lucide-react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import ParallaxLayer from "@/app/components/ParallaxLayer";
import AnimatedText from "@/app/components/AnimatedText";

const SERVICES_DATA = [
  {
    id: 1,
    icon: Sparkles,
    title: "Immersive Experiences",
    description: "Crafting fully bespoke WebGL, Canvas, and three-dimensional digital products that transcend traditional browser boundaries and hook users instantly.",
    color: "from-primary/15 to-primary/5",
    accent: "text-primary",
  },
  {
    id: 2,
    icon: Cpu,
    title: "Next.js & Architecture",
    description: "Architecting blindingly fast, hyper-optimized React architectures built to score perfect 100 Web Vitals and scale seamlessly to millions of visitors.",
    color: "from-accent/15 to-accent/5",
    accent: "text-[var(--accent-color)]",
  },
  {
    id: 3,
    icon: Layers,
    title: "Kinetic Motion Design",
    description: "Applying expert GSAP sequencing and custom easing formulas to build delightful micro-interactions, complex scroll stories, and responsive graphics.",
    color: "from-secondary/15 to-secondary/5",
    accent: "text-secondary",
  },
  {
    id: 4,
    icon: Globe,
    title: "Digital Art Direction",
    description: "Translating brand identities into unique spatial environments, immersive styling codes, and premium design systems that dominate search rankings.",
    color: "from-primary/10 to-accent/5",
    accent: "text-[var(--text-color)]",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isReducedMotion) {
        // Skip entry animation on reduced motion
        gsap.set(".service-card", { y: 0, opacity: 1 });
        return;
      }

      // Staggered entry animation for service cards when section enters viewport
      gsap.fromTo(
        ".service-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [isReducedMotion] }
  );

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full section-padding bg-[var(--bg-color)] flex flex-col justify-center overflow-hidden z-10"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,var(--grid-line-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line-color)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none" />

      {/* Layer 1: Slow Background Parallax text (0.3x speed) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParallaxLayer speed={0.45} className="absolute -top-10 left-[5%] select-none">
          <span className="text-[12rem] font-black uppercase text-[var(--text-color)]/[0.015] tracking-widest leading-none block whitespace-nowrap">
            STUDIO POWER
          </span>
        </ParallaxLayer>
      </div>

      <div className="relative w-full max-layout-container container-padding z-10">
        {/* Header Area with responsive spacing bottom */}
        <div className="max-w-2xl mb-[var(--space-lg)]">
          <span className="inline-block text-xs font-bold tracking-[0.35em] uppercase text-[var(--accent-color)] mb-[var(--space-xs)]">
            Capabilities & Mastery
          </span>
          <h2 className="text-[var(--text-color)] tracking-tight mb-[var(--space-sm)]">
            <AnimatedText text="OUR SPECIALTIES" el="span" stagger={0.05} />
          </h2>
          <p className="text-[var(--text-mute)] font-sans max-w-xl">
            We deliver state-of-the-art visual assets, highly scalable systems, and bespoke interactive modules built to stand out and perform.
          </p>
        </div>

        {/* Content Layer with Card Spacing Gaps */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-sm)] items-stretch mb-[var(--space-sm)]"
        >
          {SERVICES_DATA.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="service-card glass-panel glass-panel-hover card-padding rounded-3xl flex flex-col justify-between relative overflow-hidden group will-change-transform-opacity"
                data-cursor="pointer"
              >
                {/* Internal Card Background Accent */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}
                />

                <div className="relative z-10">
                  <div className={`p-4 rounded-2xl bg-[var(--border-color)]/20 inline-flex items-center justify-center ${service.accent} mb-[var(--space-sm)] transition-transform duration-500 group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-[var(--text-color)] mb-[var(--space-xs)] tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-[var(--text-mute)] font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="relative z-10 mt-[var(--space-sm)] flex items-center justify-between text-xs font-bold tracking-widest text-[var(--text-mute)]/70 group-hover:text-[var(--text-color)] transition-colors duration-300">
                  <span>0{index + 1}</span>
                  <span className="transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Layer 3: Foreground Parallax elements (1.4x speed) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-20">
        <ParallaxLayer speed={-0.6} className="absolute -bottom-20 right-[10%] flex gap-8">
          <div className="w-16 h-16 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md flex items-center justify-center shadow-lg transform rotate-45">
            <div className="w-4 h-4 bg-[var(--accent-color)] rounded-full animate-ping" />
          </div>
          <div className="w-12 h-12 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md flex items-center justify-center shadow-lg transform -rotate-12">
            <span className="text-[10px] font-bold text-secondary font-mono">60FPS</span>
          </div>
        </ParallaxLayer>
      </div>
    </section>
  );
}
