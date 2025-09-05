import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  const Navigate = useNavigate()

  useEffect(() => {
    const FetchUserInfo = async () => {
      try {
        const res = await AxiosInstance.get("/users/me");

        if (res.status === 200) {
          setUserData(res.data.User);
        }
      } catch (error) {
        toast.error(error.response.data.error, {
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

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
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
                  <img
                    src={userData.ProfilePicUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-gradient-to-r from-red-600 to-pink-600 p-2 rounded-full cursor-pointer">
                      <FaCamera className="text-white text-sm" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          // Handle image upload here
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              handleInputChange("profilePic", e.target.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-center w-full"
                    />
                  ) : (
                    userData.name
                  )}
                </h2>
                <p className="text-gray-400 mb-4 flex items-center justify-center">
                  <FaEnvelope className="mr-2 text-red-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1 text-white text-center"
                    />
                  ) : (
                    userData.email
                  )}
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
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-500 py-2 rounded-lg font-semibold flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaSave className="mr-2" /> Save
                    </motion.button>
                    <motion.button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-700 py-2 rounded-lg font-semibold flex items-center justify-center"
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
                {/* Level */}
                <div>
                  <label className="block text-gray-400 mb-2">
                    Skill Level
                  </label>
                  {isEditing ? (
                    <select
                      value={editData.Level}
                      onChange={(e) =>
                        handleInputChange("level", e.target.value)
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2">
                      <span className="text-white">{userData.Level}</span>
                    </div>
                  )}
                </div>

                {/* Programming Language */}
                <div>
                  <label className="block text-gray-400 mb-2">
                    Preferred Language
                  </label>
                  {isEditing ? (
                    <select
                      value={editData.language}
                      onChange={(e) =>
                        handleInputChange("language", e.target.value)
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2 flex items-center">
                      <FaCode className="mr-2 text-red-400" />
                      <span className="text-white">{userData.Language}</span>
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-400 mb-2">Gender</label>
                  {isEditing ? (
                    <select
                      value={editData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      {genders.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2 flex items-center">
                      <FaVenusMars className="mr-2 text-red-400" />
                      <span className="text-white">{userData.gender}</span>
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
                  <div key={index} className="text-center">
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
                  </div>
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
