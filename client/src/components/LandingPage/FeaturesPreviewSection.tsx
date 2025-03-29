import { motion } from "framer-motion";
import { HiCpuChip } from "react-icons/hi2";
import testPageGif from "../../assets/testPage.gif";
import examInterfaceGif from "../../assets/homePage.gif";
import historyPageGif from "../../assets/testHistory.gif";

const featurePreviews = [
  {
    title: "Intuitive Test Selection",
    description: "Effortlessly browse and select exams suited to your goals.",
    image: examInterfaceGif,
  },
  {
    title: "Real-time Exam Interface",
    description:
      "Engage with a responsive and streamlined testing environment.",
    image: testPageGif,
  },
  {
    title: "Exam History Page",
    description:
      "Review past performances and track your improvement over time.",
    image: historyPageGif,
  },
];

const FeaturesPreviewSection = () => {
  return (
    <section className="bg-white dark:bg-[#1E1E1E] px-4 py-24 text-black dark:text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent dark:from-yellow-500 blur-2xl animate-pulse" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-16 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-300 dark:to-yellow-500 text-transparent bg-clip-text">
            Powerful Features
          </span>{" "}
          at a Glance
        </motion.h2>

        {/* Two top cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {featurePreviews.slice(0, 2).map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden transition duration-300 group hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:border-yellow-400 dark:hover:border-yellow-300 hover:scale-[1.02]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 justify-center">
                  <HiCpuChip className="text-yellow-500 dark:text-yellow-400 text-xl" />
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom centered card */}
        <div className="flex justify-center">
          <motion.div
            className="relative bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden transition duration-300 group hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:border-yellow-400 dark:hover:border-yellow-300 hover:scale-[1.02] w-full md:w-[calc(50%-1rem)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden">
              <img
                src={featurePreviews[2].image}
                alt={featurePreviews[2].title}
                className="w-full h-full object-cover transition-transform duration-500"              
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <HiCpuChip className="text-yellow-500 dark:text-yellow-400 text-xl" />
                <h3 className="text-2xl font-semibold">
                  {featurePreviews[2].title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {featurePreviews[2].description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPreviewSection;
