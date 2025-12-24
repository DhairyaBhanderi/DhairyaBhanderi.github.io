import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, Github, Linkedin, ArrowUpRight } from "lucide-react";

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
    <section id="contact" className="py-32 md:py-48 relative">
      <div ref={ref} className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-accent font-mono text-xs tracking-widest uppercase block mb-8"
        >
          Get in touch
        </motion.span>

        {/* Giant email */}
        <motion.button
          onClick={handleCopy}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="group block text-left w-full"
        >
          <span className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-foreground break-all leading-tight hover:text-accent transition-colors duration-300">
            {email}
          </span>
          <span className="flex items-center gap-2 mt-4 text-muted-foreground text-sm font-mono">
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 group-hover:text-accent transition-colors" />
                Click to copy
              </>
            )}
          </span>
        </motion.button>

        {/* Social links - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex items-center gap-8"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm"
          >
            <Github className="w-4 h-4" />
            GitHub
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
