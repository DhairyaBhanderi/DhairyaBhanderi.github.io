import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useReducedMotion } from "./ReducedMotion";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#manifesto" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { prefersReducedMotion, toggleReducedMotion } = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setHasScrolled(currentScrollY > 100);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
            hasScrolled 
              ? "bg-background/80 backdrop-blur-md border-b border-border/50" 
              : "bg-transparent"
          }`}
        >
          <nav className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            {/* Logo */}
            <MagneticButton strength={0.2}>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
                }}
                className="font-display text-xl tracking-tight text-foreground hover:text-accent transition-colors"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                DB
              </motion.a>
            </MagneticButton>

            {/* Nav Links */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.1 * index, duration: prefersReducedMotion ? 0 : 0.3 }}
                >
                  <MagneticButton strength={0.3}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-sm font-body text-muted-foreground hover:text-foreground link-underline transition-colors"
                    >
                      {item.label}
                    </button>
                  </MagneticButton>
                </motion.li>
              ))}
            </ul>

            {/* Right side controls */}
            <div className="hidden md:flex items-center gap-4">
              {/* Reduced motion toggle */}
              <button
                onClick={toggleReducedMotion}
                className={`p-2 rounded-full transition-colors ${
                  prefersReducedMotion 
                    ? "bg-accent/20 text-accent" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={prefersReducedMotion ? "Enable animations" : "Disable animations"}
                title={prefersReducedMotion ? "Animations disabled" : "Click to reduce motion"}
              >
                <Sparkles className="w-4 h-4" />
              </button>

              {/* CTA Button */}
              <MagneticButton strength={0.4}>
                <motion.button
                  onClick={() => scrollToSection("#contact")}
                  className="px-4 py-2 text-sm font-body border border-accent/50 text-accent hover:bg-accent hover:text-background rounded-full transition-all duration-300"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  Let's Talk
                </motion.button>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <MobileMenuButton prefersReducedMotion={prefersReducedMotion} />
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

const MobileMenuButton = ({ prefersReducedMotion }: { prefersReducedMotion: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="w-6 h-0.5 bg-foreground block"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="w-6 h-0.5 bg-foreground block"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="w-6 h-0.5 bg-foreground block"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border p-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-lg font-body text-foreground hover:text-accent transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
