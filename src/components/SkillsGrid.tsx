import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Skill {
  name: string;
  context: string;
  category: "ai" | "backend" | "devops" | "frontend";
}

const skills: Skill[] = [
  { name: "Python", context: "LLM pipelines, FastAPI services", category: "ai" },
  { name: "LangChain", context: "Agent orchestration, RAG systems", category: "ai" },
  { name: "FastAPI", context: "High-performance APIs", category: "backend" },
  { name: "React", context: "Interactive dashboards", category: "frontend" },
  { name: "TypeScript", context: "Type-safe applications", category: "frontend" },
  { name: "Docker", context: "Containerized deployments", category: "devops" },
  { name: "Kubernetes", context: "Orchestration at scale", category: "devops" },
  { name: "AWS", context: "Cloud infrastructure", category: "devops" },
  { name: "PostgreSQL", context: "Vector DBs, data persistence", category: "backend" },
  { name: "TensorFlow", context: "ML model training", category: "ai" },
  { name: "Redis", context: "Caching, message queues", category: "backend" },
  { name: "GraphQL", context: "Flexible data fetching", category: "backend" },
];

const categoryColors: Record<string, string> = {
  ai: "text-accent",
  backend: "text-foreground",
  devops: "text-muted-foreground",
  frontend: "text-foreground/80",
};

const SkillItem = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-default"
    >
      <motion.div
        layout
        className={`
          px-4 py-3 border border-border/50 rounded-sm
          transition-colors duration-300
          ${isHovered ? "bg-secondary/80 border-accent/30" : "bg-transparent"}
        `}
      >
        <span
          className={`
            font-mono text-sm tracking-wide transition-colors duration-300
            ${categoryColors[skill.category]}
            ${isHovered ? "text-accent" : ""}
          `}
        >
          {skill.name}
        </span>

        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-muted-foreground mt-2 font-body overflow-hidden"
            >
              {skill.context}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export const SkillsGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="skills" className="py-32 md:py-48 relative">
      <div ref={ref} className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-4">
            Toolkit
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            Technologies I work with
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {skills.map((skill, index) => (
            <SkillItem key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-12 flex flex-wrap gap-6 text-xs font-mono text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            AI/ML
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            Backend
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
            DevOps
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsGrid;
