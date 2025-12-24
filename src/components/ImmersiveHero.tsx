import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

export const ImmersiveHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform mouse position to gradient position
  const gradientX = useTransform(x, [0, 1], [30, 70]);
  const gradientY = useTransform(y, [0, 1], [30, 70]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  const firstName = "DHAIRYA";
  const lastName = "BHANDERI";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic gradient background */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([gx, gy]) =>
              `radial-gradient(ellipse at ${gx}% ${gy}%, hsl(var(--copper) / 0.15) 0%, transparent 50%)`
          ),
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Role - small, above name */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="block text-xs md:text-sm tracking-[0.3em] text-muted-foreground font-body uppercase mb-8"
        >
          AI Automation Engineer
        </motion.span>

        {/* Name - massive, text-masked */}
        <div className="relative perspective-1000">
          <h1 className="font-display font-bold leading-[0.85] tracking-tight">
            {/* First name */}
            <span className="block text-[15vw] md:text-[12vw] overflow-hidden">
              {firstName.split("").map((letter, i) => (
                <motion.span
                  key={`first-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-foreground"
                  style={{ 
                    textShadow: "0 0 80px hsl(var(--copper) / 0.3)",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>

            {/* Last name - with gradient clip */}
            <span className="block text-[15vw] md:text-[12vw] overflow-hidden">
              {lastName.split("").map((letter, i) => (
                <motion.span
                  key={`last-${i}`}
                  custom={i + firstName.length}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-gradient-copper"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto"
        >
          Building intelligent systems that scale
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-muted-foreground/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default ImmersiveHero;
