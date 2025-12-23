import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-body text-sm text-muted-foreground"
          >
            © {currentYear} Dhairya Bhanderi. Crafted with precision.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-body text-xs text-muted-foreground/60"
          >
            Built with React, Tailwind & Framer Motion
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;