import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface MagneticElement {
  element: HTMLElement;
  rect: DOMRect;
}

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isMagnetic, setIsMagnetic] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const prevX = useRef(-100);
  const prevY = useRef(-100);

  const springConfig = { damping: 20, stiffness: 300 };
  const slowSpring = { damping: 30, stiffness: 200 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const trailXSpring = useSpring(cursorX, slowSpring);
  const trailYSpring = useSpring(cursorY, slowSpring);

  // Velocity-based stretch
  const velocityXSpring = useSpring(velocityX, { damping: 20, stiffness: 100 });
  const velocityYSpring = useSpring(velocityY, { damping: 20, stiffness: 100 });

  const scaleX = useTransform(velocityXSpring, [-50, 0, 50], [0.5, 1, 1.5]);
  const scaleY = useTransform(velocityYSpring, [-50, 0, 50], [0.5, 1, 1.5]);
  const rotation = useTransform(
    [velocityXSpring, velocityYSpring],
    ([vx, vy]: number[]) => Math.atan2(vy, vx) * (180 / Math.PI)
  );

  useEffect(() => {
    let magneticElements: MagneticElement[] = [];
    const magneticRadius = 120;
    let animationFrame: number;
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
          const pull = 1 - distance / magneticRadius;
          // Move element toward cursor
          element.style.transform = `translate(${distanceX * pull * 0.3}px, ${distanceY * pull * 0.3}px)`;
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

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer" ||
        target.closest("[data-cursor='pointer']")
      ) {
        setIsHovering(true);
        setCursorText(
          target.dataset.cursorText ||
            target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") ||
            ""
        );
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCursorText("");
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
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [cursorX, cursorY, velocityX, velocityY]);

  // Hide on touch devices
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  const getBlobSize = () => {
    if (isHovering) return 80;
    if (isClicking) return 16;
    if (isMagnetic) return 40;
    return 24;
  };

  return (
    <>
      {/* Trailing blob */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20"
          animate={{
            width: getBlobSize() * 2,
            height: getBlobSize() * 2,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
        />
      </motion.div>

      {/* Main morphing blob cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          style={{
            rotate: rotation,
          }}
        >
          <motion.svg
            width={getBlobSize() * 2}
            height={getBlobSize() * 2}
            viewBox="0 0 100 100"
            animate={{
              width: getBlobSize() * 2,
              height: getBlobSize() * 2,
            }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
          >
            <motion.ellipse
              cx="50"
              cy="50"
              fill="hsl(var(--foreground))"
              animate={{
                rx: isClicking ? 20 : isHovering ? 45 : 40,
                ry: isClicking ? 20 : isHovering ? 45 : 40,
              }}
              style={{
                scaleX,
                scaleY,
                transformOrigin: "center",
              }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
            />
          </motion.svg>

          {/* Cursor text */}
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center text-background text-[10px] font-body font-bold uppercase tracking-widest"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Absorption effect ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent/50"
          animate={{
            width: isHovering ? 100 : isMagnetic ? 70 : 50,
            height: isHovering ? 100 : isMagnetic ? 70 : 50,
            opacity: isHovering ? 0.8 : isMagnetic ? 0.6 : 0,
            borderWidth: isHovering ? 2 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 150 }}
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
