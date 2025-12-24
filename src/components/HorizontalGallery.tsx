import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "mcp-ecosystem",
    title: "MCP Ecosystem",
    subtitle: "Qualitest Group",
    description:
      "Designed and implemented complete Model Context Protocol stack—including Selenium, Playwright, Filesystem, and CLI servers—enabling LLMs to perform real-world automation via structured tool invocation.",
    tags: ["Python", "Spring Boot", "React", "JSON-RPC 2.0"],
    metrics: "70% workflow reduction, 40% automation increase",
    year: "2025",
    gradient: "from-copper/20 via-copper-glow/10 to-transparent",
  },
  {
    id: "legal-analyzer",
    title: "AI Legal Document Analyzer",
    subtitle: "Personal Project",
    description:
      "AI analyzer converting legal documents into structured Benefits vs Risks insights using LangChain + Gemini Pro. FastAPI endpoints + Streamlit UI with PDF/TXT upload.",
    tags: ["LangChain", "Gemini Pro", "FastAPI", "Streamlit"],
    metrics: "~10-15s end-to-end analysis",
    year: "2025",
    gradient: "from-purple/20 via-purple-glow/10 to-transparent",
  },
  {
    id: "big-data-security",
    title: "Big Data Security Analytics",
    subtitle: "Graduate Capstone • University of Dayton",
    description:
      "Data pipeline (Kafka → Spark → AWS SageMaker) processing 5M-row CICIDS-2017 intrusion dataset. XGBoost model achieving 85% F1 for real-time intrusion detection.",
    tags: ["Kafka", "Spark", "XGBoost", "AWS Lambda"],
    metrics: "85% F1 score, real-time detection",
    year: "2024",
    gradient: "from-deep-blue/20 via-deep-blue-glow/10 to-transparent",
  },
  {
    id: "healthcare-system",
    title: "Healthcare Management System",
    subtitle: "Software Engineering Coursework",
    description:
      "Full-stack healthcare platform with React + TypeScript and Spring Boot microservices. API Gateway, Eureka, Config Server, and Zipkin distributed tracing.",
    tags: ["React", "Spring Boot", "Docker", "K6"],
    metrics: "+25% throughput, -44% P95 latency",
    year: "2024",
    gradient: "from-emerald/20 via-emerald-glow/10 to-transparent",
  },
  {
    id: "twitter-sentiment",
    title: "Twitter Sentiment Analyzer",
    subtitle: "CPS 501 Coursework",
    description:
      "Trained Bi-LSTM sentiment model on 500K+ tweets achieving 0.85 F1. FastAPI inference API + Power BI dashboard for marketing case study insights.",
    tags: ["Bi-LSTM", "FastAPI", "Power BI", "PyTorch"],
    metrics: "0.85 F1, 0.87 accuracy",
    year: "2023",
    gradient: "from-teal/20 via-teal-glow/10 to-transparent",
  },
  {
    id: "text-summarization",
    title: "Text Summarization Tool",
    subtitle: "CPS 542 Coursework",
    description:
      "Summarization engine using BART (facebook/bart-large-cnn) with FastAPI REST + Flask UI. ROUGE-based evaluation with ~35% compression.",
    tags: ["BART", "FastAPI", "Flask", "Transformers"],
    metrics: "~2.1s per 500-word doc",
    year: "2023",
    gradient: "from-rose/20 via-rose-glow/10 to-transparent",
  },
];

interface TiltCardProps {
  project: (typeof projects)[0];
  index: number;
}

const TiltCard = ({ project, index }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] h-[70vh] cursor-pointer"
      style={{
        perspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`}
        />

        {/* Glitch/distortion overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-accent/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Project number watermark */}
        <div className="absolute top-8 right-8 font-display text-8xl md:text-9xl text-foreground/5 select-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
          {/* Top section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-accent font-body text-sm uppercase tracking-widest">
                {project.subtitle}
              </span>
              <span className="text-muted-foreground font-body text-sm">
                {project.year}
              </span>
            </div>

            <motion.h3
              className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
              style={{ transform: "translateZ(50px)" }}
            >
              {project.title}
            </motion.h3>

            <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-xl">
              {project.description}
            </p>
          </div>

          {/* Bottom section */}
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm font-body bg-secondary/80 text-secondary-foreground rounded-full border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-border/50">
              <span className="text-sm text-accent font-body italic">
                {project.metrics}
              </span>
              <motion.div
                className="flex items-center gap-2 text-foreground font-body group/link"
                whileHover={{ x: 8 }}
              >
                <span>View Case Study</span>
                <ArrowUpRight className="w-5 h-5 group-hover/link:rotate-45 transition-transform" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          style={{
            transform: "translateX(-100%) skewX(-15deg)",
          }}
          animate={{
            transform: isHovered
              ? "translateX(200%) skewX(-15deg)"
              : "translateX(-100%) skewX(-15deg)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export const HorizontalGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (!containerRef.current || !scrollContainerRef.current) return;

      const scrollContainer = scrollContainerRef.current;
      const totalWidth = scrollContainer.scrollWidth - window.innerWidth;

      if (totalWidth <= 0) return;

      const ctx = gsap.context(() => {
        // Horizontal scroll animation
        gsap.to(scrollContainer, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const newIndex = Math.min(
                Math.floor(self.progress * projects.length),
                projects.length - 1
              );
              setActiveIndex(newIndex);
            },
          },
        });
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative overflow-hidden bg-background"
    >
      {/* Section header */}
      <div className="absolute top-8 left-6 md:left-12 z-20">
        <span className="text-accent font-body text-sm uppercase tracking-widest mb-2 block">
          Selected Work
        </span>
        <h2 className="font-display text-2xl md:text-3xl text-foreground">
          Projects
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-8 md:gap-12 pl-6 md:pl-12 pr-[20vw] h-screen"
        style={{ width: "fit-content" }}
      >
        {/* Spacer for header */}
        <div className="flex-shrink-0 w-16 md:w-32" />

        {projects.map((project, index) => (
          <TiltCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <div className="flex items-center gap-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-accent"
                  : index < activeIndex
                  ? "bg-accent/50"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <span className="text-muted-foreground font-body text-sm ml-4">
          {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 text-muted-foreground text-sm z-20">
        <span className="font-body">Scroll to explore</span>
        <ArrowRight className="w-4 h-4 animate-pulse" />
      </div>
    </section>
  );
};

export default HorizontalGallery;
