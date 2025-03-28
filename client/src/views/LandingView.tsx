import Header from "../components/Header/Header";
import HeroSection from "../components/LandingPage/HeroSection";
import FeaturesSection from "../components/LandingPage/FeaturesSection";
import CTASection from "../components/LandingPage/CTASection";
import Footer from "../components/LandingPage/Footer";
import HowItWorksSection from "../components/LandingPage/HowItWorksSection";
import FAQSection from "../components/LandingPage/FAQSection";
import { motion } from "framer-motion";
import FeaturesPreviewSection from "../components/LandingPage/FeaturesPreviewSection";

export default function LandingView() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#1E1E1E]">
      <Header />
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
