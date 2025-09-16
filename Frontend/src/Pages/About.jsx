import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCode,
  FaRocket,
  FaLightbulb,
  FaShieldAlt,
  FaHeart,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const About = () => {
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

  const stats = [
    { number: "50+", label: "Active Users" },
    { number: "5K+", label: "Code Generations" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "AI Assistance" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              MambaAI
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            A personal vision turned into reality — building an{" "}
            <span className="text-pink-400">AI-powered coding tutor</span> that
            adapts to every developer’s journey.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              My{" "}
              <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="text-gray-300 mb-4">
              CobraAI (MambaAI) isn’t just a coding assistant — it’s a{" "}
              <span className="text-pink-400">personalized AI tutor</span>. It
              learns about you, analyzes your level — beginner, intermediate, or
              advanced — and then adapts its teaching style to match your
              journey.
            </p>
            <p className="text-gray-300 mb-6">
              I started this project as a solo developer because I wanted a tool
              that could{" "}
              <span className="text-blue-400">
                explain code like a mentor, generate clean solutions, and make
                learning interactive
              </span>
              . What began as a small experiment soon turned into CobraAI — a
              platform to help anyone grow as a developer with AI by their side.
            </p>
            <Link to="/register">
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center">
                Start Learning with MambaAI <FaArrowRight className="ml-2" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
                <div className="flex space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-blue-400">// Vision</div>
                  <div className="text-green-400 mt-2">function</div>
                  <div className="text-yellow-300 ml-4">
                    <span className="text-purple-400">return</span> "An AI tutor
                    that adapts to every developer";
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-red-900/20 to-pink-900/20 rounded-2xl my-16">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Core{" "}
          <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            Values
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <FaCode className="text-4xl mb-4 text-red-500" />,
              title: "Adaptive Learning",
              description:
                "Every user’s journey is unique — MambaAI analyzes skill level and tailors guidance accordingly.",
            },
            {
              icon: <FaLightbulb className="text-4xl mb-4 text-yellow-500" />,
              title: "Innovation First",
              description:
                "Exploring new AI methods to make coding education smarter and more intuitive.",
            },
            {
              icon: <FaRocket className="text-4xl mb-4 text-purple-500" />,
              title: "Empower Developers",
              description:
                "Helping programmers build faster, understand deeper, and level up continuously.",
            },
            {
              icon: <FaShieldAlt className="text-4xl mb-4 text-green-500" />,
              title: "Privacy & Security",
              description:
                "Your learning data stays safe, with privacy as a priority from day one.",
            },
            {
              icon: <FaHeart className="text-4xl mb-4 text-red-400" />,
              title: "Passion for Teaching",
              description:
                "Built with the belief that coding education should be accessible and inspiring.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-pink-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.02 }}
              whileHover={{ y: -5 }}
            >
              {value.icon}
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who's Behind CobraAI Section */}
      <section
        id="developer"
        className="py-16"
      >
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
              Meet the mind and the machine behind MambaAI’s CobraAI project.
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-2xl p-8 md:p-12 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join developers learning with MambaAI — your AI-powered coding
            tutor that grows with you.
          </p>
          <Link to="/register">
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg">
              Get Started For Free
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
