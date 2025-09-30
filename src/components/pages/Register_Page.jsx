import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { showError, showSuccess } from "../../utils/toast";

const Register_Page = () => {
      useEffect(() => {
      document.title = "Find Light | Register";
    }, []);
  const { createNewUser, setUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const errors = {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasMinLength: password.length >= 6,
    };

    return {
      isValid:
        errors.hasUppercase && errors.hasLowercase && errors.hasMinLength,
      errors,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photoURL = form.get("photoURL");
    const password = form.get("password");

    // Validate password on submit
    const passwordValidation = validatePassword(password);

    if (!passwordValidation.isValid) {
      let errorMessage = "Password must meet the following requirements:\n";
      if (!passwordValidation.errors.hasUppercase) {
        errorMessage += "• At least one uppercase letter\n";
      }
      if (!passwordValidation.errors.hasLowercase) {
        errorMessage += "• At least one lowercase letter\n";
      }
      if (!passwordValidation.errors.hasMinLength) {
        errorMessage += "• At least 6 characters long\n";
      }
      showError(errorMessage, "Password Requirements");
      return;
    }

    // Handle registration logic here
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showError(`Error: ${errorMessage}`);
        showError(`Error: ${errorCode}`);
      });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        showSuccess(
          `Welcome back, ${user.displayName || user.email}!`,
          "Login Successful"
        );
        navigate("/");
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);

        if (error.code === "auth/popup-closed-by-user") {
        } else if (error.code === "auth/popup-blocked") {
          showError(
            "Please allow popups for this website to use Google Sign-In"
          );
        } else {
          showError(`Error: ${error.message}`);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1ECCE]">
      <div className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl bg-[#9FC2CC]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#331832]">Create Account</h2>
          <p className="mt-2 text-sm text-[#694D75]">
            Sign up for a new account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#331832]">
                Full Name
              </label>
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-3 pl-10 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-[#694D75] bg-[#F1ECCE] text-[#331832]"
                  placeholder="Enter your full name"
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#694D75]" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#331832]">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-[#694D75] bg-[#F1ECCE] text-[#331832]"
                placeholder="Enter your email"
              />
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#331832]">
                Photo URL
              </label>
              <div className="relative">
                <input
                  name="photoURL"
                  type="url"
                  className="w-full px-3 py-3 pl-10 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-[#694D75] bg-[#F1ECCE] text-[#331832]"
                  placeholder="Enter photo URL (optional)"
                />
                <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#694D75]" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#331832]">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-3 pr-10 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-[#694D75] bg-[#F1ECCE] text-[#331832]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-[#694D75]" />
                  ) : (
                    <FaEye className="h-5 w-5 text-[#694D75]" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="mt-2 space-y-1">
                <div className="text-xs flex items-center space-x-2 text-[#694D75]">
                  <span className="w-2 h-2 rounded-full bg-[#694D75]"></span>
                  <span>At least one uppercase letter</span>
                </div>
                <div className="text-xs flex items-center space-x-2 text-[#694D75]">
                  <span className="w-2 h-2 rounded-full bg-[#694D75]"></span>
                  <span>At least one lowercase letter</span>
                </div>
                <div className="text-xs flex items-center space-x-2 text-[#694D75]">
                  <span className="w-2 h-2 rounded-full bg-[#694D75]"></span>
                  <span>At least 6 characters long</span>
                </div>
              </div>
            </div>

            {/* Link to Login */}
            <div className="flex justify-end">
              <Link
                to="/auth/login"
                className="text-sm hover:underline transition-all duration-200 cursor-pointer text-[#1B5299]"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 cursor-pointer bg-[#1B5299]"
            >
              Create Account
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#694D75]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#9FC2CC] text-[#694D75]">OR</span>
            </div>
          </div>

          {/* Google Register Button */}
          <div>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex justify-center items-center py-3 px-4 border-2 rounded-lg text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 cursor-pointer bg-[#F1ECCE] text-[#331832] border-[#694D75]"
            >
              <FaGoogle className="h-5 w-5 mr-3 text-[#1B5299]" />
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register_Page;