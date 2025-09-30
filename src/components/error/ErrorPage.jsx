import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
      useEffect(() => {
      document.title = "Find Light | Page No Found";
    }, []);

  return (
    <div className="min-h-screen bg-[#F1ECCE] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Large 404 */}
        <div className="text-[#1B5299] text-8xl md:text-9xl font-bold mb-4">
          404
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#331832] mb-4">
          Page Not Found
        </h1>

        <p className="text-[#694D75] text-lg mb-8">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <button
            onClick={() => navigate(-1)}
            className="w-full md:w-auto px-6 py-3 bg-[#694D75] text-[#F1ECCE] rounded-lg font-semibold hover:bg-[#5a3f63] transition-all duration-300"
          >
            Go Back
          </button>

          <Link
            to="/"
            className="block w-full md:w-auto px-6 py-3 bg-[#1B5299] text-[#F1ECCE] rounded-lg font-semibold hover:bg-[#0d4085] transition-all duration-300 text-center"
          >
            Go to Home
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-[#9FC2CC] rounded-xl">
          <h3 className="font-semibold text-[#331832] mb-3">
            What can you do?
          </h3>
          <ul className="text-sm text-[#694D75] space-y-2 text-left">
            <li>Check the URL for typos</li>
            <li>Use the navigation menu to find what you're looking for</li>
            <li>Visit our services page to explore available options</li>
            <li>Contact support if you believe this is an error</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <p className="text-sm text-[#694D75] mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="text-[#1B5299] hover:text-[#0d4085] text-sm font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              to="/subscription"
              className="text-[#1B5299] hover:text-[#0d4085] text-sm font-medium transition-colors"
            >
              Subscription
            </Link>
            <Link
              to="/auth/login"
              className="text-[#1B5299] hover:text-[#0d4085] text-sm font-medium transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;