import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Contact form data:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

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
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Have questions or want to learn more about Trinetra? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
                  placeholder="What is this regarding?"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
                  placeholder="Your message here..."
                ></textarea>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-white font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message <FaPaperPlane className="ml-2" />
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Info Card */}
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="bg-gradient-to-r from-red-600 to-pink-600 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-blue-200">Alpine Appartment, Near Laxmi Kutter Tallital,</p>
                    <p className="text-blue-200">Nainital , Uttarakhand, 263001</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="bg-gradient-to-r from-red-600 to-pink-600 p-3 rounded-lg mr-4">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-blue-200">Current Not Available</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="bg-gradient-to-r from-red-600 to-pink-600 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-blue-200">gamerpandeyharsh@gmail.com</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
              
              <motion.div 
                className="flex space-x-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <motion.a
                  href="https://www.instagram.com/201harshs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white p-3 bg-gray-700 rounded-full hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Visit our Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://github.com/201Harsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Visit our GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/201harsh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white p-3 bg-gray-700 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Visit our LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>

            {/* FAQ Section */}
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">Common Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-blue-300">How quickly do you respond to inquiries?</h3>
                  <p className="text-blue-200 text-sm">We typically respond within 24 hours on business days.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-blue-300">Do you offer technical support?</h3>
                  <p className="text-blue-200 text-sm">Yes, we provide technical support for all our users.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-blue-300">Can I schedule a demo?</h3>
                  <p className="text-blue-200 text-sm">Absolutely! Contact us to schedule a personalized demo.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;