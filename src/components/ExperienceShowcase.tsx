import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Calendar, GraduationCap, Briefcase, ChevronDown } from "lucide-react";

interface TimelineEntry {
  id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  details?: string[];
  metrics?: { value: string; label: string }[];
  color?: string;
}

// Ordered from most recent to oldest
const timelineEntries: TimelineEntry[] = [
  {
    id: "qualitest",
    type: "work",
    title: "AI Automation Engineer",
    organization: "Qualitest Group",
    period: "Jun 2025 — Present",
    location: "USA",
    description: "Designing complete Model Context Protocol stacks and high-throughput JSON-RPC 2.0 servers for LLM automation.",
    details: [
      "Architected MCP ecosystem with 8+ context servers reducing manual prompt engineering by 70%",
      "Built high-throughput JSON-RPC 2.0 servers handling 1000+ concurrent LLM requests",
      "Integrated Selenium-based browser automation with React/TypeScript frontends",
      "Deployed production systems serving 40+ enterprise applications"
    ],
    highlights: ["MCP Ecosystem", "JSON-RPC 2.0", "Selenium", "React", "TypeScript", "LLM Automation"],
    metrics: [
      { value: "70%", label: "Workflow Reduction" },
      { value: "40+", label: "Enterprise Apps" },
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
    details: [
      "Developed multi-agent LLM security assistant using LangChain with OpenAI API integration",
      "Trained BERT-based phishing classifier achieving 95% precision on internal datasets",
      "Built FastAPI microservices with Docker containerization for scalable deployment",
      "Reduced analyst investigation time by 35% through automated threat correlation"
    ],
    highlights: ["LangChain", "OpenAI API", "FastAPI", "Docker", "BERT", "Multi-Agent Systems"],
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
    period: "Aug 2022 — Dec 2024",
    location: "Dayton, Ohio",
    description: "Focus on AI/ML and distributed systems. GPA: 3.7/4.0",
    details: [
      "Specialized in Machine Learning, Deep Learning, and Distributed Systems",
      "Completed advanced coursework in Data Mining, Natural Language Processing, and Computer Vision",
      "Graduate Research Assistant focusing on neural network optimization",
      "Dean's List recognition for academic excellence"
    ],
    highlights: ["Machine Learning", "Deep Learning", "Distributed Systems", "Data Mining", "NLP"],
  },
  {
    id: "sharvaya",
    type: "work",
    title: "Junior Developer Intern",
    organization: "Sharvaya Infotech",
    period: "Jan 2022 — Jun 2022",
    location: "India",
    description: "Optimized ML data pipelines and built ticket classifier achieving 97% precision.",
    details: [
      "Built BERT-based ticket classification system achieving 97% precision",
      "Designed FastAPI-powered ML inference endpoints with sub-100ms latency",
      "Implemented CI/CD pipelines with GitHub Actions reducing deployment errors by 90%",
      "Developed automated data preprocessing pipelines handling 10K+ daily records"
    ],
    highlights: ["Python", "FastAPI", "BERT", "GitHub Actions", "CI/CD", "ML Pipelines"],
    metrics: [
      { value: "97%", label: "Classification Precision" },
      { value: "90%", label: "Fewer Deploy Errors" },
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
    details: [
      "Developed browser-based recommendation engine using TensorFlow.js improving session time by 18%",
      "Built multi-label auto-tagging pipeline with FastText achieving <300ms inference latency",
      "Deployed serverless ML inference on Azure Functions for cost-effective scaling",
      "Integrated real-time content suggestions into e-commerce platform"
    ],
    highlights: ["TensorFlow.js", "FastText", "Azure Functions", "Serverless", "Recommendation Systems"],
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
    period: "Jul 2018 — May 2022",
    location: "India",
    description: "Foundation in software engineering and data structures. First Class with Distinction.",
    details: [
      "Strong foundation in Data Structures, Algorithms, and Object-Oriented Programming",
      "Completed comprehensive coursework in Database Systems and Software Engineering",
      "Senior capstone project: Predictive analytics system for student performance",
      "Graduated with First Class with Distinction (Top 5% of class)"
    ],
    highlights: ["Software Engineering", "Data Structures", "Database Systems", "Algorithms", "OOP"],
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
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 0.3"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  const isEducation = entry.type === "education";
  const Icon = isEducation ? GraduationCap : Briefcase;
  const canExpand = !isEducation && !!entry.details?.length;

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
          hover:border-accent/40 hover:bg-card/80
        `}
        style={{
          borderColor: isExpanded && entry.color ? entry.color : undefined,
        }}
        >
          {/* Color tint on hover */}
          {entry.color && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: isExpanded ? 0.08 : 0 }}
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

          {/* Expanded details */}
          <motion.div
            initial={false}
            animate={{ 
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            className="overflow-hidden"
          >
            {entry.details && (
              <ul className="space-y-3 mb-6 border-l-2 border-accent/20 pl-4">
                {entry.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-sm text-muted-foreground/90 leading-relaxed"
                  >
                    {detail}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Tech/skill tags */}
          <div className="flex flex-wrap gap-2 mb-4">
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

          {/* Expand/Collapse button */}
          {entry.details && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-xs font-mono text-accent hover:text-accent/80 transition-colors mt-4"
            >
              <span>{isExpanded ? 'Show less' : 'Show more details'}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          )}
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