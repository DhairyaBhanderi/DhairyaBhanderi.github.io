import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading with smooth progress
    const duration = 2000;
    const interval = 30;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 300);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Logo / Initials */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-16"
          >
            {/* Animated initials with stroke effect */}
            <svg
              viewBox="0 0 120 60"
              className="w-32 h-16 overflow-visible"
            >
              <motion.text
                x="0"
                y="50"
                className="font-display text-6xl fill-none stroke-foreground"
                strokeWidth="1"
                initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                DB
              </motion.text>
              <motion.text
                x="0"
                y="50"
                className="font-display text-6xl fill-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: progress > 50 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                DB
              </motion.text>
            </svg>

            {/* Glowing orb behind */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.3 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute inset-0 -z-10 blur-3xl"
              style={{ background: "hsl(var(--copper))" }}
            />
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-[1px] bg-border relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Progress text */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            {Math.round(progress)}%
          </motion.span>

          {/* Decorative lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isComplete ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/4 left-0 right-0 h-[1px] bg-border/30 origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isComplete ? 0 : 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute bottom-1/4 left-0 right-0 h-[1px] bg-border/30 origin-right"
          />

          {/* Reveal curtains */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: isComplete ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-background origin-top"
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
