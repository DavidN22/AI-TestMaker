import { motion } from "framer-motion";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.email);

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3000/api/auth/login";
  };

  const handleNavToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-4rem)] bg-white flex items-center justify-center px-6 py-20">
        <motion.div
          className="bg-white shadow-xl border border-gray-200 rounded-2xl p-10 md:p-16 max-w-2xl w-full text-center space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to Testify AI
          </motion.h1>

          <p className="text-gray-600 text-lg md:text-xl">
            Generate curated cloud certification exams using AI. Practice
            smarter, not harder.
          </p>
          {user? (
            <motion.button
              onClick={handleNavToHome}
              className="cursor-pointer bg-[#0f172a] text-white px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-[#1e293b] transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Home Page
            </motion.button>
          ) : (
            <motion.button
              onClick={handleGoogleSignIn}
              className="cursor-pointer bg-[#0f172a] text-white px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-[#1e293b] transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in with Google
            </motion.button>
          )}

          <div className="pt-4 text-sm text-gray-400">
            No account yet? Sign in to get started instantly.
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Landing;
