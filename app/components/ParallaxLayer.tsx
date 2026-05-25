"use client";

import React, { useRef } from "react";
import gsap from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number; // multiplier value (e.g. 0.5, -0.3, 1.2)
  className?: string;
}

export default function ParallaxLayer({ children, speed, className = "" }: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isReducedMotion || !layerRef.current) return;

      // Calculate vertical translation relative to speed multiplier
      const yVal = -(speed * 150);

      gsap.fromTo(
        layerRef.current,
        { y: 0 },
        {
          y: yVal,
          ease: "none",
          scrollTrigger: {
            trigger: layerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: layerRef, dependencies: [speed, isReducedMotion] }
  );

  return (
    <div ref={layerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
