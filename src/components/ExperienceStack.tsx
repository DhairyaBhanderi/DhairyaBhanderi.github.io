import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  details?: string[];
  colorClass?: string;
}

const experiences: Experience[] = [
  {
    id: "qualitest",
    role: "AI Automation Engineer (GenAI & MCP Ecosystem)",
    company: "Qualitest Group",
    period: "Jun 2025 — Present",
    location: "USA",
    description: "Designing and implementing complete Model Context Protocol stacks and high-throughput JSON-RPC 2.0 servers for LLM automation.",
    highlights: ["MCP Ecosystem", "JSON-RPC 2.0", "Selenium/Playwright"],
    details: [
      "Reduced manual workflows by 70% and increased automation coverage by 40%",
      "Built Claude-style LLM UI with React, TypeScript, Tailwind, Framer Motion",
      "Deployed MCP stack for QA, DevOps, and MLOps orchestration",
      "Implemented circuit breakers, recovery mechanisms, and structured logging",
    ],
    colorClass: "from-copper/20 via-copper-glow/10",
  },
  {
    id: "pronoesis",
    role: "AI & Cybersecurity Intern",
    company: "ProNoesis",
    period: "Mar 2025 — May 2025",
    location: "Columbus, Ohio",
    description: "Built LLM-powered security assistant improving analyst response speed by 35%.",
    highlights: ["LangChain", "OpenAI API", "FastAPI", "Docker"],
    details: [
      "92% accuracy on insider threat detection ML models",
      "95% precision on phishing email classification with BERT",
      "Prototyped Zero-Trust IAM/RBAC policy generator",
      "Deployed FastAPI microservices with Docker containerization",
    ],
    colorClass: "from-deep-blue/20 via-deep-blue-glow/10",
  },
  {
    id: "sharvaya",
    role: "Junior Developer Intern",
    company: "Sharvaya Infotech",
    period: "Jan 2022 — Jun 2022",
    location: "India",
    description: "Optimized ML data pipelines and built ticket classifier achieving 97% precision.",
    highlights: ["Python", "FastAPI", "BERT", "GitHub Actions"],
    details: [
      "Reduced batch runtime by 40% with optimized data-prep scripts",
      "97% precision on urgent ticket routing with fine-tuned BERT",
      "Reduced release rollbacks by 90% with CI/CD automation",
      "Integrated Python classifier with legacy ASP.NET MVC modules",
    ],
    colorClass: "from-teal/20 via-teal-glow/10",
  },
  {
    id: "imageweb",
    role: "ML Intern",
    company: "Image Web Solution",
    period: "Jul 2020 — Dec 2020",
    location: "India",
    description: "Built TensorFlow.js recommender and auto-tagging pipeline with serverless inference.",
    highlights: ["TensorFlow.js", "FastText", "Azure Functions"],
    details: [
      "Increased average session length by 18% with real-time recommendations",
      "Reduced manual tagging hours by 70% with auto-tagging pipeline",
      "Sub-300ms latency serverless inference on Azure Functions",
    ],
    colorClass: "from-purple/20 via-purple-glow/10",
  },
  {
    id: "education-ud",
    role: "Master of Science, Computer Science",
    company: "University of Dayton",
    period: "Jan 2023 — Dec 2024",
    location: "Dayton, Ohio",
    description: "GPA: 3.5 — Focus on AI/ML, Big Data, and Cloud Computing.",
    highlights: ["Machine Learning", "Big Data", "Cloud Computing"],
    details: [
      "Graduate Capstone: Big Data Security Analytics",
      "Courses: Advanced ML, Distributed Systems, Data Engineering",
    ],
    colorClass: "from-emerald/20 via-emerald-glow/10",
  },
  {
    id: "education-nu",
    role: "Bachelor of Technology, Information Technology",
    company: "Navrachana University",
    period: "Jun 2018 — May 2022",
    location: "Vadodara, India",
    description: "GPA: 3.7 — Strong foundation in software engineering and programming.",
    highlights: ["Programming", "Data Structures", "Software Engineering"],
    details: [
      "Core courses in algorithms, databases, and system design",
    ],
    colorClass: "from-rose/20 via-rose-glow/10",
  },
];

const ExperienceCard = ({
  experience,
  index,
  isExpanded,
  onToggle,
}: {
  experience: Experience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 0.3"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    damping: 20,
    stiffness: 150,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="sticky top-24 md:top-32"
    >
      <motion.div
        onClick={onToggle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        className={`
          relative p-8 md:p-12 rounded-sm border border-border/50
          bg-card/90 backdrop-blur-md cursor-pointer
          shadow-[0_-20px_60px_-20px_hsl(var(--background))]
          hover:border-accent/30 transition-colors duration-300
          overflow-hidden
        `}
        whileHover={{ scale: 1.01 }}
        data-cursor="pointer"
        data-cursor-text="View"
      >
        {/* Color gradient overlay based on company */}
        <div className={`absolute inset-0 bg-gradient-to-br ${experience.colorClass || 'from-accent/10 via-transparent'} to-transparent opacity-50 pointer-events-none`} />

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-sm opacity-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--accent) / 0.1) 0%, transparent 50%)",
          }}
          whileHover={{ opacity: 1 }}
        />

        {/* Card content */}
        <div
          style={{
            transform: `translateY(${index * 16}px)`,
            zIndex: experiences.length - index,
          }}
        >
          {/* Period badge + Location */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-block px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-sm">
              {experience.period}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              📍 {experience.location}
            </span>
          </div>

          {/* Role & Company */}
          <h3 className="font-display text-2xl md:text-4xl text-foreground mb-2">
            {experience.role}
          </h3>
          <p className="text-lg md:text-xl text-accent font-body mb-6">
            {experience.company}
          </p>

          {/* Description */}
          <p className="text-muted-foreground font-body mb-8 max-w-2xl text-sm md:text-base">
            {experience.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-3 py-1 text-xs font-mono text-foreground/70 border border-border/50 rounded-sm hover:border-accent/50 transition-colors"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Expanded details */}
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-border/30 mt-6">
              <ul className="space-y-3">
                {experience.details?.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Expand indicator */}
          <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground/50">
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ↓
            </motion.span>
            <span>{isExpanded ? "Click to collapse" : "Click to expand"}</span>
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
          <div className="absolute top-4 right-4 w-px h-8 bg-accent/30" />
          <div className="absolute top-4 right-4 w-8 h-px bg-accent/30" />
        </div>
        <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden pointer-events-none">
          <div className="absolute bottom-4 left-4 w-px h-8 bg-accent/30" />
          <div className="absolute bottom-4 left-4 w-8 h-px bg-accent/30" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ExperienceStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="experience" className="py-32 md:py-48 relative">
      {/* Connecting line */}
      <div className="absolute left-1/2 top-48 bottom-48 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent hidden md:block" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center md:text-left"
        >
          <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-4">
            Experience
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">
            Where I've worked
          </h2>
        </motion.div>

        {/* Stacking cards */}
        <div ref={containerRef} className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isExpanded={expandedId === experience.id}
              onToggle={() =>
                setExpandedId(expandedId === experience.id ? null : experience.id)
              }
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
