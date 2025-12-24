import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statements = [
  {
    text: "I architect systems where AI meets reliability.",
    color: "hsl(28, 85%, 55%)", // copper/accent
  },
  {
    text: "From prototype to production, I build what lasts.",
    color: "hsl(220, 60%, 45%)", // deep blue
  },
  {
    text: "Automation that empowers, not replaces.",
    color: "hsl(160, 50%, 40%)", // teal
  },
];

export const ManifestoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the entire section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${statements.length * 100}%`,
        pin: true,
        pinSpacing: true,
      });

      // Animate each statement
      statementsRef.current.forEach((statementEl, index) => {
        if (!statementEl) return;

        const chars = statementEl.querySelectorAll(".char");
        const bg = containerRef.current?.querySelector(".manifesto-bg");

        // Calculate scroll positions for each statement
        const startProgress = index / statements.length;
        const endProgress = (index + 0.8) / statements.length;

        // Character animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${statements.length * 100}%`,
            scrub: 0.5,
          },
        });

        // Fade in characters with stagger
        tl.fromTo(
          chars,
          {
            opacity: 0,
            y: 50,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out",
          },
          startProgress
        );

        // Hold the statement visible
        tl.to(chars, { opacity: 1, duration: 0.2 }, startProgress + 0.3);

        // Fade out (except last statement)
        if (index < statements.length - 1) {
          tl.to(
            chars,
            {
              opacity: 0,
              y: -30,
              stagger: 0.01,
              duration: 0.3,
            },
            endProgress
          );
        }

        // Background color shift
        if (bg) {
          gsap.to(bg, {
            backgroundColor: statements[index].color,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: `+=${statements.length * 100}%`,
              scrub: true,
            },
            ease: "none",
          });
        }
      });

      // Floating decorative elements
      gsap.to(".manifesto-float-1", {
        y: -100,
        rotation: 45,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".manifesto-float-2", {
        y: 150,
        rotation: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative h-screen overflow-hidden"
    >
      {/* Animated background */}
      <div
        className="manifesto-bg absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: "hsl(var(--background))" }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none" />
      
      {/* Floating decorative elements */}
      <div className="manifesto-float-1 absolute top-20 left-[10%] w-32 h-32 border border-accent/20 rounded-full opacity-30" />
      <div className="manifesto-float-2 absolute bottom-32 right-[15%] w-24 h-24 bg-accent/10 rounded-lg opacity-40" />
      <div className="manifesto-float-1 absolute top-1/3 right-[8%] w-2 h-32 bg-gradient-to-b from-accent/30 to-transparent" />
      <div className="manifesto-float-2 absolute bottom-1/4 left-[12%] w-16 h-16 border-2 border-muted/30 rotate-45" />

      {/* Content container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-6 md:px-12">
          {statements.map((statement, index) => (
            <div
              key={index}
              ref={(el) => (statementsRef.current[index] = el)}
              className={`absolute inset-0 flex items-center justify-center px-6 md:px-12 ${
                index === 0 ? "opacity-100" : "opacity-0"
              }`}
              style={{ perspective: "1000px" }}
            >
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center leading-tight tracking-tight max-w-5xl">
                {statement.text.split("").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="char inline-block"
                    style={{
                      color:
                        index === 0
                          ? "hsl(var(--foreground))"
                          : index === 1
                          ? "hsl(var(--accent))"
                          : "hsl(var(--foreground))",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">
          Keep scrolling
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default ManifestoSection;
