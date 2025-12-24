import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

interface MarqueeTextProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  separator?: string;
}

export const MarqueeText = ({
  items,
  speed = 50,
  direction = "left",
  className = "",
  separator = "•",
}: MarqueeTextProps) => {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Create a long enough string that loops seamlessly
  const content = [...items, ...items, ...items, ...items].join(` ${separator} `);

  useAnimationFrame((_, delta) => {
    const moveBy = (direction === "left" ? -1 : 1) * speed * (delta / 1000);
    let newX = baseX.get() + moveBy;

    // Reset position for seamless loop
    if (contentRef.current) {
      const width = contentRef.current.scrollWidth / 4;
      if (direction === "left" && newX <= -width) {
        newX = 0;
      } else if (direction === "right" && newX >= 0) {
        newX = -width;
      }
    }
    
    baseX.set(newX);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} ref={containerRef}>
      <motion.div
        ref={contentRef}
        style={{ x: baseX }}
        className="inline-flex items-center"
      >
        <span className="font-body text-sm md:text-base uppercase tracking-[0.2em] text-muted-foreground">
          {content}
        </span>
      </motion.div>
    </div>
  );
};

// Multi-layer marquee for depth effect
interface MarqueeStackProps {
  items: string[];
  className?: string;
}

export const MarqueeStack = ({ items, className = "" }: MarqueeStackProps) => {
  return (
    <div className={`relative py-6 overflow-hidden ${className}`}>
      {/* Background layer - fastest, most transparent */}
      <div className="opacity-15 scale-105 mb-3">
        <MarqueeText items={items} speed={70} direction="right" separator="◆" />
      </div>
      
      {/* Foreground layer - slowest, most visible */}
      <div className="opacity-60">
        <MarqueeText items={items} speed={35} direction="left" separator="—" />
      </div>

      {/* Gradient fades on edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default MarqueeText;
