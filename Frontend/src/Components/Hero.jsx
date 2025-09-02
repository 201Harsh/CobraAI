import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import Header from "./Header";

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
        damping: 15,
      },
    },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.5,
      },
    },
  };

  return (
    <>
      <Header />
      <div className="w-full flex items-center py-2 md:py-0 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row w-full h-full items-center justify-between md:mt-0 mt-2">
            {/* Text Content */}
            <motion.div
              className="h-full w-full md:w-1/2 flex flex-col items-center md:items-start justify-center gap-6 md:gap-8 order-2 md:order-1 text-center md:text-left mt-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={
                  "bg-indigo-100 rounded-full px-6 py-2 sm:px-7 sm:py-2 flex items-center justify-center gap-2"
                }
              >
                <FaCode className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                <span className={"text-indigo-700 font-medium"}>
                  CodeAstra v1.5
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-l from-[#3CBDF5] to-[#E44CF1] bg-clip-text text-transparent leading-tight"
                variants={itemVariants}
              >
                AI-Powered Programming Tutor
              </motion.h1>

              <motion.p
                className="text-white text-base md:text-lg px-0 md:px-5 py-2 max-w-xl"
                variants={itemVariants}
              >
                Master coding with your personal AI tutor that adapts to your
                learning pace and style. Get real-time code feedback,
                personalized lesson plans, and instant answers to your
                programming questions across all major languages.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start"
                variants={itemVariants}
              >
                <Link to="/register" className="w-full sm:w-auto">
                  <motion.div
                    className="px-6 py-3 bg-gradient-to-r from-[#0f64d3] to-[#9611e4] rounded-full flex items-center justify-center gap-2 hover:gap-3 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h1 className="text-white text-base md:text-lg font-bold">
                      Get Started
                    </h1>
                    <IoIosArrowRoundForward className="text-white h-6 w-6 md:h-8 md:w-8" />
                  </motion.div>
                </Link>

                <Link to="/examples" className="w-full sm:w-auto">
                  <motion.div
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center gap-2 hover:gap-3 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h1 className="text-white text-base md:text-lg font-bold">
                      Learn More
                    </h1>
                    <IoIosArrowRoundForward className="text-white h-6 w-6 md:h-8 md:w-8" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Content */}
            <motion.div
              className="h-full w-full md:w-1/2 md:mb-2 order-1 md:order-2 flex items-center justify-center"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.img
                src="/img/Hero-img-2.png"
                alt="AI Programming Tutor"
                className="w-[70%] md:h-[100%] h-[100%] md:w-[80%] object-contain"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
