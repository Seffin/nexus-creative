"use client";

import React, { useRef } from "react";
import gsap from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isReducedMotion || !buttonRef.current) return;

      const button = buttonRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        
        // Calculate relative mouse coordinates from center of button
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        // Translate the button partially towards the mouse (35% magnetic capture)
        gsap.to(button, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        // Elastic release back to center
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.75,
          ease: "elastic.out(1.1, 0.35)",
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: buttonRef, dependencies: [isReducedMotion] }
  );

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={`relative select-none flex items-center justify-center will-change-transform ${className}`}
      data-cursor="magnetic"
    >
      {children}
    </button>
  );
}
