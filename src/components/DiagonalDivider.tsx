import { motion } from "framer-motion";

interface DiagonalDividerProps {
  direction?: "left" | "right";
  height?: number;
  className?: string;
  color?: string;
}

export const DiagonalDivider = ({
  direction = "right",
  height = 120,
  className = "",
  color = "hsl(var(--background))",
}: DiagonalDividerProps) => {
  const skewDirection = direction === "right" ? -3 : 3;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px`, marginTop: `-${height / 2}px`, marginBottom: `-${height / 2}px` }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 origin-left"
        style={{
          background: color,
          transform: `skewY(${skewDirection}deg)`,
        }}
      />
      
      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 h-[1px] origin-left"
        style={{
          top: "50%",
          background: "linear-gradient(90deg, hsl(var(--accent)), transparent)",
          transform: `skewY(${skewDirection}deg)`,
        }}
      />
    </div>
  );
};

export default DiagonalDivider;
