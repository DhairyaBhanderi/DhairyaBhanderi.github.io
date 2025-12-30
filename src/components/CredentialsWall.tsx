import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface Certification {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  category: "aws" | "ai" | "data" | "cloud";
  year: string;
  color: string;
  description: string;
  logo: string;
}

// SVG logos as inline components for performance
const AWSLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 48" fill="currentColor">
    <path d="M22.8 29.7c0 .8.1 1.5.3 2 .2.5.5 1.1.9 1.6.1.2.2.3.2.5 0 .2-.1.4-.4.6l-1.2.8c-.2.1-.4.2-.5.2-.2 0-.4-.1-.6-.3-.3-.3-.5-.6-.7-.9-.2-.3-.4-.7-.6-1.1-1.6 1.9-3.6 2.8-6 2.8-1.7 0-3.1-.5-4.1-1.5-1-.9-1.5-2.2-1.5-3.9 0-1.7.6-3.1 1.9-4.2 1.2-1 2.9-1.6 5-1.6.7 0 1.4 0 2.2.1.8.1 1.6.2 2.4.4v-1.5c0-1.5-.3-2.6-1-3.3-.6-.7-1.7-1-3.3-1-.7 0-1.4.1-2.2.3-.8.2-1.5.4-2.3.7-.3.1-.6.2-.8.3-.2.1-.3.1-.4.1-.4 0-.5-.3-.5-.8v-1c0-.4.1-.7.2-.9.1-.2.4-.4.8-.6.7-.4 1.6-.7 2.6-.9 1-.3 2.1-.4 3.2-.4 2.4 0 4.2.6 5.3 1.7 1.1 1.1 1.7 2.8 1.7 5.1v6.7h-.1zm-8.2 3.1c.7 0 1.4-.1 2.1-.4.7-.3 1.4-.7 2-1.3.4-.4.6-.8.8-1.4.1-.5.2-1.2.2-2v-.9c-.6-.2-1.2-.3-1.9-.4-.7-.1-1.3-.1-2-.1-1.4 0-2.4.3-3.1.8-.7.5-1 1.3-1 2.3 0 .9.2 1.6.7 2.1.5.5 1.2.7 2.2.7v.6zm16.2 2.2c-.4 0-.7-.1-.9-.2-.2-.2-.4-.5-.5-.9l-5.9-19.4c-.1-.4-.2-.7-.2-.9 0-.4.2-.6.5-.6h1.9c.5 0 .8.1.9.2.2.2.3.5.5.9l4.2 16.6L35 14c.1-.4.3-.7.5-.9.2-.2.5-.2.9-.2h1.6c.5 0 .8.1.9.2.2.2.4.5.5.9l4.2 16.8 4.3-16.8c.1-.4.3-.7.5-.9.2-.2.5-.2.9-.2h1.8c.4 0 .6.2.6.6 0 .1 0 .3-.1.4 0 .2-.1.3-.2.6L46 34.8c-.1.5-.3.8-.5.9-.2.2-.5.2-.9.2h-1.7c-.5 0-.8-.1-.9-.2-.2-.2-.4-.5-.5-1L37.5 18l-4 16.7c-.1.5-.3.8-.5 1-.2.2-.5.2-.9.2h-1.5v.1zm25.9.8c-1.1 0-2.1-.1-3.1-.4-1-.3-1.8-.6-2.4-.9-.3-.2-.5-.4-.6-.6-.1-.2-.2-.4-.2-.6v-1c0-.6.2-.8.6-.8.2 0 .3 0 .5.1.2.1.4.2.7.3.7.3 1.4.6 2.2.8.8.2 1.6.3 2.4.3 1.3 0 2.3-.2 3-.7.7-.5 1.1-1.2 1.1-2 0-.6-.2-1.1-.6-1.5-.4-.4-1.1-.8-2.2-1.1l-3.1-.9c-1.6-.5-2.8-1.2-3.5-2.2-.7-.9-1.1-2-1.1-3.2 0-.9.2-1.7.6-2.5.4-.7 1-1.3 1.7-1.9.7-.5 1.5-.9 2.5-1.2 1-.3 2-.4 3.1-.4.5 0 1.1 0 1.6.1.6.1 1.1.2 1.6.3.5.1 1 .3 1.4.4.4.2.8.3 1 .5.3.2.5.4.6.6.1.2.2.5.2.8v.9c0 .6-.2.8-.6.8-.2 0-.5-.1-.9-.3-1.3-.6-2.8-.9-4.4-.9-1.2 0-2.1.2-2.8.6-.7.4-1 1-1 1.9 0 .6.2 1.1.6 1.5.4.4 1.2.8 2.4 1.2l3 .9c1.6.5 2.7 1.2 3.4 2.1.6.9 1 2 1 3.2 0 .9-.2 1.8-.6 2.5-.4.8-.9 1.4-1.7 2-.7.5-1.6 1-2.6 1.3-1.1.3-2.2.4-3.4.4v.1z"/>
  </svg>
);

const IBMLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 32" fill="currentColor">
    <path d="M0 0h20v5H5v7h12v5H5v7h15v5H0V0zm24 0h20v5H29v7h12v5H29v7h15v5H24V0zm24 0h25l-3 5h-7l3-2h-8v7h12v5H55v7h8l-3-2h7l3 5H45V0z"/>
  </svg>
);

const MicrosoftLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 23 23" fill="currentColor">
    <path d="M0 0h11v11H0V0zm12 0h11v11H12V0zM0 12h11v11H0V12zm12 0h11v11H12V12z"/>
  </svg>
);

const UdemyLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 24" fill="currentColor">
    <path d="M80 13.3V24H75v-9.9c0-2.2-1-3.3-2.9-3.3-2.1 0-3.4 1.4-3.4 3.8V24h-5V6.6h4.8v2.3h.1c1.2-1.8 3.1-2.9 5.5-2.9 3.8 0 5.9 2.5 5.9 7.3zM45.3 24h-5V6.6h4.8v2.5h.1c.9-1.8 2.7-3 4.9-3 2 0 3.7.9 4.5 2.4 1.2-1.5 3.1-2.4 5.2-2.4 3.8 0 5.9 2.5 5.9 7.2V24h-5v-9.9c0-2.2-1-3.3-2.9-3.3-2.1 0-3.4 1.4-3.4 3.8V24h-5v-9.9c0-2.2-1-3.3-2.8-3.3-2.2 0-3.5 1.4-3.5 3.8V24h.1zM28.6 15.3c0-5.3 3.9-9.2 9.2-9.2 4.5 0 8.2 3 8.9 7.3h-5.2c-.5-1.6-1.9-2.6-3.7-2.6-2.4 0-4 1.8-4 4.5s1.6 4.5 4 4.5c1.8 0 3.2-1 3.7-2.6h5.2c-.7 4.3-4.4 7.3-8.9 7.3-5.3 0-9.2-3.9-9.2-9.2zM4.8 0L0 2.5v4.1l4.8-2.4V16c0 5.1 2.4 8.5 7.7 8.5 5.1 0 7.8-3.4 7.8-8.5V0h-5v15.8c0 2.6-1.1 4-3 4-1.8 0-2.9-1.4-2.9-4V0H4.8z"/>
  </svg>
);

const EdXLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 24" fill="currentColor">
    <path d="M10.5 4.5C4.7 4.5 0 9.2 0 15s4.7 10.5 10.5 10.5c3.7 0 6.9-1.9 8.8-4.8l-3.7-2.1c-1.1 1.6-2.9 2.6-5.1 2.6-3.3 0-6-2.7-6-6s2.7-6 6-6c2.2 0 4 1 5.1 2.6l3.7-2.1c-1.9-2.9-5.1-4.7-8.8-4.7zM26.5 4.5c-5.8 0-10.5 4.7-10.5 10.5s4.7 10.5 10.5 10.5h.2c5.7-.1 10.3-4.8 10.3-10.5S32.3 4.5 26.5 4.5zm0 4.5c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zM60 4.5L51 15l9 10.5h-6L48 18l-6 7.5h-6L45 15l-9-10.5h6l6 7.5 6-7.5h6z"/>
  </svg>
);

const certifications: Certification[] = [
  { 
    id: "aws-saa", 
    name: "Solutions Architect Associate", 
    shortName: "SAA",
    issuer: "Amazon Web Services", 
    category: "aws", 
    year: "2025",
    color: "#FF9900",
    description: "Design distributed systems on AWS",
    logo: "aws"
  },
  { 
    id: "aws-ai", 
    name: "AI Practitioner", 
    shortName: "AI",
    issuer: "Amazon Web Services", 
    category: "aws", 
    year: "2025",
    color: "#FF9900",
    description: "AI/ML services on AWS cloud",
    logo: "aws"
  },
  { 
    id: "aws-cp", 
    name: "Cloud Practitioner", 
    shortName: "CP",
    issuer: "Amazon Web Services", 
    category: "aws", 
    year: "2025",
    color: "#FF9900",
    description: "Cloud fundamentals & best practices",
    logo: "aws"
  },
  { 
    id: "ibm-ds", 
    name: "Data Science Professional", 
    shortName: "DS",
    issuer: "IBM", 
    category: "data", 
    year: "2023",
    color: "#0F62FE",
    description: "End-to-end data science pipelines",
    logo: "ibm"
  },
  { 
    id: "python-ml", 
    name: "Python for Machine Learning", 
    shortName: "ML",
    issuer: "Udemy", 
    category: "ai", 
    year: "2023",
    color: "#A435F0",
    description: "ML algorithms & implementation",
    logo: "udemy"
  },
  { 
    id: "intro-ai", 
    name: "Introduction to AI", 
    shortName: "AI",
    issuer: "edX", 
    category: "ai", 
    year: "2023",
    color: "#02262B",
    description: "AI fundamentals & applications",
    logo: "edx"
  },
  { 
    id: "azure-ai", 
    name: "Azure AI Fundamentals", 
    shortName: "AI-900",
    issuer: "Microsoft", 
    category: "cloud", 
    year: "2022",
    color: "#0078D4",
    description: "Azure AI & cognitive services",
    logo: "microsoft"
  },
];

const LogoComponent = ({ logo, color, className }: { logo: string; color: string; className?: string }) => {
  const logoClass = `${className} transition-colors`;
  const style = { color };
  
  switch (logo) {
    case "aws":
      return <AWSLogo className={logoClass} />;
    case "ibm":
      return <IBMLogo className={logoClass} />;
    case "microsoft":
      return <MicrosoftLogo className={logoClass} />;
    case "udemy":
      return <UdemyLogo className={logoClass} />;
    case "edx":
      return <EdXLogo className={logoClass} />;
    default:
      return <span className="font-bold text-lg" style={style}>{logo.toUpperCase()}</span>;
  }
};

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
      className="font-display font-bold leading-none tracking-tighter"
      style={{ fontSize: "clamp(8rem, 20vw, 16rem)" }}
    >
      <span className="text-foreground">0</span>
      <span className="text-accent">{count}</span>
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

  const x = useTransform(scrollYProgress, [0, 1], [100, -200]);

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
        {/* Header row with massive counter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          {/* Left: Counter */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedCounter target={7} />
            <span className="block font-mono text-sm text-muted-foreground tracking-widest uppercase mt-4">
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
              Validated Expertise
            </span>
            <p className="text-muted-foreground font-body text-base md:text-lg max-w-md leading-relaxed">
              Proven competency across cloud architecture, AI/ML engineering, and enterprise data systems — backed by industry-recognized credentials.
            </p>
          </motion.div>
        </div>

        {/* AWS Cluster - Premium treatment with logos */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#FF9900]/10 border border-[#FF9900]/30 flex items-center justify-center p-2">
                <AWSLogo className="w-full h-full text-[#FF9900]" />
              </div>
              <span className="font-heading text-lg text-foreground">Amazon Web Services</span>
            </div>
            <div className="flex-1 h-px bg-[#FF9900]/20" />
            <span className="font-mono text-xs text-[#FF9900]">3 CERTIFICATIONS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  relative p-8 border rounded-sm cursor-default group
                  transition-all duration-500
                  ${hoveredCert === cert.id 
                    ? 'border-[#FF9900]/60 bg-[#FF9900]/10 shadow-lg shadow-[#FF9900]/20' 
                    : 'border-[#FF9900]/20 bg-gradient-to-br from-[#FF9900]/5 to-transparent'}
                `}
              >
                {/* Logo Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-sm bg-[#FF9900]/20 border border-[#FF9900]/40 flex items-center justify-center p-3">
                    <AWSLogo className="w-full h-full text-[#FF9900]" />
                  </div>
                  <span className="text-xs font-mono text-[#FF9900]/70">{cert.year}</span>
                </div>

                <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-[#FF9900] transition-colors">
                  {cert.name}
                </h3>
                
                {/* Tooltip on hover */}
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: hoveredCert === cert.id ? 1 : 0,
                    height: hoveredCert === cert.id ? "auto" : 0
                  }}
                  className="text-sm text-muted-foreground mt-3 overflow-hidden"
                >
                  {cert.description}
                </motion.p>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-sm pointer-events-none"
                  animate={{ opacity: hoveredCert === cert.id ? 0.15 : 0 }}
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
          <div className="flex items-center gap-4 mb-10">
            <span className="font-heading text-lg text-foreground">Additional Credentials</span>
            <div className="flex-1 h-px bg-border/30" />
          </div>

          {/* Horizontal scroll strip */}
          <motion.div 
            className="flex gap-6 overflow-visible"
            style={{ x }}
          >
            {[...otherCerts, ...otherCerts].map((cert, i) => (
              <motion.div
                key={`${cert.id}-${i}`}
                onMouseEnter={() => setHoveredCert(`${cert.id}-${i}`)}
                onMouseLeave={() => setHoveredCert(null)}
                className={`
                  flex-shrink-0 p-6 border rounded-sm
                  bg-card/50 backdrop-blur-sm cursor-default group
                  transition-all duration-500 min-w-[320px]
                  ${hoveredCert === `${cert.id}-${i}` 
                    ? 'border-accent/50 bg-card/80 shadow-lg' 
                    : 'border-border/20'}
                `}
                style={{
                  borderColor: hoveredCert === `${cert.id}-${i}` ? cert.color : undefined,
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-sm flex items-center justify-center p-2"
                    style={{ 
                      backgroundColor: `${cert.color}15`,
                      borderColor: `${cert.color}30`,
                      borderWidth: 1
                    }}
                  >
                    <LogoComponent logo={cert.logo} color={cert.color} className="w-full h-full" />
                  </div>
                  <div>
                    <span className="block font-heading text-sm text-foreground">
                      {cert.name}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {cert.issuer} • {cert.year}
                    </span>
                  </div>
                </div>
                
                <motion.p
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: hoveredCert === `${cert.id}-${i}` ? 1 : 0.5 }}
                  className="text-xs text-muted-foreground"
                >
                  {cert.description}
                </motion.p>
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
          className="mt-24 pt-8 border-t border-border/20 flex flex-wrap justify-center gap-16 md:gap-24"
        >
          {[
            { count: 3, label: "Cloud Platforms", color: "#FF9900" },
            { count: 3, label: "AI/ML Certifications", color: "hsl(var(--accent))" },
            { count: 2, label: "Data Science", color: "#0F62FE" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <span 
                className="block font-display text-4xl md:text-5xl font-bold transition-colors"
                style={{ color: stat.color }}
              >
                {stat.count}
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-2 block">
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
