import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface RevealPreloaderProps {
  onComplete: () => void;
}

export const RevealPreloader = ({ onComplete }: RevealPreloaderProps) => {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    // Phase 1: Show initials (extended duration)
    const loadTimer = setTimeout(() => {
      setPhase("reveal");
    }, 1400);

    // Phase 2: Reveal (wipe away)
    const revealTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadTimer);
      clearTimeout(revealTimer);
    };
  }, [onComplete]);

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: -90,
      scale: 0.8,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -50,
      scale: 1.1,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
      },
    }),
  };

  const overlayVariants = {
    initial: { scaleY: 1 },
    exit: {
      scaleY: 0,
      transition: {
        duration: 1,
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
          transition={{ duration: 0.4, delay: 0.6 }}
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

          {/* Center content - Initials with 3D effect */}
          <div className="relative z-10" style={{ perspective: "1200px" }}>
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {["D", "B"].map((letter, i) => (
                <motion.span
                  key={letter}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate={phase === "loading" ? "visible" : "exit"}
                  className="relative font-display text-[25vw] md:text-[18vw] font-bold inline-block"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Main letter with gradient */}
                  <span className="text-gradient-copper text-glow-lg">
                    {letter}
                  </span>

                  {/* 3D shadow/extrusion effect */}
                  <span 
                    className="absolute inset-0 text-foreground/5"
                    style={{
                      transform: "translateZ(-20px) translateX(4px) translateY(4px)",
                    }}
                  >
                    {letter}
                  </span>
                </motion.span>
              ))}
            </div>

            {/* Progress counter */}
            <motion.div
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "loading" ? 1 : 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <span className="font-mono text-sm text-accent">
                {progress.toString().padStart(3, '0')}%
              </span>
              
              {/* Loading bar */}
              <div className="w-32 h-px bg-muted/30 overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Corner decorations with enhanced animation */}
          <motion.div
            className="absolute top-10 left-10 w-20 h-px bg-accent/40"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.div
            className="absolute top-10 left-10 w-px h-20 bg-accent/40"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-20 h-px bg-accent/40"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-px h-20 bg-accent/40"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />

          {/* Additional accent dots */}
          <motion.div
            className="absolute top-10 right-10 w-2 h-2 rounded-full bg-accent/60"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-accent/60"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RevealPreloader;
