import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaRobot } from "react-icons/fa";

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Wait a moment before finishing
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onFinish(), 500);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-950 z-50 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="relative w-24 h-24 mx-auto">
                {/* Outer circle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-red-500/20 rounded-full"
                />
                
                {/* Middle circle */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-3 border-4 border-pink-600/30 rounded-full"
                />
                
                {/* Inner circle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 border-4 border-red-500/40 rounded-full"
                />
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-gradient-to-r from-red-600 to-pink-600 rounded-full p-3"
                  >
                    <FaCode className="text-white text-2xl" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                CodeAstra
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-gray-400 text-lg mb-8 max-w-md mx-auto"
            >
              AI-Powered Programming Tutor
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-64 md:w-80 mx-auto bg-gray-800 rounded-full h-2 mb-4 overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-red-600 to-pink-600 rounded-full relative"
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{ x: ["0%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 h-full"
                />
              </motion.div>
            </motion.div>

            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-gray-400 text-sm mb-2"
            >
              {Math.min(100, Math.round(progress))}%
            </motion.div>

            {/* Loading Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-gray-500 text-xs"
            >
              {progress < 30 && "Initializing AI tutor..."}
              {progress >= 30 && progress < 60 && "Loading code modules..."}
              {progress >= 60 && progress < 90 && "Preparing learning environment..."}
              {progress >= 90 && "Almost ready..."}
            </motion.div>

            {/* Animated Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex justify-center space-x-1 mt-6"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"
                />
              ))}
            </motion.div>

            {/* AI Assistant Floating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="absolute bottom-8 right-8 hidden md:block"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gray-800/80 backdrop-blur-md rounded-lg p-3 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
                    <FaRobot className="text-white text-xs" />
                  </div>
                  <span className="text-gray-300 text-sm">Loading your AI tutor...</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;