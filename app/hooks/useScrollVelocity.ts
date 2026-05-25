import { useState, useEffect, useRef } from "react";

export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const rAFRef = useRef<number | null>(null);
  const currentVelocity = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastScrollY.current = window.scrollY;
    lastTime.current = Date.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDelta = Math.max(currentTime - lastTime.current, 1); // Avoid division by zero
      const scrollDelta = currentScrollY - lastScrollY.current;

      // Calculate velocity: pixels per millisecond
      const v = scrollDelta / timeDelta;
      
      // Amplify and clamp velocity for interactive marquee speeds
      const targetVelocity = Math.min(Math.max(v * 3.5, -8), 8);
      
      currentVelocity.current = targetVelocity;

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    const updateDecay = () => {
      // Smoothly decay velocity back to 0
      currentVelocity.current *= 0.95; // 5% decay per frame
      
      if (Math.abs(currentVelocity.current) < 0.01) {
        currentVelocity.current = 0;
      }
      
      setVelocity(currentVelocity.current);
      rAFRef.current = requestAnimationFrame(updateDecay);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rAFRef.current = requestAnimationFrame(updateDecay);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  return velocity;
}
