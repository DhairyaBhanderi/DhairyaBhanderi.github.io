import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "mcp-ecosystem",
    title: "MCP Ecosystem",
    subtitle: "Enterprise AI Infrastructure",
    description: "Engineered scalable Model Context Protocol servers enabling tool invocations, prompt management, and resources across 40+ AI-powered applications.",
    tags: ["Python", "FastAPI", "Docker", "Kubernetes"],
    metrics: "35% faster AI tool invocations",
    year: "2025",
  },
  {
    id: "llm-threat-assistant",
    title: "LLM Threat Assistant",
    subtitle: "Security Intelligence Platform",
    description: "Fine-tuned Llama model for threat classification, integrated with RAG pipelines for retrieval-augmented cybersecurity analysis.",
    tags: ["LangChain", "Llama", "RAG", "AWS"],
    metrics: "Enterprise-grade security AI",
    year: "2025",
  },
  {
    id: "legal-analyzer",
    title: "AI Legal Document Analyzer",
    subtitle: "Personal Project",
    description: "Developed AI-powered contract analysis tool for clause identification and risk assessment with semantic search capabilities.",
    tags: ["React", "Node.js", "OpenAI", "Vector DB"],
    metrics: "70% reduction in review time",
    year: "2024",
  },
  {
    id: "healthcare-system",
    title: "Healthcare Management System",
    subtitle: "Full-Stack Platform",
    description: "Architected comprehensive EHR platform with appointment scheduling, billing, and analytics dashboards.",
    tags: ["React", "Node.js", "PostgreSQL", "Redis"],
    metrics: "Scalable healthcare infrastructure",
    year: "2024",
  },
];

export const ProjectShowcase = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section id="work" className="py-24 md:py-32 relative">
      {/* Section header */}
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-body text-sm uppercase tracking-widest mb-4 block">
            Selected Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            Projects that define<br />my craft
          </h2>
        </motion.div>
      </div>

      {/* Projects grid */}
      <div ref={containerRef} className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ 
  project, 
  index 
}: { 
  project: typeof projects[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-500"
    >
      {/* Project image placeholder */}
      <div className="aspect-[16/10] bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-6xl md:text-7xl text-muted-foreground/20">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        
        {/* Hover overlay */}
        <motion.div 
          className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Meta */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-accent text-sm font-body">{project.subtitle}</span>
          <span className="text-muted-foreground text-sm font-body">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 text-xs font-body bg-secondary text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground font-body italic">
            {project.metrics}
          </span>
          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center gap-1 text-accent font-body text-sm cursor-pointer"
          >
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectShowcase;