"use client";

import React, { useRef } from "react";
import gsap from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import MagneticButton from "@/app/components/MagneticButton";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg className={props.className} fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg className={props.className} fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg className={props.className} fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg className={props.className} fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.198c-.227-.087-2.18-.787-4.453-.362.94 2.58 1.317 4.79 1.385 5.228 1.83-1.42 2.875-3.522 3.068-4.866zm-5.076 6.096c-.116-.62-.544-2.89-1.554-5.52-2.158.625-4.22.617-5.918.577-.015.068-.03.137-.043.208-.574 2.91-.84 5.305-.886 5.766 1.55.516 3.2.784 4.912.784 1.252 0 2.463-.146 3.487-.415zm-9.356-.81c.068-.466.36-2.76.924-5.61-1.76-.05-3.7-.016-5.467.067.753 2.544 2.443 4.675 4.543 5.543zm-4.707-7.234c1.643-.09 3.447-.133 5.097-.087.165-2.783.315-4.992.366-5.83-.872-.258-1.79-.404-2.744-.404-2.876 0-5.39 1.63-6.666 4.02a11.83 11.83 0 0 0 3.947 2.3zm8.396-6.634c-.053.864-.207 3.036-.378 5.78 1.895-.49 3.526-.23 4.148-.113A11.95 11.95 0 0 0 12 3.228zm5.5 2.385c-.53-.102-1.923-.284-3.585.158.835 2.18 1.196 4.172 1.306 4.887 1.837-.17 3.826.4 4.103.49a11.91 11.91 0 0 0-1.824-5.535z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isReducedMotion) return;

      // Subtle rotation animation on Y axis for social icons
      const icons = containerRef.current?.querySelectorAll(".social-icon");
      if (!icons) return;

      icons.forEach((icon) => {
        const handleMouseEnter = () => {
          gsap.to(icon, {
            rotateY: 360,
            scale: 1.15,
            color: "#6366f1", // primary color indigo
            duration: 0.6,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(icon, {
            rotateY: 0,
            scale: 1,
            color: "var(--text-color)",
            duration: 0.6,
            ease: "power2.out",
          });
        };

        icon.addEventListener("mouseenter", handleMouseEnter);
        icon.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          icon.removeEventListener("mouseenter", handleMouseEnter);
          icon.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    },
    { scope: containerRef, dependencies: [isReducedMotion] }
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={containerRef}
      className="sticky bottom-0 left-0 w-full h-[400px] md:h-[450px] bg-[var(--bg-color)] border-t border-[var(--border-color)] flex flex-col justify-between z-0"
    >
      {/* Huge Background Backdrop Text */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-[250px] z-0 flex items-end justify-center">
        <span className="text-[14vw] font-black tracking-widest text-[var(--text-color)]/[0.015] leading-none select-none pointer-events-none uppercase">
          NEXUS
        </span>
      </div>

      <div className="relative w-full max-layout-container container-padding pt-[var(--space-md)] flex-grow z-10">
        
        {/* Top Segment with dynamic fluid spacings */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-[var(--space-md)] mb-[var(--space-sm)]">
          
          {/* Brand Column */}
          <div>
            <div className="text-3xl font-black tracking-wider text-[var(--text-color)] mb-[var(--space-xs)] select-none">
              NEXUS<span className="text-secondary">.</span>
            </div>
            <p className="text-sm text-[var(--text-mute)] font-sans max-w-xs leading-relaxed">
              Crafting premium interactive spatial realities and cinematic motion architectures.
            </p>
          </div>

          {/* Sitemaps with fluid gaps */}
          <div className="flex gap-[var(--space-md)] font-mono text-xs">
            <div className="flex flex-col gap-3">
              <span className="text-[var(--text-mute)]/30 tracking-wider font-bold">DIRECTORY //</span>
              <a href="#services" className="text-[var(--text-color)]/60 hover:text-primary transition-colors animate-none" data-cursor="pointer">Specialties</a>
              <a href="#portfolio" className="text-[var(--text-color)]/60 hover:text-primary transition-colors animate-none" data-cursor="pointer">Case Studies</a>
              <a href="#testimonials" className="text-[var(--text-color)]/60 hover:text-primary transition-colors animate-none" data-cursor="pointer">Client Reviews</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[var(--text-mute)]/30 tracking-wider font-bold">RESOURCES //</span>
              <span className="text-[var(--text-mute)]/40 cursor-not-allowed">Style Guide</span>
              <span className="text-[var(--text-mute)]/40 cursor-not-allowed">Terms of Art</span>
              <span className="text-[var(--text-mute)]/40 cursor-not-allowed">System Status</span>
            </div>
          </div>

          {/* Back to top magnetic anchor - Upscaled to 72px (w-18 h-18) */}
          <div>
            <MagneticButton
              onClick={scrollToTop}
              className="w-18 h-18 rounded-full border border-[var(--border-color)] bg-[var(--border-color)]/10 text-[var(--text-color)] hover:bg-[var(--border-color)]/30 transition-all duration-300 flex items-center justify-center"
            >
              <ArrowUp className="w-6 h-6" />
            </MagneticButton>
          </div>

        </div>

      </div>

      {/* Bottom Segment */}
      <div className="relative w-full border-t border-[var(--border-color)] py-[var(--space-sm)] z-10">
        <div className="max-layout-container container-padding flex flex-col sm:flex-row items-center justify-between gap-[var(--space-xs)]">
          
          {/* Copyrights */}
          <div className="text-xs font-mono text-[var(--text-mute)]/50">
            &copy; {new Date().getFullYear()} NEXUS STUDIO. ALL DIMENSIONS SECURED.
          </div>

          {/* Social Icons with Y axis rotates */}
          <div className="flex items-center gap-[var(--space-sm)]">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-[var(--text-color)] hover:text-primary transition-colors flex items-center justify-center p-1 cursor-none"
                  aria-label={social.label}
                  data-cursor="pointer"
                  style={{ perspective: "1000px" }}
                >
                  <Icon className="w-5 h-5 will-change-transform" />
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </footer>
  );
}
