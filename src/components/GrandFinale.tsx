import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Github, Linkedin, ArrowUpRight, Download } from "lucide-react";
//import { RESUME_PDF_DATA_URL } from "@/Dhairya_Bhanderi_Resume.pdf";
const RESUME_PDF_DATA_URL = "/Dhairya_Bhanderi_Resume.pdf";

export const GrandFinale = () => {
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const gradientX = useTransform(x, [0, 1], [20, 80]);
  const gradientY = useTransform(y, [0, 1], [20, 80]);

  const email = "dhairya.yml@gmail.com";

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newX = (e.clientX - rect.left) / rect.width;
    const newY = (e.clientY - rect.top) / rect.height;
    mouseX.set(newX);
    mouseY.set(newY);
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/DhairyaBhanderi",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dhairya9520",
      icon: Linkedin,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="min-h-screen relative flex flex-col items-center justify-center py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([gx, gy]) =>
              `radial-gradient(ellipse 80% 60% at ${gx}% ${gy}%, hsl(var(--copper) / 0.15) 0%, transparent 50%),
               radial-gradient(ellipse 60% 40% at ${100 - Number(gx)}% ${100 - Number(gy)}%, hsl(var(--deep-blue) / 0.1) 0%, transparent 50%)`
          ),
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex h-full flex-col items-center justify-center">
        {/* Main statement - Stronger CTA */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-fluid-section text-foreground leading-[0.9] tracking-tight mb-6">
            Ready to build
            <br />
            the next
            <br />
            <span className="text-gradient-copper text-glow">breakthrough?</span>
          </h2>
        </motion.div>

        {/* Email - Direct mailto link */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <a
            href={`mailto:${email}`}
            className="group relative inline-flex items-center gap-4 magnetic-button"
          >
            <span className="font-mono text-xl md:text-3xl lg:text-4xl tracking-wider text-foreground/90 hover:text-accent transition-colors">
              {email}
            </span>
            <ArrowUpRight className="w-6 h-6 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          <motion.span
            className="block text-xs font-mono text-muted-foreground/50 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Click to send an email
          </motion.span>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center gap-4 mb-16"
        >
          <a
            href={RESUME_PDF_DATA_URL}
            download="Dhairya_Bhanderi_Resume.pdf"
            className="magnetic-button group flex items-center gap-3 px-6 py-3 border border-accent/50 rounded-sm 
                       bg-accent/10 hover:bg-accent/20 transition-all duration-300"
          >
            <Download className="w-4 h-4 text-accent" />
            <span className="font-mono text-sm text-accent uppercase tracking-wider">Download Resume</span>
          </a>
        </motion.div>

        {/* Social links - Large circular buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-6 mb-24"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-button group relative w-16 h-16 md:w-20 md:h-20
                         rounded-full border border-border/30 
                         flex items-center justify-center
                         transition-all duration-300
                         hover:bg-foreground/10 hover:border-foreground/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon className="w-6 h-6 md:w-7 md:h-7 text-foreground/70 group-hover:text-foreground transition-colors relative z-10" />

              {/* Label on hover */}
              <motion.span
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {link.name}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer - Centered in section */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-border/10">
            {/* Copyright */}
            <p className="text-muted-foreground/40 text-xs font-body">
              © {new Date().getFullYear()} Dhairya Bhanderi
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-3">
              <motion.span
                className="relative w-2 h-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="absolute inset-0 rounded-full bg-emerald animate-ping opacity-50" />
                <span className="relative block w-2 h-2 rounded-full bg-emerald" />
              </motion.span>
              <span className="text-muted-foreground/40 text-xs font-body">
                Open to opportunities
              </span>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Decorative side lines */}
      <motion.div
        className="absolute top-1/4 left-8 w-px h-40 bg-gradient-to-b from-transparent via-accent/20 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-8 w-px h-40 bg-gradient-to-b from-transparent via-accent/20 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.7 }}
      />
    </section>
  );
};

export default GrandFinale;
