import IntroAnimation from "@/components/ui/scroll-morph-hero";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-screen overflow-hidden">
        <IntroAnimation />
      </div>
      <BenefitsSection />
      <Footer />
    </div>
  );
};

export default Index;
