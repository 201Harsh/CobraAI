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
  FaCheck,
  FaArrowDown,
} from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import AxiosInstance from "../Config/Axios";
import { toast, Bounce } from "react-toastify";

const DashChatSection = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: ``,
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
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Function to format text content with proper link handling
  const formatTextContent = (text) => {
    if (!text) return null;

    return text.split("\n").map((line, lineIndex) => {
      if (line.trim() === "") return null;

      const headingMatch = line.match(/^###\s+(.*)/);
      if (headingMatch) {
        return (
          <h3
            key={lineIndex}
            className="text-lg md:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-2"
          >
            {headingMatch[1]}
          </h3>
        );
      }

      const regex =
        /(<a\s+[^>]*href="[^"]*"[^>]*>.*?<\/a>|```.*?```|`.*?`|\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*|".*?")/gu;

      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(line)) !== null) {
        const partBefore = line.slice(lastIndex, match.index);
        if (partBefore) {
          parts.push(
            <span key={`${lineIndex}-${lastIndex}`}>{partBefore}</span>
          );
        }

        const part = match[0];

        const key = `${lineIndex}-${match.index}`;

        if (part.startsWith("<a ") && part.includes("</a>")) {
          const anchorMatch = part.match(
            /<a\s+[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/i
          );
          if (anchorMatch) {
            const [, href, text] = anchorMatch;
            const usernameOnly = text.replace(/^@/, "");
            parts.push(
              <span
                key={key}
                className="text-blue-400 hover:text-blue-300 underline cursor-pointer font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(href, "_blank", "noopener,noreferrer");
                }}
              >
                @{usernameOnly}
              </span>
            );
          }
        } else if (part.startsWith("***") && part.endsWith("***")) {
          parts.push(
            <span
              key={key}
              className="font-extrabold text-lg capitalize italic text-sky-600"
            >
              {part.slice(3, -3)}
            </span>
          );
        } else if (part.startsWith("```") && part.endsWith("```")) {
          parts.push(
            <code
              key={key}
              className="bg-gray-950 text-yellow-500 px-1 rounded text-xs sm:text-sm"
            >
              {part.slice(3, -3)}
            </code>
          );
        } else if (part.startsWith("`") && part.endsWith("`")) {
          parts.push(
            <code
              key={key}
              className="bg-gray-950 text-yellow-600 px-1 rounded text-xs sm:text-sm"
            >
              {part.slice(1, -1)}
            </code>
          );
        } else if (part.startsWith("**") && part.endsWith("**")) {
          parts.push(
            <span
              key={key}
              className="font-bold text-pink-600 text-sm sm:text-base"
            >
              {part.slice(2, -2)}
            </span>
          );
        } else if (part.startsWith("*") && part.endsWith("*")) {
          parts.push(
            <span key={key} className="italic text-red-400">
              {part.slice(1, -1)}
            </span>
          );
        } else if (part.startsWith('"') && part.endsWith('"')) {
          parts.push(
            <span key={key} className="text-orange-500 font-semibold italic">
              {part}
            </span>
          );
        } else {
          // Fallback just in case
          parts.push(<span key={key}>{part}</span>);
        }

        lastIndex = regex.lastIndex;
      }

      // Add remaining part of the line
      const remaining = line.slice(lastIndex);
      if (remaining) {
        parts.push(<span key={`${lineIndex}-last`}>{remaining}</span>);
      }

      return (
        <p key={lineIndex} className="mb-2 text-xs sm:text-sm leading-relaxed">
          {parts}
        </p>
      );
    });
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);

    // Auto-resize
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    const lang = localStorage.getItem("Language");

    if (lang) {
      setMessages([
        {
          id: 1,
          text: `Hello! I'm CobraAI, your AI programming tutor. Lets Start Lerning ${lang} Today.`,
          sender: "bot",
          timestamp: new Date(Date.now() - 1000 * 60 * 2),
          type: "text",
        },
      ]);
    }

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
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }

      // Add code block
      const language = match[1] || "javascript";
      const code = match[2].trim();
      parts.push({
        type: "code",
        language,
        code,
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex),
      });
    }

    return parts;
  };

  // Handle Load Chat History
  const LoadChatHistory = async () => {
    try {
      const res = await AxiosInstance.get("/chat/getchat");

      if (res.status === 200 && res.data.chat) {
        const formattedMessages = res.data.chat.ChatHistory.flatMap(
          (item, index) => [
            {
              id: Date.now() + index * 2,
              text: item.user,
              sender: "user",
              timestamp: new Date(), // You can customize timestamp if saved in DB
              type: "text",
            },
            {
              id: Date.now() + index * 2 + 1,
              text: item.ai,
              sender: "bot",
              timestamp: new Date(),
              type: item.ai.includes("```") ? "code" : "text",
            },
          ]
        );

        setMessages(formattedMessages);
      }
    } catch (error) {}
  };

  useEffect(() => {
    LoadChatHistory();
  }, []);

  // Handle User Chat History Save
  const SaveChatHistory = async (UserChat, AIResponse) => {
    try {
      const res = await AxiosInstance.post("/chat/savechat", {
        UserChat,
        AIResponse,
      });
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
    }
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

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

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

        // Calling Save Chat History Function
        SaveChatHistory(inputMessage, botResponse);
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
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
    <div className="h-full w-full flex flex-col bg-gray-950 overflow-hidden">
      <div
        onClick={scrollToBottom}
        className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-600/30 backdrop-blur-xl border-1
       border-gray-600 absolute bottom-28 right-5 sm:bottom-32 z-50 cursor-pointer"
      >
        <FaArrowDown className="text-pink-300 text-xs" />
      </div>

      {/* Chat Messages Section */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 bg-gray-850 chat-Section"
      >
        <div className="max-w-full mx-auto space-y-4 sm:space-y-6">
          <AnimatePresence>
            {messages.map((message) => {
              const messageParts = extractCodeBlocks(message.text);

              return (
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
                    className={`flex max-w-[95%] sm:max-w-full ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-red-500 to-pink-600 ml-2 sm:ml-3"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 mr-2 sm:mr-3"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                          {username.charAt(0)}
                        </div>
                      ) : (
                        <img
                          src="/img/ai_model_img.png"
                          alt="AI Tutor"
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                        />
                      )}
                    </div>

                    {/* Message Content */}
                    <div
                      className={`rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-red-800 to-pink-700 text-white"
                          : "bg-gray-800/80 backdrop-blur-sm text-white"
                      }`}
                    >
                      <div className="overflow-hidden">
                        {messageParts.map((part, index) => {
                          if (part.type === "code") {
                            return (
                              <div key={index} className="my-2 sm:my-3">
                                <div className="relative max-w-full">
                                  {/* Code Header */}
                                  <div className="flex items-center justify-between bg-gray-950 px-3 py-1 sm:px-4 sm:py-2 rounded-t-lg border-b border-gray-600">
                                    <span className="text-xs text-gray-300 font-mono">
                                      {part.language}
                                    </span>
                                    <motion.button
                                      onClick={() =>
                                        handleCopyCode(part.code, message.id)
                                      }
                                      className="p-1 text-gray-400 hover:text-white transition-colors"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      {copiedMessageId === message.id ? (
                                        <FaCheck className="text-green-400 text-xs sm:text-sm" />
                                      ) : (
                                        <FaCopy className="text-xs sm:text-sm" />
                                      )}
                                    </motion.button>
                                  </div>

                                  {/* Code Content */}
                                  <div className="relative overflow-x-auto">
                                    <SyntaxHighlighter
                                      language={part.language}
                                      style={vscDarkPlus}
                                      customStyle={{
                                        margin: 0,
                                        padding: "0.75rem",
                                        borderBottomLeftRadius: "0.5rem",
                                        borderBottomRightRadius: "0.5rem",
                                        background: "#030712",
                                        fontSize: "0.75rem",
                                        maxWidth: "100%",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        overflowX: "auto",
                                      }}
                                      codeTagProps={{
                                        style: {
                                          fontFamily:
                                            "Fira Code, Monaco, Consolas, monospace",
                                        },
                                      }}
                                      wrapLongLines={true}
                                      showLineNumbers={false}
                                    >
                                      {part.code}
                                    </SyntaxHighlighter>
                                  </div>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={index}
                                className="text-xs sm:text-sm whitespace-pre-wrap mb-1 sm:mb-2 last:mb-0"
                              >
                                {formatTextContent(part.content)}
                              </div>
                            );
                          }
                        })}
                      </div>

                      {/* Timestamp */}
                      <p
                        className={`text-xs mt-1 sm:mt-2 ${
                          message.sender === "user"
                            ? "text-pink-50"
                            : "text-gray-400"
                        }`}
                      >
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
              <div className="flex max-w-[95%] sm:max-w-full">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 mr-2 sm:mr-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/160850571?v=4"
                    alt="AI Tutor"
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  />
                </div>
                <div className="bg-gray-700/80 backdrop-blur-sm text-white rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3">
                  <div className="flex space-x-1">
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
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
      <div className="px-3 sm:px-5 py-3 sm:py-4 pb-3 sm:pb-4 bg-gray-900/50">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2 sm:space-x-3"
        >
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              ref={textareaRef}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                isWaitingForResponse
                  ? "Waiting for response..."
                  : "Message CobraAI to Start Learning..."
              }
              className="w-full resize-none overflow-y-auto flex text-area flex-col gap-2 px-3 py-2 sm:px-4 sm:py-3 
             bg-gray-700/50 border border-gray-600 rounded-lg placeholder-gray-400 
             text-white focus:outline-none focus:ring-2 focus:ring-red-500 
             focus:border-transparent transition duration-200 backdrop-blur-sm text-xs sm:text-sm"
              disabled={isWaitingForResponse}
              rows={1}
            />
            {isWaitingForResponse && (
              <div className="absolute inset-0 bg-gray-800/70 rounded-lg flex items-center justify-center">
                <div className="flex space-x-1">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
          </div>
          <motion.button
            type="submit"
            className="p-2 sm:p-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-white hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={isWaitingForResponse ? {} : { scale: 1.05 }}
            whileTap={isWaitingForResponse ? {} : { scale: 0.95 }}
            disabled={inputMessage.trim() === "" || isWaitingForResponse}
          >
            <FaPaperPlane className="text-xs sm:text-sm" />
          </motion.button>
        </form>

        {/* Status indicator */}
        {isWaitingForResponse && (
          <div className="mt-1 sm:mt-2 text-xs text-gray-400 text-center">
            Please wait for the response before sending another message
          </div>
        )}
      </div>
    </div>
  );
};

export default DashChatSection;
