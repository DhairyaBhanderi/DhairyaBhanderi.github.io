import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Overlay transition for dramatic effect
const overlayVariants: Variants = {
  initial: {
    scaleY: 1,
  },
  enter: {
    scaleY: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.1,
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        {/* Page overlay for transition */}
        <motion.div
          className="fixed inset-0 z-[100] bg-background origin-top pointer-events-none"
          variants={overlayVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        />
        
        {/* Second overlay for layered effect */}
        <motion.div
          className="fixed inset-0 z-[99] bg-accent origin-bottom pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ 
            scaleY: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }
          }}
          exit={{ 
            scaleY: 1,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
          }}
        />

        {/* Page content */}
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
