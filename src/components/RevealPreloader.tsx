import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface RevealPreloaderProps {
  onComplete: () => void;
}

export const RevealPreloader = ({ onComplete }: RevealPreloaderProps) => {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    // Phase 1: Show initials
    const loadTimer = setTimeout(() => {
      setPhase("reveal");
    }, 800);

    // Phase 2: Reveal (wipe away)
    const revealTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(revealTimer);
    };
  }, [onComplete]);

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -30,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const overlayVariants = {
    initial: { scaleY: 1 },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1] as const,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {/* Top overlay */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-background origin-top"
            variants={overlayVariants}
            initial="initial"
            animate={phase === "reveal" ? "exit" : "initial"}
          />

          {/* Bottom overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-background origin-bottom"
            variants={overlayVariants}
            initial="initial"
            animate={phase === "reveal" ? "exit" : "initial"}
          />

          {/* Center content - Initials */}
          <div className="relative z-10 perspective-1000">
            <div className="flex items-center justify-center gap-1">
              {["D", "B"].map((letter, i) => (
                <motion.span
                  key={letter}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate={phase === "loading" ? "visible" : "exit"}
                  className="font-display text-[20vw] md:text-[15vw] font-bold text-gradient-copper inline-block"
                  style={{
                    textShadow: "0 0 100px hsl(var(--accent) / 0.5)",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Loading line */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-px bg-accent/50 overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: phase === "loading" ? "60%" : "100%" }}
              transition={{
                duration: phase === "loading" ? 0.8 : 0.3,
                ease: "easeOut",
              }}
            >
              <motion.div
                className="h-full bg-accent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 0.8,
                  repeat: phase === "loading" ? Infinity : 0,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-px bg-accent/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <motion.div
            className="absolute top-8 left-8 w-px h-16 bg-accent/30"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-px bg-accent/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-px h-16 bg-accent/30"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RevealPreloader;
