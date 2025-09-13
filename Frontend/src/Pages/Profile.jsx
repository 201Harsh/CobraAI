import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCode,
  FaVenusMars,
  FaEdit,
  FaSave,
  FaTimes,
  FaGraduationCap,
  FaArrowLeft,
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
    ProfilePicUrl:
      "" ||
      "https://videos.openai.com/vg-assets/assets%2Ftask_01k4hn2gk1fmkt0t9ka1qw5ydc%2F1757234277_img_1.webp?st=2025-09-12T06%3A15%3A54Z&se=2025-09-18T07%3A15%3A54Z&sks=b&skt=2025-09-12T06%3A15%3A54Z&ske=2025-09-18T07%3A15%3A54Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Z%2Bm9U2z4n5zr4UdpwPKqMDXCT6lh2gHKZhKNZpm6teA%3D&az=oaivgprodscus",
    Language: "",
    gender: "",
    LearningStyle: "",
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
        toast.error(
          error.response?.data?.error || "Failed to fetch user data",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
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
      const changes = {
        name: editData.name || userData.name,
        gender: editData.gender || userData.gender,
        Language: editData.Language || userData.Language,
        Level: editData.Level || userData.Level,
        LearningStyle: editData.LearningStyle || userData.LearningStyle,
      };

      try {
        const res = await AxiosInstance.post("/users/updateProfile", changes);

        if (res.status === 200) {
          toast.success(res.data.message || "Profile updated successfully!", {
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
        }
      } catch (error) {
        toast.error(error.response?.data, {
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

        toast.error(
          error.response?.data?.error || "Failed to update user data",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
      }

      // Update local userData state
      setUserData((prev) => ({
        ...prev,
        ...changes,
      }));

      setIsEditing(false);
    } catch (error) {
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

  const getLabelFromValue = (options, value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : "Not specified";
  };

  const stats = [
    { label: "Days Active", value: userData.learningStreak, icon: "🔥" },
    { label: "Projects", value: userData.projectsCompleted, icon: "📁" },
    { label: "Code Generations", value: userData.codeGenerations, icon: "⚡" },
  ];

  const languages = [
    { value: "html-css-js", label: "🌐 HTML, CSS and JavaScript" },
    { value: "reactjs", label: "⚛️ React JS" },
    { value: "react-native", label: "📱 React Native" },
    { value: "node-express", label: "🚀 Node.js & Express.js" },
    { value: "mongodb", label: "🍃 MongoDB" },
    { value: "mysql", label: "🐬 MySQL" },
    { value: "python", label: "🐍 Python" },
    { value: "ai-ml-basics", label: "🤖 AI / ML Basics" },
  ];

  const levels = [
    { value: "beginner", label: "🌱 Beginner" },
    { value: "intermediate", label: "🚀 Intermediate" },
    { value: "advanced", label: "⚡ Advanced" },
    { value: "expert", label: "🏆 Expert" },
  ];

  const genders = [
    { value: "male", label: "👨 Male" },
    { value: "female", label: "👩 Female" },
    { value: "lgbtq+", label: "🌈 LGBTQ+" },
  ];

  const LearningStyles = [
    { value: "visual", label: "👁️ Visual" },
    { value: "auditory", label: "👂 Auditory" },
    { value: "reading", label: "📖 Reading/Writing" },
    { value: "kinesthetic", label: "🔧 Kinesthetic" },
    { value: "mixed", label: "🔄 Mixed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back to Dashboard Button */}
        <motion.button
          onClick={() => Navigate("/dashboard")}
          className="mb-6 fixed flex z-50 items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaArrowLeft className="text-sm" />
          Back to Dashboard
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 pt-18 md:pt-0"
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
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
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
                  <motion.div
                    className="text-2xl font-bold text-white"
                    key={stat.value}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
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
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <option value="">Select Gender</option>
                      {genders.map((gender) => (
                        <option key={gender.value} value={gender.value}>
                          {gender.label}
                        </option>
                      ))}
                    </motion.select>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2 flex items-center">
                      <FaVenusMars className="mr-2 text-red-400" />
                      <span className="text-white">
                        {getLabelFromValue(genders, userData.gender)}
                      </span>
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
                      onChange={(e) =>
                        handleInputChange("Language", e.target.value)
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <option value="">Select Language</option>
                      {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </motion.select>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2 flex items-center">
                      <FaCode className="mr-2 text-red-400" />
                      <span className="text-white">
                        {getLabelFromValue(languages, userData.Language)}
                      </span>
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
                      onChange={(e) =>
                        handleInputChange("Level", e.target.value)
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <option value="">Select Level</option>
                      {levels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </motion.select>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2">
                      <span className="text-white">
                        {getLabelFromValue(levels, userData.Level)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Learning Style */}
                <div>
                  <label className="block text-gray-400 mb-2">
                    Learning Style
                  </label>
                  {isEditing ? (
                    <motion.select
                      value={editData.LearningStyle}
                      onChange={(e) =>
                        handleInputChange("LearningStyle", e.target.value)
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <option value="">Select Learning Style</option>
                      {LearningStyles.map((style) => (
                        <option key={style.value} value={style.value}>
                          {style.label}
                        </option>
                      ))}
                    </motion.select>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg px-3 py-2 flex items-center">
                      <FaGraduationCap className="mr-2 text-red-400" />
                      <span className="text-white">
                        {getLabelFromValue(
                          LearningStyles,
                          userData.LearningStyle
                        )}
                      </span>
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
                      <motion.div
                        className="bg-gradient-to-r from-red-600 to-pink-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                      />
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
