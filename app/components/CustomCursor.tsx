"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "@/app/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Use GSAP quickTo for 60fps high performance follower tracking
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });
    
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3.out" });

    // Set initial positions offscreen
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    // Attach mousemove listener
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Dynamic cursor hover detection via event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("[data-cursor]") as HTMLElement | null;

      if (hoverable) {
        const type = hoverable.getAttribute("data-cursor");
        setHoverType(type);
        setIsHovering(true);

        // Customize cursor styling based on target attribute
        if (type === "view") {
          setCursorText("VIEW");
          gsap.to(follower, {
            width: 70,
            height: 70,
            backgroundColor: "rgba(99, 102, 241, 0.9)",
            borderColor: "rgba(99, 102, 241, 1)",
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(cursor, { opacity: 0, duration: 0.2 });
        } else if (type === "magnetic") {
          setCursorText("");
          gsap.to(follower, {
            width: 50,
            height: 50,
            borderColor: "#ec4899", // secondary color pink
            borderWidth: 2,
            backgroundColor: "transparent",
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(cursor, { scale: 1.5, backgroundColor: "#ec4899", duration: 0.2 });
        } else if (type === "cyan") {
          setCursorText("GO!");
          gsap.to(follower, {
            width: 64,
            height: 64,
            backgroundColor: "rgba(6, 182, 212, 0.9)",
            borderColor: "rgba(6, 182, 212, 1)",
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(cursor, { opacity: 0, duration: 0.2 });
        } else {
          // Standard pointer hover
          setCursorText("");
          gsap.to(follower, {
            scale: 1.3,
            borderColor: "var(--primary-color)", // Indigo color responsive
            borderWidth: 2,
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(cursor, { scale: 0.5, backgroundColor: "var(--primary-color)", duration: 0.2 });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("[data-cursor]") as HTMLElement | null;

      if (hoverable) {
        setIsHovering(false);
        setHoverType(null);
        setCursorText("");
        
        // Restore default cursor styles responding dynamically to theme variable properties
        gsap.to(follower, {
          width: 32,
          height: 32,
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "var(--text-color)",
          borderWidth: 1.5,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          backgroundColor: "var(--text-color)",
          duration: 0.2
        });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseout", handleMouseOut);
    };
  }, [isVisible]);

  // Hide on mobile or touchscreen devices
  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer Follower Ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-1.5 border-[var(--border-color)] flex items-center justify-center pointer-events-none mix-blend-difference overflow-hidden"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      >
        <span
          ref={textRef}
          className="text-[10px] font-bold text-dark dark:text-light select-none tracking-widest leading-none pointer-events-none"
        >
          {cursorText}
        </span>
      </div>

      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--text-color)] pointer-events-none mix-blend-difference"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      />
    </div>
  );
}
