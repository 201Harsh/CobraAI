import React from "react";

const Footer = () => {
  return (
    <footer className="container mx-auto px-4 py-8 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mr-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold">CobraAI</span>
        </div>

        <div className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} <span className="font-bold bg-gradient-to-r from-red-600 bg-clip-text to-pink-700 text-transparent">CobraAI CobraAI</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
