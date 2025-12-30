import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import RevealPreloader from "@/components/RevealPreloader";
import ImmersiveHero from "@/components/ImmersiveHero";
import ManifestoSection from "@/components/ManifestoSection";
import HorizontalGallery from "@/components/HorizontalGallery";
import TheStack from "@/components/TheStack";
import CredentialsWall from "@/components/CredentialsWall";
import ExperienceShowcase from "@/components/ExperienceShowcase";
import GrandFinale from "@/components/GrandFinale";

const Index = () => {
  return (
    <>
      {/* Content is always rendered behind the preloader overlay for an instant reveal */}
      <RevealPreloader onComplete={() => {}} />

      <div className="relative">
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
          <GrandFinale />
        </main>
      </div>
    </>
  );
};

export default Index;
