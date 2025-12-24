import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statements = [
  {
    text: "I architect systems where AI meets reliability.",
    bgClass: "bg-background",
  },
  {
    text: "From prototype to production, I build what lasts.",
    bgClass: "bg-secondary/50",
  },
  {
    text: "Automation that empowers, not replaces.",
    bgClass: "bg-background",
  },
];

const SplitText = ({ text, isActive }: { text: string; isActive: boolean }) => {
  return (
    <motion.h2 
      className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center leading-tight tracking-tight max-w-5xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={isActive ? { 
                opacity: 1, 
                y: 0, 
                rotateX: 0 
              } : { 
                opacity: 0, 
                y: 50, 
                rotateX: -90 
              }}
              transition={{
                duration: 0.4,
                delay: isActive ? (wordIndex * 0.1) + (charIndex * 0.02) : 0,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                transformStyle: "preserve-3d",
                color: wordIndex % 3 === 1 ? "hsl(var(--accent))" : "hsl(var(--foreground))",
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
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

  // Map scroll progress to statement index
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
      style={{ height: `${statements.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background layers with CSS transitions instead of GSAP */}
        {statements.map((statement, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${statement.bgClass}`}
            style={{ opacity: activeIndex === index ? 1 : 0 }}
          />
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none" />
        
        {/* Floating decorative elements */}
        <motion.div 
          className="absolute top-20 left-[10%] w-32 h-32 border border-accent/20 rounded-full opacity-30"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        />
        <motion.div 
          className="absolute bottom-32 right-[15%] w-24 h-24 bg-accent/10 rounded-lg opacity-40"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]), rotate: useTransform(scrollYProgress, [0, 1], [0, 45]) }}
        />
        <motion.div 
          className="absolute top-1/3 right-[8%] w-2 h-32 bg-gradient-to-b from-accent/30 to-transparent"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-[12%] w-16 h-16 border-2 border-muted/30 rotate-45"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        />

        {/* Content container */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-6 md:px-12">
            {statements.map((statement, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center px-6 md:px-12 ${
                  index === activeIndex ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={{ perspective: "1000px" }}
              >
                <SplitText text={statement.text} isActive={index === activeIndex} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {statements.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-accent"
                    : index < activeIndex
                    ? "bg-accent/50"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">
            Keep scrolling
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
