import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaUser,
  FaSignInAlt,
} from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      className="w-full text-white bg-gray-900/35 backdrop-blur-md shadow-lg border-b border-gray-600 fixed top-0 z-50"
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
            <motion.div
              className="relative h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center mr-1 overflow-hidden"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
               <img src="/img/logo.png" className="h-10 w-10 md:h-12 md:w-12 rounded-full" alt="" />
            </motion.div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              CobraAI
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <ul className="flex space-x-1 text-lg">
              {[
                { path: "/", name: "Home" },
                { path: "/examples", name: "Examples" },
                { path: "/about", name: "About" },
                { path: "/contact", name: "Contact" },
                { path: "/pricing", name: "Pricing" },
              ].map((item) => (
                <motion.li
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-red-500/40 to-pink-600/50 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center space-x-3 ml-6">
              <Link to="/login">
                <motion.button
                  className="px-4 py-2 flex items-center text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-50"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-0.5 bg-white mb-1.5 rounded-full"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8 : 0,
              }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white mb-1.5 rounded-full"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white rounded-full"
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
              className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 shadow-xl"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.ul className="flex flex-col py-4 h-screen justify-evenly">
                {[
                  { path: "/", name: "Home", icon: "🏠" },
                  { path: "/examples", name: "Examples", icon: "💡" },
                  { path: "/about", name: "About", icon: "ℹ️" },
                  { path: "/contact", name: "Contact", icon: "📞" },
                  { path: "/pricing", name: "Pricing", icon: "💰" },
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="border-b border-gray-800 last:border-b-0"
                  >
                    <Link
                      to={item.path}
                      className={`py-4 px-6 text-lg transition-all duration-300 flex items-center ${
                        isActive(item.path)
                          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white"
                          : "text-gray-300 hover:text-white hover:bg-gray-800"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span> {item.name}
                    </Link>
                  </motion.li>
                ))}

                {/* Auth Buttons - Full width with different styling */}
                <motion.div
                  className="flex flex-col space-y-3 mt-4 px-4"
                  variants={itemVariants}
                >
                  <Link
                    to="/login"
                    className="w-full py-3 px-6 text-lg font-medium text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaSignInAlt className="mr-2" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full py-3 px-6 text-lg font-medium text-center text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-md flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="mr-2" />
                    Sign Up
                  </Link>
                </motion.div>

                {/* Social Media Links */}
                <motion.div
                  className="flex justify-center space-x-4 mb-6 pt-4 border-t border-gray-800"
                  variants={itemVariants}
                >
                  <motion.a
                    href="https://www.instagram.com/201harshs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Visit our Instagram"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </motion.a>

                  <motion.a
                    href="https://github.com/201Harsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Visit our GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/201harsh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-3 bg-gray-800 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
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
