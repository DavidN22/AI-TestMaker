import { motion } from "framer-motion";
import { HiCpuChip } from "react-icons/hi2";

const featurePreviews = [
  {
    title: "Interactive Charts",
    description: "Visualize your progress clearly with dynamic charts.",
    image: "/images/charts-preview.gif",
  },
  {
    title: "Detailed Analytics",
    description: "Get deep insights on your strengths and weaknesses.",
    image: "/images/analytics-preview.gif",
  },
  {
    title: "Exam History",
    description: "Review your past exams and track improvements over time.",
    image: "/images/history-preview.gif",
  },
  {
    title: "Real-time Exam Interface",
    description: "Experience a responsive and intuitive testing environment.",
    image: "/images/exam-preview.gif",
  },
];
//group-hover:opacity-100
const FeaturesPreviewSection = () => {
  return (
    <section className="bg-white dark:bg-[#1E1E1E] px-6 py-24 text-black dark:text-white relative overflow-hidden">
      {/* Optional tech background shimmer */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent dark:from-yellow-500 blur-2xl animate-pulse" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl font-extrabold mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-300 dark:to-yellow-500 text-transparent bg-clip-text">
            Powerful Features
          </span>{" "}
          at a Glance
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {featurePreviews.map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden transition duration-300 group hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:border-yellow-400 dark:hover:border-yellow-300 hover:scale-[1.015]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              {/* Glowing pulse background */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-300/20 to-transparent dark:from-yellow-500/20 blur-lg opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none rounded-xl" />

              <div className="overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <HiCpuChip className="text-yellow-500 dark:text-yellow-400 text-lg" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>

              {/* Neon shimmer ring */}
              <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 border-2 border-yellow-300/40 dark:border-yellow-400/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesPreviewSection;
