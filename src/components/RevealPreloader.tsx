import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface RevealPreloaderProps {
  onComplete: () => void;
}

export const RevealPreloader = ({ onComplete }: RevealPreloaderProps) => {
  const slices = 5;
  const LOAD_MS = 800;
  const SLICE_STAGGER_MS = 80;
  const SLICE_DURATION_MS = 700;
  const EXIT_FADE_MS = 300;
  const REVEAL_TOTAL_MS = LOAD_MS + SLICE_DURATION_MS + (slices - 1) * SLICE_STAGGER_MS;

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
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    // Phase 1: Hold for a moment with initials
    const loadTimer = setTimeout(() => {
      setProgress(100);
      setPhase("reveal");
    }, LOAD_MS);

    // Phase 2: Complete when slice animation finishes (+ exit fade)
    const revealTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, REVEAL_TOTAL_MS + EXIT_FADE_MS);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(revealTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  // Philosophical quote that rotates
  const philosophicalQuote = "Building what lasts";

  return (
    <AnimatePresence mode="wait">
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10000] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Horizontal slices that slide away */}
          {Array.from({ length: slices }).map((_, i) => {
            const isEven = i % 2 === 0;
            const delay = i * (SLICE_STAGGER_MS / 1000);

            return (
              <motion.div
                key={i}
                className="absolute left-0 right-0 bg-background"
                style={{
                  top: `${(i / slices) * 100}%`,
                  height: `${100 / slices + 0.5}%`, // Slight overlap to prevent gaps
                }}
                initial={{ x: 0 }}
                animate={
                  phase === "reveal"
                    ? {
                        x: isEven ? "-105%" : "105%",
                      }
                    : { x: 0 }
                }
                transition={{
                  duration: SLICE_DURATION_MS / 1000,
                  delay: delay,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {/* Accent line on each slice edge */}
                <motion.div
                  className={`absolute ${isEven ? "right-0" : "left-0"} top-0 bottom-0 w-px bg-accent/50`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: phase === "loading" ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                />
              </motion.div>
            );
          })}

          {/* Center content - DB initials with philosophical touch */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "loading" ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* DB Initials */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="font-display text-7xl md:text-9xl font-bold tracking-tighter">
                <motion.span 
                  className="inline-block text-foreground"
                  animate={{ 
                    textShadow: [
                      "0 0 20px hsl(var(--accent) / 0)",
                      "0 0 40px hsl(var(--accent) / 0.5)",
                      "0 0 20px hsl(var(--accent) / 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  D
                </motion.span>
                <motion.span 
                  className="inline-block text-accent"
                  animate={{ 
                    textShadow: [
                      "0 0 20px hsl(var(--accent) / 0)",
                      "0 0 40px hsl(var(--accent) / 0.5)",
                      "0 0 20px hsl(var(--accent) / 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  B
                </motion.span>
              </span>
            </motion.div>

            {/* Philosophical quote */}
            <motion.p
              className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {philosophicalQuote}
            </motion.p>

            {/* Progress indicator */}
            <div className="relative w-48">
              <motion.div
                className="h-px bg-border"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="absolute top-0 left-0 h-px bg-accent"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
              
              {/* Progress percentage */}
              <motion.span
                className="absolute -bottom-6 right-0 font-mono text-xs text-accent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RevealPreloader;
