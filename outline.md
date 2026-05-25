# SYSTEM ROLE

Act as an expert Frontend Developer and Next.js 14+ Architect specializing in high-performance, immersive web experiences using GSAP and Tailwind CSS. Your task is to generate a complete, production-ready landing page for a creative studio called "NEXUS Creative".

# TECH STACK

- Next.js 14+ (App Router)
- TypeScript (Strict Mode)
- Tailwind CSS
- GSAP, @gsap/react, ScrollTrigger
- Lucide React (Icons)
- Fonts: Next.js optimized Inter or Geist

# DESIGN SYSTEM

- **Colors:** Primary: `#6366f1`, Secondary: `#ec4899`, Accent: `#06b6d4`, Dark: `#0f172a`, Light: `#f8fafc`.
- **Typography:** Headings (Bold, tracking-tight -0.02em), Body (Regular, leading-relaxed 1.6). Implement fluid typography via CSS clamp().
- **Spacing:** Section padding 6rem (vertical responsive), Container max-width 1280px, Grid gaps 1.5rem-2rem.

# PROJECT STRUCTURE

Create the following structure and populate all files with complete, working code:
app/
├── sections/ (Hero.tsx, Services.tsx, Portfolio.tsx, Testimonials.tsx, Contact.tsx, Footer.tsx)
├── components/ (AnimatedText.tsx, ParallaxLayer.tsx, MagneticButton.tsx, ScrollIndicator.tsx, CustomCursor.tsx)
├── hooks/ (useMousePosition.ts, useScrollVelocity.ts, useReducedMotion.ts)
├── lib/ (gsap.ts)
├── page.tsx
└── layout.tsx

# CORE REQUIREMENTS & ANIMATIONS

Implement the following sections with flawless 60fps GSAP animations. ALWAYS use `@gsap/react` `useGSAP` hook for scoping and automatic cleanup to prevent memory leaks. Implement `prefers-reduced-motion` media queries.

1. **Loading Screen (Bonus):** Elegant entry animation before revealing the Hero.
2. **Hero Section:** Full viewport height. Implement staggered character/word Text Reveal animation. Add 3-5 floating abstract shapes with subtle mouse-move parallax. Include an animated pulse/fade scroll indicator chevron. Use an animated gradient mesh background.
3. **Services Section (Parallax):** Horizontal scroll OR pinned vertical scroll. Implement minimum 3 layers of multi-speed depth (e.g., 0.5x, 1x, 1.5x). Include 4 service cards with Lucide icons that animate in with staggered timing.
4. **Portfolio Gallery:** Grid layout. Implement image scale on hover, an overlay slide-up for details, and a custom cursor follower effect on hover. Use clip-path/mask animation for scroll-triggered image reveals.
5. **Testimonials:** Infinite auto-scrolling marquee that pauses on hover. Use scroll velocity detection to speed up the marquee on scroll. Text must move at a different parallax speed than the background.
6. **Contact CTA:** Split layout (text left, form right). Form needs floating labels and GSAP focus states. Implement a Magnetic Button effect for the submit button and a checkmark drawing animation on success.
7. **Footer:** Reveal from behind the previous section (curtain effect). Social icons must have hover rotations.

# STRICT RULES & ANTI-PATTERNS

- **DO NOT** animate width, height, top, or left (use transform and opacity only).
- **DO NOT** animate the LCP (Largest Contentful Paint) element.
- **DO NOT** use `filter: blur()` during active scroll.
- **MUST** clean up all ScrollTriggers on unmount.
- **MUST** optimize performance using `will-change` strategically.
- **MUST** ensure full keyboard navigation accessibility.

# EXECUTION INSTRUCTIONS

Generate the code step-by-step. Start with the layout and lib configurations, then move to hooks and reusable components, and finally build out each section sequentially before combining them in `page.tsx`. Ensure the final output is cohesive, visually stunning, and immediately runnable.
