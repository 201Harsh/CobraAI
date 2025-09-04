import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaCode,
  FaUser,
  FaRobot,
  FaEllipsisV,
  FaTimes,
} from "react-icons/fa";

const DashChatSection = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm CodeAstra, your AI programming tutor. How can I help you learn today?",
      sender: "bot",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      type: "text",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "" || isWaitingForResponse) return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsWaitingForResponse(true);
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      generateBotResponse(inputMessage);
      setIsTyping(false);
      setIsWaitingForResponse(false);
    }, 1500);
  };

  // Generate a bot response based on user message
  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    let botResponse = "";

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      botResponse = "Hello there! Ready to dive into some coding today?";
    } else if (lowerMessage.includes("function")) {
      botResponse = `Here's an example of a JavaScript function:\n\n\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Developer")); // Output: Hello, Developer!
\`\`\``;
    } else if (
      lowerMessage.includes("loop") ||
      lowerMessage.includes("for") ||
      lowerMessage.includes("while")
    ) {
      botResponse = `Here are examples of loops in JavaScript:\n\n\`\`\`javascript
// For loop
for (let i = 0; i < 5; i++) {
  console.log("Iteration:", i);
}

// While loop
let count = 0;
while (count < 3) {
  console.log("Count:", count);
  count++;
}
\`\`\``;
    } else if (
      lowerMessage.includes("react") ||
      lowerMessage.includes("component")
    ) {
      botResponse = `Here's a simple React component example:\n\n\`\`\`jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Welcome;
\`\`\``;
    } else {
      // Default response for other messages
      botResponse =
        "I'd be happy to help with that! Could you provide more details about what you're trying to learn or build?";
    }

    const newBotMessage = {
      id: Date.now() + 1,
      text: botResponse,
      sender: "bot",
      timestamp: new Date(),
      type: botResponse.includes("```") ? "code" : "text",
    };

    setMessages((prev) => [...prev, newBotMessage]);
  };

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 border-l border-gray-700">
      {/* Header Section */}
      <div className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 py-4 px-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Learning JavaScript</h1>
          <p className="text-sm text-gray-400">AI Programming Tutor</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors">
            <FaEllipsisV />
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors md:hidden">
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-850 welcome-pg">
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-xs md:max-w-md ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-red-500 to-pink-600 ml-3"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 mr-3"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <FaUser className="text-white text-sm" />
                    ) : (
                      <FaRobot className="text-white text-sm" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                        : "bg-gray-700/80 backdrop-blur-sm text-white"
                    }`}
                  >
                    {message.type === "code" ? (
                      <div className="font-mono text-sm whitespace-pre-wrap">
                        {message.text.split("```").map((part, index) =>
                          index % 2 === 1 ? (
                            <div
                              key={index}
                              className="bg-gray-800 rounded-lg p-3 my-2 overflow-x-auto"
                            >
                              <code>{part}</code>
                            </div>
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-pink-200"
                          : "text-gray-400"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex max-w-xs md:max-w-md">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 mr-3">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="bg-gray-700/80 backdrop-blur-sm text-white rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input Section */}
      <div className="bg-gray-800/80 backdrop-blur-md border-t border-gray-700 p-4">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-3"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                isWaitingForResponse 
                  ? "Waiting for response..." 
                  : "Type your message or code question..."
              }
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 backdrop-blur-sm"
              disabled={isWaitingForResponse}
            />
            {isWaitingForResponse && (
              <div className="absolute inset-0 bg-gray-800/70 rounded-lg flex items-center justify-center">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
          </div>
          <motion.button
            type="submit"
            className="p-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-white hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={isWaitingForResponse ? {} : { scale: 1.05 }}
            whileTap={isWaitingForResponse ? {} : { scale: 0.95 }}
            disabled={inputMessage.trim() === "" || isWaitingForResponse}
          >
            <FaPaperPlane />
          </motion.button>
        </form>
        
        {/* Status indicator */}
        {isWaitingForResponse && (
          <div className="mt-2 text-xs text-gray-400 text-center">
            Please wait for the response before sending another message
          </div>
        )}
      </div>
    </div>
  );
};

export default DashChatSection;