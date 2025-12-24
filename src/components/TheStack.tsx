import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface SkillCategory {
  id: string;
  name: string;
  shortName: string;
  skills: string[];
  direction: "left" | "right";
}

const categories: SkillCategory[] = [
  {
    id: "ai",
    name: "AI / Machine Learning",
    shortName: "AI",
    skills: ["LangChain", "OpenAI", "PyTorch", "BERT", "FAISS", "Scikit-learn", "XGBoost", "TensorFlow.js", "BART"],
    direction: "left",
  },
  {
    id: "backend",
    name: "Backend Development",
    shortName: "BE",
    skills: ["Python", "FastAPI", "Java", "Spring Boot", "Flask", "SQLAlchemy", "PostgreSQL", "Redis"],
    direction: "right",
  },
  {
    id: "devops",
    name: "Cloud & DevOps",
    shortName: "OPS",
    skills: ["AWS", "Docker", "Kafka", "Spark", "Azure", "GitHub Actions", "Terraform", "Kubernetes"],
    direction: "left",
  },
  {
    id: "frontend",
    name: "Frontend",
    shortName: "FE",
    skills: ["React", "TypeScript", "Tailwind", "Framer Motion", "Next.js", "Streamlit"],
    direction: "right",
  },
  {
    id: "tools",
    name: "Automation & Tools",
    shortName: "AUTO",
    skills: ["MCP", "JSON-RPC", "Selenium", "Playwright", "Cursor", "GitHub Copilot"],
    direction: "left",
  },
];

const MarqueeStrip = ({ 
  category, 
  index 
}: { 
  category: SkillCategory; 
  index: number;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Double the skills for seamless loop
  const skills = [...category.skills, ...category.skills, ...category.skills];
  const speed = 25 + index * 5; // Varying speeds
  
  return (
    <motion.div
      initial={{ opacity: 0, x: category.direction === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative group border-t border-border/20 py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredSkill(null);
      }}
    >
      {/* Category label - vertical on left */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 flex items-center justify-center border-r border-border/20 bg-background z-10">
        <span className="font-mono text-xs text-accent tracking-wider rotate-180" style={{ writingMode: "vertical-rl" }}>
          {category.shortName}
        </span>
      </div>

      {/* Marquee container */}
      <div className="overflow-hidden ml-16 md:ml-24">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{
            x: category.direction === "left" 
              ? isPaused ? undefined : ["0%", "-33.33%"]
              : isPaused ? undefined : ["-33.33%", "0%"]
          }}
          transition={{
            x: {
              duration: speed,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {skills.map((skill, i) => (
            <motion.span
              key={`${skill}-${i}`}
              className={`
                inline-block font-heading text-2xl md:text-4xl lg:text-5xl tracking-tight cursor-default
                transition-all duration-300
                ${hoveredSkill === skill 
                  ? 'text-accent scale-105' 
                  : hoveredSkill 
                    ? 'text-muted-foreground/30' 
                    : 'text-foreground/80 hover:text-accent'
                }
              `}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="absolute top-0 bottom-0 left-16 md:left-24 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </motion.div>
  );
};

export const TheStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="skills" ref={containerRef} className="py-32 md:py-48 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 0% 50%, hsl(var(--copper) / 0.08) 0%, transparent 50%),
              radial-gradient(circle at 100% 50%, hsl(var(--deep-blue) / 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <motion.div style={{ opacity }} className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 md:px-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-6">
              Toolkit
            </span>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-none">
              The Stack
            </h2>
          </motion.div>
        </div>

        {/* Marquee strips */}
        <div className="border-b border-border/20">
          {categories.map((category, index) => (
            <MarqueeStrip key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Footer note */}
        <div className="container mx-auto px-6 md:px-12 mt-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-muted-foreground/50 text-center"
          >
            Hover to pause • {categories.reduce((acc, cat) => acc + cat.skills.length, 0)} technologies
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default TheStack;
