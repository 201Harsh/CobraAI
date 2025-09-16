import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaTimes,
  FaRocket,
  FaCrown,
  FaUserTie,
  FaInfinity,
  FaUsers,
  FaCode,
  FaShieldAlt,
  FaLightbulb,
  FaArrowRight,
} from "react-icons/fa";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'annual'

  const plans = [
    {
      name: "Starter",
      description: "Perfect for beginners learning to code",
      price: billingCycle === "monthly" ? 9 : 90,
      period: billingCycle === "monthly" ? "month" : "year",
      popular: false,
      icon: <FaRocket className="text-red-500 text-2xl" />,
      features: [
        { text: "50 code generations per month", available: true },
        { text: "Basic AI explanations", available: true },
        { text: "5 programming languages", available: true },
        { text: "Community support", available: true },
        { text: "Advanced code analysis", available: false },
        { text: "Priority support", available: false },
        { text: "Unlimited projects", available: false },
        { text: "Custom AI tutor", available: false },
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      description: "For serious developers and students",
      price: billingCycle === "monthly" ? 19 : 190,
      period: billingCycle === "monthly" ? "month" : "year",
      popular: true,
      icon: <FaCrown className="text-yellow-500 text-2xl" />,
      features: [
        { text: "200 code generations per month", available: true },
        { text: "Detailed AI explanations", available: true },
        { text: "10+ programming languages", available: true },
        { text: "Priority support", available: true },
        { text: "Advanced code analysis", available: true },
        { text: "Unlimited projects", available: true },
        { text: "Export capabilities", available: true },
        { text: "Custom AI tutor", available: false },
      ],
      cta: "Go Pro",
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: "Custom",
      period: "team",
      popular: false,
      icon: <FaUserTie className="text-purple-500 text-2xl" />,
      features: [
        { text: "Unlimited code generations", available: true },
        { text: "Advanced AI explanations", available: true },
        { text: "All programming languages", available: true },
        { text: "24/7 dedicated support", available: true },
        { text: "Team management", available: true },
        { text: "Custom AI tutor", available: true },
        { text: "API access", available: true },
        { text: "White-label options", available: true },
      ],
      cta: "Contact Sales",
    },
  ];

  const features = [
    {
      icon: <FaCode className="text-red-500 text-2xl" />,
      title: "Code Generation",
      description:
        "Generate code in multiple programming languages with detailed explanations",
    },
    {
      icon: <FaUsers className="text-pink-500 text-2xl" />,
      title: "Personalized Learning",
      description:
        "AI that adapts to your skill level and learning preferences",
    },
    {
      icon: <FaShieldAlt className="text-green-500 text-2xl" />,
      title: "Secure & Private",
      description:
        "Your code and data are protected with enterprise-grade security",
    },
    {
      icon: <FaLightbulb className="text-yellow-500 text-2xl" />,
      title: "Smart Explanations",
      description:
        "Understand the 'why' behind the code with AI-powered insights",
    },
  ];

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
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Choose the plan that works best for you and start your coding
            journey with MambaAI
          </p>
        </motion.div>
      </section>

      {/* Billing Toggle */}
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 border border-gray-700 inline-flex">
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              billingCycle === "monthly"
                ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              billingCycle === "annual"
                ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setBillingCycle("annual")}
          >
            Annual{" "}
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full ml-2">
              Save 20%
            </span>
          </button>
        </div>
      </motion.div>

      {/* Pricing Plans */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border ${
                plan.popular ? "border-pink-600 relative" : "border-gray-700"
              } transition-all duration-300 hover:shadow-xl`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="flex items-center mb-6">
                {plan.icon}
                <h3 className="text-2xl font-bold ml-3">{plan.name}</h3>
              </div>

              <p className="text-gray-300 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {typeof plan.price === "number"
                    ? `$${plan.price}`
                    : plan.price}
                </span>
                {typeof plan.price === "number" && (
                  <span className="text-gray-400 ml-2">/ {plan.period}</span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    {feature.available ? (
                      <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    ) : (
                      <FaTimes className="text-gray-600 mt-1 mr-3 flex-shrink-0" />
                    )}
                    <span
                      className={
                        feature.available ? "text-gray-200" : "text-gray-500"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to={plan.name === "Enterprise" ? "/contact" : "/register"}>
                <motion.button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                    plan.popular
                      ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}{" "}
                  {plan.name !== "Enterprise" && (
                    <FaArrowRight className="ml-2" />
                  )}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-red-900/20 to-pink-900/20 rounded-2xl my-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.02 }}
        >
          All Plans Include
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            Questions
          </span>
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto mt-12 space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              question: "Can I change my plan later?",
              answer:
                "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new rate applies immediately. When downgrading, the change takes effect at the end of your current billing cycle.",
            },
            {
              question: "Do you offer student discounts?",
              answer:
                "Yes, we offer a 50% discount for students and educators. Please contact our support team with proof of your academic status to get the discount applied to your account.",
            },
            {
              question: "Is there a free trial?",
              answer:
                "We don't offer a free trial for our paid plans, but we have a generous free tier that allows you to test our basic features before committing to a paid plan.",
            },
            {
              question: "What payment methods do you accept?",
              answer:
                "We accept all major credit cards, PayPal, and for annual plans we also accept bank transfers. Enterprise customers can be invoiced annually.",
            },
            {
              question: "Can I cancel my subscription?",
              answer:
                "Yes, you can cancel your subscription at any time. After cancellation, you'll have access to your paid features until the end of your billing period.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold mb-2 text-red-400">
                {faq.question}
              </h3>
              <p className="text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
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
            Ready to Boost Your Coding Skills?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using MambaAI to learn, code, and grow
            with AI.
          </p>
          <Link to="/register">
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg">
              Get Started For Free
            </button>
          </Link>
          <p className="text-gray-400 mt-4">No credit card required</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Pricing;
