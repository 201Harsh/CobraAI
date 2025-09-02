import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCode,
  FaUsers,
  FaRocket,
  FaLightbulb,
  FaShieldAlt,
  FaHeart,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaArrowRight
} from "react-icons/fa";

const About = () => {
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

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Maria Rodriguez",
      role: "AI Specialist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "David Chen",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Sarah Williams",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Code Generations" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Trinetra</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Empowering developers with AI-powered code generation and learning
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
              Our <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-gray-300 mb-4">
              At Trinetra, we believe that learning to code should be accessible, intuitive, and empowering for everyone. 
              Our mission is to bridge the gap between aspiring developers and professional-grade coding skills through 
              the power of artificial intelligence.
            </p>
            <p className="text-gray-300 mb-6">
              We're building the next generation of programming education tools that adapt to your learning style, 
              provide real-time feedback, and help you write better code faster.
            </p>
            <Link to="/register">
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center">
                Join Us Today <FaArrowRight className="ml-2" />
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
                  <div className="text-blue-400">// Our vision for the future</div>
                  <div className="text-green-400 mt-2">function</div>
                  <div className="text-yellow-300 ml-4">
                    <span className="text-purple-400">return</span> "Democratizing coding education";
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
          Our <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Values</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <FaCode className="text-4xl mb-4 text-red-500" />,
              title: "Excellence in Code",
              description: "We strive for clean, efficient, and maintainable code in everything we build and teach."
            },
            {
              icon: <FaUsers className="text-4xl mb-4 text-pink-500" />,
              title: "Community Focus",
              description: "We believe in the power of community and collaborative learning to accelerate growth."
            },
            {
              icon: <FaLightbulb className="text-4xl mb-4 text-yellow-500" />,
              title: "Continuous Innovation",
              description: "We're constantly exploring new ways to improve the learning experience with cutting-edge AI."
            },
            {
              icon: <FaRocket className="text-4xl mb-4 text-purple-500" />,
              title: "Rapid Iteration",
              description: "We move quickly, test often, and adapt based on real user feedback and needs."
            },
            {
              icon: <FaShieldAlt className="text-4xl mb-4 text-green-500" />,
              title: "Privacy & Security",
              description: "We prioritize the security of your data and the privacy of your learning journey."
            },
            {
              icon: <FaHeart className="text-4xl mb-4 text-red-400" />,
              title: "Passion for Teaching",
              description: "We genuinely love helping others learn and grow their programming skills."
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-pink-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {value.icon}
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Meet Our <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Team</span>
        </motion.h2>
        
        <motion.p
          className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Passionate developers and educators working to revolutionize coding education
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-red-500 mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-pink-400 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a href={member.social.github} className="text-gray-400 hover:text-white transition-colors">
                    <FaGithub className="text-xl" />
                  </a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-white transition-colors">
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a href={member.social.twitter} className="text-gray-400 hover:text-white transition-colors">
                    <FaTwitter className="text-xl" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
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
            Join thousands of developers using Trinetra to learn, code, and grow with AI.
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