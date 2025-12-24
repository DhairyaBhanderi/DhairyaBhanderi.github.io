import { motion } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Award } from "lucide-react";

interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  location: string;
  gpa: string;
  highlights: string[];
}

const education: Education[] = [
  {
    id: "ud",
    degree: "Master of Science",
    field: "Computer Science",
    institution: "University of Dayton",
    period: "Jan 2023 — Dec 2024",
    location: "Dayton, Ohio",
    gpa: "3.5",
    highlights: ["Machine Learning", "Big Data Analytics", "Cloud Computing", "Graduate Capstone: Big Data Security Analytics"],
  },
  {
    id: "nu",
    degree: "Bachelor of Technology",
    field: "Information Technology",
    institution: "Navrachana University",
    period: "Jun 2018 — May 2022",
    location: "Vadodara, India",
    gpa: "3.7",
    highlights: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems"],
  },
];

export const EducationPanel = () => {
  const ref = useRef(null);

  return (
    <section id="education" className="py-24 md:py-32 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--emerald) / 0.05) 0%, transparent 60%)`,
          }}
        />
      </div>

      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header - understated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-emerald font-mono text-xs tracking-widest uppercase block mb-4">
            Education
          </span>
          <h2 className="font-heading text-2xl md:text-4xl text-foreground tracking-tight">
            Academic Foundation
          </h2>
        </motion.div>

        {/* Side-by-side layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-4 md:-left-6 top-0 w-3 h-3 rounded-full bg-emerald/50 border-2 border-emerald hidden md:block" />

              {/* Card */}
              <div className="relative p-6 md:p-8 rounded-sm border border-border/30 bg-card/30 backdrop-blur-sm
                            hover:border-emerald/30 transition-all duration-500 group-hover:bg-card/50">
                {/* Period badge */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-2 py-1 text-xs font-mono text-emerald bg-emerald/10 rounded-sm">
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {edu.location}
                  </span>
                </div>

                {/* Degree */}
                <div className="mb-4">
                  <h3 className="font-heading text-xl md:text-2xl text-foreground mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-accent text-sm font-body">
                    {edu.field}
                  </p>
                </div>

                {/* Institution */}
                <p className="text-muted-foreground font-body text-sm mb-6 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald/70" />
                  {edu.institution}
                </p>

                {/* GPA */}
                <div className="flex items-center gap-2 mb-6">
                  <Award className="w-4 h-4 text-emerald/70" />
                  <span className="text-sm font-mono text-foreground">
                    GPA: <span className="text-emerald">{edu.gpa}</span>
                  </span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {edu.highlights.slice(0, 3).map((highlight) => (
                    <span
                      key={highlight}
                      className="px-2 py-1 text-xs font-mono text-muted-foreground border border-border/30 rounded-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Decorative line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-emerald/50 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline connector line for desktop */}
        <div className="hidden md:block absolute left-[calc(50%-1px)] top-48 bottom-48 w-px bg-gradient-to-b from-transparent via-emerald/20 to-transparent" />
      </div>
    </section>
  );
};

export default EducationPanel;
