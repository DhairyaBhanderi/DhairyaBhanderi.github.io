import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Philosophical, specific statements
const statements = [
  {
    text: "Code is ephemeral. Systems are legacy. I build for the latter.",
    highlight: ["ephemeral", "legacy", "latter"],
    bgClass: "bg-background",
  },
  {
    text: "AI should amplify human judgment, never replace the soul behind it.",
    highlight: ["amplify", "judgment", "soul"],
    bgClass: "bg-secondary/30",
  },
  {
    text: "The best architecture is invisible — felt, never seen.",
    highlight: ["invisible", "felt", "seen"],
    bgClass: "bg-background",
  },
];

const WordReveal = ({ 
  text, 
  highlights,
  isActive 
}: { 
  text: string; 
  highlights: string[];
  isActive: boolean;
}) => {
  const words = text.split(" ");

  return (
    <motion.h2 
      className="font-display text-fluid-statement text-center leading-tight tracking-tight max-w-5xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {words.map((word, wordIndex) => {
        const isHighlight = highlights.some(h => 
          word.toLowerCase().includes(h.toLowerCase())
        );
        const cleanWord = word.replace(/[.,!?—]/g, '');
        const punctuation = word.match(/[.,!?—]/g)?.[0] || '';

        return (
          <span key={wordIndex} className="inline-block mr-[0.3em] overflow-hidden">
            <motion.span
              className={`inline-block ${isHighlight ? 'text-accent text-glow' : 'text-foreground'}`}
              initial={{ y: 100, opacity: 0, rotateX: -45 }}
              animate={isActive ? { 
                y: 0, 
                opacity: 1, 
                rotateX: 0 
              } : { 
                y: 100, 
                opacity: 0, 
                rotateX: -45 
              }}
              transition={{
                duration: 0.6,
                delay: isActive ? wordIndex * 0.08 : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {cleanWord}
              {punctuation && (
                <span className="text-muted-foreground">{punctuation}</span>
              )}
            </motion.span>
          </span>
        );
      })}
    </motion.h2>
  );
};

export const ManifestoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Extended scroll duration: 150vh per statement = 450vh total
  const statementProgress = useTransform(scrollYProgress, [0, 1], [0, statements.length]);

  useEffect(() => {
    const unsubscribe = statementProgress.on("change", (value) => {
      const newIndex = Math.min(Math.floor(value), statements.length - 1);
      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [statementProgress, activeIndex]);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative"
      style={{ height: `${statements.length * 150}vh` }} // Extended from 100vh to 150vh per statement
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background layers */}
        {statements.map((statement, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 ${statement.bgClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeIndex === index ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60 pointer-events-none" />
        
        {/* Parallax floating elements */}
        <motion.div 
          className="absolute top-[15%] left-[8%] w-40 h-40 border border-accent/10 rounded-full opacity-20"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-32 h-32 bg-accent/5 rounded-lg opacity-30"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, 200]), 
            rotate: useTransform(scrollYProgress, [0, 1], [0, 60]) 
          }}
        />
        <motion.div 
          className="absolute top-[40%] right-[5%] w-1 h-48 bg-gradient-to-b from-accent/30 to-transparent"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        />
        <motion.div 
          className="absolute bottom-[30%] left-[6%] w-20 h-20 border-2 border-muted/20 rotate-45"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        />
        {/* Additional decorative elements */}
        <motion.div 
          className="absolute top-[25%] left-[40%] w-2 h-2 rounded-full bg-accent/40"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, -80]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 0.4])
          }}
        />
        <motion.div 
          className="absolute bottom-[40%] right-[30%] w-24 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          style={{ x: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        />

        {/* Content container */}
        <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
          <div className="container mx-auto">
            {statements.map((statement, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center px-6 md:px-12 ${
                  index === activeIndex ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={{ perspective: "1200px" }}
              >
                <WordReveal 
                  text={statement.text} 
                  highlights={statement.highlight}
                  isActive={index === activeIndex} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Statement counter */}
        <motion.div
          className="absolute top-8 right-8 font-mono text-xs text-muted-foreground/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-accent">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(statements.length).padStart(2, '0')}</span>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            {statements.map((_, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "bg-accent scale-125"
                      : index < activeIndex
                      ? "bg-accent/50"
                      : "bg-muted-foreground/20"
                  }`}
                />
                {index === activeIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-accent/30"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.span 
            className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Keep scrolling
          </motion.span>
          
          <motion.div 
            className="w-px h-10 bg-gradient-to-b from-muted-foreground/30 to-transparent"
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
