import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import axios from "axios";
import {
  FaPlay,
  FaCode,
  FaCopy,
  FaDownload,
  FaExpand,
  FaCompress,
  FaRedo,
  FaBars,
  FaTimes,
  FaPlus,
  FaEye,
  FaWindowClose,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
  FaRobot,
  FaCheck,
  FaServer,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import AxiosInstance from "../Config/Axios";
import { toast, Slide } from "react-toastify";

const DashCodeSection = ({ onToggleView, isMobileView }) => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [ProgramingLang, setProgramingLang] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [userInputs, setUserInputs] = useState("");
  const [showInputPanel, setShowInputPanel] = useState(false);
  const [inputRequired, setInputRequired] = useState(false);
  const [showCodeReviewModal, setShowCodeReviewModal] = useState(false);
  const [codeReviewResult, setCodeReviewResult] = useState("");
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [serverRunning, setServerRunning] = useState(false);
  const [serverPort, setServerPort] = useState(null);
  const [isWebContainerLoading, setIsWebContainerLoading] = useState(false);
  const [webContainerError, setWebContainerError] = useState("");
  const [isWebContainerReady, setIsWebContainerReady] = useState(false);
  const editorRef = useRef(null);
  const previewRef = useRef(null);

  const monacoLanguageMap = {
    "html-css-js": "html",
    reactjs: "javascript",
    "react-native": "javascript",
    "node-express": "javascript",
    mongodb: "json",
    mysql: "sql",
    python: "python",
    "ai-ml-basics": "python",
  };

  const languageDisplayMap = {
    "html-css-js": "🌐 HTML, CSS & JS",
    reactjs: "⚛️ React JS",
    "react-native": "📱 React Native",
    "node-express": "🚀 Node & Express",
    mongodb: "🍃 MongoDB",
    mysql: "🐬 MySQL",
    python: "🐍 Python",
    "ai-ml-basics": "🤖 AI / ML Basics",
  };

  const tabLanguageMap = {
    "html-css-js": ["html", "css", "javascript"],
    reactjs: ["javascript"],
    "react-native": "javascript",
    "node-express": ["javascript", "json"],
    mongodb: ["json"],
    mysql: ["sql"],
    python: ["python"],
    "ai-ml-basics": ["python"],
  };

  const fileExtensions = {
    html: "html",
    css: "css",
    javascript: "js",
    json: "json",
    sql: "sql",
    python: "py",
  };

  const tabDisplayNames = {
    html: "index.html",
    css: "style.css",
    javascript: "server.js",
    json: "package.json",
    sql: "query.sql",
    python: "main.py",
  };

  // Check if WebContainer is supported
  const isWebContainerSupported = () => {
    return (
      typeof window !== "undefined" &&
      window.crossOriginIsolated &&
      typeof SharedArrayBuffer !== "undefined"
    );
  };

  // Initialize WebContainer
  useEffect(() => {
    const initWebContainer = async () => {
      const language = localStorage.getItem("Language");
      if (language === "node-express") {
        setIsWebContainerLoading(true);
        try {
          const { WebContainer } = await import("@webcontainer/api");
          window.webcontainerInstance = await WebContainer.boot();
          console.log("WebContainer booted successfully");
          setIsWebContainerReady(true); // Mark as ready
        } catch (error) {
          console.error("Failed to boot WebContainer:", error);
          setWebContainerError(`Failed to initialize: ${error.message}`);
        } finally {
          setIsWebContainerLoading(false);
        }
      }
    };

    initWebContainer();

    // Cleanup function to terminate WebContainer when component unmounts
    return () => {
      if (window.webcontainerInstance) {
        window.webcontainerInstance.teardown();
        window.webcontainerInstance = null;
      }
    };
  }, []);

  // Initialize tabs based on selected language
  useEffect(() => {
    const language = localStorage.getItem("Language");

    if (language && monacoLanguageMap[language]) {
      setProgramingLang(languageDisplayMap[language]);

      // Create tabs based on language
      const languagesForTabs = tabLanguageMap[language];
      const newTabs = languagesForTabs.map((lang, index) => ({
        id: index,
        language: lang,
        name:
          tabDisplayNames[lang] || `${lang}.${fileExtensions[lang] || lang}`,
        code: getDefaultCode(lang, language),
        isDefault: true, // Mark default tabs that can't be closed
      }));

      setTabs(newTabs);
      setActiveTab(0);
    } else {
      // Default to Python
      setProgramingLang("🐍 Python");
      setTabs([
        {
          id: 0,
          language: "python",
          name: "main.py",
          code: "# Write your Python code here\n print('Welcome to CodeAstra!')",
          isDefault: true,
        },
      ]);
    }

    setIsInitialized(true);
  }, []);

  // Get default code for a language
  const getDefaultCode = (language, mainLanguage) => {
    if (mainLanguage === "node-express") {
      switch (language) {
        case "javascript":
          return `const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express server running in WebContainer!');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'API endpoint working!', timestamp: new Date().toISOString() });
});

app.post('/api/echo', (req, res) => {
  res.json({ received: req.body });
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});`;
        case "json":
          return `{
  "name": "express-server",
  "version": "1.0.0",
  "description": "Express server running in WebContainer",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}`;
        default:
          return `// Write your ${language} code here`;
      }
    }

    switch (language) {
      case "html":
        return `<!DOCTYPE html>
<html>
<head>
    <title>Trinetra CodeAstra</title>
</head>
<body>
    <h1>Welcome to CodeAstra!</h1>
    <h4>Code Mentored by <span>Harsh</span></h4>
    <p>Edit the code in the editor to see changes in the preview.</p>
</body>
</html>`;
      case "css":
        return `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #fff;
}

h1 {
    color: green;
    font-size: 32px;
    font-weight: bold;
}

h4 {
    color: white;
    font-size: 20px;
    font-weight: 300;
}

h4 span {
    font-weight: 600;
    color: blueviolet;
}

p {
    color: red;
}`;
      case "javascript":
        return `// console.log('CodeAstra! By Harsh!');`;
      case "python":
        return "# Write your Python code here\nprint('Welcome to CodeAstra!')";
      case "json":
        return `{
  "key": "value",
  "array": [1, 2, 3]
}`;
      case "sql":
        return "-- Write your SQL queries here\n SELECT * FROM users;";
      default:
        return `// Write your ${language} code here`;
    }
  };

  // Execute Express.js code using WebContainer
  const executeExpressCode = async () => {
  if (!window.webcontainerInstance || !isWebContainerReady) {
    setOutput("Error: WebContainer not initialized yet. Please wait...");
    return;
  }

    setIsLoading(true);
    setOutput("Starting Express server...");

    try {
      // Get the JavaScript and package.json files
      const jsTab = tabs.find((tab) => tab.language === "javascript");
      const jsonTab = tabs.find((tab) => tab.language === "json");

      if (!jsTab) {
        throw new Error(
          "No JavaScript file found. Please create a JavaScript file for your Express server."
        );
      }

      // Write files to WebContainer filesystem
      await window.webcontainerInstance.fs.writeFile("server.js", jsTab.code);

      if (jsonTab) {
        await window.webcontainerInstance.fs.writeFile(
          "package.json",
          jsonTab.code
        );
      } else {
        // Create a default package.json if none exists
        await window.webcontainerInstance.fs.writeFile(
          "package.json",
          `{
  "name": "express-server",
  "version": "1.0.0",
  "description": "Express server running in WebContainer",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}`
        );
      }

      // Install dependencies
      setOutput("Installing dependencies...");
      const installProcess = await window.webcontainerInstance.spawn("npm", [
        "install",
      ]);

      let installOutput = "";
      installProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            installOutput += data;
            setOutput((prev) => prev + data);
          },
        })
      );

      const installExitCode = await installProcess.exit;
      if (installExitCode !== 0) {
        throw new Error(
          `Failed to install dependencies. Exit code: ${installExitCode}`
        );
      }

      // Start the server
      setOutput("Starting server...");
      const serverProcess = await window.webcontainerInstance.spawn("npm", [
        "start",
      ]);

      serverProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            setOutput((prev) => prev + data);
            // Check for server start message to get the port
            if (data.includes("Server running at")) {
              const portMatch = data.match(/http:\/\/localhost:(\d+)/);
              if (portMatch) {
                setServerPort(portMatch[1]);
                setServerRunning(true);
              }
            }
          },
        })
      );

      // Wait a bit for server to start, then show success message
      setTimeout(() => {
        if (serverRunning) {
          setOutput(
            (prev) =>
              prev +
              "\nServer started successfully! You can now make requests to it."
          );
        }
      }, 2000);

      // Handle server process exit
      serverProcess.exit.then(() => {
        setServerRunning(false);
        setServerPort(null);
      });
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Stop the Express server
  const stopExpressServer = async () => {
    if (window.webcontainerInstance) {
      // This will terminate all processes in the WebContainer
      await window.webcontainerInstance.teardown();

      // Reboot WebContainer for future use
      try {
        const { WebContainer } = await import("@webcontainer/api");
        window.webcontainerInstance = await WebContainer.boot();
      } catch (error) {
        setOutput(`Error restarting WebContainer: ${error.message}`);
      }

      setServerRunning(false);
      setServerPort(null);
      setOutput("Server stopped.");
    }
  };

  // Execute Python code using Piston API
  const executePythonCode = async (code, input) => {
    try {
      const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: "python3",
        version: "3.10.0",
        files: [{ content: code }],
        stdin: input,
      });

      if (res.status === 200) {
        return res.data.run.output;
      }
    } catch (error) {
      return `Error: ${error.response?.data?.message || error.message}`;
    }
  };

  // Check if code contains input() calls
  const checkForInputCalls = (code) => {
    if (!code) return false;

    // Check for input() function calls, ignoring commented lines
    const lines = code.split("\n");
    for (const line of lines) {
      const trimmedLine = line.trim();

      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith("#")) continue;

      // Check if line contains input() call (not in a comment)
      if (trimmedLine.includes("input(") && !trimmedLine.includes("#")) {
        return true;
      }
    }

    return false;
  };

  // Update input required state when code changes
  useEffect(() => {
    const activeTabData = getActiveTab();
    if (activeTabData) {
      const hasInputCalls = checkForInputCalls(activeTabData.code);
      setInputRequired(hasInputCalls);

      // Auto-show input panel if input() calls are detected
      if (hasInputCalls && !showInputPanel) {
        setShowInputPanel(true);
      }
    }
  }, [tabs, activeTab]);

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

  // Handle code copy
  const handleCopyCode = async (code, codeId) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(codeId);
      setTimeout(() => setCopiedCodeId(null), 1200);
    } catch (err) {
      toast.error("Failed to copy code", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  // AI Code Review function
  const CodeReview = async () => {
    const activeTabData = getActiveTab();
    if (!activeTabData) return;

    setIsReviewLoading(true);
    setShowCodeReviewModal(true);
    setCodeReviewResult("Analyzing your code...");

    try {
      // Get the language from localStorage
      const language = localStorage.getItem("Language");

      // Make API call to backend for code review
      const response = await AxiosInstance.post("/ai/reviewCode", {
        codeSnippet: activeTabData.code,
        language: language || "python", // Default to python if not set
      });

      if (response.status === 200) {
        setCodeReviewResult(response.data.response || "No review provided.");
      } else {
        setCodeReviewResult("Error: Unable to get code review.");
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      setCodeReviewResult(
        `Error: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsReviewLoading(false);
    }
  };

  // Handle editor initialization
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure Monaco editor theme
    monaco.editor.defineTheme("codeastra-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955", fontStyle: "italic" },
        { token: "keyword", foreground: "C586C0" },
        { token: "number", foreground: "B5CEA8" },
        { token: "string", foreground: "CE9178" },
        { token: "type", foreground: "4EC9B0" },
        { token: "function", foreground: "DCDCAA" },
      ],
      colors: {
        "editor.background": "#1F2937",
        "editor.foreground": "#D1D5DB",
        "editor.lineHighlightBackground": "#374151",
        "editorLineNumber.foreground": "#6B7280",
        "editor.selectionBackground": "#4B556380",
        "editor.inactiveSelectionBackground": "#4B556340",
        "editor.wordWrapBackground": "#1F2937",
      },
    });

    monaco.editor.setTheme("codeastra-dark");

    // Adjust editor layout for mobile
    if (isMobileView) {
      setTimeout(() => {
        editor.layout();
      }, 100);
    }
  };

  // Add a new tab
  const addNewTab = () => {
    const language = localStorage.getItem("Language");
    const defaultLanguage =
      language && tabLanguageMap[language]
        ? tabLanguageMap[language][0]
        : "python";

    const extension = fileExtensions[defaultLanguage] || defaultLanguage;
    const newTab = {
      id: tabs.length > 0 ? Math.max(...tabs.map((tab) => tab.id)) + 1 : 0,
      language: defaultLanguage,
      name: `new-${tabs.length + 1}.${extension}`,
      code: getDefaultCode(defaultLanguage, language),
      isDefault: false, // User-created tabs can be closed
    };

    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  // Close a tab
  const closeTab = (tabId, e) => {
    e.stopPropagation();

    const tabToClose = tabs.find((tab) => tab.id === tabId);

    // Don't allow closing default tabs (the initial ones)
    if (tabToClose && tabToClose.isDefault) {
      return;
    }

    const newTabs = tabs.filter((tab) => tab.id !== tabId);

    // Don't allow closing if it's the last tab
    if (newTabs.length === 0) {
      return;
    }

    setTabs(newTabs);

    // If the active tab was closed, activate the previous tab or the first one
    if (activeTab === tabId) {
      const closedTabIndex = tabs.findIndex((tab) => tab.id === tabId);
      const newActiveIndex = Math.max(0, closedTabIndex - 1);
      setActiveTab(newTabs[newActiveIndex].id);
    }
  };

  // Update code in a tab
  const updateTabCode = (value) => {
    const newTabs = tabs.map((tab) =>
      tab.id === activeTab ? { ...tab, code: value || "" } : tab
    );
    setTabs(newTabs);
  };

  // Execute code
  const handleRunCode = async () => {
    if (!tabs[activeTab]) return;

    const language = localStorage.getItem("Language");

    // Check if input is required but not provided
    if (inputRequired && !userInputs.trim() && language !== "node-express") {
      setOutput(
        "Error: This code requires input but no input was provided.\nPlease provide input in the input panel above."
      );
      return;
    }

    setIsLoading(true);
    setOutput("Running code...");

    // For HTML/CSS/JS, update the preview if it's open
    if (language === "html-css-js" && showPreview) {
      updatePreview();
    }

    // Execute Express.js code using WebContainer
    if (language === "node-express") {
      await executeExpressCode();
      return;
    }

    // Execute Python code using Piston API
    if (language === "python" || language === "ai-ml-basics") {
      try {
        const result = await executePythonCode(
          tabs[activeTab].code,
          userInputs
        );
        setOutput(result || "Code executed successfully (no output)");
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // For other languages, simulate execution with a delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const simulatedOutput = `> Running ${tabs[activeTab].name}
      Not Actually Executed. Execution feature coming soon!
      `;
      setOutput(simulatedOutput);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Update the preview iframe
  const updatePreview = () => {
    if (!previewRef.current) return;

    const htmlTab = tabs.find((tab) => tab.language === "html");
    const cssTab = tabs.find((tab) => tab.language === "css");
    const jsTab = tabs.find((tab) => tab.language === "javascript");

    let htmlContent = htmlTab?.code || "";
    const cssContent = cssTab?.code || "";
    const jsContent = jsTab?.code || "";

    // Inject CSS and JS into the HTML
    if (cssContent) {
      const styleTag = `<style>${cssContent}</style>`;
      if (htmlContent.includes("</head>")) {
        htmlContent = htmlContent.replace("</head>", `${styleTag}</head>`);
      } else {
        htmlContent = htmlContent.replace("<head>", `<head>${styleTag}`);
      }
    }

    if (jsContent) {
      const scriptTag = `<script>${jsContent}</script>`;
      if (htmlContent.includes("</body>")) {
        htmlContent = htmlContent.replace("</body>", `${scriptTag}</body>`);
      } else {
        htmlContent += scriptTag;
      }
    }

    const iframe = previewRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
  };

  // Toggle preview visibility
  const togglePreview = () => {
    const newShowPreview = !showPreview;
    setShowPreview(newShowPreview);

    if (newShowPreview) {
      // Small delay to ensure the iframe is rendered
      setTimeout(() => {
        updatePreview();
      }, 100);
    }
  };

  // Toggle preview fullscreen
  const togglePreviewFullscreen = () => {
    setIsPreviewFullscreen(!isPreviewFullscreen);
  };

  // Copy code to clipboard
  const handleCopyEditorCode = async () => {
    try {
      await navigator.clipboard.writeText(tabs[activeTab]?.code || "");
      setShowToolbar(false);
    } catch (err) {
      toast.error("Failed to copy code", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  // Download code as file
  const handleDownloadCode = () => {
    if (!tabs[activeTab]) return;

    const element = document.createElement("a");
    const file = new Blob([tabs[activeTab].code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = tabs[activeTab].name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setShowToolbar(false);
  };

  // Reset code to default
  const handleResetCode = () => {
    if (!tabs[activeTab]) return;

    const language = localStorage.getItem("Language");
    const newTabs = tabs.map((tab) =>
      tab.id === activeTab
        ? { ...tab, code: getDefaultCode(tab.language, language) }
        : tab
    );
    setTabs(newTabs);
    setOutput("");
    setShowToolbar(false);
  };

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
    setShowToolbar(false);
  };

  // Toggle input panel visibility
  const toggleInputPanel = () => {
    setShowInputPanel(!showInputPanel);
  };

  // Close toolbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showToolbar && !event.target.closest(".toolbar-container")) {
        setShowToolbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showToolbar]);

  // Update preview when code changes for HTML/CSS/JS
  useEffect(() => {
    const language = localStorage.getItem("Language");
    if (language === "html-css-js" && showPreview) {
      updatePreview();
    }
  }, [tabs, activeTab]);

  // Responsive editor options
  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
    fontSize: isMobileView ? 12 : 14,
    lineHeight: isMobileView ? 18 : 21,
    fontFamily: "Fira Code, Menlo, Monaco, Consolas, monospace",
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    glyphMargin: false,
    lineNumbers: isMobileView ? "off" : "on",
    lineNumbersMinChars: isMobileView ? 2 : 3,
    wordWrap: "on",
    wrappingIndent: "indent",
    touchSupported: true,
    scrollbar: {
      vertical: "auto",
      horizontal: "auto",
      useShadows: false,
    },
    folding: false,
    overviewRulerBorder: false,
    renderLineHighlight: isMobileView ? "none" : "all",
  };

  // Get current active tab
  const getActiveTab = () => {
    return tabs.find((tab) => tab.id === activeTab);
  };

  // Don't render editor until tabs are initialized
  if (!isInitialized || tabs.length === 0) {
    return (
      <div className="h-full w-full flex flex-col bg-gray-900 justify-center items-center">
        <div className="text-gray-400">Loading editor...</div>
      </div>
    );
  }

  const activeTabData = getActiveTab();
  const language = localStorage.getItem("Language");
  const isWebLanguage = language === "html-css-js";
  const isPythonLanguage = language === "python" || language === "ai-ml-basics";
  const isExpressLanguage = language === "node-express";

  // Extract code blocks from review result
  const reviewParts = extractCodeBlocks(codeReviewResult);

  return (
    <div
      className={`h-full w-full flex flex-col bg-gray-900 ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* Header Toolbar - Mobile Optimized */}
      <div className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 py-2 px-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isMobileView && (
            <motion.button
              onClick={onToggleView}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors mr-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Toggle View"
            >
              <FaBars className="text-sm" />
            </motion.button>
          )}
          <FaCode className="text-red-500 text-sm" />
          <span className="text-white font-medium text-sm">
            {ProgramingLang}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          {/* AI Code Review Button */}
          <motion.button
            onClick={CodeReview}
            className={`px-2 py-1 rounded-lg flex items-center space-x-1 transition-all duration-300 text-sm ${
              isReviewLoading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            }`}
            whileHover={isReviewLoading ? {} : { scale: 1.05 }}
            whileTap={isReviewLoading ? {} : { scale: 0.95 }}
            disabled={isReviewLoading}
          >
            <FaRobot className="text-xs" />
            <span className="hidden sm:inline">
              {isReviewLoading ? "Reviewing..." : "AI Review"}
            </span>
          </motion.button>

          {/* Preview button for HTML/CSS/JS */}
          {isWebLanguage && (
            <motion.button
              onClick={togglePreview}
              className={`p-1 rounded-lg transition-colors ${
                showPreview
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={showPreview ? "Hide Preview" : "Show Preview"}
            >
              <FaEye className="text-sm" />
            </motion.button>
          )}

          {/* Input panel toggle for Python */}
          {isPythonLanguage && (
            <motion.button
              onClick={toggleInputPanel}
              className={`p-1 rounded-lg transition-colors ${
                showInputPanel
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={showInputPanel ? "Hide Input Panel" : "Show Input Panel"}
            >
              {showInputPanel ? (
                <FaChevronUp className="text-sm" />
              ) : (
                <FaChevronDown className="text-sm" />
              )}
            </motion.button>
          )}

          {/* Server status for Express.js */}
          {isExpressLanguage && serverRunning && (
            <div className="flex items-center space-x-1 bg-green-600/20 px-2 py-1 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs">Server Running</span>
            </div>
          )}

          {/* WebContainer loading indicator */}
          {isExpressLanguage && isWebContainerLoading && (
            <div className="flex items-center space-x-1 bg-blue-600/20 px-2 py-1 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-400 text-xs">Initializing</span>
            </div>
          )}

          {/* Mobile toolbar toggle */}
          {isMobileView && (
            <div className="toolbar-container relative">
              <motion.button
                onClick={() => setShowToolbar(!showToolbar)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="More Options"
              >
                <FaBars className="text-sm" />
              </motion.button>

              {/* Mobile toolbar dropdown */}
              {showToolbar && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-1 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-700 p-2 z-50"
                >
                  <div className="grid grid-cols-2 gap-1">
                    <motion.button
                      onClick={handleCopyEditorCode}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors flex flex-col items-center text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Copy Code"
                    >
                      <FaCopy className="text-xs mb-1" />
                      <span>Copy</span>
                    </motion.button>

                    <motion.button
                      onClick={handleDownloadCode}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors flex flex-col items-center text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Download Code"
                    >
                      <FaDownload className="text-xs mb-1" />
                      <span>Download</span>
                    </motion.button>

                    <motion.button
                      onClick={handleResetCode}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors flex flex-col items-center text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Reset Code"
                    >
                      <FaRedo className="text-xs mb-1" />
                      <span>Reset</span>
                    </motion.button>

                    <motion.button
                      onClick={handleFullscreenToggle}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors flex flex-col items-center text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={
                        isFullscreen ? "Exit Focus Mode" : "Enter Focus Mode"
                      }
                    >
                      {isFullscreen ? (
                        <FaCompress className="text-xs mb-1" />
                      ) : (
                        <FaExpand className="text-xs mb-1" />
                      )}
                      <span>{isFullscreen ? "Exit" : "Focus"}</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Desktop toolbar buttons */}
          {!isMobileView && (
            <>
              <motion.button
                onClick={handleCopyEditorCode}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Copy Code"
              >
                <FaCopy className="text-sm" />
              </motion.button>

              <motion.button
                onClick={handleDownloadCode}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Download Code"
              >
                <FaDownload className="text-sm" />
              </motion.button>

              <motion.button
                onClick={handleResetCode}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Reset Code"
              >
                <FaRedo className="text-sm" />
              </motion.button>

              <motion.button
                onClick={handleFullscreenToggle}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={isFullscreen ? "Exit Focus Mode" : "Enter Focus Mode"}
              >
                {isFullscreen ? (
                  <FaCompress className="text-sm" />
                ) : (
                  <FaExpand className="text-sm" />
                )}
              </motion.button>
            </>
          )}

          {/* Stop Server Button for Express.js */}
          {isExpressLanguage && serverRunning && (
            <motion.button
              onClick={stopExpressServer}
              className={`px-3 py-1 rounded-lg flex items-center space-x-1 transition-all duration-300 text-sm bg-red-600 text-white hover:bg-red-700`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaServer className="text-xs" />
              <span className="hidden sm:inline">Stop Server</span>
            </motion.button>
          )}

          {/* Run Button */}
          {language !== "html-css-js" && (
            <motion.button
  onClick={handleRunCode}
  disabled={isLoading || (isExpressLanguage && !isWebContainerReady)}
  className={`px-3 py-1 rounded-lg flex items-center space-x-1 transition-all duration-300 text-sm ${
    isLoading || (isExpressLanguage && !isWebContainerReady)
      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
      : "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700"
  }`}
>
  <FaPlay className="text-xs" />
  <span className="hidden sm:inline">
    {isLoading ? "Running..." : (isExpressLanguage && !isWebContainerReady ? "Initializing..." : "Run")}
  </span>
</motion.button>
          )}
        </div>
      </div>

      {/* WebContainer Error Message */}
      {webContainerError && (
        <div className="bg-yellow-900/20 border-b border-yellow-700 p-3">
          <div className="flex items-center space-x-2">
            <FaExclamationTriangle className="text-yellow-400" />
            <span className="text-sm text-yellow-300">{webContainerError}</span>
          </div>
          <div className="mt-2 text-xs text-yellow-400">
            Note: WebContainer requires a secure context with cross-origin
            isolation. This typically means serving your application over HTTPS
            with appropriate headers.
          </div>
        </div>
      )}

      {/* Input Panel for Python */}
      {isPythonLanguage && showInputPanel && (
        <div className="bg-gray-800 border-b border-gray-700 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300 font-medium">
                Program Input (for input() calls)
              </span>
              {inputRequired && !userInputs.trim() && (
                <div className="flex items-center space-x-1 text-yellow-400 text-xs">
                  <FaExclamationTriangle className="text-xs" />
                  <span>Input required</span>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">
              Enter each input on a new line
            </span>
          </div>
          <textarea
            value={userInputs}
            onChange={(e) => setUserInputs(e.target.value)}
            placeholder="Enter inputs here (each on a new line)"
            className="w-full bg-gray-700 text-white p-2 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
      )}

      {/* Server Info Panel for Express.js */}
      {isExpressLanguage && serverRunning && serverPort && (
        <div className="bg-blue-900/20 border-b border-blue-700 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaServer className="text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">
                Express Server Running
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-blue-400">Port: {serverPort}</span>
              <a
                href={`http://localhost:${serverPort}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-white flex items-center space-x-1"
              >
                <span>Open Server</span>
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-400">
            Endpoints:{" "}
            <code className="bg-blue-900/50 px-1 rounded">GET /</code>{" "}
            <code className="bg-blue-900/50 px-1 rounded">GET /api/data</code>{" "}
            <code className="bg-blue-900/50 px-1 rounded">POST /api/echo</code>
          </div>
        </div>
      )}

      {/* Tab Bar */}
      <div className="bg-gray-800 border-b border-gray-700 flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center px-3 py-2 border-r border-gray-700 cursor-pointer transition-colors ${
              activeTab === tab.id
                ? "bg-gray-900 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-750"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-sm truncate max-w-xs">{tab.name}</span>
            {/* Only show close button for non-default tabs */}
            {!tab.isDefault && (
              <button
                className="ml-2 text-gray-500 hover:text-white"
                onClick={(e) => closeTab(tab.id, e)}
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        ))}
        <button
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-750 transition-colors"
          onClick={addNewTab}
          title="New Tab"
        >
          <FaPlus className="text-sm" />
        </button>
      </div>

      {/* Main Content Area - Editor and Preview */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Code Editor Section */}
        <div
          className={`${
            showPreview && isWebLanguage ? "md:w-1/2" : "w-full"
          } h-full overflow-hidden`}
        >
          {activeTabData && (
            <Editor
              height="100%"
              language={activeTabData.language}
              value={activeTabData.code}
              onChange={updateTabCode}
              onMount={handleEditorDidMount}
              options={editorOptions}
              theme="codeastra-dark"
            />
          )}
        </div>

        {/* Preview Section for HTML/CSS/JS */}
        {showPreview && isWebLanguage && (
          <div
            className={`${
              isPreviewFullscreen ? "fixed inset-0 z-50" : "md:w-1/2"
            } h-full border-t md:border-t-0 md:border-l border-gray-700 bg-white`}
          >
            <div className="flex justify-between items-center bg-gray-800 text-white p-2">
              <span className="text-sm">Preview</span>
              <div className="flex space-x-2">
                <motion.button
                  onClick={togglePreviewFullscreen}
                  className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-700/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={
                    isPreviewFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                  }
                >
                  {isPreviewFullscreen ? (
                    <FaCompress className="text-sm" />
                  ) : (
                    <FaExpand className="text-sm" />
                  )}
                </motion.button>
                <motion.button
                  onClick={togglePreview}
                  className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-700/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Close Preview"
                >
                  <FaWindowClose className="text-sm" />
                </motion.button>
              </div>
            </div>
            <iframe
              ref={previewRef}
              title="code-preview"
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        )}
      </div>

      {output && (
        <div className="bg-gray-900 border-t border-gray-700">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-300">Output</span>
            </div>
            <div className="flex items-center space-x-2">
              {isLoading && (
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <div className="flex space-x-0.5">
                    <div
                      className="w-1 h-3 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1 h-3 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "100ms" }}
                    ></div>
                    <div
                      className="w-1 h-3 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "200ms" }}
                    ></div>
                  </div>
                  <span>Running...</span>
                </div>
              )}
              <button
                onClick={() => setOutput("")}
                className="p-1 text-gray-400 hover:text-white rounded-md hover:bg-gray-700"
                title="Clear output"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>
          </div>
          <div className="p-4 font-mono text-sm">
            <div className="whitespace-pre-wrap overflow-auto max-h-60">
              {output.split("\n").map((line, index) => {
                // Check if line is an error message
                const isError =
                  line.toLowerCase().includes("error") ||
                  line.includes("Traceback");
                // Check if line is a warning
                const isWarning = line.toLowerCase().includes("warning");
                // Check if line contains file info
                const isFileInfo = line.includes("File ");

                let lineClass = "text-gray-300";
                if (isError) lineClass = "text-red-400";
                if (isWarning) lineClass = "text-yellow-400";
                if (isFileInfo) lineClass = "text-blue-400";

                return (
                  <div key={index} className={`flex ${lineClass}`}>
                    <span className="select-none text-gray-500 w-8 pr-2 text-right">
                      {">>>"}
                    </span>
                    <span className="flex-1">{line}</span>
                  </div>
                );
              })}
            </div>

            {output && !isLoading && (
              <div className="flex items-center justify-between pt-3 mt-3 text-xs border-t border-gray-800">
                <div className="text-gray-500">
                  Process completed{" "}
                  {output.toLowerCase().includes("error")
                    ? "with errors"
                    : "successfully"}
                </div>
                <div className="text-gray-500">
                  {output.split("\n").length} line(s) • {output.length}{" "}
                  character(s)
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Code Review Modal */}
      {showCodeReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FaRobot className="text-blue-400 mr-2" />
                AI Code Review
              </h3>
              <button
                onClick={() => setShowCodeReviewModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 bg-gray-850 text-area">
              {isReviewLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="flex flex-col items-center">
                    <div className="flex space-x-2 mb-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    <p className="text-gray-400">Analyzing your code...</p>
                  </div>
                </div>
              ) : (
                <div className="max-w-none">
                  <AnimatePresence>
                    {reviewParts.map((part, index) => {
                      if (part.type === "code") {
                        const codeId = `code-${index}-${Date.now()}`;
                        return (
                          <motion.div
                            key={codeId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="my-4"
                          >
                            <div className="relative max-w-full">
                              {/* Code Header */}
                              <div className="flex items-center justify-between bg-gray-950 px-3 py-2 rounded-t-lg border-b border-gray-600">
                                <span className="text-xs text-gray-300 font-mono">
                                  {part.language}
                                </span>
                                <motion.button
                                  onClick={() =>
                                    handleCopyCode(part.code, codeId)
                                  }
                                  className="p-1 text-gray-400 hover:text-white transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  {copiedCodeId === codeId ? (
                                    <FaCheck className="text-green-400 text-sm" />
                                  ) : (
                                    <FaCopy className="text-sm" />
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
                                    padding: "1rem",
                                    borderBottomLeftRadius: "0.5rem",
                                    borderBottomRightRadius: "0.5rem",
                                    background: "#030712",
                                    fontSize: "0.875rem",
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
                          </motion.div>
                        );
                      } else {
                        return (
                          <motion.div
                            key={`text-${index}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-gray-200 whitespace-pre-wrap mb-4"
                          >
                            {formatTextContent(part.content)}
                          </motion.div>
                        );
                      }
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-700 bg-gray-800 flex justify-end">
              <button
                onClick={() => setShowCodeReviewModal(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashCodeSection;
