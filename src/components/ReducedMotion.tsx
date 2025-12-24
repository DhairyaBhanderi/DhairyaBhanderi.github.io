import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ReducedMotionContextType {
  prefersReducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const ReducedMotionContext = createContext<ReducedMotionContextType>({
  prefersReducedMotion: false,
  toggleReducedMotion: () => {},
});

export const useReducedMotion = () => useContext(ReducedMotionContext);

interface ReducedMotionProviderProps {
  children: ReactNode;
}

export const ReducedMotionProvider = ({ children }: ReducedMotionProviderProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Check localStorage override
    const stored = localStorage.getItem("reduced-motion");
    if (stored !== null) {
      setPrefersReducedMotion(stored === "true");
    }

    // Listen for system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem("reduced-motion");
      if (stored === null) {
        setPrefersReducedMotion(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleReducedMotion = () => {
    const newValue = !prefersReducedMotion;
    setPrefersReducedMotion(newValue);
    localStorage.setItem("reduced-motion", String(newValue));
  };

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion, toggleReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  );
};

// Hook to get animation duration based on reduced motion preference
export const useAnimationDuration = (normalDuration: number): number => {
  const { prefersReducedMotion } = useReducedMotion();
  return prefersReducedMotion ? 0 : normalDuration;
};

// Utility to get transition config
export const getTransitionConfig = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      duration: 0,
      delay: 0,
    };
  }
  return {};
};

export default ReducedMotionProvider;
