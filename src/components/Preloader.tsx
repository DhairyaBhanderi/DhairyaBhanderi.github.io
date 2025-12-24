import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    // Small delay to let exit animation start, then call onComplete
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    // Simulate loading with smooth progress
    const duration = 2000;
    const interval = 25;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2;
        if (next >= 100) {
          clearInterval(timer);
          // Trigger exit after progress completes
          setTimeout(() => handleComplete(), 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [handleComplete]);

  if (isExiting) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background pointer-events-none"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
    >
      {/* Logo / Initials */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-12"
      >
        {/* Text initials */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-7xl md:text-8xl tracking-tight text-foreground"
          >
            DB
          </motion.h1>
          
          {/* Underline animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent origin-left"
          />
        </div>

        {/* Glowing orb behind */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute inset-0 -z-10 blur-3xl rounded-full"
          style={{ background: "hsl(24 50% 55%)" }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-8 font-body text-sm uppercase tracking-[0.3em] text-muted-foreground"
      >
        Loading Experience
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-[2px] bg-border relative overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress text */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground tabular-nums"
      >
        {Math.round(progress)}%
      </motion.span>

      {/* Decorative corner elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.8 }}
        className="absolute top-8 left-8 w-16 h-16 border-l border-t border-border"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.9 }}
        className="absolute top-8 right-8 w-16 h-16 border-r border-t border-border"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-border"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-border"
      />
    </motion.div>
  );
};

export default Preloader;
