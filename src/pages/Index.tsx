import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import ImmersiveHero from "@/components/ImmersiveHero";
import ManifestoSection from "@/components/ManifestoSection";
import HorizontalGallery from "@/components/HorizontalGallery";
import SkillsGrid from "@/components/SkillsGrid";
import ExperienceStack from "@/components/ExperienceStack";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
        <ContactSection />
      </main>

      <Footer />
    </motion.div>
  );
};

export default Index;
