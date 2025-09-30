import React, { useContext, useEffect, useState } from "react";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { showError } from "../../utils/toast";

const ForgotPassword_Page = () => {
      useEffect(() => {
      document.title = "Find Light | Password Recovery";
    }, []);
  const { resetPassword } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();

  const emailFromState = location.state?.email || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");

    setIsSubmitting(true);
    setMessage("");

    resetPassword(email)
      .then(() => {
        setMessage("Password reset email sent successfully!");
        setTimeout(() => {
          window.open("https://gmail.com", "_blank");
        }, 2000);
      })
      .catch((error) => {
        console.error("Password reset error:", error);
        let errorMessage = "Failed to send password reset email.";

        if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email address.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Please enter a valid email address.";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Too many requests. Please try again later.";
        }

        showError(errorMessage);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1ECCE]">
      <div className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl bg-[#9FC2CC]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#331832]">Reset Password</h2>
          <p className="mt-2 text-sm text-[#694D75]">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#331832]">
                Email Address
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={emailFromState}
                  className="w-full px-3 py-3 pl-10 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-[#694D75] bg-[#F1ECCE] text-[#331832]"
                  placeholder="Enter your email"
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#694D75]" />
              </div>
            </div>

            {message && (
              <div
                className={`text-sm p-3 rounded-lg ${
                  message.includes("successfully")
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {message}
              </div>
            )}

            {/* Back to Login Link */}
            <div className="flex justify-start">
              <Link
                to="/auth/login"
                className="text-sm hover:underline transition-all duration-200 cursor-pointer text-[#1B5299] flex items-center space-x-1"
              >
                <FaArrowLeft className="h-3 w-3" />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>

          {/* Reset Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#1B5299] hover:opacity-90 cursor-pointer"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </div>

          {/* Info Text */}
          <div className="text-center">
            <p className="text-xs text-[#694D75]">
              After clicking the button, check your email for the reset link.
              You'll be redirected to Gmail automatically.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword_Page;