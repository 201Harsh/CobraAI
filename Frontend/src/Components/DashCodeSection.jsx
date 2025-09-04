import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  FaPlay,
  FaCode,
  FaCopy,
  FaDownload,
  FaExpand,
  FaCompress,
  FaRedo,
  FaBars
} from "react-icons/fa";

const DashCodeSection = ({ onToggleView, isMobileView }) => {
  const [code, setCode] = useState(`// Welcome to CodeAstra AI Tutor
// Start coding and see the magic happen!

function calculateSum(a, b) {
  return a + b;
}

// Example: Calculate the sum of two numbers
const result = calculateSum(5, 7);
console.log("The sum is:", result);

// Try modifying this code and click Run to see the output
`);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const editorRef = useRef(null);

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
    wordWrap: "on", // Enable line wrapping
    wrappingIndent: "indent",
    scrollbar: {
      vertical: "auto",
      horizontal: "auto",
      useShadows: false
    },
    folding: false,
    overviewRulerBorder: false,
    renderLineHighlight: isMobileView ? "none" : "all",
  };

  // Handle editor initialization
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure Monaco editor theme
    monaco.editor.defineTheme('codeastra-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'C586C0' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
      ],
      colors: {
        'editor.background': '#1F2937',
        'editor.foreground': '#D1D5DB',
        'editor.lineHighlightBackground': '#374151',
        'editorLineNumber.foreground': '#6B7280',
        'editor.selectionBackground': '#4B556380',
        'editor.inactiveSelectionBackground': '#4B556340',
        'editor.wordWrapBackground': '#1F2937',
      }
    });
    
    monaco.editor.setTheme('codeastra-dark');
    
    // Adjust editor layout for mobile
    if (isMobileView) {
      setTimeout(() => {
        editor.layout();
      }, 100);
    }
  };

  // Execute code
  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("Running code...");
    
    // Simulate code execution with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const simulatedOutput = `> node script.js
The sum is: 12

Execution completed in 0.45 seconds.`;
      setOutput(simulatedOutput);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy code to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowToolbar(false);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  // Download code as file
  const handleDownloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "codeastra-script.js";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setShowToolbar(false);
  };

  // Reset code to default
  const handleResetCode = () => {
    setCode(`// Welcome to CodeAstra AI Tutor
// Start coding and see the magic happen!

function calculateSum(a, b) {
  return a + b;
}

// Example: Calculate the sum of two numbers
const result = calculateSum(5, 7);
console.log("The sum is:", result);

// Try modifying this code and click Run to see the output
`);
    setOutput("");
    setShowToolbar(false);
  };

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
    setShowToolbar(false);
  };

  // Close toolbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showToolbar && !event.target.closest('.toolbar-container')) {
        setShowToolbar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showToolbar]);

  return (
    <div className={`h-full w-full flex flex-col bg-gray-900 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
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
          <span className="text-white font-medium text-sm">JS</span>
        </div>
        
        <div className="flex items-center space-x-1">
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
                <FaEllipsisV className="text-sm" />
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
                      onClick={handleCopyCode}
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
                      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                      {isFullscreen ? <FaCompress className="text-xs mb-1" /> : <FaExpand className="text-xs mb-1" />}
                      <span>{isFullscreen ? "Exit" : "Full"}</span>
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
                onClick={handleCopyCode}
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
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <FaCompress className="text-sm" /> : <FaExpand className="text-sm" />}
              </motion.button>
            </>
          )}
          
          {/* Run Button */}
          <motion.button
            onClick={handleRunCode}
            disabled={isLoading}
            className={`px-3 py-1 rounded-lg flex items-center space-x-1 transition-all duration-300 text-sm ${
              isLoading 
                ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700"
            }`}
            whileHover={isLoading ? {} : { scale: 1.05 }}
            whileTap={isLoading ? {} : { scale: 0.95 }}
          >
            <FaPlay className="text-xs" />
            <span className="hidden sm:inline">{isLoading ? "Running..." : "Run"}</span>
          </motion.button>
        </div>
      </div>

      {/* Code Editor Section */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={handleEditorDidMount}
          options={editorOptions}
          theme="codeastra-dark"
        />
      </div>

      {/* Output Section - Mobile Optimized */}
      <div className="bg-gray-800/80 backdrop-blur-md border-t border-gray-700">
        <div className="flex items-center justify-between py-1 px-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-white font-medium text-sm">Output</span>
          </div>
        </div>
        <div className="bg-gray-850 p-2 font-mono text-xs text-gray-200 max-h-20 overflow-y-auto">
          <pre className="whitespace-pre-wrap break-words">{output}</pre>
          {!output && (
            <div className="text-gray-500 italic text-xs">
              // Output will appear here after running your code
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashCodeSection;