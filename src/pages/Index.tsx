import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import RevealPreloader from "@/components/RevealPreloader";
import ImmersiveHero from "@/components/ImmersiveHero";
import ManifestoSection from "@/components/ManifestoSection";
import HorizontalGallery from "@/components/HorizontalGallery";
import TheStack from "@/components/TheStack";
import CredentialsWall from "@/components/CredentialsWall";
import ExperienceShowcase from "@/components/ExperienceShowcase";
import EducationPanel from "@/components/EducationPanel";
import GrandFinale from "@/components/GrandFinale";

const Index = () => {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <>
      <RevealPreloader onComplete={() => setPreloaderComplete(true)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderComplete ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative"
      >
        <ScrollProgress />
        <Navigation />

        {/* Film grain overlay */}
        <div className="grain-overlay" />

        <main>
          <ImmersiveHero />
          <ManifestoSection />
          <HorizontalGallery />
          <TheStack />
          <CredentialsWall />
          <ExperienceShowcase />
          <EducationPanel />
          <GrandFinale />
        </main>
      </motion.div>
    </>
  );
};

export default Index;
