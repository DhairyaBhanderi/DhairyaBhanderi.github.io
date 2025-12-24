import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  year: string;
  title: string;
  organization: string;
  description: string;
  highlights: string[];
}

const journeyData: TimelineEntry[] = [
  {
    year: "2025",
    title: "AI Automation Engineer",
    organization: "Qualitest Global",
    description: "Leading enterprise AI infrastructure development",
    highlights: ["MCP Ecosystem", "Enterprise AI", "40+ Applications"],
  },
  {
    year: "2025",
    title: "AI Engineer",
    organization: "ProNoesis",
    description: "Building security-focused AI solutions",
    highlights: ["LLM Threat Assistant", "RAG Pipelines", "Llama Fine-tuning"],
  },
  {
    year: "2024",
    title: "MS Computer Science",
    organization: "University of Dayton",
    description: "Advanced studies in AI and distributed systems",
    highlights: ["Machine Learning", "Cloud Computing", "Research"],
  },
  {
    year: "2023",
    title: "Software Engineer",
    organization: "Previous Experience",
    description: "Full-stack development and system design",
    highlights: ["React", "Node.js", "PostgreSQL"],
  },
];

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    gsap.fromTo(
      ref.current,
      { innerText: 0 },
      {
        innerText: value,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: function () {
          if (ref.current) {
            ref.current.innerText = Math.floor(parseFloat(ref.current.innerText || "0")) + suffix;
          }
        },
      }
    );
  }, [isInView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (!containerRef.current || !pathRef.current) return;

      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      if (pathLength <= 0) return;

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      const ctx = gsap.context(() => {
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="journey" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div ref={containerRef} className="container mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-accent font-body text-sm uppercase tracking-widest mb-4 block">
            The Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
            Experience & Growth
          </h2>

          {/* Stats */}
          <div className="flex justify-center gap-12 md:gap-20">
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl text-accent">
                <AnimatedCounter value={4} suffix="+" />
              </div>
              <p className="text-muted-foreground font-body text-sm mt-2">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl text-accent">
                <AnimatedCounter value={40} suffix="+" />
              </div>
              <p className="text-muted-foreground font-body text-sm mt-2">AI Applications</p>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl text-accent">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <p className="text-muted-foreground font-body text-sm mt-2">Passion</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* SVG Path */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-4 pointer-events-none"
            viewBox="0 0 16 800"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M8 0 L8 800"
              fill="none"
              stroke="url(#timeline-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(28, 85%, 55%)" />
                <stop offset="50%" stopColor="hsl(220, 60%, 50%)" />
                <stop offset="100%" stopColor="hsl(160, 50%, 45%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timeline entries */}
          <div className="space-y-16 md:space-y-24">
            {journeyData.map((entry, index) => (
              <motion.div
                key={`${entry.year}-${entry.title}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:col-start-2"
                  }`}
                >
                  <span className="inline-block px-3 py-1 text-sm font-body bg-accent/10 text-accent rounded-full mb-4">
                    {entry.year}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                    {entry.title}
                  </h3>
                  <p className="text-accent font-body mb-3">{entry.organization}</p>
                  <p className="text-muted-foreground font-body mb-4">
                    {entry.description}
                  </p>
                  <div
                    className={`flex flex-wrap gap-2 ${
                      index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                    }`}
                  >
                    {entry.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 text-xs font-body bg-secondary text-secondary-foreground rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg shadow-accent/30" />

                {/* Empty column for alignment */}
                <div className={index % 2 === 0 ? "hidden md:block" : "hidden"} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
