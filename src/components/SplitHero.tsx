import { useEffect, useRef, useState, Suspense } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import MagneticButton from "./MagneticButton";
import DiagonalDivider from "./DiagonalDivider";

gsap.registerPlugin(ScrollTrigger);

const name = "Dhairya";
const lastName = "Bhanderi";
const role = "AI Automation Engineer";
const subtitle = "Building intelligent systems that think, adapt, and scale";

// 3D Floating Shapes Component
const FloatingShapes = () => {
  return (
    <group>
      {/* Main floating torus */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.5, 0.4, 32, 100]} />
          <meshStandardMaterial
            color="#c68550"
            metalness={0.8}
            roughness={0.2}
            emissive="#c68550"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      {/* Smaller orbiting sphere */}
      <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[2, 1, -1]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#f5f0e8"
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      </Float>

      {/* Floating octahedron */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={0.8}>
        <mesh position={[-1.5, -0.5, 0.5]} rotation={[0.5, 0.5, 0]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color="#c68550"
            metalness={0.9}
            roughness={0.1}
            wireframe
          />
        </mesh>
      </Float>

      {/* Second sphere */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[-2, 1.5, -0.5]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial
            color="#c68550"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      </Float>

      {/* Small decorative icosahedron */}
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={0.7}>
        <mesh position={[1.5, -1, 0.5]}>
          <icosahedronGeometry args={[0.25]} />
          <meshStandardMaterial
            color="#f5f0e8"
            metalness={0.4}
            roughness={0.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* Ambient particles */}
      {[...Array(20)].map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.3}
          floatIntensity={0.4}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 3 - 1,
            ]}
          >
            <sphereGeometry args={[0.02 + Math.random() * 0.03]} />
            <meshBasicMaterial color="#c68550" opacity={0.5} transparent />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Loading fallback for 3D canvas
const CanvasLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

export const SplitHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Mouse parallax for left side
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Initial load sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Name reveal animation
  useEffect(() => {
    if (!isLoaded || !nameRef.current || shouldReduceMotion) {
      if (shouldReduceMotion) {
        setShowContent(true);
      }
      return;
    }

    const chars = nameRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      { y: 100, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.04,
        ease: "power3.out",
        onComplete: () => {
          setTimeout(() => setShowContent(true), 200);
        },
      }
    );
  }, [isLoaded, shouldReduceMotion]);

  // Parallax scroll effect
  useEffect(() => {
    if (!containerRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-content-left", {
        y: 80,
        opacity: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const scrollToWork = () => {
    const element = document.querySelector("#work");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Split name into characters
  const renderName = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ perspective: "1000px" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-stretch overflow-hidden bg-background"
      >
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, hsl(24 50% 55% / 0.08) 0%, transparent 50%)"
          }}
        />

        {/* Left Side - Text Content */}
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          className="hero-content-left relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/4 left-0 w-24 h-[1px] bg-accent origin-left"
          />

          {/* Name with character reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 overflow-hidden"
          >
            <h1
              ref={nameRef}
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground leading-none"
              style={{ perspective: "1000px" }}
            >
              <span className="block">{renderName(name)}</span>
              <span className="block mt-2 text-gradient-copper">{renderName(lastName)}</span>
            </h1>
          </motion.div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={showContent ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <span className="font-display text-xl md:text-2xl lg:text-3xl italic text-muted-foreground">
              {role}
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={showContent ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground font-body text-base md:text-lg lg:text-xl max-w-md leading-relaxed mb-12"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton onClick={scrollToWork}>
              <button className="group relative px-8 py-4 font-body text-sm uppercase tracking-[0.15em] text-primary-foreground bg-foreground rounded-full overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-accent/20">
                <span className="relative z-10">Explore Work</span>
              </button>
            </MagneticButton>

            <MagneticButton onClick={scrollToContact}>
              <button className="group relative px-8 py-4 font-body text-sm uppercase tracking-[0.15em] text-foreground border border-muted rounded-full overflow-hidden transition-all duration-500 hover:border-accent hover:text-accent">
                <span className="relative z-10">Get in Touch</span>
              </button>
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator - mobile only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-8 md:left-16 lg:hidden"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
                Scroll
              </span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-accent to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side - 3D Canvas */}
        <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
          {/* Gradient overlay for blending */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none" />

          <Suspense fallback={<CanvasLoader />}>
            <Canvas
              camera={{ position: [0, 0, 6], fov: 45 }}
              className="w-full h-full"
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#c68550" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f5f0e8" />
              <spotLight
                position={[0, 5, 5]}
                angle={0.3}
                penumbra={1}
                intensity={0.5}
                color="#c68550"
              />
              <FloatingShapes />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </Suspense>

          {/* Ambient glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[180px] opacity-15 pointer-events-none"
            style={{ background: "hsl(24 50% 55%)" }}
          />
        </div>

        {/* Desktop scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="hidden lg:flex absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
              Scroll
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </motion.div>

        {/* Film grain overlay */}
        <div className="grain-overlay" />
      </section>

      {/* Diagonal divider after hero */}
      <DiagonalDivider direction="right" height={80} />
    </>
  );
};

export default SplitHero;
