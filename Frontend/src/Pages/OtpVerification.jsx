import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaRedo } from "react-icons/fa";
import AxiosInstance from "../Config/Axios";
import { toast, Bounce } from "react-toastify";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [UserEmail, setUserEmail] = useState("");

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const Navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, 4);
      setOtp([...newOtp, ...Array(4 - newOtp.length).fill("")]);

      // Focus on the last input with value
      const focusIndex = Math.min(3, pastedData.length - 1);
      inputRefs[focusIndex].current.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const enteredOtp = otp.join("");

    try {
      const res = await AxiosInstance.post("/users/verify", {
        email: UserEmail,
        otp: enteredOtp,
      });

      if (res.status === 201) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("token", res.data.token);
        Navigate("/updateInfo");
      }
    } catch (error) {
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

      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    setCountdown(59);
    setCanResend(false);

    // Simulate resend OTP API call
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  useEffect(() => {
    const email = localStorage.getItem("email") || "CodeAstra Email";
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <motion.div
          className="bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-gradient-to-r from-red-950 to-pink-900 py-5 px-6">
            <h2 className="text-center text-2xl font-extrabold text-white">
              Verify Your Account
            </h2>
            <p className="mt-1 text-center text-sm text-pink-100">
              Enter the 4-digit code sent to your email
              <span className="font-bold bg-gradient-to-tr from-lime-400 bg-clip-text to-emerald-400 text-transparent ml-1">
                {" "}
                {UserEmail}
              </span>
            </p>
          </div>

          <div className="px-6 py-8">
            <motion.form
              className="space-y-6"
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="flex justify-center space-x-4"
                variants={itemVariants}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    className="w-16 h-16 text-2xl text-center bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    autoFocus={index === 0}
                  />
                ))}
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-white font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || otp.some((digit) => digit === "")}
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
                      <span className="relative z-10">Verifying...</span>
                    </>
                  ) : (
                    <>
                      Verify OTP <FaArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-gray-400">
                Didn't receive the code?{" "}
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    className="text-red-400 hover:text-red-300 font-medium flex items-center justify-center mx-auto mt-2"
                  >
                    <FaRedo className="mr-2" /> Resend OTP
                  </button>
                ) : (
                  <span className="text-gray-500">Resend in {countdown}s</span>
                )}
              </p>
            </motion.div>

            <motion.div
              className="mt-8 pt-6 border-t border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                to="/register"
                className="flex items-center justify-center transition-colors"
              >
                <FaArrowLeft className="mr-2  text-sky-500" />
                <h4 className="text-sky-400 hover:text-sky-300 font-medium">
                  Change Email Address
                </h4>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>
            Having trouble?{" "}
            <span className="text-red-400 cursor-pointer hover:text-red-300">
              Contact support
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OtpVerification;
