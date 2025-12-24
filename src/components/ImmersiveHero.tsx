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
}

const FragmentedLetter = ({
  letter,
  index,
  totalLetters,
  mouseX,
  mouseY,
  containerRect,
  scrollProgress,
}: LetterProps) => {
  // Random initial positions for each letter
  const randomX = useRef((Math.random() - 0.5) * 200);
  const randomY = useRef((Math.random() - 0.5) * 200);
  const randomRotate = useRef((Math.random() - 0.5) * 90);

  // Calculate displacement based on mouse proximity
  const [displacement, setDisplacement] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRect) return;

    const letterCenterX = containerRect.left + containerRect.width * ((index + 0.5) / totalLetters);
    const letterCenterY = containerRect.top + containerRect.height / 2;

    const deltaX = mouseX - letterCenterX;
    const deltaY = mouseY - letterCenterY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = 200;

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * 30;
      setDisplacement({
        x: -(deltaX / distance) * force,
        y: -(deltaY / distance) * force,
      });
    } else {
      setDisplacement({ x: 0, y: 0 });
    }
  }, [mouseX, mouseY, containerRect, index, totalLetters]);

  // Scroll-based explosion effect
  const explodeX = scrollProgress * randomX.current * 5;
  const explodeY = scrollProgress * randomY.current * 5;
  const explodeRotate = scrollProgress * randomRotate.current * 3;
  const explodeOpacity = 1 - scrollProgress * 1.5;
  const explodeScale = 1 - scrollProgress * 0.5;

  return (
    <motion.span
      initial={{
        opacity: 0,
        x: randomX.current * 3,
        y: randomY.current * 3,
        rotate: randomRotate.current,
        scale: 0.5,
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
        damping: 20,
        stiffness: 150,
        delay: index * 0.03,
      }}
      className="inline-block will-change-transform"
      style={{
        textShadow: scrollProgress < 0.3 ? "0 0 80px hsl(var(--copper) / 0.4)" : "none",
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
      className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic gradient background following mouse */}
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([gx, gy]) =>
              `radial-gradient(ellipse 80% 60% at ${gx}% ${gy}%, hsl(var(--copper) / 0.2) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--accent) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--accent) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Role - small, above name */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="block text-xs md:text-sm tracking-[0.4em] text-muted-foreground font-body uppercase mb-8"
        >
          AI Automation Engineer
        </motion.span>

        {/* Fragmented Name */}
        <div className="relative perspective-1000">
          <h1 className="font-display font-bold leading-[0.85] tracking-tight select-none">
            {/* First name */}
            <span className="block text-[14vw] md:text-[11vw] text-foreground overflow-visible">
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

            {/* Last name - with gradient */}
            <span className="block text-[14vw] md:text-[11vw] text-gradient-copper overflow-visible">
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
                />
              ))}
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 - scrollValue }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-12 text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto"
        >
          Building intelligent systems that scale
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 - scrollValue * 2 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/50 tracking-widest uppercase font-body">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ImmersiveHero;
