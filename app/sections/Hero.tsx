"use client";

import React, { useRef } from "react";
import gsap from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import AnimatedText from "@/app/components/AnimatedText";
import ScrollIndicator from "@/app/components/ScrollIndicator";
import MagneticButton from "@/app/components/MagneticButton";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  // Floating shape layers to animate
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const shape4Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion) return;

      // High-performance direct mousemove listener to completely avoid React re-renders and UI stutters/vibration
      const handleMouseMove = (e: MouseEvent) => {
        const xOffset = (e.clientX - window.innerWidth / 2) * 0.05;
        const yOffset = (e.clientY - window.innerHeight / 2) * 0.05;

        gsap.to(shape1Ref.current, { x: xOffset * 0.4, y: yOffset * 0.4, duration: 0.8, ease: "power2.out" });
        gsap.to(shape2Ref.current, { x: -xOffset * 0.6, y: -yOffset * 0.6, duration: 0.8, ease: "power2.out" });
        gsap.to(shape3Ref.current, { x: xOffset * 0.8, y: -yOffset * 0.8, duration: 0.8, ease: "power2.out" });
        gsap.to(shape4Ref.current, { x: -xOffset * 0.3, y: yOffset * 0.3, duration: 0.8, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Loop floating rotation animations for shapes
      gsap.to([shape1Ref.current, shape3Ref.current], {
        rotate: 360,
        duration: 25,
        repeat: -1,
        ease: "none"
      });

      gsap.to([shape2Ref.current, shape4Ref.current], {
        rotate: -360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Entry reveal animations for CTA and navigation
      gsap.fromTo(
        ".navbar",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.4 }
      );

      gsap.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.8 }
      );

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef, dependencies: [isReducedMotion] }
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[var(--bg-color)] z-10"
    >
      {/* Immersive mesh background */}
      <div className="mesh-gradient-bg animate-pulse duration-10000" />

      {/* Floating 3D/Abstract Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Glowing Indigo Sphere */}
        <div
          ref={shape1Ref}
          className="absolute top-[20%] left-[15%] w-48 h-48 rounded-full bg-primary/20 blur-3xl opacity-60"
        />
        {/* Pink Torus Represented by a Ring */}
        <div
          ref={shape2Ref}
          className="absolute top-[35%] right-[20%] w-64 h-64 rounded-full border-[20px] border-secondary/15 backdrop-blur-[2px] opacity-75 flex items-center justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-transparent border border-secondary/10" />
        </div>
        {/* Cyan Abstract Geometric Square */}
        <div
          ref={shape3Ref}
          className="absolute bottom-[25%] left-[25%] w-40 h-40 border border-accent/20 rounded-3xl backdrop-blur-[1px] opacity-50 transform rotate-12"
          style={{ boxShadow: "inset 0 0 20px rgba(6, 182, 212, 0.1)" }}
        />
        {/* Subtle glowing particle block */}
        <div
          ref={shape4Ref}
          className="absolute bottom-[40%] right-[35%] w-16 h-16 bg-gradient-to-tr from-accent/25 to-primary/25 rounded-full blur-xl opacity-75"
        />
      </div>

      {/* Navigation Header with Fluid Spacing & Substantial Scaling */}
      <header className="navbar relative w-full max-layout-container container-padding py-[var(--space-md)] flex justify-between items-center z-20">
        <div 
          className="text-3xl font-black tracking-wider text-[var(--text-color)] select-none cursor-pointer"
          data-cursor="magnetic"
          onClick={() => scrollToSection("hero")}
        >
          NEXUS<span className="text-secondary">.</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-[var(--space-lg)]">
          {["services", "portfolio", "testimonials", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-base font-semibold tracking-wider text-[var(--text-color)]/70 hover:text-[var(--text-color)] transition-colors uppercase cursor-pointer"
              data-cursor="pointer"
            >
              {item}
            </button>
          ))}
        </nav>

        <div>
          <MagneticButton 
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3.5 rounded-full border border-[var(--border-color)] bg-[var(--border-color)] text-[var(--text-color)] text-sm font-bold tracking-widest uppercase hover:bg-[var(--border-color)]/20 transition-all duration-300 min-w-[170px]"
          >
            Get In Touch
          </MagneticButton>
        </div>
      </header>

      {/* Main Hero Content with Container Padding and Spacing Gap */}
      <div className="relative w-full max-layout-container container-padding flex flex-col justify-center flex-grow z-10 py-[var(--space-lg)]">
        <div className="max-w-4xl">
          <span className="inline-block text-xs font-bold tracking-[0.35em] uppercase text-[var(--accent-color)] mb-[var(--space-xs)]">
            Creative Production Studio
          </span>
          
          <h1 className="font-hero text-[var(--text-color)] tracking-tighter mb-[var(--space-sm)] flex flex-col">
            <AnimatedText
              text="WE SHAPE DIGITAL"
              className="leading-[0.95]"
              el="span"
              stagger={0.04}
              triggerScroll={false}
            />
            <AnimatedText
              text="DIMENSIONS"
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent leading-[0.95]"
              el="span"
              stagger={0.04}
              delay={0.3}
              triggerScroll={false}
            />
          </h1>

          <p className="text-base md:text-xl text-[var(--text-mute)] max-w-2xl leading-relaxed mb-[var(--space-md)] font-sans">
            Crafting hyper-immersive 3D, motion-rich, and boundary-pushing web experiences that elevate human connection and leave deep digital footprints.
          </p>

          <div className="hero-cta flex flex-wrap gap-[var(--space-sm)] items-center">
            <MagneticButton
              onClick={() => scrollToSection("portfolio")}
              className="px-12 py-5 rounded-full bg-gradient-to-r from-primary to-secondary text-base font-bold tracking-wider uppercase text-white shadow-lg hover:shadow-primary/20 transition-shadow duration-300 min-w-[240px] text-center"
            >
              - Explore Studio Projects -
            </MagneticButton>
            <button
              onClick={() => scrollToSection("services")}
              className="px-12 py-5 rounded-full border border-[var(--border-color)] hover:border-[var(--text-color)]/30 bg-transparent text-base font-semibold tracking-wider uppercase text-[var(--text-color)] transition-colors duration-300 cursor-pointer min-w-[200px] text-center"
              data-cursor="pointer"
            >
              Our Specialties
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator footer */}
      <div className="relative w-full pb-[var(--space-xs)] flex justify-center z-10">
        <div className="cursor-pointer" onClick={() => scrollToSection("services")} data-cursor="pointer">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
