import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -10,
    },
    open: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.header
      className="w-full text-white bg-gray-900 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src="/img/logo.png"
              alt="logo"
              className="h-12 w-12 md:h-14 md:w-14"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <h1 className="ml-2 text-xl md:text-2xl font-bold">
              Trinetra CodeAstra
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-6 text-lg">
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Home
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="about"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  About
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="contact"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Contact
                </Link>
              </motion.li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-0.5 bg-white mb-1.5"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8 : 0,
              }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white mb-1.5"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -8 : 0,
              }}
            />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden mt-4 bg-gray-800 rounded-lg shadow-xl mx-4"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.ul className="flex flex-col py-4">
                <motion.li
                  variants={itemVariants}
                  className="border-b border-gray-700 last:border-b-0"
                >
                  <Link
                    to="/"
                    className=" py-4 px-6 text-lg text-white hover:bg-blue-600 transition-all duration-300 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-3">🏠</span> Home
                  </Link>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="border-b border-gray-700 last:border-b-0"
                >
                  <Link
                    to="about"
                    className="py-4 px-6 text-lg text-white hover:bg-blue-600 transition-all duration-300 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-3">ℹ️</span> About
                  </Link>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="border-b border-gray-700 last:border-b-0"
                >
                  <Link
                    to="contact"
                    className=" py-4 px-6 text-lg text-white hover:bg-blue-600 transition-all duration-300 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-3">📞</span> Contact
                  </Link>
                </motion.li>

                {/* Auth Buttons - Full width with different styling */}
                <motion.div
                  className="flex flex-col space-y-3 mt-4 px-4"
                  variants={itemVariants}
                >
                  <Link
                    to="/login"
                    className="block w-full py-3 px-6 text-lg font-medium text-center text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full py-3 px-6 text-lg font-medium text-center text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </motion.div>

                {/* Social Media Links */}
                <motion.div
                  className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-700"
                  variants={itemVariants}
                >
                  <motion.a
                    href="https://www.instagram.com/201harshs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-2 bg-gray-700 rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Visit our Instagram"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </motion.a>

                  <motion.a
                    href="https://github.com/201Harsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-2 bg-gray-700 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Visit our GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/201harsh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-2 bg-gray-700 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Visit our LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
