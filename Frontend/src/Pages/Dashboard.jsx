import React, { useState, useEffect } from "react";
import DashHeader from "../Components/DashHeader";
import DashChatSection from "../Components/DashChatSection";
import DashCodeSection from "../Components/DashCodeSection";
import { FaComments, FaCode } from "react-icons/fa";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("chat"); // 'chat' or 'code'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Reset to chat view when switching to mobile
      if (mobile && activeView === "both") {
        setActiveView("chat");
      }
      
      // Show both views when switching to desktop
      if (!mobile && activeView !== "both") {
        setActiveView("both");
      }
    };

    window.addEventListener("resize", handleResize);
    
    // Set initial view based on screen size
    if (window.innerWidth >= 768) {
      setActiveView("both");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [activeView]);

  const handleMenuToggle = () => {
    console.log("Menu toggle clicked");
    // You can implement sidebar toggle functionality here
  };

  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col overflow-hidden">
      <DashHeader onMenuToggle={handleMenuToggle} />
      
      {/* Mobile Toggle Button */}
      {isMobile && (
        <div className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setActiveView("chat")}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 flex-1 mr-2 ${
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
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 flex-1 ml-2 ${
              activeView === "code" 
                ? "bg-gradient-to-r from-red-600 to-pink-600 text-white" 
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FaCode className="text-sm" />
            <span>Code</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Section - Visible based on state */}
        <div className={`
          ${isMobile ? (activeView === "chat" ? "flex" : "hidden") : "flex"} 
          w-full md:w-1/2 h-full transition-all duration-300
        `}>
          <DashChatSection />
        </div>

        {/* Code Section - Visible based on state */}
        <div className={`
          ${isMobile ? (activeView === "code" ? "flex" : "hidden") : "flex"} 
          w-full md:w-1/2 h-full transition-all duration-300
        `}>
          <DashCodeSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;