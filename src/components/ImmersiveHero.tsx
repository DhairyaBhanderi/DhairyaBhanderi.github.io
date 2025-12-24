import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

export const ImmersiveHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Smooth mouse tracking for gradient
  const springConfig = { damping: 30, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const gradientX = useTransform(smoothX, [0, 1], [30, 70]);
  const gradientY = useTransform(smoothY, [0, 1], [30, 70]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Mouse-following gradient */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([gx, gy]) =>
              `radial-gradient(ellipse 80% 60% at ${gx}% ${gy}%, hsl(var(--copper) / 0.15) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 w-full max-w-[90vw] mx-auto px-6"
        style={{ opacity, y, scale }}
      >
        {/* Role label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="block text-accent font-mono text-xs tracking-[0.3em] uppercase mb-8"
        >
          AI Automation Engineer
        </motion.span>

        {/* Name - controlled, aligned */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="font-display font-bold tracking-[-0.03em] leading-[0.85]"
          >
            {/* First name - solid */}
            <span className="block text-foreground" style={{ 
              fontSize: "clamp(3rem, 15vw, 12rem)",
              whiteSpace: "nowrap"
            }}>
              DHAIRYA
            </span>
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="font-display font-bold tracking-[-0.03em] leading-[0.85]"
          >
            {/* Last name - stroke effect */}
            <span 
              className="block text-stroke-hero" 
              style={{ 
                fontSize: "clamp(3rem, 15vw, 12rem)",
                whiteSpace: "nowrap"
              }}
            >
              BHANDERI
            </span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 text-muted-foreground font-body text-sm md:text-base max-w-md"
        >
          Building intelligent systems that transform ideas into scalable production solutions.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-10 flex items-center gap-6"
        >
          <a 
            href="#experience" 
            className="text-xs font-mono tracking-wider text-accent hover:text-foreground transition-colors uppercase"
          >
            View Work
          </a>
          <span className="w-12 h-px bg-border" />
          <a 
            href="#contact" 
            className="text-xs font-mono tracking-wider text-muted-foreground hover:text-foreground transition-colors uppercase"
          >
            Contact
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] text-muted-foreground/50 tracking-[0.3em] uppercase font-mono">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Minimal corner accents */}
      <motion.div
        className="absolute top-8 left-8 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <div className="w-8 h-px bg-accent/30" />
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.6 }}
      >
        <div className="w-8 h-px bg-accent/30" />
      </motion.div>
    </section>
  );
};

export default ImmersiveHero;
