import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCode,
  FaVenusMars,
  FaEdit,
  FaCamera,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import AxiosInstance from "../Config/Axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    Level: "",
    ProfilePicUrl: "" || "https://i.ibb.co/s484785/profile-pic.png",
    Language: "",
    gender: "",
    joiningDate: "",
    projectsCompleted: 24,
    codeGenerations: 156,
    learningStreak: 18,
  });

  const Navigate = useNavigate();

  useEffect(() => {
    const FetchUserInfo = async () => {
      try {
        const res = await AxiosInstance.get("/users/me");

        if (res.status === 200) {
          setUserData(res.data.User);
          setEditData(res.data.User);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to fetch user data", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        Navigate("/");
      }
    };

    FetchUserInfo();
  }, []);

  const [editData, setEditData] = useState({ ...userData });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Log the changes for API call
      const changes = {
        name: editData.name !== userData.name ? editData.name : undefined,
        gender: editData.gender !== userData.gender ? editData.gender : undefined,
        Language: editData.Language !== userData.Language ? editData.Language : undefined,
        Level: editData.Level !== userData.Level ? editData.Level : undefined,
      };
      
      console.log("Changes to be sent to API:", changes);
      
      // Here you would call your API
      // const response = await AxiosInstance.put("/users/update", changes);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data with the new values
      setUserData({ ...editData });
      setIsEditing(false);
      
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Failed to update profile. Please try again.", {
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
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: "Days Active", value: userData.learningStreak, icon: "🔥" },
    { label: "Projects", value: userData.projectsCompleted, icon: "📁" },
    { label: "Code Generations", value: userData.codeGenerations, icon: "⚡" },
  ];

  const languages = ["JavaScript", "Python", "Java", "C++", "TypeScript", "Go"];
  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            User{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-gray-400">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
              {/* Profile Picture */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-600 relative">
                  <motion.img
                    key={userData.ProfilePicUrl}
                    src={userData.ProfilePicUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  {isEditing ? (
                    <motion.input
                      key="name-input"
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-center w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <motion.span
                      key="name-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {userData.name}
                    </motion.span>
                  )}
                </h2>
                <p className="text-gray-400 mb-4 flex items-center justify-center">
                  <FaEnvelope className="mr-2 text-red-400" />
                  {userData.email}
                </p>
                <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-300">Member since</p>
                  <p className="font-semibold">{userData.joiningDate}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                {isEditing ? (
                  <>
                    <motion.button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-500 py-2 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSaving ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <FaSave className="mr-2" /> Save
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="flex-1 bg-gray-700 py-2 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaTimes className="mr-2" /> Cancel
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 py-2 rounded-lg font-semibold flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEdit className="mr-2" /> Edit Profile
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-gray-800/30 backdrop-blur-md rounded-xl p-4 border border-gray-700 text-center"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaUser className="mr-2 text-red-400" /> Personal Information
              </h3>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-400 mb-2">Name</label>
                  {isEditing ? (
                    <motion.input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2">
                      <span className="text-white">{userData.name}</span>
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-400 mb-2">Gender</label>
                  {isEditing ? (
                    <motion.select
                      value={editData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <option value="">Select Gender</option>
                      {genders.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </motion.select>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2 flex items-center">
                      <FaVenusMars className="mr-2 text-red-400" />
                      <span className="text-white">{userData.gender || "Not specified"}</span>
                    </div>
                  )}
                </div>

                {/* Programming Language */}
                <div>
                  <label className="block text-gray-400 mb-2">
                    Preferred Language
                  </label>
                  {isEditing ? (
                    <motion.select
                      value={editData.Language}
                      onChange={(e) => handleInputChange("Language", e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <option value="">Select Language</option>
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </motion.select>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2 flex items-center">
                      <FaCode className="mr-2 text-red-400" />
                      <span className="text-white">{userData.Language || "Not specified"}</span>
                    </div>
                  )}
                </div>

                {/* Skill Level */}
                <div>
                  <label className="block text-gray-400 mb-2">
                    Skill Level
                  </label>
                  {isEditing ? (
                    <motion.select
                      value={editData.Level}
                      onChange={(e) => handleInputChange("Level", e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <option value="">Select Level</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </motion.select>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2">
                      <span className="text-white">{userData.Level || "Not specified"}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-4">Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Code Master", icon: "🏆", progress: 100 },
                  { name: "AI Explorer", icon: "🤖", progress: 80 },
                  { name: "Bug Hunter", icon: "🐛", progress: 60 },
                  { name: "Syntax King", icon: "👑", progress: 40 },
                ].map((achievement, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <div className="text-sm text-gray-300 mb-2">
                      {achievement.name}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-600 to-pink-600 h-2 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;