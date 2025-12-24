import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  category: "aws" | "ai" | "data" | "cloud";
  year: string;
}

const certifications: Certification[] = [
  { id: "aws-saa", name: "Solutions Architect", issuer: "AWS", category: "aws", year: "2025" },
  { id: "aws-ai", name: "AI Practitioner", issuer: "AWS", category: "aws", year: "2025" },
  { id: "aws-cp", name: "Cloud Practitioner", issuer: "AWS", category: "aws", year: "2025" },
  { id: "ibm-ds", name: "Data Science Professional", issuer: "IBM", category: "data", year: "2023" },
  { id: "python-ml", name: "Python ML", issuer: "Udemy", category: "ai", year: "2023" },
  { id: "intro-ai", name: "AI Fundamentals", issuer: "edX", category: "ai", year: "2023" },
  { id: "azure-ai", name: "Azure AI-900", issuer: "Microsoft", category: "cloud", year: "2022" },
];

const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => {
        if (hasAnimated) return;
        setHasAnimated(true);
        let start = 0;
        const duration = 1200;
        const stepTime = duration / target;
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start >= target) clearInterval(timer);
        }, stepTime);
      }}
      className="font-display font-bold text-[15vw] md:text-[12vw] lg:text-[10vw] text-foreground leading-none tracking-tighter"
    >
      0{count}
    </motion.div>
  );
};

export const CredentialsWall = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const awsCerts = certifications.filter(c => c.category === "aws");
  const otherCerts = certifications.filter(c => c.category !== "aws");

  return (
    <section id="certifications" ref={containerRef} className="py-32 md:py-48 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, hsl(var(--copper) / 0.15) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header row with counter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          {/* Left: Counter */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedCounter target={7} />
            <span className="block font-mono text-xs text-muted-foreground tracking-widest uppercase mt-4">
              Industry Certifications
            </span>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-end"
          >
            <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-4">
              Credentials
            </span>
            <p className="text-muted-foreground font-body text-sm md:text-base max-w-md">
              Validated expertise across cloud architecture, AI/ML, and enterprise data systems.
            </p>
          </motion.div>
        </div>

        {/* AWS Cluster - Premium treatment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="px-3 py-1 text-xs font-mono bg-[#FF9900]/10 text-[#FF9900] border border-[#FF9900]/30 rounded-sm">
              AWS
            </span>
            <div className="flex-1 h-px bg-border/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {awsCerts.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredCert(cert.id)}
                onMouseLeave={() => setHoveredCert(null)}
                className={`
                  relative p-6 border border-[#FF9900]/20 rounded-sm
                  bg-gradient-to-br from-[#FF9900]/5 to-transparent
                  transition-all duration-300 cursor-default
                  ${hoveredCert === cert.id ? 'border-[#FF9900]/50 shadow-lg shadow-[#FF9900]/10' : ''}
                `}
              >
                <span className="block font-heading text-lg md:text-xl text-foreground mb-2">
                  {cert.name}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {cert.year}
                </span>

                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-sm pointer-events-none"
                  animate={{ opacity: hoveredCert === cert.id ? 0.1 : 0 }}
                  style={{
                    background: `radial-gradient(circle at center, #FF9900 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other certs - horizontal strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="px-3 py-1 text-xs font-mono bg-accent/10 text-accent border border-accent/30 rounded-sm">
              AI & Data
            </span>
            <div className="flex-1 h-px bg-border/20" />
          </div>

          {/* Horizontal scroll strip */}
          <motion.div 
            className="flex gap-4 overflow-hidden"
            style={{ x }}
          >
            {[...otherCerts, ...otherCerts].map((cert, i) => (
              <motion.div
                key={`${cert.id}-${i}`}
                onMouseEnter={() => setHoveredCert(cert.id)}
                onMouseLeave={() => setHoveredCert(null)}
                className={`
                  flex-shrink-0 px-6 py-4 border border-border/20 rounded-sm
                  bg-card/50 backdrop-blur-sm
                  transition-all duration-300 cursor-default
                  ${hoveredCert === cert.id ? 'border-accent/50' : ''}
                `}
              >
                <span className="block font-heading text-sm text-foreground whitespace-nowrap">
                  {cert.name}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {cert.issuer} • {cert.year}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 pt-8 border-t border-border/20 flex flex-wrap justify-center gap-12 md:gap-20"
        >
          {[
            { count: 3, label: "AWS" },
            { count: 2, label: "AI/ML" },
            { count: 1, label: "Data Science" },
            { count: 1, label: "Azure" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="block font-display text-2xl md:text-3xl text-foreground font-bold">
                {stat.count}
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CredentialsWall;
