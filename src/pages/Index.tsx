import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import RevealPreloader from "@/components/RevealPreloader";
import ImmersiveHero from "@/components/ImmersiveHero";
import ManifestoSection from "@/components/ManifestoSection";
import HorizontalGallery from "@/components/HorizontalGallery";
import SkillsGrid from "@/components/SkillsGrid";
import ExperienceStack from "@/components/ExperienceStack";
import ContactFinale from "@/components/ContactFinale";

const Index = () => {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <>
      <RevealPreloader onComplete={() => setPreloaderComplete(true)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderComplete ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <ScrollProgress />
        <Navigation />

        <main>
          <ImmersiveHero />
          <ManifestoSection />
          <HorizontalGallery />
          <SkillsGrid />
          <ExperienceStack />
          <ContactFinale />
        </main>
      </motion.div>
    </>
  );
};

export default Index;
