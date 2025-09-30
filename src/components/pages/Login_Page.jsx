import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { showError, showSuccess } from "../../utils/toast";

const Login_Page = () => {
      useEffect(() => {
      document.title = "Find Light | Login";
    }, []);
  const { loginUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        showSuccess(
          `Welcome back, ${user.displayName || user.email}!`,
          "Login Successful"
        );
        navigate("/");
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        showError("Login Failed");
      });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
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
          <h2 className="text-3xl font-bold text-[#331832]">Welcome Back</h2>
          <p className="mt-2 text-sm text-[#694D75]">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[#331832]">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full px-3 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-[#694D75] bg-[#F1ECCE] text-[#331832]"
                placeholder="Enter your email"
              />
            </div>

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
            </div>

            <div className="flex flex-col gap-1 text-right">
              <Link
                to={`/auth/login/forgot-password`}
                state={{ email: email }}
                type="button"
                className="text-sm hover:underline transition-all duration-200 cursor-pointer text-[#1B5299]"
              >
                Forgot your password?
              </Link>
              <Link
                to={`/auth/register`}
                type="button"
                className="text-sm hover:underline transition-all duration-200 cursor-pointer text-[#1B5299] font-bold "
              >
                Dont have an account? Sign Up
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              style={{ backgroundColor: "#1B5299" }}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 bg-[#1B5299] cursor-pointer"
            >
              Sign In
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

          {/* Google Login Button */}
          <div>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex justify-center items-center py-3 px-4 border-2 rounded-lg text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 cursor-pointer bg-[#F1ECCE] text-[#331832] border-[#694D75]"
            >
              <FaGoogle className="h-5 w-5 mr-3" style={{ color: "#1B5299" }} />
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login_Page;