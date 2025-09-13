import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import AxiosInstance from "../Config/Axios";
import { Bounce, toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await AxiosInstance.post("/users/login", formData);

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        localStorage.setItem("email", response.data.User.email);
        localStorage.setItem("name", response.data.User.name);
        localStorage.setItem("token", response.data.token);
        Navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      const errors = error.response?.data?.errors;

      toast.error(error.response?.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      toast.error(
        error.response?.data?.error ||
          errors.forEach((elem) => {
            toast.error(elem.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          }),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl items-center justify-between">
        {/* Left side - Illustration/Text */}
        <motion.div
          className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome Back to{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              Trinetra
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-md mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Continue your journey with AI-powered code generation and learning.
          </motion.p>
          <motion.div
            className="hidden md:flex justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-80 h-80 bg-gradient-to-br from-red-900/20 to-pink-900/20 rounded-full flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-red-800/30 to-pink-800/30 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-red-700/40 to-pink-700/40 rounded-full flex items-center justify-center">
                  <div className="text-5xl">👁️</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          className="w-full md:w-1/2 max-w-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-700">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 py-5 px-6">
              <h2 className="text-center text-2xl font-extrabold text-white">
                Sign In to Your Account
              </h2>
              <p className="mt-1 text-center text-sm text-pink-100">
                Continue learning with your AI programming tutor
              </p>
            </div>

            <div className="px-6 py-6">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 pr-10 backdrop-blur-sm"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <span className="cursor-pointer font-medium text-red-400 hover:text-red-300">
                      Forgot password?
                    </span>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-white font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-700 to-pink-700"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 1,
                          ease: "linear",
                        }}
                      />
                      <span className="relative z-10">LoggIn...</span>
                    </>
                  ) : (
                    <>
                      LogIn <FaArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800/30 text-gray-400 backdrop-blur-sm">
                      New to our platform?
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link to="/register">
                    <button className="w-full py-2.5 px-4 border border-gray-600 rounded-lg text-white font-medium bg-gray-700/50 hover:bg-gray-700 transition duration-200 backdrop-blur-sm">
                      Create an account
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
