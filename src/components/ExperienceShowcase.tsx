import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  colorClass: string;
  accentColor: string;
}

const experiences: Experience[] = [
  {
    id: "qualitest",
    role: "AI Automation Engineer",
    company: "Qualitest Group",
    period: "Jun 2025 — Present",
    location: "USA",
    description: "GenAI & MCP Ecosystem — Designing complete Model Context Protocol stacks and high-throughput JSON-RPC 2.0 servers for LLM automation.",
    highlights: ["MCP Ecosystem", "JSON-RPC 2.0", "Selenium/Playwright", "React", "TypeScript"],
    metrics: [
      { value: "70%", label: "Workflow Reduction" },
      { value: "40%", label: "Coverage Increase" },
    ],
    colorClass: "from-copper/30 via-copper-glow/15 to-transparent",
    accentColor: "copper",
  },
  {
    id: "pronoesis",
    role: "AI & Cybersecurity Intern",
    company: "ProNoesis",
    period: "Mar 2025 — May 2025",
    location: "Columbus, Ohio",
    description: "Built LLM-powered security assistant improving analyst response speed by 35%. Prototyped Zero-Trust IAM/RBAC policy generator.",
    highlights: ["LangChain", "OpenAI API", "FastAPI", "Docker", "BERT"],
    metrics: [
      { value: "92%", label: "Threat Detection" },
      { value: "95%", label: "Phishing Precision" },
    ],
    colorClass: "from-deep-blue/30 via-deep-blue-glow/15 to-transparent",
    accentColor: "deep-blue",
  },
  {
    id: "sharvaya",
    role: "Junior Developer Intern",
    company: "Sharvaya Infotech",
    period: "Jan 2022 — Jun 2022",
    location: "India",
    description: "Optimized ML data pipelines and built ticket classifier achieving 97% precision on urgent routing.",
    highlights: ["Python", "FastAPI", "BERT", "GitHub Actions", "ASP.NET"],
    metrics: [
      { value: "97%", label: "Ticket Precision" },
      { value: "90%", label: "Rollback Reduction" },
    ],
    colorClass: "from-teal/30 via-teal-glow/15 to-transparent",
    accentColor: "teal",
  },
  {
    id: "imageweb",
    role: "ML Intern",
    company: "Image Web Solution",
    period: "Jul 2020 — Dec 2020",
    location: "India",
    description: "Built TensorFlow.js recommender and auto-tagging pipeline with serverless inference.",
    highlights: ["TensorFlow.js", "FastText", "Azure Functions"],
    metrics: [
      { value: "18%", label: "Session Increase" },
      { value: "<300ms", label: "Inference Latency" },
    ],
    colorClass: "from-purple/30 via-purple-glow/15 to-transparent",
    accentColor: "purple",
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
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 0.2"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="relative"
    >
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative group"
      >
        {/* Main card */}
        <div className={`
          relative overflow-hidden rounded-sm border border-border/30
          bg-gradient-to-br ${experience.colorClass}
          backdrop-blur-sm p-8 md:p-12
          transition-all duration-500
          ${isHovered ? 'border-accent/40' : ''}
        `}>
          {/* Animated gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 pointer-events-none"
            animate={{ opacity: isHovered ? 0.1 : 0 }}
            style={{
              background: `radial-gradient(circle at 50% 50%, hsl(var(--accent)) 0%, transparent 70%)`,
            }}
          />

          {/* Top row: Period + Location */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-accent bg-accent/10 rounded-sm">
              <Calendar className="w-3 h-3" />
              {experience.period}
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {experience.location}
            </span>
          </div>

          {/* Company + Role */}
          <div className="mb-8">
            <motion.p
              className="text-sm font-mono text-accent tracking-wide uppercase mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {experience.company}
            </motion.p>
            <h3 className="font-heading text-2xl md:text-4xl lg:text-5xl text-foreground tracking-tight leading-tight">
              {experience.role.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                >
                  {word}
                </motion.span>
              ))}
            </h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground font-body text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
            {experience.description}
          </p>

          {/* Metrics row */}
          <div className="flex flex-wrap gap-6 mb-8">
            {experience.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <span className="block font-heading text-3xl md:text-4xl text-foreground font-bold">
                  {metric.value}
                </span>
                <span className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {experience.highlights.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.03 }}
                className="px-3 py-1 text-xs font-mono text-foreground/70 border border-border/50 rounded-sm 
                           hover:border-accent/50 hover:text-accent transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-6 right-6 w-12 h-px bg-accent/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.div
              className="absolute top-6 right-6 w-px h-12 bg-accent/30"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ delay: 0.5 }}
            />
          </div>

          {/* Index number */}
          <div className="absolute bottom-6 right-6 font-mono text-6xl md:text-8xl font-bold text-foreground/[0.03] select-none">
            0{index + 1}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

export const ExperienceShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="py-32 md:py-48 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-6">
            Experience
          </span>
          <h2 className="font-heading text-fluid-section text-foreground tracking-tight leading-none">
            Where I've
            <br />
            <span className="text-stroke">Built</span>
          </h2>
        </motion.div>

        {/* Experience cards */}
        <div ref={containerRef} className="space-y-12 md:space-y-20 max-w-5xl">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceShowcase;
