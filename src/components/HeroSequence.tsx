import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const name = "Dhairya Bhanderi";
const role = "AI Automation Engineer";
const subtitle = "Building intelligent systems that think, adapt, and scale";

export const HeroSequence = () => {
  const [displayedName, setDisplayedName] = useState("");
  const [showRole, setShowRole] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedName(name);
      setShowRole(true);
      setShowSubtitle(true);
      setCursorVisible(false);
      return;
    }

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= name.length) {
        setDisplayedName(name.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCursorVisible(false);
          setShowRole(true);
        }, 300);
        setTimeout(() => setShowSubtitle(true), 800);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [shouldReduceMotion]);

  const scrollToWork = () => {
    const element = document.querySelector("#work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
        style={{ background: "hsl(var(--copper) / 0.2)" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Name with typing effect */}
        <div className="mb-6 min-h-[80px] md:min-h-[120px]">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground inline">
            {displayedName}
            {cursorVisible && (
              <span className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 animate-cursor-blink" />
            )}
          </h1>
        </div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showRole ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8"
        >
          <span className="text-gradient-copper font-display text-xl md:text-2xl lg:text-3xl italic">
            {role}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showSubtitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showSubtitle ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={scrollToWork}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Scroll to explore"
          >
            <span className="text-xs font-body uppercase tracking-widest">Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border border-muted-foreground/50 rounded-full flex items-start justify-center p-1 group-hover:border-accent transition-colors"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-accent rounded-full"
              />
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Film grain overlay */}
      <div className="grain-overlay" />
    </section>
  );
};

export default HeroSequence;