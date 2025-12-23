import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, Mail, Github, Linkedin } from "lucide-react";

const email = "dhairya.work48@gmail.com";

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

        {/* Email with copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
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
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-6"
        >
          <SocialLink href="https://github.com" icon={<Github className="w-5 h-5" />} label="GitHub" />
          <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
        </motion.div>
      </div>
    </section>
  );
};

const SocialLink = ({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    {icon}
    <span className="font-body text-sm">{label}</span>
  </motion.a>
);

export default ContactSection;