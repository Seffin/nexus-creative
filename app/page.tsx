import Hero from "@/app/sections/Hero";
import Services from "@/app/sections/Services";
import Portfolio from "@/app/sections/Portfolio";
import Testimonials from "@/app/sections/Testimonials";
import Contact from "@/app/sections/Contact";
import Footer from "@/app/sections/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-dark">
      {/* Scrollable Overlapping Panel Layer */}
      <div className="relative z-10 bg-dark shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </div>

      {/* Curtain Revealed Sticky Footer */}
      <Footer />
    </main>
  );
}
