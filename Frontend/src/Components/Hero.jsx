import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCode,
  FaComments,
  FaUser,
  FaArrowRight,
  FaShieldAlt,
  FaLightbulb,
  FaRocket,
  FaGraduationCap,
  FaBrain,
  FaCogs,
  FaGamepad,
  FaHands,
  FaBook,
  FaCompass,
  FaMusic,
  FaPalette,
  FaTrophy,
  FaPeace,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("chat");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

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

  const learningStyles = [
    {
      value: "fun_play",
      label: "Fun Play Learner 🎮",
      icon: <FaGamepad className="text-xl" />,
      description:
        "Learn through games, challenges, and interactive coding exercises",
      aiResponse:
        "AI will create coding games, challenges, and reward systems to make learning enjoyable",
    },
    {
      value: "kinesthetic",
      label: "Hands-on Learner 🤝",
      icon: <FaHands className="text-xl" />,
      description:
        "Learn by doing, with practical examples and immediate practice",
      aiResponse:
        "AI will provide interactive coding environments, sandboxes, and immediate practice opportunities",
    },
    {
      value: "story_mode",
      label: "Story Mode Learner 📖",
      icon: <FaBook className="text-xl" />,
      description:
        "Learn through narratives, real-world scenarios, and contextual examples",
      aiResponse:
        "AI will frame concepts within stories, use case studies, and real-world application scenarios",
    },
    {
      value: "explorer",
      label: "Explorer Learner 🧭",
      icon: <FaCompass className="text-xl" />,
      description:
        "Learn through discovery, experimentation, and self-guided exploration",
      aiResponse:
        "AI will suggest learning paths, provide resources for exploration, and encourage experimentation",
    },
    {
      value: "sound_wave",
      label: "Sound Wave Learner 🎧",
      icon: <FaMusic className="text-xl" />,
      description:
        "Learn through auditory explanations, podcasts, and verbal instructions",
      aiResponse:
        "AI will provide audio explanations, voice-based interactions, and mnemonic devices",
    },
    {
      value: "visual_mind",
      label: "Visual Mind Learner 🎨",
      icon: <FaPalette className="text-xl" />,
      description:
        "Learn through diagrams, charts, visualizations, and color-coded examples",
      aiResponse:
        "AI will create diagrams, flowcharts, visual code explanations, and color-highlighted examples",
    },
    {
      value: "challenge_mode",
      label: "Challenge Mode Learner 🏆",
      icon: <FaTrophy className="text-xl" />,
      description:
        "Learn through problem-solving, coding challenges, and achievement systems",
      aiResponse:
        "AI will provide progressively difficult challenges, coding problems, and achievement tracking",
    },
    {
      value: "zen_mode",
      label: "Zen Mode Learner 🧘",
      icon: <FaPeace className="text-xl" />,
      description:
        "Learn through calm, focused, step-by-step explanations without pressure",
      aiResponse:
        "AI will provide calm, structured, step-by-step guidance with mindfulness breaks",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Header/Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-24 flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            CobraAI Next-Gen{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              Smarter AI-Powered
            </span>{" "}
            Programming Tutor
          </motion.h1>
          <motion.p
            className="text-xl text-blue-200 mb-8"
            variants={itemVariants}
          >
            From code to clarity — CobraAI powered by MambaAI explains, guides,
            and empowers your skills.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <Link to="/register">
              <button className="cursor-pointer px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center">
                Start Coding Now <FaArrowRight className="ml-2" />
              </button>
            </Link>
            <Link to="/examples">
              <button className="cursor-pointer px-8 py-3 border border-pink-600 rounded-lg text-lg font-semibold hover:bg-pink-600/20 transition-all duration-300">
                See Examples
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl blur-lg opacity-30"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600">
                  CobraAI Editor
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-blue-400">function</div>
                <div className="text-yellow-300 ml-4">
                  <span className="text-purple-400">return</span> "Hello,
                  World!";
                </div>
                <div className="text-gray-500 mt-2">
                  // AI-generated code with explanations
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 text-sm">
                    <p>I'll help you generate and explain code in real-time!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Powerful{" "}
          <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            Features
          </span>
        </motion.h2>
        <motion.p
          className="text-xl text-blue-200 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Everything you need to learn, code, and interact with AI in one
          platform
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaComments className="text-4xl mb-4 text-pink-500" />,
              title: "AI Chat Interface",
              description:
                "Interactive conversations with AI to discuss code concepts, ask questions, and get programming help.",
            },
            {
              icon: <FaCode className="text-4xl mb-4 text-blue-500" />,
              title: "Code Generation",
              description:
                "Generate clean, efficient code with detailed explanations in multiple programming languages.",
            },
            {
              icon: <FaUser className="text-4xl mb-4 text-purple-500" />,
              title: "Personalized Learning",
              description:
                "Adaptive learning paths based on your skill level and programming interests.",
            },
            {
              icon: <FaShieldAlt className="text-4xl mb-4 text-green-500" />,
              title: "Secure Authentication",
              description:
                "Protected login with OTP verification to keep your data and projects safe.",
            },
            {
              icon: <FaLightbulb className="text-4xl mb-4 text-yellow-500" />,
              title: "Smart Explanations",
              description:
                "Get detailed breakdowns of generated code to enhance your understanding.",
            },
            {
              icon: <FaRocket className="text-4xl mb-4 text-red-500" />,
              title: "Fast & Efficient",
              description:
                "Quick responses and code generation to keep your workflow smooth and uninterrupted.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-pink-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.03 }}
              whileHover={{ y: -5 }}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who's Behind CobraAI Section */}
      <section id="developer" className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Who’s Behind{" "}
              <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                CobraAI
              </span>
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto text-lg">
              Meet the mind and the machine behind{" "}
              <span className="font-bold bg-clip-text bg-radial from-red-500 to-green-300 text-transparent">
                MambaAI’s CobraAI
              </span>{" "}
              project.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Developer Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-blue-950/50 border border-blue-800 rounded-2xl p-8 shadow-lg text-center"
            >
              <img
                src="https://avatars.githubusercontent.com/u/160850571?v=4" // replace with your image
                alt="Developer"
                className="w-28 h-28 rounded-full mx-auto border-2 border-red-500 mb-6"
              />
              <h3 className="text-xl font-bold text-white mb-2">Harsh</h3>
              <p className="text-pink-400 font-medium mb-3">
                Full Stack Developer & Visionary
              </p>
              <p className="text-blue-200 text-sm mb-6">
                Creator of MambaAI and CobraAI. Passionate about building AI
                tools that adapt to users’ skill levels and empower programmers.
              </p>
              <div className="flex justify-center space-x-5">
                <a
                  href="https://github.com/201Harsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/201harsh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a
                  href="https://www.instagram.com/201harshs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaInstagram className="text-2xl" />
                </a>
              </div>
            </motion.div>

            {/* AI Engine Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-blue-950/50 border border-blue-800 rounded-2xl p-8 shadow-lg text-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
                alt="AI Engine"
                className="w-24 h-24 mx-auto mb-6"
              />
              <h3 className="text-xl font-bold text-white mb-2">MambaAI AI</h3>
              <p className="text-pink-400 font-medium mb-3">
                The Adaptive Engine
              </p>
              <ul className="text-blue-200 text-sm space-y-2 text-left mx-auto max-w-xs">
                <li>
                  ⚡ Analyzes your skill level (Beginner / Intermediate /
                  Advanced)
                </li>
                <li>🎯 Adjusts teaching pace and complexity</li>
                <li>📖 Explains code with tailored clarity</li>
                <li>🚀 Evolves as you grow</li>
              </ul>
            </motion.div>

            {/* Tech Stack Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-blue-950/50 border border-blue-800 rounded-2xl p-8 shadow-lg text-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
                alt="Tech Stack"
                className="w-24 h-24 mx-auto mb-6"
              />
              <h3 className="text-xl font-bold text-white mb-2">Tech Stack</h3>
              <p className="text-pink-400 font-medium mb-3">
                Tools & Frameworks
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "React",
                  "Node.js",
                  "Python",
                  "MongoDB",
                  "Tailwind CSS",
                  "React Native",
                ].map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-800/40 text-blue-200 px-3 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl my-16"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How{" "}
          <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            CobraAI
          </span>{" "}
          Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          {[
            {
              step: "1",
              title: "Sign Up & Onboard",
              description:
                "Start by creating your account with quick email verification.",
            },
            {
              step: "2",
              title: "Skill Analysis",
              description:
                "CobraAI analyzes whether you are Beginner, Intermediate, or Advanced.",
            },
            {
              step: "3",
              title: "Adaptive AI Tutor",
              description:
                "The AI adjusts explanations, coding style, and examples to your level.",
            },
            {
              step: "4",
              title: "Learn & Progress",
              description:
                "As you grow, CobraAI updates your profile and evolves with you.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-blue-200">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learning System Explanation Section */}
      <section id="learning-system" className="container mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Personalized{" "}
          <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            Learning System
          </span>
        </motion.h2>
        <motion.p
          className="text-xl text-blue-200 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          CobraAI adapts to your unique learning style and skill level for the
          most effective learning experience
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Styles Card */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <FaBrain className="text-3xl text-purple-500 mr-3" />
              <h3 className="text-2xl font-bold">Learning Styles</h3>
            </div>
            <p className="text-blue-200 mb-4">
              Everyone learns differently. Choose the style that best matches
              how you absorb information:
            </p>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 text-area">
              {learningStyles.map((style, index) => (
                <div key={index} className="bg-gray-700/30 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-pink-400 mr-2">{style.icon}</span>
                    <span className="font-semibold">{style.label}</span>
                  </div>
                  <p className="text-sm text-blue-200 mb-2">
                    {style.description}
                  </p>
                  <p className="text-xs text-pink-300">
                    AI will: {style.aiResponse}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skill Levels Card */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <FaGraduationCap className="text-3xl text-blue-500 mr-3" />
              <h3 className="text-2xl font-bold">Skill Levels</h3>
            </div>
            <p className="text-blue-200 mb-4">
              CobraAI adjusts complexity based on your programming experience:
            </p>
            <div className="space-y-4">
              {levels.map((level, index) => (
                <div key={index} className="bg-gray-700/30 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-pink-400 mr-2">•</span>
                    <span className="font-semibold">{level.label}</span>
                  </div>
                  {level.value === "beginner" && (
                    <p className="text-sm text-blue-200">
                      Starting your coding journey? AI will provide foundational
                      concepts with simple examples and step-by-step guidance.
                    </p>
                  )}
                  {level.value === "intermediate" && (
                    <p className="text-sm text-blue-200">
                      Comfortable with basics? AI will focus on building
                      projects, understanding patterns, and intermediate
                      concepts.
                    </p>
                  )}
                  {level.value === "advanced" && (
                    <p className="text-sm text-blue-200">
                      Ready for complex topics? AI will dive into architecture,
                      optimization, and advanced programming techniques.
                    </p>
                  )}
                  {level.value === "expert" && (
                    <p className="text-sm text-blue-200">
                      Mastering programming? AI will challenge you with
                      cutting-edge concepts, system design, and mentorship.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Response Card */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <FaCogs className="text-3xl text-green-500 mr-3" />
              <h3 className="text-2xl font-bold">AI Response Adaptation</h3>
            </div>
            <p className="text-blue-200 mb-4">
              Our AI customizes responses based on your level and learning style
              combination:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-700/30 p-3 rounded-lg">
                <h4 className="font-semibold text-pink-400 mb-2">
                  Example: Beginner + Visual Learner
                </h4>
                <p className="text-sm text-blue-200">
                  AI will provide color-coded code examples, diagrams of how
                  code works, and visual step-by-step tutorials.
                </p>
              </div>
              <div className="bg-gray-700/30 p-3 rounded-lg">
                <h4 className="font-semibold text-pink-400 mb-2">
                  Example: Intermediate + Challenge Seeker
                </h4>
                <p className="text-sm text-blue-200">
                  AI will create coding challenges, project-based learning, and
                  achievement systems to track progress.
                </p>
              </div>
              <div className="bg-gray-700/30 p-3 rounded-lg">
                <h4 className="font-semibold text-pink-400 mb-2">
                  Example: Advanced + Story Mode
                </h4>
                <p className="text-sm text-blue-200">
                  AI will frame complex concepts within real-world scenarios,
                  case studies, and architectural decision narratives.
                </p>
              </div>
              <div className="bg-gray-700/30 p-3 rounded-lg">
                <h4 className="font-semibold text-pink-400 mb-2">
                  Try Different Combinations
                </h4>
                <p className="text-sm text-blue-200">
                  You can change your learning style anytime to discover what
                  works best for different topics.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 bg-gray-800/30 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-center mb-4 text-pink-400">
            Supported Programming Languages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {programmingLanguages.map((lang, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-3 bg-gray-700/50 rounded-lg"
              >
                <span className="text-sm">{lang.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 md:p-12 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Coding Journey?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using MambaAI to learn, code, and
            interact with AI.
          </p>
          <Link to="/register">
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg">
              Get Started For Free
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Hero;
