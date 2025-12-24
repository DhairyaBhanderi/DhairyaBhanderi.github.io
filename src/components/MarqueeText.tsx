import { useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

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

  // Create a long enough string that loops seamlessly
  const content = [...items, ...items, ...items, ...items].join(` ${separator} `);

  useAnimationFrame((t, delta) => {
    const moveBy = (direction === "left" ? -1 : 1) * speed * (delta / 1000);
    baseX.set(baseX.get() + moveBy);

    // Reset position for seamless loop
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth / 4;
      if (direction === "left" && baseX.get() <= -width) {
        baseX.set(0);
      } else if (direction === "right" && baseX.get() >= 0) {
        baseX.set(-width);
      }
    }
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        ref={containerRef}
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
    <div className={`relative py-8 overflow-hidden ${className}`}>
      {/* Background layer - fastest, most transparent */}
      <div className="absolute inset-0 opacity-20 scale-110">
        <MarqueeText items={items} speed={80} direction="right" />
      </div>
      
      {/* Middle layer */}
      <div className="relative opacity-40 scale-105">
        <MarqueeText items={items} speed={60} direction="left" separator="◆" />
      </div>
      
      {/* Foreground layer - slowest, most visible */}
      <div className="relative mt-4 opacity-80">
        <MarqueeText items={items} speed={40} direction="right" separator="—" />
      </div>

      {/* Gradient fades on edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default MarqueeText;
