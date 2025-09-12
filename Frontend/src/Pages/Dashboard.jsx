import React, { useState, useEffect } from "react";
import DashHeader from "../Components/DashHeader";
import DashChatSection from "../Components/DashChatSection";
import DashCodeSection from "../Components/DashCodeSection";
import {
  FaComments,
  FaCode,
  FaTimes,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("chat"); // 'chat' or 'code'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showFollowPopup, setShowFollowPopup] = useState(false);
  const [darkMode] = useState(true); // Assuming dark mode is always true based on your theme

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if popup has been shown before
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenFollowPopup");

    // Show popup only if user hasn't seen it before
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowFollowPopup(true);
        localStorage.setItem("hasSeenFollowPopup", "true");
      }, 1200); // Show after 1.2 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleMenuToggle = () => {
    // You can implement sidebar toggle functionality here
  };

  const closeFollowPopup = () => {
    setShowFollowPopup(false);
  };

  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col overflow-hidden">
      <DashHeader onMenuToggle={handleMenuToggle} />

      {/* Toggle Buttons - Always Visible */}
      <div className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2 w-full">
          <button
            onClick={() => setActiveView("chat")}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 flex-1 ${
              activeView === "chat"
                ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FaComments className="text-sm" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => setActiveView("code")}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 flex-1 ${
              activeView === "code"
                ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FaCode className="text-sm" />
            <span>Code</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Section - Full width when active */}
        <div
          className={`
          ${activeView === "chat" ? "flex w-full" : "hidden"} 
          h-full transition-all duration-300
        `}
        >
          <DashChatSection />
        </div>

        {/* Code Section - Full width when active */}
        <div
          className={`
          ${activeView === "code" ? "flex w-full" : "hidden"} 
          h-full transition-all duration-300
        `}
        >
          <DashCodeSection />
        </div>
      </div>

      {/* Follow Popup */}
      <AnimatePresence>
  {showFollowPopup && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative bg-gray-800/95 border border-red-800 rounded-xl w-full max-w-md max-h-[100vh] p-4 sm:p-6 overflow-y-auto shadow-2xl"
      >
        <button
          onClick={closeFollowPopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          aria-label="Close follow popup"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          {/* Developer Picture */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-700 to-red-900 p-1 mb-4">
            <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
              <img
                src="/img/2.png"
                alt="Developer"
                className="w-96 h-32 object-cover"
              />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Support the Developer
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Help keep <span className="font-semibold text-red-400">Trinetra AI</span> free and growing
          </p>

          {/* QR Code for Payments */}
          <div className="md:w-72 md:h-96 h-full w-full rounded-lg bg-gradient-to-br from-red-700 to-red-900 p-1 mb-4">
                  <div className="w-full h-full rounded-lg bg-gray-800 overflow-hidden">
                    <img
                      src="/img/qr.png"
                      alt="Developer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

          {/* Follow Buttons */}
          <div className="w-full">
            <h4 className="text-lg font-semibold text-white mb-3">
              Or follow for updates
            </h4>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 w-full">
              <a
                href="https://www.instagram.com/201harshs/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center py-3 px-4 bg-gradient-to-br from-red-700 to-red-900 rounded-lg hover:opacity-90 transition text-white"
              >
                <FaInstagram className="mr-2" />
                Instagram
              </a>
              <a
                href="https://github.com/201Harsh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition bg-gray-700 hover:bg-gray-600 text-white"
              >
                <FaGithub className="mr-2" />
                GitHub
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Your support helps improve Trinetra AI for everyone
          </p>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default Dashboard;
