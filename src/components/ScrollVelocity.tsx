import { useEffect, useRef, createContext, useContext, useState, ReactNode } from "react";
import { useScroll, useVelocity, useTransform, useSpring, MotionValue } from "framer-motion";

interface ScrollVelocityContextType {
  velocity: MotionValue<number>;
  smoothVelocity: MotionValue<number>;
  direction: MotionValue<number>;
}

const ScrollVelocityContext = createContext<ScrollVelocityContextType | null>(null);

export const useScrollVelocity = () => {
  const context = useContext(ScrollVelocityContext);
  if (!context) {
    throw new Error("useScrollVelocity must be used within ScrollVelocityProvider");
  }
  return context;
};

interface ScrollVelocityProviderProps {
  children: ReactNode;
}

export const ScrollVelocityProvider = ({ children }: ScrollVelocityProviderProps) => {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 400,
  });
  
  // Track scroll direction (-1 up, 1 down)
  const direction = useTransform(velocity, (v) => (v > 0 ? 1 : v < 0 ? -1 : 0));

  return (
    <ScrollVelocityContext.Provider value={{ velocity, smoothVelocity, direction }}>
      {children}
    </ScrollVelocityContext.Provider>
  );
};

// Hook to apply velocity-based blur effect
export const useVelocityBlur = (maxBlur: number = 3) => {
  const { smoothVelocity } = useScrollVelocity();
  const blurAmount = useTransform(smoothVelocity, [-2000, 0, 2000], [maxBlur, 0, maxBlur]);
  
  return blurAmount;
};

// Hook to apply velocity-based stretch effect
export const useVelocityStretch = (maxStretch: number = 1.02) => {
  const { smoothVelocity } = useScrollVelocity();
  const stretchY = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [1 / maxStretch, 1, maxStretch]
  );
  
  return stretchY;
};

export default ScrollVelocityProvider;
