import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import SplitHero from "@/components/SplitHero";
import { MarqueeStack } from "@/components/MarqueeText";
import ManifestoSection from "@/components/ManifestoSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const techStack = [
  "Python",
  "FastAPI",
  "React",
  "TypeScript",
  "Docker",
  "Kubernetes",
  "LangChain",
  "AWS",
  "PostgreSQL",
  "Redis",
  "GraphQL",
  "TensorFlow",
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <ScrollProgress />
        <Navigation />

        <main>
          <SplitHero />
          
          {/* Tech Stack Marquee */}
          <section className="py-8 border-y border-border/20 bg-secondary/30">
            <MarqueeStack items={techStack} />
          </section>

          <ManifestoSection />
          <ProjectShowcase />
          <ContactSection />
        </main>

        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
