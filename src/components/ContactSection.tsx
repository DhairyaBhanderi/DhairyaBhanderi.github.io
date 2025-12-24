import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Copy, Check, Mail, Github, Linkedin } from "lucide-react";
import MagneticButton from "./MagneticButton";

const email = "dhairya.work48@gmail.com";

// Animated signature SVG path
const SignaturePath = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const isInView = useInView(pathRef, { once: true });

  useEffect(() => {
    if (!pathRef.current || !isInView) return;
    
    const path = pathRef.current;
    const length = path.getTotalLength();
    
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.animation = "draw-signature 2s ease-out forwards";
  }, [isInView]);

  return (
    <svg
      viewBox="0 0 200 60"
      className="w-48 h-16 mx-auto mt-12"
      fill="none"
    >
      <path
        ref={pathRef}
        d="M10 40 C20 10, 40 10, 50 30 S70 50, 80 30 S100 10, 120 30 S150 50, 170 25 L190 25"
        stroke="url(#signature-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="signature-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(28, 85%, 55%)" />
          <stop offset="100%" stopColor="hsl(28, 85%, 70%)" />
        </linearGradient>
      </defs>
      <style>
        {`
          @keyframes draw-signature {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </svg>
  );
};

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 md:py-48 relative overflow-hidden">
      {/* Ambient glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-20"
        style={{ background: "hsl(var(--copper))" }}
      />

      <div ref={ref} className="container mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-accent font-body text-sm uppercase tracking-widest mb-6 block"
        >
          Let's Connect
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-8"
        >
          Ready to build<br />
          <span className="text-gradient-copper">something remarkable?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground font-body text-lg md:text-xl max-w-xl mx-auto mb-12"
        >
          Whether it's building intelligent automation systems or exploring new AI frontiers—let's create something impactful together.
        </motion.p>

        {/* Email with copy - Magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <MagneticButton strength={0.3}>
            <button
              onClick={handleCopy}
              className="group inline-flex items-center gap-3 px-6 py-4 bg-secondary/50 border border-border rounded-full hover:border-accent/50 hover:bg-secondary transition-all duration-300"
            >
              <Mail className="w-5 h-5 text-accent" />
              <span className="font-body text-foreground">{email}</span>
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              )}
            </button>
          </MagneticButton>
        </motion.div>

        {/* Social links - Magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-6"
        >
          <MagneticButton strength={0.4}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
              <span className="font-body text-sm">GitHub</span>
            </a>
          </MagneticButton>
          <MagneticButton strength={0.4}>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-body text-sm">LinkedIn</span>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Animated Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SignaturePath />
          <p className="text-muted-foreground/50 font-display text-sm mt-2 italic">
            ~ Dhairya ~
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
