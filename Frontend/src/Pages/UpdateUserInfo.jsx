import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCode,
  FaVenusMars,
  FaBrain,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import AxiosInstance from "../Config/Axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateUserInfo = () => {
  const [userData, setUserData] = useState({
    level: "",
    programmingLanguage: "",
    gender: "",
    learningStyle: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const Navigate = useNavigate();

  const levels = [
    { value: "beginner", label: "🌱 Beginner" },
    { value: "intermediate", label: "🚀 Intermediate" },
    { value: "advanced", label: "⚡ Advanced" },
    { value: "expert", label: "🏆 Expert" },
  ];

  const programmingLanguages = [
    { value: "html-css-js", label: "🌐 HTML, CSS and JavaScript" },
    { value: "reactjs", label: "⚛️ React JS" },
    { value: "react-native", label: "📱 React Native" },
    { value: "node-express", label: "🚀 Node.js & Express.js" },
    { value: "mongodb", label: "🍃 MongoDB" },
    { value: "mysql", label: "🐬 MySQL" },
    { value: "python", label: "🐍 Python" },
    { value: "ai-ml-basics", label: "🤖 AI / ML Basics" },
  ];

  const genders = [
    { value: "male", label: "👨 Male" },
    { value: "female", label: "👩 Female" },
    { value: "lgbtq+", label: "🌈 LGBTQ+" },
  ];

  const learningStyles = [
    { value: "fun_play", label: "Fun Play Learner 🎮" },
    { value: "kinesthetic", label: "Hands-on Learner 🤝" },
    { value: "story_mode", label: "Story Mode Learner 📖" },
    { value: "explorer", label: "Explorer Learner 🧭" },
    { value: "sound_wave", label: "Sound Wave Learner 🎧" },
    { value: "visual_mind", label: "Visual Mind Learner 🎨" },
    { value: "challenge_mode", label: "Challenge Mode Learner 🏆" },
    { value: "zen_mode", label: "Zen Mode Learner 🧘" },
  ];

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    try {
      const res = await AxiosInstance.post("/users/UpdateUserinfo", {
        Level: userData.level,
        gender: userData.gender,
        LearningStyle: userData.learningStyle,
        Language: userData.programmingLanguage,
      });

      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        localStorage.setItem(
          "ProgrammingLanguage",
          res.data.UpdateUser.Language
        );

        Navigate("/dashboard");
      }

      setUserData({
        level: "",
        programmingLanguage: "",
        gender: "",
        learningStyle: "",
      });
    } catch (error) {
      const errors = error.response?.data?.errors;

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
        error.response?.data?.error ||
          errors.forEach((elem) => {
            toast.error(elem.msg, {
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
          }),
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
    } finally {
      setSubmitted(false);
    }
  };

  const isFormComplete = () => {
    return (
      userData.level &&
      userData.programmingLanguage &&
      userData.gender &&
      userData.learningStyle
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Your{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-gray-400">
            Help us personalize your learning experience on CobraAI
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-6 text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <FaCheck className="text-lg" />
              <span className="font-semibold">
                Profile updated successfully!
              </span>
            </div>
            <p className="text-green-300 text-sm mt-1">
              Check Profile for details
            </p>
          </motion.div>
        )}

        {/* Form Container */}
        <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Level Selection */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                <FaUser className="mr-2 text-red-400" />
                What's your current skill level?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {levels.map((level) => (
                  <motion.button
                    key={level.value}
                    type="button"
                    onClick={() => handleInputChange("level", level.value)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      userData.level === level.value
                        ? "bg-gradient-to-r from-red-600 to-pink-600 border-transparent text-white"
                        : "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-red-500"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {level.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Programming Language Selection */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                <FaCode className="mr-2 text-red-400" />
                Choose your primary programming language
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {programmingLanguages.map((lang) => (
                  <motion.button
                    key={lang.value}
                    type="button"
                    onClick={() =>
                      handleInputChange("programmingLanguage", lang.value)
                    }
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      userData.programmingLanguage === lang.value
                        ? "bg-gradient-to-r from-red-600 to-pink-600 border-transparent text-white"
                        : "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-red-500"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {lang.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                <FaVenusMars className="mr-2 text-red-400" />
                Gender
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {genders.map((gender) => (
                  <motion.button
                    key={gender.value}
                    type="button"
                    onClick={() => handleInputChange("gender", gender.value)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      userData.gender === gender.value
                        ? "bg-gradient-to-r from-red-600 to-pink-600 border-transparent text-white"
                        : "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-red-500"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {gender.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Learning Style Selection */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                <FaBrain className="mr-2 text-red-400" />
                Preferred learning style
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
                {learningStyles.map((style) => (
                  <div key={style.value} className="relative">
                    {style.value === "kinesthetic" && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Recommended
                        </span>
                      </div>
                    )}
                    <motion.button
                      type="button"
                      onClick={() =>
                        handleInputChange("learningStyle", style.value)
                      }
                      className={`p-3 rounded-lg border transition-all duration-200 w-full ${
                        userData.learningStyle === style.value
                          ? "bg-gradient-to-r from-red-600 to-pink-600 border-transparent text-white"
                          : "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-red-500"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {style.label}
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Values Preview */}
            {(userData.level ||
              userData.programmingLanguage ||
              userData.gender ||
              userData.learningStyle) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-gray-700/30 rounded-xl p-4 border border-gray-600"
              >
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  Your selections:
                </h4>
                <div className="text-sm space-y-1">
                  {userData.level && (
                    <p>
                      <span className="text-red-400">Level:</span>{" "}
                      {levels.find((l) => l.value === userData.level)?.label}
                    </p>
                  )}
                  {userData.programmingLanguage && (
                    <p>
                      <span className="text-red-400">Language:</span>{" "}
                      {
                        programmingLanguages.find(
                          (l) => l.value === userData.programmingLanguage
                        )?.label
                      }
                    </p>
                  )}
                  {userData.gender && (
                    <p>
                      <span className="text-red-400">Gender:</span>{" "}
                      {genders.find((g) => g.value === userData.gender)?.label}
                    </p>
                  )}
                  {userData.learningStyle && (
                    <p>
                      <span className="text-red-400">Learning Style:</span>{" "}
                      {
                        learningStyles.find(
                          (s) => s.value === userData.learningStyle
                        )?.label
                      }
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isFormComplete()}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                isFormComplete()
                  ? "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
              whileHover={isFormComplete() ? { scale: 1.02 } : {}}
              whileTap={isFormComplete() ? { scale: 0.98 } : {}}
            >
              {isFormComplete() ? (
                <>
                  Complete Profile <FaArrowRight className="ml-2" />
                </>
              ) : (
                "Select all options to continue"
              )}
            </motion.button>
          </form>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          You can update these preferences anytime from your profile settings
        </motion.p>
      </motion.div>
    </div>
  );
};

export default UpdateUserInfo;
