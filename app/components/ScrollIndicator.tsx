"use client";

import React, { useRef } from "react";
import gsap from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scrollRef.current) return;

      // Animate arrows sequentially to indicate direction
      gsap.fromTo(
        ".arrow",
        { y: -5, opacity: 0.1 },
        {
          y: 8,
          opacity: 1,
          duration: 1.25,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          stagger: 0.25,
        }
      );
    },
    { scope: scrollRef }
  );

  return (
    <div
      ref={scrollRef}
      className="flex flex-col items-center justify-center gap-0 select-none pointer-events-none opacity-80"
    >
      <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-light/50 mb-2">
        Scroll Down
      </span>
      <ChevronDown className="arrow w-5 h-5 text-primary" />
      <ChevronDown className="arrow w-5 h-5 text-accent -mt-3.5" />
    </div>
  );
}
