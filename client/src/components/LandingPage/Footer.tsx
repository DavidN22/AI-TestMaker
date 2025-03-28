const Footer = () => {
    return (
      <footer className="bg-white dark:bg-[#1E1E1E] text-center py-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 shadow-sm">
        &copy; {new Date().getFullYear()} <span className="font-medium">Testify AI</span>. All rights reserved.
      </footer>
    );
  };
  
  export default Footer;
  