import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#1E1E1E] py-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 shadow-sm">
      <div className="text-center">&copy; {currentYear} <span className="font-medium">Teskro</span>. All rights reserved.</div>
      <div className="text-center mt-2">
  Created by{' '}
  <a
    href="https://www.linkedin.com/in/david-naymon-76520018a/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline"
  >
    David Naymon
  </a>{' '}
  |{' '}
  <a href="mailto:naymondavid@gmail.com" className="text-blue-500 hover:underline">
    naymondavid@gmail.com
  </a>{' '}
  |{' '}
  <button
    onClick={() => navigate("/privacy-policy")}
    className="text-blue-500 hover:underline"
  >
    Privacy Policy
  </button>
</div>

    </footer>
  );
};

export default Footer;