import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaCode,
  FaUser,
  FaRobot,
  FaEllipsisV,
  FaTimes,
  FaCopy,
  FaCheck
} from "react-icons/fa";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import AxiosInstance from "../Config/Axios";
import { toast, Bounce } from "react-toastify";

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
  const [username, setusername] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setusername(name);
    }
  }, []);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle code copy
  const handleCopyCode = async (code, messageId) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 1200);
    } catch (err) {
      toast.error("Failed to copy code to clipboard", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // Extract code blocks from message
  const extractCodeBlocks = (text) => {
    const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        });
      }

      // Add code block
      const language = match[1] || 'javascript';
      const code = match[2].trim();
      parts.push({
        type: 'code',
        language,
        code
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }

    return parts;
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
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

    try {
      const response = await AxiosInstance.post("/ai/chat", {
        prompt: inputMessage,
      });

      if (response.status === 200) {
        const botResponse = response.data.response;
        const newBotMessage = {
          id: Date.now() + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
          type: botResponse.includes("```") ? "code" : "text",
        };
        setMessages((prev) => [...prev, newBotMessage]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsTyping(false);
      setIsWaitingForResponse(false);
    }
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
      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-850">
        <div className="max-w-full space-y-6">
          <AnimatePresence>
            {messages.map((message) => {
              const messageParts = extractCodeBlocks(message.text);
              
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-full ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-red-500 to-pink-600 ml-3"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 mr-3"
                    }`}>
                      {message.sender === "user" ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                          {username.charAt(0)}
                        </div>
                      ) : (
                        <img
                          src="https://avatars.githubusercontent.com/u/160850571?v=4"
                          alt="AI Tutor"
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className={`rounded-2xl px-4 py-3 max-w-full ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                        : "bg-gray-700/80 backdrop-blur-sm text-white"
                    }`}>
                      <div className="max-w-full">
                        {messageParts.map((part, index) => {
                          if (part.type === 'code') {
                            return (
                              <div key={index} className="my-3">
                                {/* Code Header */}
                                <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-600">
                                  <span className="text-xs text-gray-300 font-mono">
                                    {part.language}
                                  </span>
                                  <motion.button
                                    onClick={() => handleCopyCode(part.code, message.id)}
                                    className="p-1 text-gray-400 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    {copiedMessageId === message.id ? (
                                      <FaCheck className="text-green-400" />
                                    ) : (
                                      <FaCopy className="text-sm" />
                                    )}
                                  </motion.button>
                                </div>

                                {/* Code Content */}
                                <div className="relative">
                                  <SyntaxHighlighter
                                    language={part.language}
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      padding: '1rem',
                                      borderBottomLeftRadius: '0.5rem',
                                      borderBottomRightRadius: '0.5rem',
                                      background: '#1f2937',
                                      fontSize: '0.875rem'
                                    }}
                                    codeTagProps={{
                                      style: {
                                        fontFamily: 'Fira Code, Monaco, Consolas, monospace'
                                      }
                                    }}
                                  >
                                    {part.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <p key={index} className="text-sm whitespace-pre-wrap mb-2 last:mb-0">
                                {part.content}
                              </p>
                            );
                          }
                        })}
                      </div>

                      {/* Timestamp */}
                      <p className={`text-xs mt-2 ${
                        message.sender === "user"
                          ? "text-pink-200"
                          : "text-gray-400"
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex max-w-full">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 mr-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/160850571?v=4"
                    alt="AI Tutor"
                    className="w-8 h-8 rounded-full"
                  />
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