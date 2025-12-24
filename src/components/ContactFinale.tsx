import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Github, Linkedin, Mail, Copy, Check } from "lucide-react";

export const ContactFinale = () => {
  const [copied, setCopied] = useState(false);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const gradientX = useTransform(x, [0, 1], [30, 70]);
  const gradientY = useTransform(y, [0, 1], [30, 70]);

  const email = "dhairya.yml@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/dhairya",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/dhairya-bhanderi",
      icon: Linkedin,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="min-h-screen relative flex flex-col items-center justify-center py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Gradient background */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([gx, gy]) =>
              `radial-gradient(ellipse 60% 50% at ${gx}% ${gy}%, hsl(var(--copper) / 0.15) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Let's build something
            <br />
            <span className="text-gradient-copper">remarkable together</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto">
            Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        {/* Interactive email */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <button
            onClick={handleCopy}
            className="group relative inline-block magnetic-button"
            data-cursor="pointer"
            data-cursor-text={copied ? "Copied!" : "Copy"}
          >
            {/* Email with letter scramble effect */}
            <span className="font-mono text-lg md:text-2xl lg:text-3xl tracking-wider">
              {email.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-foreground hover:text-accent transition-colors"
                  onMouseEnter={() => setHoveredLetter(i)}
                  onMouseLeave={() => setHoveredLetter(null)}
                  animate={{
                    y: hoveredLetter === i ? -5 : 0,
                    scale: hoveredLetter === i ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Copy indicator */}
            <motion.span
              className="absolute -right-12 top-1/2 -translate-y-1/2 text-accent"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.span>
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-8 mb-24"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative magnetic-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />

              <div className="relative flex items-center gap-3 px-6 py-3 border border-border/50 rounded-full hover:border-accent/50 transition-colors bg-card/50 backdrop-blur-sm">
                <link.icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                <span className="font-body text-sm text-foreground group-hover:text-accent transition-colors">
                  {link.name}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer info - integrated */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/20"
        >
          <p className="text-muted-foreground/50 text-xs font-body">
            © {new Date().getFullYear()} Dhairya Bhanderi. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-muted-foreground/50 text-xs font-body">
              Open to opportunities
            </span>
          </div>

          <p className="text-muted-foreground/30 text-xs font-body">
            Built with passion
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.7 }}
      />
    </section>
  );
};

export default ContactFinale;
