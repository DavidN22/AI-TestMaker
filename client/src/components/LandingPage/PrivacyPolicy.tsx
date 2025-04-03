import Header from "../Header/Header";

const PrivacyPolicy = () => (
  <>
    <Header />
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded px-8 py-10 my-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy for Teskro</h1>

      <p className="mb-4">
        This privacy policy ("policy") will help you understand how <strong>Teskro.com</strong> ("us", "we", "our") uses and protects the data you provide to us when you visit and use Teskro.com ("website", "service").
      </p>

      <p className="mb-4">
        We reserve the right to change this policy at any given time, and updates will be promptly posted. Please check this page frequently to ensure you are aware of any changes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">What User Data We Collect</h2>
      <p className="mb-2">When you visit the website, we may collect the following data:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Your name and email address via Google login.</li>
        <li>Exam usage data and results.</li>
        <li>Your preferences and interests.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Why We Collect Your Data</h2>
      <p className="mb-2">We collect your data for several reasons:</p>
      <ul className="list-disc list-inside mb-4">
        <li>To enhance your user experience and personalize content.</li>
        <li>To improve our AI-generated exams and services.</li>
        <li>To respond to your inquiries and provide support.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Safeguarding and Securing the Data</h2>
      <p className="mb-4">
        Teskro.com is committed to securing your data and keeping it confidential. We employ industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Cookie Policy</h2>
      <p className="mb-4">
        By using our website, you agree to our use of cookies to enhance your browsing experience. Cookies are used solely for analytical purposes to understand website usage patterns.
      </p>

      <p className="mb-4">
        You can manage or disable cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Sharing</h2>
      <p className="mb-4">
        We do not share your personal information with third parties, except when required by law or to facilitate essential services such as user authentication.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Restricting the Collection of Your Personal Data</h2>
      <p className="mb-4">
        You have full control over your personal data. You may delete your account anytime, and your personal data and exam history will be permanently removed from our systems.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
      <p className="mb-4">
        Any changes to this policy will be updated on this page with the revision date clearly indicated.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p>
        If you have questions regarding this privacy policy, please contact us via email at:{" "}
        <a href="mailto:naymondavid@gmail.com" className="text-blue-500 hover:underline">
          naymondavid@gmail.com
        </a>
      </p>

      <p className="italic mt-6">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  </>
);

export default PrivacyPolicy;