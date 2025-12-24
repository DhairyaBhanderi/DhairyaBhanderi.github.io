import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface LetterProps {
  letter: string;
  index: number;
  totalLetters: number;
  mouseX: number;
  mouseY: number;
  containerRect: DOMRect | null;
  scrollProgress: number;
  isLastName?: boolean;
}

const FragmentedLetter = ({
  letter,
  index,
  totalLetters,
  mouseX,
  mouseY,
  containerRect,
  scrollProgress,
  isLastName = false,
}: LetterProps) => {
  const randomX = useRef((Math.random() - 0.5) * 200);
  const randomY = useRef((Math.random() - 0.5) * 200);
  const randomRotate = useRef((Math.random() - 0.5) * 90);

  const [displacement, setDisplacement] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRect) return;

    const letterCenterX = containerRect.left + containerRect.width * ((index + 0.5) / totalLetters);
    const letterCenterY = containerRect.top + containerRect.height / 2;

    const deltaX = mouseX - letterCenterX;
    const deltaY = mouseY - letterCenterY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = 250;

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * 40;
      setDisplacement({
        x: -(deltaX / distance) * force,
        y: -(deltaY / distance) * force,
      });
    } else {
      setDisplacement({ x: 0, y: 0 });
    }
  }, [mouseX, mouseY, containerRect, index, totalLetters]);

  const explodeX = scrollProgress * randomX.current * 6;
  const explodeY = scrollProgress * randomY.current * 6;
  const explodeRotate = scrollProgress * randomRotate.current * 4;
  const explodeOpacity = 1 - scrollProgress * 1.8;
  const explodeScale = 1 - scrollProgress * 0.6;

  return (
    <motion.span
      initial={{
        opacity: 0,
        x: randomX.current * 4,
        y: randomY.current * 4,
        rotate: randomRotate.current,
        scale: 0.3,
      }}
      animate={{
        opacity: Math.max(0, explodeOpacity),
        x: displacement.x + explodeX,
        y: displacement.y + explodeY,
        rotate: explodeRotate,
        scale: Math.max(0.1, explodeScale),
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 120,
        delay: index * 0.025,
      }}
      className={`inline-block will-change-transform ${isLastName ? 'text-stroke-accent' : ''}`}
      style={{
        textShadow: scrollProgress < 0.2 ? "0 0 100px hsl(var(--copper) / 0.5)" : "none",
      }}
    >
      {letter}
    </motion.span>
  );
};

export const ImmersiveHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    return scrollProgress.on("change", (v) => setScrollValue(v));
  }, [scrollProgress]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const gradientX = useTransform(x, [0, 1], [20, 80]);
  const gradientY = useTransform(y, [0, 1], [20, 80]);

  useEffect(() => {
    const updateRect = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    updateRect();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [mouseX, mouseY]);

  const firstName = "DHAIRYA";
  const lastName = "BHANDERI";
  const allLetters = firstName + lastName;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[130vh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic gradient background */}
      <motion.div
        className="absolute inset-0 opacity-80"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([gx, gy]) =>
              `radial-gradient(ellipse 90% 70% at ${gx}% ${gy}%, hsl(var(--copper) / 0.2) 0%, transparent 50%),
               radial-gradient(ellipse 60% 40% at ${100 - Number(gx)}% ${100 - Number(gy)}%, hsl(var(--deep-blue) / 0.1) 0%, transparent 50%)`
          ),
        }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--accent) / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--accent) / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "120px 120px"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Noise texture overlay - animated pulse */}
      <motion.div 
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Role - refined */}
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="block text-xs md:text-sm tracking-[0.5em] text-accent font-mono uppercase mb-10"
        >
          AI Automation Engineer
        </motion.span>

        {/* Fragmented Name - Massive typography */}
        <div className="relative" style={{ perspective: "1500px" }}>
          <h1 className="font-display font-bold leading-[0.8] tracking-[-0.04em] select-none">
            {/* First name - solid */}
            <span className="block text-fluid-hero text-foreground overflow-visible">
              {firstName.split("").map((letter, i) => (
                <FragmentedLetter
                  key={`first-${i}`}
                  letter={letter}
                  index={i}
                  totalLetters={allLetters.length}
                  mouseX={mousePos.x}
                  mouseY={mousePos.y}
                  containerRect={containerRect}
                  scrollProgress={scrollValue}
                />
              ))}
            </span>

            {/* Last name - with text-stroke effect */}
            <span className="block text-fluid-hero overflow-visible">
              {lastName.split("").map((letter, i) => (
                <FragmentedLetter
                  key={`last-${i}`}
                  letter={letter}
                  index={i + firstName.length}
                  totalLetters={allLetters.length}
                  mouseX={mousePos.x}
                  mouseY={mousePos.y}
                  containerRect={containerRect}
                  scrollProgress={scrollValue}
                  isLastName={true}
                />
              ))}
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 - scrollValue }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 text-muted-foreground font-body text-sm md:text-base max-w-lg mx-auto"
        >
          Building intelligent systems that scale from prototype to production
        </motion.p>
      </div>

      {/* Scroll indicator - more dramatic */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - scrollValue * 2 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] text-muted-foreground/50 tracking-[0.4em] uppercase font-mono">
            Scroll
          </span>
          <div className="relative">
            <div className="w-px h-16 bg-gradient-to-b from-accent/60 to-transparent" />
            <motion.div
              className="absolute top-0 left-0 w-px h-4 bg-accent"
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-px bg-accent/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      />
      <motion.div
        className="absolute top-8 left-8 w-px h-16 bg-accent/30"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-px bg-accent/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-px h-16 bg-accent/30"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      />
    </section>
  );
};

export default ImmersiveHero;
