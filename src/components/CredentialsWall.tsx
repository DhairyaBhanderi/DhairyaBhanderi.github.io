import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Cloud, Brain, Code, Award, Shield, Database } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  date: string;
  category: "aws" | "ai" | "data" | "cloud";
  icon: typeof Award;
}

const certifications: Certification[] = [
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect – Associate",
    shortName: "Solutions Architect",
    issuer: "Amazon Web Services",
    date: "April 2025",
    category: "aws",
    icon: Cloud,
  },
  {
    id: "aws-ai",
    name: "AWS Certified AI Practitioner",
    shortName: "AI Practitioner",
    issuer: "Amazon Web Services",
    date: "March 2025",
    category: "aws",
    icon: Brain,
  },
  {
    id: "aws-cp",
    name: "AWS Certified Cloud Practitioner",
    shortName: "Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "February 2025",
    category: "aws",
    icon: Cloud,
  },
  {
    id: "ibm-ds",
    name: "IBM Data Science Professional Certificate",
    shortName: "Data Science Pro",
    issuer: "Coursera",
    date: "August 2023",
    category: "data",
    icon: Database,
  },
  {
    id: "python-ml",
    name: "Python for Data Science & Machine Learning",
    shortName: "Python ML",
    issuer: "Udemy",
    date: "June 2023",
    category: "ai",
    icon: Code,
  },
  {
    id: "intro-ai",
    name: "Introduction to Artificial Intelligence",
    shortName: "AI Fundamentals",
    issuer: "edX",
    date: "May 2023",
    category: "ai",
    icon: Brain,
  },
  {
    id: "azure-ai",
    name: "AI-900: Microsoft Azure AI Fundamentals",
    shortName: "Azure AI",
    issuer: "Microsoft",
    date: "May 2022",
    category: "cloud",
    icon: Shield,
  },
];

const categoryColors = {
  aws: "from-aws-orange/30 to-aws-orange/10 border-aws-orange/40 text-aws-orange",
  ai: "from-purple/30 to-purple/10 border-purple/40 text-purple",
  data: "from-deep-blue/30 to-deep-blue/10 border-deep-blue/40 text-deep-blue",
  cloud: "from-teal/30 to-teal/10 border-teal/40 text-teal",
};

const CertCard = ({ cert, index }: { cert: Certification; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = cert.icon;
  const colors = categoryColors[cert.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="perspective-container"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-40 md:h-48"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className={`
            absolute inset-0 rounded-sm border bg-gradient-to-br ${colors}
            backdrop-blur-sm p-5 flex flex-col justify-between
            backface-hidden cursor-pointer
          `}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Icon */}
          <div className="flex justify-between items-start">
            <Icon className="w-8 h-8 opacity-60" />
            {cert.category === "aws" && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-aws-orange animate-pulse" />
                <span className="text-xs font-mono text-aws-orange">AWS</span>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <h4 className="font-heading text-sm md:text-base text-foreground leading-tight mb-1">
              {cert.shortName}
            </h4>
            <p className="text-xs text-muted-foreground font-mono">
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className={`
            absolute inset-0 rounded-sm border bg-gradient-to-br ${colors}
            backdrop-blur-sm p-5 flex flex-col justify-between
          `}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <h4 className="font-heading text-xs text-foreground leading-tight mb-2">
              {cert.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              {cert.issuer}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-accent">{cert.date}</span>
            <Award className="w-4 h-4 text-accent/50" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedCounter = ({ value, label }: { value: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        let start = 0;
        const end = value;
        const duration = 1500;
        const stepTime = duration / end;
        
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start >= end) clearInterval(timer);
        }, stepTime);
      }}
    >
      <span className="block font-heading text-5xl md:text-7xl text-foreground font-bold">
        {count}
      </span>
      <span className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mt-2">
        {label}
      </span>
    </motion.div>
  );
};

export const CredentialsWall = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const awsCerts = certifications.filter(c => c.category === "aws");
  const otherCerts = certifications.filter(c => c.category !== "aws");

  return (
    <section id="certifications" className="py-32 md:py-48 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, hsl(var(--aws-orange) / 0.1) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, hsl(var(--purple) / 0.1) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      <div ref={containerRef} className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-6">
              Credentials
            </span>
            <h2 className="font-heading text-fluid-section text-foreground tracking-tight leading-none">
              Industry
              <br />
              <span className="text-gradient-copper">Certified</span>
            </h2>
          </div>

          {/* Counter */}
          <AnimatedCounter value={7} label="Total Certifications" />
        </motion.div>

        {/* AWS Cluster - Featured */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-aws-orange/20 flex items-center justify-center">
              <Cloud className="w-4 h-4 text-aws-orange" />
            </div>
            <h3 className="font-heading text-xl text-foreground">
              Amazon Web Services
            </h3>
            <span className="px-2 py-0.5 text-xs font-mono text-aws-orange bg-aws-orange/10 rounded-sm">
              3 Certifications
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {awsCerts.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Other Certifications - Horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-accent" />
            </div>
            <h3 className="font-heading text-xl text-foreground">
              AI & Data Science
            </h3>
          </div>

          {/* Scrollable on mobile, grid on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible scrollbar-hide">
            {otherCerts.map((cert, i) => (
              <div key={cert.id} className="min-w-[260px] md:min-w-0">
                <CertCard cert={cert} index={i + 3} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-border/20 flex flex-wrap justify-center gap-12"
        >
          <div className="text-center">
            <span className="block font-heading text-3xl text-aws-orange">3</span>
            <span className="text-xs font-mono text-muted-foreground uppercase">AWS</span>
          </div>
          <div className="text-center">
            <span className="block font-heading text-3xl text-purple">2</span>
            <span className="text-xs font-mono text-muted-foreground uppercase">AI/ML</span>
          </div>
          <div className="text-center">
            <span className="block font-heading text-3xl text-deep-blue">1</span>
            <span className="text-xs font-mono text-muted-foreground uppercase">Data Science</span>
          </div>
          <div className="text-center">
            <span className="block font-heading text-3xl text-teal">1</span>
            <span className="text-xs font-mono text-muted-foreground uppercase">Azure</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CredentialsWall;
