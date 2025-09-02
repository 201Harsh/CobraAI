import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCode, FaComments, FaUser, FaGithub, FaLinkedin, FaInstagram, FaArrowRight, FaShieldAlt, FaLightbulb, FaRocket } from 'react-icons/fa';
import Header from './Header';


const Hero = () => {
  const [activeTab, setActiveTab] = useState('chat');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden">
      {/* Header/Navigation */}
      {/* <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mr-3">
            <div className="w-6 h-6 bg-white rounded-full relative">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">Trinetra</h1>
        </motion.div>

        <motion.div 
          className="hidden md:flex space-x-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="#features" className="hover:text-pink-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-pink-400 transition-colors">How It Works</a>
          <a href="#examples" className="hover:text-pink-400 transition-colors">Examples</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/login">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
              Get Started
            </button>
          </Link>
        </motion.div>
      </header> */}
      <Header/>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
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
            AI-Powered <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Code Generation</span> & Chat Platform
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-200 mb-8"
            variants={itemVariants}
          >
            Interact with AI, generate clean code with explanations, and elevate your programming skills with Trinetra.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <Link to="/register">
              <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center">
                Start Coding Now <FaArrowRight className="ml-2" />
              </button>
            </Link>
            <Link to="/examples">
              <button className="px-8 py-3 border border-pink-600 rounded-lg text-lg font-semibold hover:bg-pink-600/20 transition-all duration-300">
                See Examples
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
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
                <div className="text-blue-400">function</div>
                <div className="text-yellow-300 ml-4"><span className="text-purple-400">return</span> "Hello, World!";</div>
                <div className="text-gray-500 mt-2">// AI-generated code with explanations</div>
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
          Powerful <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Features</span>
        </motion.h2>
        <motion.p 
          className="text-xl text-blue-200 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Everything you need to learn, code, and interact with AI in one platform
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaComments className="text-4xl mb-4 text-pink-500" />,
              title: "AI Chat Interface",
              description: "Interactive conversations with AI to discuss code concepts, ask questions, and get programming help."
            },
            {
              icon: <FaCode className="text-4xl mb-4 text-blue-500" />,
              title: "Code Generation",
              description: "Generate clean, efficient code with detailed explanations in multiple programming languages."
            },
            {
              icon: <FaUser className="text-4xl mb-4 text-purple-500" />,
              title: "Personalized Learning",
              description: "Adaptive learning paths based on your skill level and programming interests."
            },
            {
              icon: <FaShieldAlt className="text-4xl mb-4 text-green-500" />,
              title: "Secure Authentication",
              description: "Protected login with OTP verification to keep your data and projects safe."
            },
            {
              icon: <FaLightbulb className="text-4xl mb-4 text-yellow-500" />,
              title: "Smart Explanations",
              description: "Get detailed breakdowns of generated code to enhance your understanding."
            },
            {
              icon: <FaRocket className="text-4xl mb-4 text-red-500" />,
              title: "Fast & Efficient",
              description: "Quick responses and code generation to keep your workflow smooth and uninterrupted."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-pink-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl my-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Trinetra</span> Works
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          {[
            { step: "1", title: "Sign Up", description: "Create your account with email verification" },
            { step: "2", title: "Chat with AI", description: "Describe what code you need or ask questions" },
            { step: "3", title: "Get Code", description: "Receive generated code with explanations" },
            { step: "4", title: "Learn & Implement", description: "Understand the code and use it in your projects" }
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div 
          className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 md:p-12 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Coding Journey?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using Trinetra to learn, code, and interact with AI.
          </p>
          <Link to="/register">
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg">
              Get Started For Free
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mr-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold">Trinetra</span>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaGithub className="text-2xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram className="text-2xl" />
            </a>
          </div>
          
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Trinetra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;