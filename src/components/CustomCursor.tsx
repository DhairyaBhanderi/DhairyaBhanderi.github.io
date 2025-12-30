import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

interface MagneticElement {
  element: HTMLElement;
  rect: DOMRect;
}

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<"default" | "link" | "project" | "button">("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const prevX = useRef(-100);
  const prevY = useRef(-100);

  // Dot positions for constellation effect
  const dotPositions = useRef<{ x: number; y: number; opacity: number }[]>([]);
  const [dots, setDots] = useState<{ x: number; y: number; opacity: number; id: number }[]>([]);
  const dotIdRef = useRef(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const slowSpring = { damping: 40, stiffness: 150, mass: 1 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const trailXSpring = useSpring(cursorX, slowSpring);
  const trailYSpring = useSpring(cursorY, slowSpring);

  // Velocity-based morphing
  const velocityXSpring = useSpring(velocityX, { damping: 25, stiffness: 120 });
  const velocityYSpring = useSpring(velocityY, { damping: 25, stiffness: 120 });

  // Dynamic stretch based on velocity
  const stretch = useTransform(
    [velocityXSpring, velocityYSpring],
    ([vx, vy]: number[]) => {
      const velocity = Math.sqrt(vx * vx + vy * vy);
      return Math.min(1 + velocity * 0.015, 2);
    }
  );

  const rotation = useTransform(
    [velocityXSpring, velocityYSpring],
    ([vx, vy]: number[]) => Math.atan2(vy, vx) * (180 / Math.PI)
  );

  // Skew for fluid effect
  const skewX = useTransform(velocityXSpring, [-30, 0, 30], [-10, 0, 10]);
  const skewY = useTransform(velocityYSpring, [-30, 0, 30], [-5, 0, 5]);

  const addDot = useCallback((x: number, y: number) => {
    const newDot = { x, y, opacity: 0.6, id: dotIdRef.current++ };
    setDots(prev => [...prev.slice(-8), newDot]);
    
    // Fade out dot after delay
    setTimeout(() => {
      setDots(prev => prev.filter(d => d.id !== newDot.id));
    }, 600);
  }, []);

  useEffect(() => {
    let magneticElements: MagneticElement[] = [];
    const magneticRadius = 100;
    let lastDotTime = 0;
    let lastTime = performance.now();

    const updateMagneticElements = () => {
      magneticElements = Array.from(
        document.querySelectorAll(".magnetic-button, [data-magnetic]")
      ).map((el) => ({
        element: el as HTMLElement,
        rect: el.getBoundingClientRect(),
      }));
    };

    const moveCursor = (e: MouseEvent) => {
      const now = performance.now();
      const deltaTime = Math.max(now - lastTime, 1);
      lastTime = now;

      const newX = e.clientX;
      const newY = e.clientY;

      // Calculate velocity
      const vx = ((newX - prevX.current) / deltaTime) * 16;
      const vy = ((newY - prevY.current) / deltaTime) * 16;
      velocityX.set(vx);
      velocityY.set(vy);

      // Add trailing dots based on velocity
      const velocity = Math.sqrt(vx * vx + vy * vy);
      if (velocity > 5 && now - lastDotTime > 50) {
        addDot(newX, newY);
        lastDotTime = now;
      }

      prevX.current = newX;
      prevY.current = newY;

      cursorX.set(newX);
      cursorY.set(newY);

      // Check for magnetic effect
      let foundMagnetic = false;
      for (const { element, rect } of magneticElements) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < magneticRadius) {
          foundMagnetic = true;
          const pull = Math.pow(1 - distance / magneticRadius, 2);
          element.style.transform = `translate(${distanceX * pull * 0.4}px, ${distanceY * pull * 0.4}px)`;
          break;
        } else {
          element.style.transform = "";
        }
      }

      setIsMagnetic(foundMagnetic);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for project cards
      if (target.closest("[data-cursor='project']")) {
        setCursorVariant("project");
        setIsHovering(true);
        setCursorText("View");
        return;
      }

      // Check for buttons
      if (target.closest("button") || target.closest("[data-cursor='button']")) {
        setCursorVariant("button");
        setIsHovering(true);
        setCursorText("");
        return;
      }

      if (
        target.tagName === "A" ||
        target.closest("a") ||
        target.dataset.cursor === "pointer" ||
        target.closest("[data-cursor='pointer']")
      ) {
        setCursorVariant("link");
        setIsHovering(true);
        setCursorText(
          target.dataset.cursorText ||
            target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") ||
            ""
        );
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      if (!relatedTarget || 
          (!relatedTarget.closest("a") && 
           !relatedTarget.closest("button") && 
           !relatedTarget.closest("[data-cursor]"))) {
        setIsHovering(false);
        setCursorText("");
        setCursorVariant("default");
      }
    };

    const handleScroll = () => {
      updateMagneticElements();
    };

    updateMagneticElements();
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateMagneticElements);

    const interval = setInterval(updateMagneticElements, 1000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMagneticElements);
      clearInterval(interval);
    };
  }, [cursorX, cursorY, velocityX, velocityY, addDot]);

  // Hide on touch devices
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  const getCursorSize = () => {
    if (cursorVariant === "project") return 90;
    if (isHovering) return 70;
    if (isClicking) return 12;
    if (isMagnetic) return 36;
    return 20;
  };

  const getInnerSize = () => {
    if (cursorVariant === "project") return 80;
    if (isHovering) return 60;
    if (isClicking) return 8;
    if (isMagnetic) return 28;
    return 8;
  };

  return (
    <>
      {/* Trailing dots - constellation effect */}
      <AnimatePresence>
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="fixed pointer-events-none z-[9996]"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              left: dot.x,
              top: dot.y,
              x: "-50%",
              y: "-50%",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Outer ring - follows with delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: getCursorSize() + 20,
            height: getCursorSize() + 20,
            borderWidth: isHovering ? 1.5 : 1,
            borderColor: isHovering 
              ? "hsl(var(--accent))" 
              : "hsl(var(--foreground) / 0.3)",
          }}
          style={{
            borderStyle: "solid",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        />
      </motion.div>

      {/* Main cursor blob */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          style={{
            rotate: rotation,
            skewX,
            skewY,
          }}
        >
          {/* Glow layer */}
          <motion.div
            className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            animate={{
              width: getCursorSize() * 1.5,
              height: getCursorSize() * 1.5,
              opacity: isHovering ? 0.4 : 0.2,
              backgroundColor: cursorVariant === "project" 
                ? "hsl(var(--accent))"
                : "hsl(var(--foreground))",
            }}
            style={{
              left: "50%",
              top: "50%",
              scaleX: stretch,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          />

          {/* Main blob */}
          <motion.div
            className="relative rounded-full mix-blend-difference"
            animate={{
              width: getCursorSize(),
              height: getCursorSize(),
              backgroundColor: cursorVariant === "project" 
                ? "hsl(var(--accent))"
                : "hsl(var(--foreground))",
            }}
            style={{
              scaleX: stretch,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Inner dot */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              animate={{
                width: getInnerSize(),
                height: getInnerSize(),
                backgroundColor: cursorVariant === "project"
                  ? "hsl(var(--background))"
                  : "hsl(var(--background))",
                opacity: isHovering ? 1 : 0,
              }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
            />

            {/* Cursor text */}
            <AnimatePresence>
              {cursorText && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center text-background text-[11px] font-mono font-semibold uppercase tracking-wider"
                >
                  {cursorText}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Arrow indicator for project hover */}
          <AnimatePresence>
            {cursorVariant === "project" && !cursorText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-background"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed pointer-events-none z-[9998]"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              left: 0,
              top: 0,
            }}
          >
            <div 
              className="w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide default cursor globally */}
      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
        html {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
