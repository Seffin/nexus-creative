"use client";

import React, { useRef } from "react";
import gsap from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import AnimatedText from "@/app/components/AnimatedText";

const PROJECTS_DATA = [
  {
    id: 1,
    title: "AETHER ECOSYSTEM",
    category: "WebGL / Interactive Sandbox",
    year: "2026",
    gradient: "from-indigo-600 via-primary to-cyan-500",
    cursorType: "view",
  },
  {
    id: 2,
    title: "KRYPTON METAVERSE",
    category: "Next.js / 3D Configurator",
    year: "2025",
    gradient: "from-pink-600 via-secondary to-purple-600",
    cursorType: "view",
  },
  {
    id: 3,
    title: "HORIZON BRANDING",
    category: "Kinetic Motion Identity",
    year: "2026",
    gradient: "from-cyan-600 via-accent to-indigo-500",
    cursorType: "view",
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isReducedMotion) {
        // Skip entry animation on reduced motion
        gsap.set(".project-reveal-box", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
        gsap.set(".project-info", { y: 0, opacity: 1 });
        return;
      }

      const projects = containerRef.current?.querySelectorAll(".project-item");
      if (!projects) return;

      projects.forEach((project) => {
        const revealBox = project.querySelector(".project-reveal-box");
        const info = project.querySelector(".project-info");

        if (revealBox) {
          // Scroll triggered clip-path mask reveal (reveals from bottom to top)
          gsap.fromTo(
            revealBox,
            { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 1.25,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: project,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (info) {
          // Text slides up smoothly after the clip mask opens
          gsap.fromTo(
            info,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: project,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    },
    { scope: containerRef, dependencies: [isReducedMotion] }
  );

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative w-full section-padding bg-[var(--bg-color)] flex flex-col justify-center overflow-hidden z-10"
    >
      <div className="relative w-full max-layout-container container-padding z-10">
        {/* Header Block with fluid bottom margin */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[var(--space-lg)] gap-[var(--space-xs)]">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-[0.35em] uppercase text-[var(--accent-color)] mb-[var(--space-xs)]">
              Selected Works
            </span>
            <h2 className="text-[var(--text-color)] tracking-tight">
              <AnimatedText text="CASE STUDIES" el="span" stagger={0.05} />
            </h2>
          </div>
          <div className="text-[var(--text-mute)] text-sm font-mono tracking-widest leading-none">
            [ PORTFOLIO COLL. - 26 ]
          </div>
        </div>

        {/* Portfolio Grid with Fluid Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-md)]">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="project-item flex flex-col gap-[var(--space-sm)] group cursor-none"
              data-cursor={project.cursorType}
            >
              {/* Animated clip-path image container */}
              <div
                className="project-reveal-box relative w-full aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-[var(--border-color)] select-none will-change-transform"
                style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
              >
                {/* Premium Gradient Background Graphic */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} transition-transform duration-750 ease-out group-hover:scale-105 flex items-center justify-center`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:20px_20px] mix-blend-overlay opacity-60" />
                  
                  <div className="w-48 h-48 rounded-full bg-light/10 border border-light/20 backdrop-blur-md flex items-center justify-center shadow-2xl transform transition-transform duration-750 ease-out group-hover:rotate-45 group-hover:scale-110">
                    <span className="text-4xl font-extrabold tracking-widest text-white select-none">
                      0{project.id}
                    </span>
                  </div>
                </div>

                {/* Hover slide-up details overlay with container padding space */}
                <div className="absolute inset-0 bg-[var(--bg-color)]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-[var(--space-md)] z-10 pointer-events-none">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="text-[10px] font-mono tracking-widest text-[var(--accent-color)] uppercase block mb-1">
                      Platform Launch
                    </span>
                    <h4 className="text-xl font-extrabold tracking-tight text-[var(--text-color)]">
                      Launch Ecosystem &rarr;
                    </h4>
                  </div>
                </div>
              </div>

              {/* Bottom descriptors */}
              <div className="project-info px-2 flex justify-between items-start opacity-0 will-change-transform-opacity">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-[var(--text-color)] group-hover:text-primary transition-colors duration-300 mb-1">
                    {project.title}
                  </h3>
                  <span className="text-xs text-[var(--text-mute)] font-mono tracking-wide">
                    {project.category}
                  </span>
                </div>
                <div className="text-xs font-bold font-mono text-[var(--text-color)]/80 px-2.5 py-1 rounded bg-[var(--border-color)]/20 border border-[var(--border-color)]">
                  {project.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
