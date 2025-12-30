import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import awsLogoUrl from "@/assets/logos/aws.svg";
import ibmLogoUrl from "@/assets/logos/ibm.svg";
import microsoftLogoUrl from "@/assets/logos/microsoft.svg";
import udemyLogoUrl from "@/assets/logos/udemy.svg";
import edxLogoUrl from "@/assets/logos/edx.svg";


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

const logoUrls: Record<string, string> = {
  aws: awsLogoUrl,
  ibm: ibmLogoUrl,
  microsoft: microsoftLogoUrl,
  udemy: udemyLogoUrl,
  edx: edxLogoUrl,
};

const LogoMark = ({
  src,
  color,
  className,
}: {
  src: string;
  color: string;
  className?: string;
}) => (
  <span
    aria-hidden="true"
    className={className}
    style={{
      backgroundColor: color,
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
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

const LogoComponent = ({
  logo,
  color,
  className,
}: {
  logo: string;
  color: string;
  className?: string;
}) => {
  const src = logoUrls[logo];
  if (!src) {
    return (
      <span className="font-bold text-lg" style={{ color }}>
        {logo.toUpperCase()}
      </span>
    );
  }

  return <LogoMark src={src} color={color} className={className} />;
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
                <LogoMark src={awsLogoUrl} color="#FF9900" className="w-full h-full" />
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
                    <LogoMark src={awsLogoUrl} color="#FF9900" className="w-full h-full" />
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
