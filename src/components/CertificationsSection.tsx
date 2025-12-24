import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Cloud, Brain, Code } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  colorClass: string;
  icon: typeof Award;
}

const certifications: Certification[] = [
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "April 2025",
    colorClass: "from-copper/30 to-copper/10 border-copper/30",
    icon: Cloud,
  },
  {
    id: "aws-ai",
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    date: "March 2025",
    colorClass: "from-copper/30 to-copper/10 border-copper/30",
    icon: Brain,
  },
  {
    id: "aws-cp",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "February 2025",
    colorClass: "from-copper/30 to-copper/10 border-copper/30",
    icon: Cloud,
  },
  {
    id: "ibm-ds",
    name: "IBM Data Science Professional Certificate",
    issuer: "Coursera",
    date: "August 2023",
    colorClass: "from-deep-blue/30 to-deep-blue/10 border-deep-blue/30",
    icon: Code,
  },
  {
    id: "python-ml",
    name: "Python for Data Science & Machine Learning",
    issuer: "Udemy",
    date: "June 2023",
    colorClass: "from-teal/30 to-teal/10 border-teal/30",
    icon: Brain,
  },
  {
    id: "intro-ai",
    name: "Introduction to Artificial Intelligence",
    issuer: "edX",
    date: "May 2023",
    colorClass: "from-purple/30 to-purple/10 border-purple/30",
    icon: Brain,
  },
  {
    id: "azure-ai",
    name: "AI-900: Microsoft Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "May 2022",
    colorClass: "from-deep-blue/30 to-deep-blue/10 border-deep-blue/30",
    icon: Cloud,
  },
];

const CertificationCard = ({
  cert,
  index,
}: {
  cert: Certification;
  index: number;
}) => {
  const Icon = cert.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`
        relative p-6 rounded-sm border bg-gradient-to-br ${cert.colorClass}
        backdrop-blur-sm cursor-default group
      `}
    >
      {/* Icon */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <Icon className="w-8 h-8" />
      </div>

      {/* Content */}
      <div className="pr-12">
        <h4 className="font-display text-lg text-foreground mb-2 leading-tight">
          {cert.name}
        </h4>
        <p className="text-sm text-muted-foreground font-body mb-3">
          {cert.issuer}
        </p>
        <span className="text-xs font-mono text-accent/80">{cert.date}</span>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 left-0 w-12 h-12 overflow-hidden pointer-events-none">
        <div className="absolute bottom-2 left-2 w-px h-4 bg-accent/20" />
        <div className="absolute bottom-2 left-2 w-4 h-px bg-accent/20" />
      </div>
    </motion.div>
  );
};

export const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="certifications" className="py-32 md:py-48 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--copper) / 0.08) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, hsl(var(--deep-blue) / 0.08) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-accent font-mono text-xs tracking-widest uppercase block mb-4">
            Credentials
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-sm md:text-base">
            Industry-recognized credentials in cloud architecture, AI, and data science
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 flex justify-center gap-12 text-center"
        >
          <div>
            <span className="block font-display text-4xl text-accent">3</span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              AWS Certs
            </span>
          </div>
          <div>
            <span className="block font-display text-4xl text-foreground">7</span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Total Certs
            </span>
          </div>
          <div>
            <span className="block font-display text-4xl text-deep-blue">2022-25</span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Earned
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
