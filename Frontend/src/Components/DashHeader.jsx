import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../Config/Axios";
import { toast, Bounce } from "react-toastify";

const DashHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [username, setusername] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setusername(name);
    }
  }, []);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      text: "Your code review is ready",
      time: "10 mins ago",
      read: false,
    },
    {
      id: 2,
      text: "New learning path available",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      text: "Weekly coding challenge starts tomorrow",
      time: "1 day ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const Navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await AxiosInstance.post("/users/logout");

      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        localStorage.clear();
        Navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-right",
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
      setIsProfileOpen(false);
    }
  };

  return (
    <header className="bg-gray-900 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Menu button and logo */}
        <div className="flex items-center">
          <motion.button
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <RxDoubleArrowLeft className="text-xl" />
          </motion.button>

          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              CodeAstra
            </span>
          </div>
        </div>

        {/* Right side - Navigation icons and profile */}
        <div className="flex items-center space-x-3">
          {/* Profile dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="User profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white text-sm font-semibold">
                {username.charAt(0)}
              </div>
              <span className="text-gray-200 block">{username}</span>
            </motion.button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-700 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white font-semibold">
                        {username.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">
                          {username}
                        </p>
                        <p className="text-red-400 text-xs">Trinetra Member</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link to="/profile">
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors text-sm">
                        <FaUserCircle className="text-gray-400" />
                        <span>Profile</span>
                      </button>
                    </Link>

                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors text-sm">
                      <FaCog className="text-gray-400" />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div className="p-2 border-t border-gray-700">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors text-sm"
                    >
                      <FaSignOutAlt />
                      <span>Log Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
