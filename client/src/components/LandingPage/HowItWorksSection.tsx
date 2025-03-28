import { motion } from "framer-motion";
import {
  FaSignInAlt,
  FaClipboardList,
  FaSlidersH,
  FaPlay,
  FaChartBar,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaSignInAlt size={20} />,
    title: "1. Log In",
    description: "Sign in securely to access your personalized dashboard.",
  },
  {
    icon: <FaClipboardList size={20} />,
    title: "2. Choose a Test",
    description: "Select from AWS, Azure, or GCP certification paths.",
  },
  {
    icon: <FaSlidersH size={20} />,
    title: "3. Configure Settings",
    description: "Adjust difficulty, question types, and duration.",
  },
  {
    icon: <FaPlay size={20} />,
    title: "4. Start the Test",
    description: "Begin answering questions with real-time feedback.",
  },
  {
    icon: <FaChartBar size={20} />,
    title: "5. View Results",
    description: "See detailed stats and areas for improvement.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-white dark:bg-[#1E1E1E] px-6 py-24 text-black dark:text-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-black dark:text-white">
            How It Works
          </span>
        </motion.h2>

        <p className="text-md text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
          From sign-in to detailed analytics — here’s how Testify AI streamlines your journey.
        </p>

        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="group relative border border-yellow-400/20 dark:border-yellow-300/30 bg-white dark:bg-[#ffffff08] px-4 py-8 rounded-xl text-center shadow-md hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] dark:hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex justify-center items-center">
                <div className="w-10 h-10 border-2 border-yellow-400 rounded-md flex items-center justify-center text-yellow-500 dark:text-yellow-300 shadow-inner group-hover:scale-110 transition-transform duration-300 bg-white dark:bg-[#1E1E1E]">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-[10rem] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
