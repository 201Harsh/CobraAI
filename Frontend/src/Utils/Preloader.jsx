import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaRobot, FaCheck, FaRocket } from "react-icons/fa";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isComplete) {
      // Show completion animation for 2 seconds, then show final state
      const timer = setTimeout(() => {
        setShowFinalAnimation(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-950 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="relative w-24 h-24 mx-auto">
            {/* Outer circle - Stop rotating when complete */}
            <motion.div
              animate={{ 
                rotate: isComplete ? 0 : 360,
                opacity: showFinalAnimation ? 0 : 1
              }}
              transition={{ 
                duration: isComplete ? 0.5 : 4, 
                ease: "linear",
                repeat: isComplete ? 0 : Infinity
              }}
              className="absolute inset-0 border-4 border-red-500/20 rounded-full"
            />
            
            {/* Middle circle - Stop rotating when complete */}
            <motion.div
              animate={{ 
                rotate: isComplete ? 0 : -360,
                opacity: showFinalAnimation ? 0 : 1
              }}
              transition={{ 
                duration: isComplete ? 0.5 : 3, 
                ease: "linear",
                repeat: isComplete ? 0 : Infinity
              }}
              className="absolute inset-3 border-4 border-pink-600/30 rounded-full"
            />
            
            {/* Inner circle - Stop rotating when complete */}
            <motion.div
              animate={{ 
                rotate: isComplete ? 0 : 360,
                opacity: showFinalAnimation ? 0 : 1
              }}
              transition={{ 
                duration: isComplete ? 0.5 : 2, 
                ease: "linear",
                repeat: isComplete ? 0 : Infinity
              }}
              className="absolute inset-6 border-4 border-red-500/40 rounded-full"
            />
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`rounded-full p-3 ${
                  isComplete 
                    ? "bg-gradient-to-r from-green-600 to-green-500" 
                    : "bg-gradient-to-r from-red-600 to-pink-600"
                }`}
              >
                <motion.div
                  animate={{ 
                    scale: isComplete && !showFinalAnimation ? [1, 1.2, 1] : 1,
                    rotate: isComplete && !showFinalAnimation ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ 
                    duration: isComplete ? 0.6 : 0,
                    times: isComplete ? [0, 0.3, 0.6, 1] : 0
                  }}
                >
                  {isComplete ? (
                    <FaCheck className="text-white text-2xl" />
                  ) : (
                    <FaCode className="text-white text-2xl" />
                  )}
                </motion.div>
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
          {isComplete ? "Ready to code!" : "AI-Powered Programming Tutor"}
        </motion.p>

        {/* Progress Bar - Only show during loading */}
        {!isComplete && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
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
        )}

        {/* Progress Percentage */}
        {!isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-gray-400 text-sm mb-2"
          >
            {Math.min(100, Math.round(progress))}%
          </motion.div>
        )}

        {/* Loading/Complete Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-gray-500 text-xs mb-4"
        >
          {isComplete ? (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-green-400 font-medium"
            >
              {showFinalAnimation ? "Welcome to CodeAstra!" : "Successfully loaded!"}
            </motion.span>
          ) : (
            <>
              {progress < 30 && "Initializing AI tutor..."}
              {progress >= 30 && progress < 60 && "Loading code modules..."}
              {progress >= 60 && progress < 90 && "Preparing learning environment..."}
              {progress >= 90 && "Almost ready..."}
            </>
          )}
        </motion.div>

        {/* Completion Animation - Show only during completion phase */}
        {isComplete && !showFinalAnimation && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-green-400 text-4xl"
            >
              <FaRocket />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-400 text-sm mt-2"
            >
              Launching your coding journey...
            </motion.p>
          </motion.div>
        )}

        {/* Final State Animation - After completion phase */}
        {showFinalAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                transition: { duration: 2, repeat: Infinity }
              }}
              className="text-4xl mb-4"
            >
              <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                ✨
              </span>
            </motion.div>
            <motion.p
              className="text-gray-300 text-sm"
            >
              Your AI programming tutor is ready!
            </motion.p>
          </motion.div>
        )}

        {/* Animated Dots - Only show during loading */}
        {!isComplete && (
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
        )}

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
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isComplete 
                  ? "bg-gradient-to-r from-green-600 to-green-500" 
                  : "bg-gradient-to-r from-red-500 to-pink-600"
              }`}>
                <FaRobot className="text-white text-xs" />
              </div>
              <span className="text-gray-300 text-sm">
                {isComplete ? "Ready to help you code!" : "Loading your AI tutor..."}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Preloader;