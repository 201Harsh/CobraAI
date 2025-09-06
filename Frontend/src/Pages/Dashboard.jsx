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
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuToggle = () => {
    console.log("Menu toggle clicked");
    // You can implement sidebar toggle functionality here
  };

  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col overflow-hidden">
      <DashHeader onMenuToggle={handleMenuToggle} />
      
      {/* Toggle Buttons - Always Visible */}
      <div className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2 w-full">
          <span className="text-gray-300 text-sm hidden md:block">View:</span>
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
        <div className={`
          ${activeView === "chat" ? "flex w-full" : "hidden"} 
          h-full transition-all duration-300
        `}>
          <DashChatSection />
        </div>

        {/* Code Section - Full width when active */}
        <div className={`
          ${activeView === "code" ? "flex w-full" : "hidden"} 
          h-full transition-all duration-300
        `}>
          <DashCodeSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;