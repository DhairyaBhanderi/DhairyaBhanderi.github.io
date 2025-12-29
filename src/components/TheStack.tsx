import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

interface Skill {
  name: string;
  proficiency: number; // 1-5
  context: string;
}

interface SkillCategory {
  id: string;
  name: string;
  color: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    id: "ai",
    name: "AI / Machine Learning",
    color: "hsl(var(--copper))",
    skills: [
      { name: "LangChain", proficiency: 5, context: "Built MCP stacks & RAG pipelines" },
      { name: "OpenAI", proficiency: 5, context: "GPT-4, embeddings, fine-tuning" },
      { name: "PyTorch", proficiency: 4, context: "Custom model training" },
      { name: "BERT", proficiency: 4, context: "Ticket classifier @ 97% precision" },
      { name: "Scikit-learn", proficiency: 5, context: "ML pipelines & feature engineering" },
      { name: "FAISS", proficiency: 4, context: "Vector similarity search" },
    ],
  },
  {
    id: "backend",
    name: "Backend Development",
    color: "hsl(var(--deep-blue))",
    skills: [
      { name: "Python", proficiency: 5, context: "Primary language, 4+ years" },
      { name: "FastAPI", proficiency: 5, context: "High-performance APIs" },
      { name: "Java", proficiency: 4, context: "Enterprise applications" },
      { name: "Spring Boot", proficiency: 4, context: "Microservices architecture" },
      { name: "PostgreSQL", proficiency: 5, context: "Complex queries & optimization" },
      { name: "Redis", proficiency: 4, context: "Caching & session management" },
    ],
  },
  {
    id: "devops",
    name: "Cloud & DevOps",
    color: "#FF9900",
    skills: [
      { name: "AWS", proficiency: 5, context: "3x Certified, production deployments" },
      { name: "Docker", proficiency: 5, context: "Containerized all projects" },
      { name: "Kubernetes", proficiency: 4, context: "Orchestration & scaling" },
      { name: "Terraform", proficiency: 4, context: "Infrastructure as code" },
      { name: "GitHub Actions", proficiency: 5, context: "CI/CD pipelines" },
      { name: "Kafka", proficiency: 4, context: "Event streaming" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    color: "hsl(var(--teal))",
    skills: [
      { name: "React", proficiency: 5, context: "Primary frontend framework" },
      { name: "TypeScript", proficiency: 5, context: "Type-safe development" },
      { name: "Tailwind", proficiency: 5, context: "Rapid UI development" },
      { name: "Framer Motion", proficiency: 4, context: "Complex animations" },
      { name: "Next.js", proficiency: 4, context: "SSR & static sites" },
    ],
  },
];

const SkillCard = ({ 
  skill, 
  color, 
  index 
}: { 
  skill: Skill; 
  color: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="perspective-container"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className={`
          relative p-6 border rounded-sm cursor-default
          bg-card/50 backdrop-blur-sm
          transition-all duration-300
          ${isHovered ? 'border-accent/50 bg-card/80 shadow-xl' : 'border-border/20'}
        `}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderColor: isHovered ? color : undefined,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading text-lg text-foreground">{skill.name}</h4>
          
          {/* Proficiency dots */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                animate={{
                  backgroundColor: i < skill.proficiency 
                    ? color 
                    : "hsl(var(--muted))",
                  scale: isHovered && i < skill.proficiency ? 1.2 : 1,
                }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>
        </div>

        {/* Context - revealed on hover */}
        <motion.p
          className="text-sm text-muted-foreground"
          animate={{ 
            opacity: isHovered ? 1 : 0.6,
            y: isHovered ? 0 : 5
          }}
        >
          {skill.context}
        </motion.p>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-sm pointer-events-none"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const CategoryStrip = ({ 
  category, 
  index 
}: { 
  category: SkillCategory; 
  index: number;
}) => {
  const stripRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    index % 2 === 0 ? [100, -100] : [-100, 100]
  );

  return (
    <motion.div
      ref={stripRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="mb-16"
    >
      {/* Category header */}
      <div className="flex items-center gap-4 mb-8">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <h3 className="font-heading text-xl md:text-2xl text-foreground">{category.name}</h3>
        <div className="flex-1 h-px bg-border/20" />
        <span className="font-mono text-xs text-muted-foreground">{category.skills.length} skills</span>
      </div>

      {/* Horizontal scroll with parallax */}
      <motion.div 
        className="flex gap-4 overflow-visible"
        style={{ x }}
      >
        {category.skills.map((skill, i) => (
          <SkillCard 
            key={skill.name} 
            skill={skill} 
            color={category.color}
            index={i}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export const TheStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

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
        <div className="container mx-auto px-6 md:px-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-6">
              Technical Expertise
            </span>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-none mb-4">
              The Stack
            </h2>
            <p className="text-muted-foreground font-body text-base max-w-lg">
              Technologies I use daily to build production-grade systems. Hover for context.
            </p>
          </motion.div>
        </div>

        {/* Category strips with horizontal scroll */}
        <div className="container mx-auto px-6 md:px-12">
          {categories.map((category, index) => (
            <CategoryStrip key={category.id} category={category} index={index} />
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
            {categories.reduce((acc, cat) => acc + cat.skills.length, 0)} technologies • 3D tilt on hover
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default TheStack;
