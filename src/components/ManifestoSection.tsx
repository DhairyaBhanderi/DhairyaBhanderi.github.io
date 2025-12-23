import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const statements = [
  "I architect systems where AI meets reliability.",
  "From prototype to production, I build what lasts.",
  "Automation that empowers, not replaces.",
];

export const ManifestoSection = () => {
  return (
    <section id="manifesto" className="py-32 md:py-48 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {statements.map((statement, index) => (
          <StatementBlock key={index} statement={statement} index={index} />
        ))}
      </div>
    </section>
  );
};

const StatementBlock = ({ statement, index }: { statement: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className="mb-16 md:mb-24 last:mb-0"
    >
      <p 
        className={`font-display text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight ${
          index === 1 ? "text-accent md:text-right" : "text-foreground"
        } ${index === 2 ? "md:ml-24" : ""}`}
      >
        {statement}
      </p>
    </motion.div>
  );
};

export default ManifestoSection;