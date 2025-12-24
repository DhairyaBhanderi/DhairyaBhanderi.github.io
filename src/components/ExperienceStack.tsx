import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

const experiences: Experience[] = [
  {
    id: "qualitest",
    role: "AI Automation Engineer",
    company: "Qualitest Global",
    period: "2025 — Present",
    description: "Building enterprise-scale AI automation systems and MCP ecosystem.",
    highlights: ["MCP Ecosystem", "Enterprise AI", "Automation Pipelines"],
  },
  {
    id: "pronoesis",
    role: "AI Engineer",
    company: "ProNoesis",
    period: "2024 — 2025",
    description: "Developed LLM-powered threat analysis and legal document processing systems.",
    highlights: ["LLM Threat Assistant", "Legal AI", "RAG Systems"],
  },
  {
    id: "education",
    role: "MS Computer Science",
    company: "University of Dayton",
    period: "2023 — 2024",
    description: "Specialized in AI/ML and distributed systems.",
    highlights: ["Machine Learning", "Distributed Systems", "Research"],
  },
];

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="sticky top-24 md:top-32"
    >
      <div
        className={`
          relative p-8 md:p-12 rounded-sm border border-border/50
          bg-card/80 backdrop-blur-sm
          shadow-[0_-20px_60px_-20px_hsl(var(--background))]
        `}
        style={{
          transform: `translateY(${index * 20}px)`,
          zIndex: experiences.length - index,
        }}
      >
        {/* Period badge */}
        <span className="inline-block px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-sm mb-6">
          {experience.period}
        </span>

        {/* Role & Company */}
        <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
          {experience.role}
        </h3>
        <p className="text-lg text-muted-foreground font-body mb-6">
          {experience.company}
        </p>

        {/* Description */}
        <p className="text-muted-foreground font-body mb-8 max-w-2xl">
          {experience.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {experience.highlights.map((highlight) => (
            <span
              key={highlight}
              className="px-3 py-1 text-xs font-mono text-foreground/70 border border-border/50 rounded-sm"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div className="absolute top-4 right-4 w-px h-8 bg-border/50" />
          <div className="absolute top-4 right-4 w-8 h-px bg-border/50" />
        </div>
      </div>
    </motion.div>
  );
};

export const ExperienceStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="py-32 md:py-48 relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-4">
            Experience
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            Where I've worked
          </h2>
        </motion.div>

        {/* Stacking cards */}
        <div ref={containerRef} className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* Spacer for scroll effect */}
        <div className="h-32" />
      </div>
    </section>
  );
};

export default ExperienceStack;
