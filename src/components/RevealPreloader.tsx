import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface RevealPreloaderProps {
  onComplete: () => void;
}

export const RevealPreloader = ({ onComplete }: RevealPreloaderProps) => {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    // Phase 1: Hold for a moment
    const loadTimer = setTimeout(() => {
      setPhase("reveal");
    }, 800);

    // Phase 2: Complete
    const revealTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(revealTimer);
    };
  }, [onComplete]);

  const slices = 5;
  
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
            const delay = i * 0.08;
            
            return (
              <motion.div
                key={i}
                className="absolute left-0 right-0 bg-background"
                style={{
                  top: `${(i / slices) * 100}%`,
                  height: `${100 / slices + 0.5}%`, // Slight overlap to prevent gaps
                }}
                initial={{ x: 0 }}
                animate={phase === "reveal" ? { 
                  x: isEven ? "-105%" : "105%",
                } : { x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: delay,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {/* Accent line on each slice edge */}
                <motion.div
                  className={`absolute ${isEven ? 'right-0' : 'left-0'} top-0 bottom-0 w-px bg-accent/50`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: phase === "loading" ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                />
              </motion.div>
            );
          })}

          {/* Center content - minimal */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "loading" ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Subtle loading indicator */}
            <div className="relative">
              <motion.div
                className="w-12 h-px bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.div
                className="absolute top-0 left-0 w-full h-px bg-foreground"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RevealPreloader;
