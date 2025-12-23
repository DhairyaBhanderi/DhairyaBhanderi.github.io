import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSequence from "@/components/HeroSequence";
import ManifestoSection from "@/components/ManifestoSection";
import ProjectShowcase from "@/components/ProjectShowcase";
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
        <HeroSequence />
        <ManifestoSection />
        <ProjectShowcase />
        <ContactSection />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;