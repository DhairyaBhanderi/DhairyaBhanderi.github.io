import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Calendar, GraduationCap, Briefcase } from "lucide-react";

interface TimelineEntry {
  id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  metrics?: { value: string; label: string }[];
  color?: string;
}

const timelineEntries: TimelineEntry[] = [
  {
    id: "qualitest",
    type: "work",
    title: "AI Automation Engineer",
    organization: "Qualitest Group",
    period: "Jun 2025 — Present",
    location: "USA",
    description: "Designing complete Model Context Protocol stacks and high-throughput JSON-RPC 2.0 servers for LLM automation.",
    highlights: ["MCP Ecosystem", "JSON-RPC 2.0", "Selenium", "React", "TypeScript"],
    metrics: [
      { value: "70%", label: "Workflow Reduction" },
      { value: "40%", label: "Coverage Increase" },
    ],
    color: "hsl(var(--copper))",
  },
  {
    id: "pronoesis",
    type: "work",
    title: "AI & Cybersecurity Intern",
    organization: "ProNoesis",
    period: "Mar 2025 — May 2025",
    location: "Columbus, Ohio",
    description: "Built LLM-powered security assistant improving analyst response speed by 35%.",
    highlights: ["LangChain", "OpenAI API", "FastAPI", "Docker", "BERT"],
    metrics: [
      { value: "92%", label: "Threat Detection" },
      { value: "95%", label: "Phishing Precision" },
    ],
    color: "hsl(var(--deep-blue))",
  },
  {
    id: "masters",
    type: "education",
    title: "Master of Science in Computer Science",
    organization: "University of Dayton",
    period: "2022 — 2024",
    location: "Dayton, Ohio",
    description: "Focus on AI/ML and distributed systems. GPA: 3.7/4.0",
    highlights: ["Machine Learning", "Distributed Systems", "Data Mining"],
  },
  {
    id: "sharvaya",
    type: "work",
    title: "Junior Developer Intern",
    organization: "Sharvaya Infotech",
    period: "Jan 2022 — Jun 2022",
    location: "India",
    description: "Optimized ML data pipelines and built ticket classifier achieving 97% precision.",
    highlights: ["Python", "FastAPI", "BERT", "GitHub Actions"],
    metrics: [
      { value: "97%", label: "Ticket Precision" },
      { value: "90%", label: "Rollback Reduction" },
    ],
    color: "hsl(var(--teal))",
  },
  {
    id: "imageweb",
    type: "work",
    title: "ML Intern",
    organization: "Image Web Solution",
    period: "Jul 2020 — Dec 2020",
    location: "India",
    description: "Built TensorFlow.js recommender and auto-tagging pipeline with serverless inference.",
    highlights: ["TensorFlow.js", "FastText", "Azure Functions"],
    metrics: [
      { value: "18%", label: "Session Increase" },
      { value: "<300ms", label: "Inference Latency" },
    ],
    color: "hsl(var(--purple))",
  },
  {
    id: "bachelors",
    type: "education",
    title: "Bachelor of Technology in Information Technology",
    organization: "Navrachana University",
    period: "2018 — 2022",
    location: "India",
    description: "Foundation in software engineering and data structures. First Class with Distinction.",
    highlights: ["Software Engineering", "Data Structures", "Database Systems"],
  },
];

const TimelineCard = ({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 0.3"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  const isEducation = entry.type === "education";
  const Icon = isEducation ? GraduationCap : Briefcase;

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className="relative"
    >
      {/* Timeline connector */}
      {index < timelineEntries.length - 1 && (
        <div className="absolute left-4 top-16 bottom-0 w-px bg-gradient-to-b from-accent/30 to-transparent hidden md:block" />
      )}

      <motion.article
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group ${isEducation ? 'md:ml-12' : ''}`}
      >
        {/* Type indicator */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`
            w-8 h-8 rounded-sm flex items-center justify-center
            ${isEducation ? 'bg-muted/30' : 'bg-accent/10'}
          `}
          style={{ 
            backgroundColor: entry.color ? `${entry.color}15` : undefined,
            borderColor: entry.color ? `${entry.color}30` : undefined,
            borderWidth: entry.color ? 1 : 0
          }}
          >
            <Icon className="w-4 h-4" style={{ color: entry.color || 'hsl(var(--accent))' }} />
          </div>
          <span 
            className="text-xs font-mono uppercase tracking-wider"
            style={{ color: entry.color || 'hsl(var(--accent))' }}
          >
            {isEducation ? 'Education' : 'Experience'}
          </span>
        </div>

        {/* Main card */}
        <div className={`
          relative overflow-hidden rounded-sm border
          backdrop-blur-sm p-6 md:p-10
          transition-all duration-500
          ${isEducation 
            ? 'border-border/20 bg-card/30' 
            : 'border-border/30 bg-card/50'
          }
          ${isHovered ? 'border-accent/40 bg-card/80' : ''}
        `}
        style={{
          borderColor: isHovered && entry.color ? entry.color : undefined,
        }}
        >
          {/* Color tint on hover */}
          {entry.color && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: isHovered ? 0.05 : 0 }}
              style={{ backgroundColor: entry.color }}
            />
          )}

          {/* Top row: Period + Location */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {entry.period}
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {entry.location}
            </span>
          </div>

          {/* Organization + Title */}
          <div className="mb-6">
            <motion.p
              className="text-sm font-mono tracking-wide uppercase mb-2"
              style={{ color: entry.color || 'hsl(var(--accent))' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {entry.organization}
            </motion.p>
            <h3 className={`font-heading tracking-tight leading-tight ${
              isEducation ? 'text-lg md:text-2xl' : 'text-xl md:text-3xl lg:text-4xl'
            } text-foreground`}>
              {entry.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground font-body text-sm md:text-base max-w-2xl mb-6 leading-relaxed">
            {entry.description}
          </p>

          {/* Metrics row - only for work */}
          {entry.metrics && (
            <div className="flex flex-wrap gap-6 mb-6">
              {entry.metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <span 
                    className="block font-display text-2xl md:text-3xl font-bold"
                    style={{ color: entry.color || 'hsl(var(--foreground))' }}
                  >
                    {metric.value}
                  </span>
                  <span className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tech/skill tags */}
          <div className="flex flex-wrap gap-2">
            {entry.highlights.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.03 }}
                className="px-3 py-1 text-xs font-mono text-foreground/70 border border-border/50 rounded-sm 
                           hover:border-accent/50 hover:text-accent transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

export const ExperienceShowcase = () => {
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
            Journey
          </span>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-none">
            Experience &
            <br />
            <span className="text-stroke">Education</span>
          </h2>
        </motion.div>

        {/* Timeline cards */}
        <div className="space-y-8 md:space-y-12 max-w-5xl">
          {timelineEntries.map((entry, index) => (
            <TimelineCard
              key={entry.id}
              entry={entry}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceShowcase;
