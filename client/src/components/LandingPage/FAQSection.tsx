import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiChip } from "react-icons/hi";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Simply click the sign-up button and follow the instructions. You'll be set up in no time.",
  },
  {
    question: "Are the tests customizable?",
    answer:
      "Absolutely! You can choose difficulty levels, topics, question types, and durations.",
  },
  {
    question: "Can I track my progress?",
    answer:
      "Yes, Testify AI provides detailed analytics on your performance to highlight strengths and areas for improvement.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We take security seriously. All data is securely stored, encrypted, and never shared.",
  },
  {
    question: "Do you provide certifications?",
    answer:
      "While we don't issue official certifications, our exams thoroughly prepare you for official AWS, Azure, and GCP certification tests.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 dark:bg-[#2A2A2A] px-6 py-28 text-black dark:text-white">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              onClick={() => toggleFAQ(idx)}
              className="cursor-pointer border-l-4 p-5 relative group overflow-hidden rounded-xl border-yellow-300/30 dark:border-yellow-400/30 bg-white dark:bg-[#1E1E1E] hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-yellow-400 before:to-orange-400 dark:before:from-yellow-300 dark:before:to-yellow-500 before:transition-transform before:duration-300 group-hover:before:scale-y-125"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <HiChip className="text-yellow-500 dark:text-yellow-400 text-xl" />
                  <h3 className="text-md font-semibold text-gray-800 dark:text-white">
                    {faq.question}
                  </h3>
                </div>
                {activeIndex === idx ? (
                  <FaChevronUp className="text-yellow-500 dark:text-yellow-400 transition-transform duration-200" />
                ) : (
                  <FaChevronDown className="text-yellow-500 dark:text-yellow-400 transition-transform duration-200" />
                )}
              </div>

              {activeIndex === idx && (
                <motion.p
                  className="mt-3 text-sm text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
        <div className="w-full h-[1px] my-12 bg-gradient-to-r from-transparent via-yellow-400 to-transparent dark:via-yellow-300 animate-pulse" />
      </div>
    </section>
  );
};

export default FAQSection;
