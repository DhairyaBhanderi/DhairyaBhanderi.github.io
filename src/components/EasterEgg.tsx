import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

interface EasterEggProviderProps {
  children: React.ReactNode;
}

export const EasterEggProvider = ({ children }: EasterEggProviderProps) => {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const triggerEasterEgg = useCallback(() => {
    setIsActivated(true);
    setShowMessage(true);

    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#D97706", "#F59E0B", "#14B8A6", "#3B82F6"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Hide message after delay
    setTimeout(() => setShowMessage(false), 4000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.code].slice(-KONAMI_CODE.length);
      setKeySequence(newSequence);

      // Check if sequence matches Konami code
      if (newSequence.length === KONAMI_CODE.length) {
        const isMatch = newSequence.every(
          (key, index) => key === KONAMI_CODE[index]
        );
        if (isMatch && !isActivated) {
          triggerEasterEgg();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keySequence, isActivated, triggerEasterEgg]);

  return (
    <>
      {children}

      {/* Easter egg message overlay */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-card/95 backdrop-blur-xl border border-accent rounded-2xl px-12 py-8 shadow-2xl shadow-accent/20"
            >
              <motion.h2
                className="font-display text-4xl md:text-5xl text-foreground text-center mb-4"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: "linear-gradient(90deg, #D97706, #F59E0B, #14B8A6, #3B82F6, #D97706)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                🎮 Konami Code Activated!
              </motion.h2>
              <p className="text-muted-foreground font-body text-center text-lg">
                You found the secret! You're awesome.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggProvider;
