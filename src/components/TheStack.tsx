import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Brain, Server, Cloud, Layout, Wrench, 
  Sparkles, Database, Terminal, Palette, Cpu 
} from "lucide-react";

interface Skill {
  name: string;
  context: string;
  featured?: boolean;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: typeof Brain;
  color: string;
  bgGradient: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    id: "ai",
    name: "AI / ML",
    icon: Brain,
    color: "text-copper",
    bgGradient: "from-copper/20 to-copper/5",
    skills: [
      { name: "LangChain", context: "Agent orchestration, RAG systems", featured: true },
      { name: "OpenAI API", context: "GPT integration, embeddings", featured: true },
      { name: "PyTorch", context: "Deep learning, model training" },
      { name: "Scikit-learn", context: "Classical ML, preprocessing" },
      { name: "BERT", context: "NLU, text classification", featured: true },
      { name: "BART", context: "Text summarization" },
      { name: "FAISS", context: "Vector similarity search" },
      { name: "XGBoost", context: "Gradient boosting" },
      { name: "TensorFlow.js", context: "Browser-based ML" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    color: "text-deep-blue",
    bgGradient: "from-deep-blue/20 to-deep-blue/5",
    skills: [
      { name: "Python", context: "LLM pipelines, FastAPI services", featured: true },
      { name: "Java", context: "Spring Boot microservices" },
      { name: "FastAPI", context: "High-performance APIs", featured: true },
      { name: "Spring Boot", context: "Enterprise Java" },
      { name: "Flask", context: "Lightweight web apps" },
      { name: "SQLAlchemy", context: "ORM, database management" },
    ],
  },
  {
    id: "devops",
    name: "Cloud & DevOps",
    icon: Cloud,
    color: "text-teal",
    bgGradient: "from-teal/20 to-teal/5",
    skills: [
      { name: "AWS", context: "SageMaker, Lambda, S3", featured: true },
      { name: "Docker", context: "Containerized deployments", featured: true },
      { name: "GitHub Actions", context: "CI/CD automation" },
      { name: "Azure", context: "Functions, App Service" },
      { name: "Kafka", context: "Event streaming, pipelines" },
      { name: "Spark", context: "Distributed processing" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: Layout,
    color: "text-purple",
    bgGradient: "from-purple/20 to-purple/5",
    skills: [
      { name: "React", context: "Interactive dashboards", featured: true },
      { name: "TypeScript", context: "Type-safe applications", featured: true },
      { name: "Tailwind CSS", context: "Utility-first styling" },
      { name: "Framer Motion", context: "Animations, transitions" },
      { name: "Streamlit", context: "Rapid ML prototypes" },
    ],
  },
  {
    id: "tools",
    name: "Automation & Tools",
    icon: Wrench,
    color: "text-emerald",
    bgGradient: "from-emerald/20 to-emerald/5",
    skills: [
      { name: "MCP", context: "Model Context Protocol servers", featured: true },
      { name: "JSON-RPC 2.0", context: "High-throughput LLM execution" },
      { name: "Selenium", context: "Browser automation" },
      { name: "Playwright", context: "Modern web testing" },
      { name: "Cursor", context: "AI-powered IDE" },
      { name: "GitHub Copilot", context: "AI pair programming" },
    ],
  },
];

const BentoSkillCard = ({ 
  skill, 
  category, 
  index,
  size = "normal" 
}: { 
  skill: Skill; 
  category: SkillCategory;
  index: number;
  size?: "large" | "normal";
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon = category.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`
        relative overflow-hidden rounded-sm border border-border/30
        bg-gradient-to-br ${category.bgGradient}
        backdrop-blur-sm cursor-default
        transition-all duration-300
        ${isHovered ? 'border-accent/40 shadow-lg' : ''}
        ${size === "large" ? 'p-6 md:p-8' : 'p-4 md:p-5'}
      `}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        style={{
          background: `radial-gradient(circle at 50% 50%, hsl(var(--accent)) 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <span className={`
            font-heading font-semibold ${category.color} tracking-tight
            ${size === "large" ? 'text-xl md:text-2xl' : 'text-sm md:text-base'}
          `}>
            {skill.name}
          </span>
          {skill.featured && (
            <Sparkles className="w-4 h-4 text-accent/50" />
          )}
        </div>

        <AnimatePresence>
          {(isHovered || size === "large") && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-muted-foreground font-body overflow-hidden"
            >
              {skill.context}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Category indicator */}
      <div className="absolute bottom-2 right-2 opacity-20">
        <Icon className="w-5 h-5" />
      </div>
    </motion.div>
  );
};

export const TheStack = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-32 md:py-48 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, hsl(var(--copper) / 0.08) 0%, transparent 40%),
              radial-gradient(circle at 70% 80%, hsl(var(--deep-blue) / 0.08) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-6">
            Toolkit
          </span>
          <h2 className="font-heading text-fluid-section text-foreground tracking-tight leading-none mb-6">
            The
            <br />
            <span className="text-stroke">Stack</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm md:text-base max-w-xl">
            Technologies I use to build intelligent, scalable systems.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`
              px-4 py-2 text-xs font-mono uppercase tracking-wider
              rounded-sm border transition-all duration-300
              ${!activeCategory 
                ? 'bg-accent/20 border-accent/50 text-accent' 
                : 'border-border/30 text-muted-foreground hover:border-accent/30'
              }
            `}
          >
            All
          </button>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                className={`
                  px-4 py-2 text-xs font-mono uppercase tracking-wider
                  rounded-sm border transition-all duration-300
                  flex items-center gap-2
                  ${activeCategory === cat.id 
                    ? 'bg-accent/20 border-accent/50 text-accent' 
                    : 'border-border/30 text-muted-foreground hover:border-accent/30'
                  }
                `}
              >
                <Icon className="w-3 h-3" />
                {cat.name}
              </button>
            );
          })}
        </motion.div>

        {/* Bento Grid */}
        {categories
          .filter(cat => !activeCategory || cat.id === activeCategory)
          .map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-12"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <category.icon className={`w-5 h-5 ${category.color}`} />
                <h3 className={`font-heading text-lg ${category.color}`}>
                  {category.name}
                </h3>
                <div className="flex-1 h-px bg-border/20" />
                <span className="text-xs font-mono text-muted-foreground">
                  {category.skills.length} skills
                </span>
              </div>

              {/* Skills grid - Bento style with featured items larger */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {category.skills.map((skill, i) => (
                  <div
                    key={skill.name}
                    className={skill.featured ? 'col-span-2 row-span-1' : ''}
                  >
                    <BentoSkillCard
                      skill={skill}
                      category={category}
                      index={i}
                      size={skill.featured ? "large" : "normal"}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border/20 flex flex-wrap justify-center gap-8 text-xs font-mono text-muted-foreground"
        >
          {categories.map((cat) => (
            <span key={cat.id} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${cat.color.replace('text-', 'bg-')}`} />
              {cat.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TheStack;
