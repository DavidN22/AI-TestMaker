import { motion } from "framer-motion";
import {
  FaRobot,
  FaCloud,
  FaBolt,
  FaChartLine,
  FaMagic,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot size={40} />,
    title: "AI-Generated Exams",
    description:
      "Let advanced AI craft unique, tailored certification questions just for you.",
    delay: 0.1,
  },
  {
    icon: <FaCloud size={40} />,
    title: "Multi-Cloud Coverage",
    description:
      "Train for AWS, Azure, and GCP without switching platforms or tools.",
    delay: 0.2,
  },
  {
    icon: <FaBolt size={40} />,
    title: "Instant Feedback",
    description:
      "Get immediate insights into your performance after each attempt.",
    delay: 0.3,
  },
  {
    icon: <FaChartLine size={40} />,
    title: "Progress Tracking",
    description:
      "Track your strengths, weaknesses, and improvement over time.",
    delay: 0.4,
  },
  {
    icon: <FaMagic size={40} />,
    title: "Smart Hints",
    description:
      "Stuck on a question? Get smart hints powered by AI to help you learn.",
    delay: 0.5,
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Secure & Private",
    description:
      "Your data and progress are securely stored and never shared.",
    delay: 0.6,
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-[#2A2A2A] px-6 py-28 text-gray-900 dark:text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-16 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Makes Teskro Different?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map(({ icon, title, description, delay }, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-2xl p-10 flex flex-col items-center text-center shadow-xl hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-500 dark:text-yellow-400 mb-6">{icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-base">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
