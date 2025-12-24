import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticElement {
  element: HTMLElement;
  rect: DOMRect;
}

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isMagnetic, setIsMagnetic] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const magneticSpring = { damping: 15, stiffness: 150 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const magneticXSpring = useSpring(magneticX, magneticSpring);
  const magneticYSpring = useSpring(magneticY, magneticSpring);

  useEffect(() => {
    let magneticElements: MagneticElement[] = [];
    const magneticRadius = 100;

    const updateMagneticElements = () => {
      magneticElements = Array.from(
        document.querySelectorAll(".magnetic-button, [data-magnetic]")
      ).map((el) => ({
        element: el as HTMLElement,
        rect: el.getBoundingClientRect(),
      }));
    };

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

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
          const pull = 1 - distance / magneticRadius;
          magneticX.set(distanceX * pull * 0.4);
          magneticY.set(distanceY * pull * 0.4);
          break;
        }
      }

      if (!foundMagnetic) {
        magneticX.set(0);
        magneticY.set(0);
      }
      setIsMagnetic(foundMagnetic);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer" ||
        target.closest("[data-cursor='pointer']")
      ) {
        setIsHovering(true);
        setCursorText(target.dataset.cursorText || target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") || "");
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCursorText("");
    };

    // Update magnetic elements on scroll
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

    // Update periodically for dynamic content
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
  }, [cursorX, cursorY, magneticX, magneticY]);

  // Hide on touch devices
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  // Get ring size based on state
  const getRingSize = () => {
    if (isHovering) return 100;
    if (isMagnetic) return 60;
    return 40;
  };

  // Get dot size based on state
  const getDotSize = () => {
    if (isHovering) return 80;
    if (isClicking) return 8;
    if (isMagnetic) return 16;
    return 12;
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
          animate={{
            width: getDotSize(),
            height: getDotSize(),
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center text-background text-xs font-body font-medium uppercase tracking-wider"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor ring with magnetic effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-200 ${
            isMagnetic ? "border-accent" : "border-foreground/30"
          }`}
          style={{
            x: magneticXSpring,
            y: magneticYSpring,
          }}
          animate={{
            width: getRingSize(),
            height: getRingSize(),
            opacity: isHovering ? 0.5 : isMagnetic ? 0.6 : 0.3,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 150 }}
        />
      </motion.div>

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
