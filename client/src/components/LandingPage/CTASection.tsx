import { motion } from "framer-motion";
import { CornerFrame } from "./Designs/CornerFrame";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.email);

  const handleCTA = () => {
    if (user) {
      navigate("/home");
    } else {
      window.location.href = "https://api.teskro.com/api/auth/login";
    }
  };

  return (
    <section className="relative bg-white dark:bg-[#1E1E1E] text-black dark:text-white px-6 py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center border border-yellow-400/20 dark:border-yellow-300/30 rounded-2xl px-8 py-20 shadow-[0_0_40px_rgba(234,179,8,0.05)] dark:shadow-[0_0_50px_rgba(234,179,8,0.15)] bg-gray-50 dark:bg-[#141414] backdrop-blur-sm">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-300 dark:to-yellow-500 text-transparent bg-clip-text mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Be Among the First to Try Teskro
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-md md:text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Launch into cloud prep with AI-powered exams that adapt to your goals and speed up your learning — no fluff, just focus.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleCTA}
          className="inline-block bg-[#0f172a] dark:bg-white text-white dark:text-black font-semibold px-10 py-4 rounded-full shadow-md hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] border-2 border-yellow-400 dark:border-yellow-300 transition duration-300"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          {user ? "Go to Dashboard" : "Start free now!"}
        </motion.button>
      </div>

      {/* Glowing lines */}
      <CornerFrame />
    </section>
  );
};

export default CTASection;
