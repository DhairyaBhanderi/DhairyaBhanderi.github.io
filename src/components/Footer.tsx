import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30 py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs text-muted-foreground"
          >
            © {currentYear} Dhairya Bhanderi
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground/60">
              Open to opportunities
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
