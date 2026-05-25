"use client";

import React, { useRef, useState } from "react";
import gsap from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import MagneticButton from "@/app/components/MagneticButton";
import AnimatedText from "@/app/components/AnimatedText";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Simulate entry submission
    setIsSubmitted(true);
  };

  useGSAP(
    () => {
      if (!isSubmitted) return;

      if (isReducedMotion) {
        gsap.set(".checkmark-path", { strokeDashoffset: 0 });
        return;
      }

      // Complete SVG Checkmark draw-in animation sequence
      const tl = gsap.timeline();
      
      tl.fromTo(
        ".success-card",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }
      );

      tl.fromTo(
        ".checkmark-path",
        { strokeDashoffset: 80 },
        { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }
      );
    },
    { scope: successRef, dependencies: [isSubmitted, isReducedMotion] }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full section-padding bg-[var(--bg-color)] flex flex-col justify-center overflow-hidden z-10"
    >
      <div className="relative w-full max-layout-container container-padding z-10">
        
        {/* Split Layout Container with Fluid Gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-md)] items-start">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col">
            <span className="inline-block text-xs font-bold tracking-[0.35em] uppercase text-[var(--accent-color)] mb-[var(--space-xs)]">
              Get In Touch
            </span>
            <h2 className="text-[var(--text-color)] tracking-tight mb-[var(--space-sm)]">
              <AnimatedText text="LET'S DEFINE NEW" el="span" stagger={0.05} />
              <br />
              <AnimatedText
                text="DIMENSIONS TOGETHER."
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
                el="span"
                stagger={0.05}
                delay={0.35}
              />
            </h2>
            
            <p className="text-[var(--text-mute)] font-sans max-w-lg mb-[var(--space-md)]">
              Ready to construct something spectacular? Drop us a message detailing your goals. Our architectural design team is currently accepting immersive projects for Q3/Q4.
            </p>

            <div className="flex flex-col gap-[var(--space-xs)] font-mono text-sm">
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-[var(--text-mute)]/50">STUDIO //</span>
                <span className="text-[var(--text-color)]/80">London, United Kingdom</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-[var(--text-mute)]/50">CONTACT //</span>
                <span className="text-primary hover:text-secondary select-all cursor-pointer" data-cursor="pointer">
                  hello@nexus-creative.design
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-[var(--text-mute)]/50">AVAILABILITY //</span>
                <span className="flex items-center gap-2 text-[var(--accent-color)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse" />
                  AVAILABLE FOR BOOKINGS
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Form State Switch */}
          <div className="w-full relative min-h-[450px]">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-sm)] w-full">
                
                {/* Name Input with Responsive vertical padding */}
                <div className="relative w-full border-b border-[var(--border-color)] hover:border-[var(--text-color)]/25 focus-within:border-[var(--accent-color)] transition-colors duration-300 py-[var(--space-xs)]">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    className="peer w-full bg-transparent text-[var(--text-color)] border-0 focus:ring-0 outline-hidden placeholder-transparent text-base font-sans"
                    placeholder="Your Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-3 text-[var(--text-mute)] text-base font-sans pointer-events-none transform -translate-y-0 scale-100 origin-top-left transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--accent-color)] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                  >
                    Your Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative w-full border-b border-[var(--border-color)] hover:border-[var(--text-color)]/25 focus-within:border-[var(--accent-color)] transition-colors duration-300 py-[var(--space-xs)]">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    className="peer w-full bg-transparent text-[var(--text-color)] border-0 focus:ring-0 outline-hidden placeholder-transparent text-base font-sans"
                    placeholder="Your Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-3 text-[var(--text-mute)] text-base font-sans pointer-events-none transform -translate-y-0 scale-100 origin-top-left transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--accent-color)] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                  >
                    Your Email Address
                  </label>
                </div>

                {/* Message TextArea */}
                <div className="relative w-full border-b border-[var(--border-color)] hover:border-[var(--text-color)]/25 focus-within:border-[var(--accent-color)] transition-colors duration-300 py-[var(--space-xs)]">
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleInputChange}
                    className="peer w-full bg-transparent text-[var(--text-color)] border-0 focus:ring-0 outline-hidden placeholder-transparent text-base font-sans resize-none"
                    placeholder="Describe Your Project"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-3 text-[var(--text-mute)] text-base font-sans pointer-events-none transform -translate-y-0 scale-100 origin-top-left transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--accent-color)] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75"
                  >
                    Describe Your Goals & Scope
                  </label>
                </div>

                {/* Submit Container with Magnetic Button - Expanded Width */}
                <div className="mt-[var(--space-xs)]">
                  <MagneticButton
                    type="submit"
                    className="px-14 py-[22px] rounded-full bg-[var(--text-color)] text-[var(--bg-color)] font-black tracking-widest text-sm uppercase hover:bg-[var(--accent-color)] hover:text-white transition-colors duration-300 shadow-md min-w-[280px] text-center"
                  >
                    Transmit Message
                  </MagneticButton>
                </div>

              </form>
            ) : (
              /* Success Card with Card Padding Spacing Helper */
              <div
                ref={successRef}
                className="w-full flex items-center justify-center min-h-[350px]"
              >
                <div className="success-card glass-panel card-padding rounded-3xl flex flex-col items-center justify-center max-w-md w-full border border-[var(--accent-color)]/20 shadow-2xl">
                  <div className="w-20 h-20 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 flex items-center justify-center mb-8">
                    <svg
                      className="w-10 h-10 text-[var(--accent-color)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="checkmark-path"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="80"
                        strokeDashoffset="80"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[var(--text-color)] mb-[var(--space-xs)]">
                    TRANSMISSION SUCCESSFUL
                  </h3>
                  
                  <p className="text-sm text-[var(--text-mute)] font-sans text-center leading-relaxed">
                    Thank you, <span className="text-[var(--text-color)] font-semibold">{formState.name}</span>. Your data has successfully routed to the NEXUS creative node. We will initialize contact within 24 hours.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
