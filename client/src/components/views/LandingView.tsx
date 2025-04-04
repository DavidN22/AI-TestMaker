import HeroSection from "../LandingPage/HeroSection";
import FeaturesSection from "../LandingPage/FeaturesSection";
import CTASection from "../LandingPage/CTASection";
import Footer from "../LandingPage/Footer";
import HowItWorksSection from "../LandingPage/HowItWorksSection";
import FAQSection from "../LandingPage/FAQSection";
import { motion } from "framer-motion";
import FeaturesPreviewSection from "../LandingPage/FeaturesPreviewSection";

export default function LandingView() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#1E1E1E]">
      
      <motion.div
        className="flex flex-col flex-1 overflow-hidden"
        initial={{ opacity: 0 }} // Start invisible
        animate={{ opacity: 1 }} // Fade in smoothly
        exit={{ opacity: 0 }} // Fade out smoothly
        transition={{ duration: 0.5, ease: "easeInOut" }} // Fast but subtle transition
      >
        <HeroSection />
        
        <FeaturesSection />
        <FeaturesPreviewSection />
        <HowItWorksSection />
        <FAQSection />
        <CTASection />
      </motion.div>
      <Footer />
    </div>
  );
}
