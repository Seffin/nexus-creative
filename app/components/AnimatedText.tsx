"use client";

import React, { useRef } from "react";
import gsap from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  duration?: number;
  delay?: number;
  triggerScroll?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  el = "span",
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
  triggerScroll = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(" ");
  const isReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isReducedMotion) {
        // Skip entry animation if user prefers reduced motion
        gsap.set(".char-inner", { y: 0, opacity: 1 });
        return;
      }

      const chars = containerRef.current?.querySelectorAll(".char-inner");
      if (!chars || chars.length === 0) return;

      const animationOptions: gsap.TweenVars = {
        y: 0,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        ease: "power4.out",
        delay: delay,
      };

      if (triggerScroll) {
        // Scroll triggered character reveal
        gsap.fromTo(
          chars,
          { y: 60, opacity: 0 },
          {
            ...animationOptions,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        // Direct reveal animation (e.g. for Hero load)
        gsap.fromTo(chars, { y: 60, opacity: 0 }, animationOptions);
      }
    },
    { scope: containerRef, dependencies: [text, isReducedMotion] }
  );

  const Component = el;

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block overflow-hidden py-1 ${className}`}
    >
      <span className="sr-only">{text}</span>
      <span className="flex flex-wrap" aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="char-inner inline-block translate-y-[100%] opacity-0 will-change-transform-opacity"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Component>
  );
}
