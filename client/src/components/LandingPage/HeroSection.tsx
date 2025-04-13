import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import heroAnimation from "../../assets/heroAnimation.gif";

const HeroSection = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.email);

  const handleGoogleSignIn = () => {
    const loginUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:3000/api/auth/login"
        : "https://api.teskro.com/api/auth/login";
    window.location.href = loginUrl;
  };

  const handleNavToHome = () => {
    navigate("/home", { replace: true });

  };

  return (
    <section className="relative bg-white dark:bg-[#1E1E1E] text-black dark:text-white px-6 py-24 min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Glow Orb Background */}

      <div className="absolute top-1/3 left-[-20%] w-[600px] h-[600px] rounded-full bg-yellow-300/10 dark:bg-yellow-300/20 blur-3xl animate-pulse z-0" />
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-2xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Text Column */}
        <motion.div
          className="w-full md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Prepare for Any Exam <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-300 dark:to-yellow-500 glow-text">
              Smarter
            </span>{" "}
            , Not Harder
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-md">
            Teskro helps you generate, practice, and master any exam—from school
            tests to certifications and custom quizzes—powered by AI.
          </p>

          {user ? (
            <motion.button
              onClick={handleNavToHome}
              className="flex items-center gap-2 bg-[#0f172a] text-white dark:bg-white dark:text-black px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Dashboard <FaArrowRight />
            </motion.button>
          ) : (
            <motion.button
              onClick={handleGoogleSignIn}
              className="flex items-center gap-2 bg-[#0f172a] text-white dark:bg-white dark:text-black px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in with Google <FaArrowRight />
            </motion.button>
          )}

          <p className="text-sm text-gray-400 dark:text-gray-500 pt-2">
            No account? Start practicing instantly after signing in.
          </p>
        </motion.div>

        {/* Right Visual Column */}
        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-[90%] max-w-md aspect-square bg-gradient-to-br from-gray-100 to-white dark:from-[#2a2a2a] dark:to-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-8 flex items-center justify-center overflow-hidden">
            {/* Glowing pulse behind icon */}
            <div className="absolute w-32 h-32 " />
            <motion.img
              src={heroAnimation}
              alt="CPU Animation"
              className="w-68 h-68 z-10" // increased from w-32 h-32 to w-48 h-48
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            />
            <div className="absolute bottom-4 text-sm text-gray-400 dark:text-gray-500 text-center w-full z-10">
              Your AI-powered study partner for any subject
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
