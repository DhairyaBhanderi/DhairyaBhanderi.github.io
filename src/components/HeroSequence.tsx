import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "./ParticleField";

gsap.registerPlugin(ScrollTrigger);

const name = "Dhairya Bhanderi";
const role = "AI Automation Engineer";
const subtitle = "Building intelligent systems that think, adapt, and scale";

export const HeroSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nameRevealed, setNameRevealed] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Initial load sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Name reveal animation
  useEffect(() => {
    if (!isLoaded || !nameRef.current || shouldReduceMotion) {
      if (shouldReduceMotion) {
        setNameRevealed(true);
        setShowRole(true);
        setShowSubtitle(true);
      }
      return;
    }

    const chars = nameRef.current.querySelectorAll(".char");
    
    gsap.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
        onComplete: () => {
          setNameRevealed(true);
          setTimeout(() => setShowRole(true), 200);
          setTimeout(() => setShowSubtitle(true), 600);
        },
      }
    );
  }, [isLoaded, shouldReduceMotion]);

  // Parallax scroll effect
  useEffect(() => {
    if (!containerRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-content", {
        y: 150,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const scrollToWork = () => {
    const element = document.querySelector("#work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Split name into characters for animation
  const nameChars = name.split("").map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ perspective: "1000px" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleField className="w-full h-full" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/80 via-background/40 to-background" />
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-transparent via-transparent to-background/90" />

      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[150px] z-0"
        style={{ background: "hsl(var(--copper) / 0.15)" }}
      />

      {/* Content */}
      <div className="hero-content relative z-10 container mx-auto px-6 text-center">
        {/* Pre-loader line */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-[1px] bg-accent origin-left"
            />
          )}
        </AnimatePresence>

        {/* Name with character reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          className="mb-8 overflow-hidden"
        >
          <h1
            ref={nameRef}
            className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight text-foreground leading-none"
            style={{ perspective: "1000px" }}
          >
            {nameChars}
          </h1>
        </motion.div>

        {/* Role with slide up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={showRole ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 overflow-hidden"
        >
          <span className="text-gradient-copper font-display text-2xl md:text-3xl lg:text-4xl italic tracking-wide">
            {role}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={showSubtitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground font-body text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showSubtitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <button
            onClick={scrollToWork}
            data-cursor="pointer"
            data-cursor-text="View"
            className="group relative px-8 py-4 font-body text-sm uppercase tracking-[0.2em] text-foreground border border-foreground/20 rounded-full overflow-hidden transition-all duration-500 hover:border-accent"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
              Explore Work
            </span>
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showSubtitle ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
              Scroll
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Film grain overlay */}
      <div className="grain-overlay" />
    </section>
  );
};

export default HeroSequence;
