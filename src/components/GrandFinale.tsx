import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Github, Linkedin, Mail, Copy, Check, ArrowUpRight, Sparkles } from "lucide-react";

export const GrandFinale = () => {
  const [copied, setCopied] = useState(false);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const gradientX = useTransform(x, [0, 1], [20, 80]);
  const gradientY = useTransform(y, [0, 1], [20, 80]);

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
    const newX = (e.clientX - rect.left) / rect.width;
    const newY = (e.clientY - rect.top) / rect.height;
    mouseX.set(newX);
    mouseY.set(newY);
    setMousePos({ x: newX, y: newY });
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/dhairya",
      icon: Github,
      color: "hover:bg-foreground/10 hover:border-foreground/30",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/dhairya-bhanderi",
      icon: Linkedin,
      color: "hover:bg-deep-blue/20 hover:border-deep-blue/50",
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

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Main statement - Giant typography */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-fluid-section text-foreground leading-[0.9] tracking-tight mb-6">
            Let's build
            <br />
            something
            <br />
            <span className="text-gradient-copper text-glow">extraordinary</span>
          </h2>
        </motion.div>

        {/* Interactive email - Hero treatment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <button
            onClick={handleCopy}
            className="group relative inline-block magnetic-button"
          >
            {/* Glow background */}
            <motion.div
              className="absolute inset-0 -m-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
              }}
            />

            {/* Email with letter animation */}
            <div className="relative">
              <span className="font-mono text-xl md:text-3xl lg:text-4xl tracking-wider">
                {email.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-foreground/90 hover:text-accent transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredLetter(i)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    animate={{
                      y: hoveredLetter === i ? -8 : 0,
                      scale: hoveredLetter === i ? 1.2 : 1,
                      color: hoveredLetter === i ? "hsl(var(--accent))" : undefined,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Copy indicator */}
              <motion.div
                className="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                {copied ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 text-emerald"
                  >
                    <Check className="w-5 h-5" />
                    <span className="text-xs font-mono">Copied!</span>
                  </motion.div>
                ) : (
                  <Copy className="w-5 h-5 text-muted-foreground/50 group-hover:text-accent transition-colors" />
                )}
              </motion.div>
            </div>

            {/* Click to copy hint */}
            <motion.span
              className="block text-xs font-mono text-muted-foreground/50 mt-4 group-hover:text-muted-foreground transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Click to copy
            </motion.span>
          </button>
        </motion.div>

        {/* Social links - Large circular buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-6 mb-32"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative w-16 h-16 md:w-20 md:h-20
                rounded-full border border-border/30 
                flex items-center justify-center
                transition-all duration-300
                ${link.color}
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow ring on hover */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.2 }}
                style={{
                  background: "radial-gradient(circle, hsl(var(--accent) / 0.2) 0%, transparent 70%)",
                }}
              />

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

        {/* Footer - Integrated elegantly */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-8 left-0 right-0"
        >
          <div className="container mx-auto px-6 md:px-12">
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

              {/* Built with */}
              <p className="text-muted-foreground/30 text-xs font-body flex items-center gap-1">
                Built with <Sparkles className="w-3 h-3 text-accent/50" /> passion
              </p>
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
