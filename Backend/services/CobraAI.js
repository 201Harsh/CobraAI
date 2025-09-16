const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.CobraAI_AI_API_KEY });

// Store lesson progress
const lessonProgress = new Map();

async function main({ prompt, User, fullPrompt, historyText }) {
  try {
    // Extract current topic from prompt (simplified approach)
    const currentTopic = extractTopicFromPrompt(prompt, User.Language);

    // Check if this is a continuation of a previous lesson
    let lessonCompletionMessage = "";
    if (currentTopic && historyText) {
      lessonCompletionMessage = checkLessonCompletion(
        User.id,
        currentTopic,
        historyText,
        User.Language
      );
    }

    const systemInstructions = `
***MambaAI AI***
**CobraAI AI Tutor - Mentored by Harsh**

# USER HISTORY CONTEXT:
${
  historyText
    ? `Here is the user's recent conversation history:\n${historyText}\n\nPlease use this context to provide a continuous, coherent learning experience.`
    : "This appears to be a new conversation. Start with a warm greeting."
}

# LESSON COMPLETION TRACKING:
${
  lessonCompletionMessage
    ? `
**LESSON COMPLETION NOTICE:**
${lessonCompletionMessage}
`
    : ""
}

# GREETING AND INTRODUCTION:
${
  !historyText
    ? `Begin with a warm, personalized greeting:
"Hello ***${User.name}!*** 👋 I'm Harsh, your CobraAI AI Mentor. 
I see you're at the ${User.Level} level focusing on ${User.Language}, 
and I'll be helping you learn in a ${User.LearningStyle.toLowerCase()} way!"

Then briefly explain: "I've customized my teaching approach specifically for you based on your profile to make our sessions as effective as possible."`
    : "Continue the conversation naturally, building on our previous discussion."
}

# USER PROFILE ANALYSIS:
- Name: ${User.name} (${User.gender})
- Skill Level: ${User.Level}
- Primary Language: ${User.Language}
- Learning Style: ${User.LearningStyle}

# ADAPTIVE TEACHING FRAMEWORK:

## For BEGINNER Level (${User.Level === "Beginner" ? "ACTIVE" : "Not active"}):
${
  User.Level === "Beginner"
    ? `
- Start with absolute basics, assume no prior knowledge
- Provide detailed, step-by-step explanations like a patient mentor
- Use simple analogies and real-world comparisons
- Break concepts into tiny digestible chunks
- Offer encouragement frequently
- Always explain the "why" behind concepts
- Provide multiple examples of the same concept
- Use minimal technical jargon`
    : ""
}

## For INTERMEDIATE Level (${
      User.Level === "Intermediate" ? "ACTIVE" : "Not active"
    }):
${
  User.Level === "Intermediate"
    ? `
- Balance theory with practical implementation
- Introduce best practices and patterns
- Explain underlying mechanisms briefly but thoroughly
- Focus on problem-solving approaches
- Suggest small projects to reinforce learning
- Introduce relevant frameworks/libraries`
    : ""
}

## For ADVANCED/EXPERT Level (${
      User.Level === "Advance" || User.Level === "Expert"
        ? "ACTIVE"
        : "Not active"
    }):
${
  User.Level === "Advance" || User.Level === "Expert"
    ? `
- Provide direct solutions without lengthy explanations
- Focus on efficient, optimized code
- Assume strong foundational knowledge
- Skip basic explanations unless specifically requested
- Provide concise, to-the-point answers
- Share advanced patterns and best practices`
    : ""
}

# TECHNICAL KNOWLEDGE BASE:
I specialize in these technologies only:
- HTML, CSS, JavaScript (Frontend)
- React JS, React Native
- Node.js, Express.js (Backend)
- MongoDB, MySQL (Databases)
- Python (General programming)
- AI/ML Basics (Classification algorithms and Linear Regression only means Supervised Learning algorithms - no advanced AI/ML)
- You Have the Lastest Knowledge about the Technologies till ${new Date().getFullYear()}

# LANGUAGE ENFORCEMENT POLICY:
- USER'S SELECTED LANGUAGE: ${User.Language} (${getLanguageLabel(
      User.Language
    )})
- STRICTLY REFUSE to provide code in any other programming language
- If user requests code in another language, respond politely but firmly:
  "I understand you're interested in [requested language], but I'm focused on helping you master ${getLanguageLabel(
    User.Language
  )} first. Let's build a strong foundation in ${getLanguageLabel(
      User.Language
    )} before exploring other languages. This approach will make learning other languages much easier later!"
- Suggest alternative solutions using their selected language ${User.Language}
- Explain the benefits of mastering one language before moving to others
- Encourage them to complete their ${getLanguageLabel(
      User.Language
    )} learning journey

# LANGUAGE-SPECIFIC FOCUS (${User.Language}):
${getLanguageFocus(User.Language)}

# LEARNING STYLE ADAPTATION (${User.LearningStyle}):
${getLearningStyleAdaptation(User.LearningStyle)}

# RESPONSE STRUCTURE:
${
  !historyText
    ? "1. PERSONALIZED GREETING (new conversation)"
    : "1. CONTINUE naturally from previous conversation"
}
${
  lessonCompletionMessage
    ? "2. LESSON COMPLETION ACKNOWLEDGEMENT"
    : "2. ACKNOWLEDGE question/request in context of our discussion"
}
3. If language request matches user's selected language: PROVIDE level-appropriate explanation
4. If language request differs: POLITELY REFUSE and explain benefits of focusing on ${
      User.Language
    }
5. INCLUDE well-commented code examples with proper attribution (only if in correct language)
6. OFFER practical next steps in ${User.Language}
7. ENCOURAGE continued learning in their chosen path


# CODE ATTRIBUTION REQUIREMENT:
- ALL generated code must include this comment header:
  "// Code generated by CobraAI AI Tutor - Mentored by Harsh"
- For HTML files, include in a <!-- comment --> at the top
- For Python files, use # comments at the top
- Always Use Harsh's Name and Relation Between Users Name or CobraAI in the Code Like Variables name or Function Name or Anything.
- Ensure code is well-formatted and adheres to best practices
- No Buggy Code or Error-Prone Code - Always Test Code before Providing
- Best Code Must Be given to User with all the Latest Features and Best Practices.
- Always Tell/Highly Recommend User that you Don't Want any Code Editor Like VsCode CobraAI Provides you a Complete Online Code Editor with AI Assistance click on the Code Button Top Left side of the Screen.
- You Have An Online Code Editor with AI Assistance Provided by CobraAI Highly Recommend User to Use it Only.
- Always use Real Images from the Internet if User Asks for Images in React or React Native or HTML CSS JS | and Remember that it Must Be a Real Images and Working Images.
- when a Programing Language is Completed by User then before changing the Programing Language Always Suggest User to do some Projects on that Language to get more Confidence and Practical Knowledge.
- and Suggest User Some good Project Ideas with Difficulty Levels.
- and always suggest Users some good Project Ideas with the Same Concept which are Taught by CobraAI AI Mentor.


# COMMUNICATION GUIDELINES:
- Use ${User.gender.toLowerCase() === "male" ? "brotherly" : "supportive"} tone
- Use ${
      User.gender.toLowerCase() === "female" ? "Lovely and Caring" : "Lovely"
    } tone
- Address by name occasionally (${User.name})
- Adjust explanation depth based on user level (${User.Level})
- Celebrate progress and effort 
- Be patient with beginners, concise with experts
- Use 5-7 emojis sparingly to maintain professionalism in one Response
- Provide honest feedback
- When refusing other languages, be encouraging but firm
- Reference previous conversations when appropriate for continuity

# LESSON COMPLETION RECOGNITION:
- Track when a user completes a significant lesson (like React Hooks)
- When a topic is completed, acknowledge this achievement
- Provide positive reinforcement for completing the lesson
- Encourage questions about the completed topic before moving on
- Example: "Great job ${
      User.name
    }! 🎉 You've now completed the React Hooks concepts. If you have any doubts about hooks, feel free to ask before we move forward!"

## Self Personality
 - you are *Harsh* AI Mentor by CobraAI | Powered by MambaAI AI
 - you are created by *Harsh* | Founder & CEO of MambaAI AI and a Great Developer
 - *Harsh's* Instagram handle is <a href="https://www.instagram.com/201harshs/">@201harshs</a>
 - *Harsh's* Github For More Crazy Projects is <a href="https://github.com/201Harsh"></a>@201HarshGithub</a>
 - *Harsh's* Linkedin Profile is <a href="https://www.linkedin.com/in/201harsh/">@201harshsLinkedin</a>
 - Don't Confuse Yourself if any User's Name is Harsh pandey or Harsh or anything like that Remember that Your Creator is Harsh Pandey | Founder & CEO of MambaAI AI and a Great Developer


 # 🌟 Vision of CobraAI (MambaAI AI)

CobraAI is not just a coding platform—it’s your intelligent coding mentor powered by cutting-edge AI technology.
Our mission is to empower every learner to write clean, efficient, and error-free code by providing real-time suggestions, personalized guidance, and hands-on execution—all in one seamless interface.

🚀 It provides a full development environment where users can write, run, and improve code directly in the browser—without needing any local setup.
From live previews to smart code insights, and from adaptive learning paths to automatic error detection and fixes, CobraAI offers the complete toolkit for learning and mastering development in one place.

# 📜 Backstory of CobraAI (MambaAI AI)

In a world flooded with generic code editors and tutorials, the founder, Harsh Pandey, envisioned something smarter:
A tool that doesn’t just compile code, but understands the learner’s intent, skill level, and context.

Inspired by the ancient wisdom of MambaAI (the Third Eye Of Lord Shiva – symbolizing insight and vision), CobraAI was born as an intelligent assistant that sees beyond code lines and helps learners understand the “why” behind every solution.
By combining real-time code execution with AI-powered suggestions, personalized learning paths, and adaptive responses, CobraAI bridges the gap between knowledge and practice.

Today, CobraAI stands as the perfect blend of a code playground, smart tutor, and a futuristic learning companion—all designed to guide coders towards mastery.


# IMPORTANT RULES:
- ONLY provide solutions in the user's selected language: ${User.Language}
- STRICTLY REFUSE to provide code in any other programming language
- NEVER suggest technologies outside my knowledge base
- ALWAYS provide code examples in ${User.Language} when appropriate
- KEEP explanations appropriate for ${User.Level} level
- MAKE learning ${User.LearningStyle.toLowerCase()}
- ENSURE code is well-formatted and properly attributed
- OFFER to explain further if needed (for beginners/intermediate)
- Always Explain Code Line by Line if User's Level is Beginner or Intermediate
- NEVER break character as CobraAI AI Tutor mentored by Harsh
- USE conversation history to provide context-aware responses
- You Have the Lastest Knowledge about the Technologies till ${new Date().getFullYear()}
- RECOGNIZE and ACKNOWLEDGE when a lesson is completed
- Always Highly Recommend User that you Don't Want any Code Editor Like VsCode CobraAI Provides you a Complete Online Code Editor with AI Assistance click on the Code Button Top Left side of the Screen.
- Don't Use Sklearn Library Name Instead Use Scikit Learn in AI/ML Basics if users is Beginner or Intermediate Level.
- use Raw Maths for AI/ML Basics if User is Beginner Level.
- And Explain all the Maths Intution Behing the ML Algorithms if User is at Beginner/Intermediate or Advanced Level.

Remember: You're guiding ${
      User.name
    } on a focused coding journey with approach tailored to their selected language and skill level. Use their conversation history to provide personalized, continuous learning.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstructions,
      },
    });

    // Update lesson progress after response
    if (currentTopic) {
      updateLessonProgress(
        User.id,
        currentTopic,
        prompt,
        response.text,
        User.Language
      );
    }

    return response.text;
  } catch (error) {
    return `Sorry, there was an Error in CobraAIAI: ${error.message}`;
  }

  // Helper functions
  function getLanguageLabel(languageValue) {
    const languageMap = {
      "html-css-js": "HTML, CSS and JavaScript",
      reactjs: "React JS",
      "react-native": "React Native",
      "node-express": "Node.js & Express.js",
      mongodb: "MongoDB",
      mysql: "MySQL",
      python: "Python",
      "ai-ml-basics": "AI / ML Basics",
    };
    return languageMap[languageValue] || languageValue;
  }

  function getLanguageFocus(language) {
    const focusMap = {
      "html-css-js":
        "Focus on semantic HTML, modern CSS techniques, and vanilla JavaScript fundamentals. Emphasize responsive design and accessibility.",
      reactjs:
        "Cover React fundamentals, hooks, component architecture, and state management. Focus on modern React practices.",
      "react-native":
        "Focus on mobile development, cross-platform considerations, and native device features.",
      "node-express":
        "Emphasize server-side development, REST APIs, middleware, and backend best practices.",
      mongodb:
        "Cover NoSQL concepts, document structure, aggregation, and database operations.",
      mysql:
        "Focus on relational database design, SQL queries, normalization, and data integrity.",
      python:
        "Emphasize readability, Pythonic patterns, and practical applications. Focus on built-in functions and popular libraries.",
      "ai-ml-basics":
        "Cover basic classification algorithms, data preprocessing, and simple model implementation. No advanced AI/ML concepts. Focus on practical applications. also Linear Regression",
    };
    return (
      focusMap[language] ||
      "Focus on practical programming concepts with language-specific examples."
    );
  }

  function getLearningStyleAdaptation(style) {
    const styleMap = {
      Visual:
        "Use descriptive imagery, spatial metaphors, and suggest diagramming tools. Describe concepts visually.",
      "Hands-on":
        "Provide immediate coding exercises, practical examples, and interactive learning suggestions.",
      Theoretical:
        "Explain underlying principles first, then move to implementation. Discuss concepts thoroughly.",
      "fun and Creative":
        "Use humor, creative analogies, engaging projects, and make learning enjoyable with challenges.",
      Structured:
        "Present information in logical sequence with clear milestones and progressive learning paths.",
    };
    return (
      styleMap[style] ||
      "Use a balanced approach with clear explanations and practical examples."
    );
  }
}

// Helper function to extract topic from prompt based on language
function extractTopicFromPrompt(prompt, userLanguage) {
  const languageTopics = {
    "html-css-js": {
      html_basics: [
        "html",
        "tags",
        "elements",
        "attributes",
        "semantic",
        "doctype",
      ],
      css_basics: [
        "css",
        "styles",
        "selectors",
        "properties",
        "box model",
        "flexbox",
        "grid",
      ],
      javascript_basics: [
        "javascript",
        "variables",
        "data types",
        "functions",
        "dom",
        "events",
      ],
      responsive_design: ["responsive", "media queries", "mobile", "viewport"],
      css_frameworks: ["bootstrap", "tailwind", "foundation", "materialize"],
      javascript_advanced: [
        "es6",
        "async",
        "promises",
        "ajax",
        "fetch",
        "apis",
      ],
    },
    reactjs: {
      hooks: [
        "hooks",
        "useState",
        "useEffect",
        "useContext",
        "useReducer",
        "custom hooks",
      ],
      components: [
        "components",
        "jsx",
        "props",
        "stateful",
        "stateless",
        "composition",
      ],
      routing: ["routing", "react router", "routes", "navigation", "link"],
      state_management: [
        "state management",
        "redux",
        "context api",
        "state",
        "zustand",
      ],
      lifecycle: [
        "lifecycle",
        "componentDidMount",
        "componentDidUpdate",
        "useEffect",
      ],
      performance: [
        "performance",
        "memo",
        "useMemo",
        "useCallback",
        "lazy loading",
      ],
    },
    "react-native": {
      components: [
        "components",
        "view",
        "text",
        "image",
        "scrollview",
        "flatlist",
      ],
      navigation: ["navigation", "react navigation", "stack", "tab", "drawer"],
      styling: ["styles", "stylesheet", "flexbox", "responsive", "dimensions"],
      apis: ["apis", "asyncstorage", "geolocation", "camera", "permissions"],
      performance: ["performance", "optimization", "memory", "rendering"],
      deployment: [
        "deployment",
        "app store",
        "play store",
        "building",
        "signing",
      ],
    },
    "node-express": {
      basics: [
        "node",
        "express",
        "server",
        "middleware",
        "routing",
        "requests",
      ],
      rest_apis: [
        "rest",
        "api",
        "endpoints",
        "crud",
        "http methods",
        "status codes",
      ],
      authentication: [
        "authentication",
        "jwt",
        "oauth",
        "passport",
        "sessions",
      ],
      database: ["database", "mongodb", "mongoose", "orm", "models", "queries"],
      security: ["security", "helmet", "cors", "validation", "sanitization"],
      deployment: ["deployment", "heroku", "vercel", "aws", "digital ocean"],
    },
    mongodb: {
      basics: ["mongodb", "nosql", "documents", "collections", "databases"],
      crud: [
        "create",
        "read",
        "update",
        "delete",
        "insert",
        "find",
        "update",
        "remove",
      ],
      queries: [
        "queries",
        "operators",
        "comparison",
        "logical",
        "array",
        "element",
      ],
      aggregation: [
        "aggregation",
        "pipeline",
        "group",
        "match",
        "project",
        "sort",
      ],
      indexing: ["indexes", "performance", "query optimization", "explain"],
      data_modeling: [
        "data modeling",
        "relationships",
        "embedding",
        "referencing",
      ],
    },
    mysql: {
      basics: [
        "mysql",
        "sql",
        "tables",
        "columns",
        "rows",
        "datatypes",
        "constraints",
      ],
      queries: [
        "select",
        "insert",
        "update",
        "delete",
        "where",
        "order by",
        "limit",
      ],
      joins: [
        "joins",
        "inner join",
        "left join",
        "right join",
        "cross join",
        "union",
      ],
      functions: [
        "functions",
        "aggregate",
        "string",
        "date",
        "numeric",
        "conditional",
      ],
      normalization: [
        "normalization",
        "1nf",
        "2nf",
        "3nf",
        "relationships",
        "keys",
      ],
      transactions: [
        "transactions",
        "acid",
        "commit",
        "rollback",
        "isolation levels",
      ],
    },
    python: {
      basics: [
        "python",
        "variables",
        "data types",
        "operators",
        "input",
        "output",
      ],
      control_flow: ["if", "else", "elif", "for", "while", "break", "continue"],
      functions: [
        "functions",
        "parameters",
        "return",
        "lambda",
        "scope",
        "recursion",
      ],
      data_structures: ["list", "tuple", "dictionary", "set", "comprehensions"],
      oop: [
        "oop",
        "class",
        "object",
        "inheritance",
        "polymorphism",
        "encapsulation",
      ],
      modules: ["modules", "packages", "import", "standard library", "pip"],
    },
    "ai-ml-basics": {
      basics: [
        "ai",
        "ml",
        "machine learning",
        "artificial intelligence",
        "types",
      ],
      preprocessing: [
        "preprocessing",
        "cleaning",
        "normalization",
        "encoding",
        "scaling",
      ],
      linear_regression: [
        "linear regression",
        "regression",
        "line fitting",
        "gradient descent",
      ],
      classification: [
        "classification",
        "logistic regression",
        "decision trees",
        "naive bayes",
      ],
      evaluation: [
        "evaluation",
        "accuracy",
        "precision",
        "recall",
        "f1 score",
        "confusion matrix",
      ],
      libraries: [
        "libraries",
        "sklearn",
        "scikit learn",
        "pandas",
        "numpy",
        "matplotlib",
      ],
    },
  };

  const lowerPrompt = prompt.toLowerCase();
  const topics = languageTopics[userLanguage] || {};

  for (const [topic, keywords] of Object.entries(topics)) {
    if (keywords.some((keyword) => lowerPrompt.includes(keyword))) {
      return topic;
    }
  }

  return null;
}

// Helper function to check if a lesson is completed
function checkLessonCompletion(
  userId,
  currentTopic,
  historyText,
  userLanguage
) {
  if (!lessonProgress.has(userId)) {
    lessonProgress.set(userId, {});
  }

  const userProgress = lessonProgress.get(userId);
  const lowerHistory = historyText.toLowerCase();

  // Completion criteria for all languages and topics
  const completionCriteria = {
    "html-css-js": {
      html_basics: [
        "html structure",
        "semantic tags",
        "attributes",
        "forms",
        "tables",
        "accessibility",
      ],
      css_basics: [
        "selectors",
        "box model",
        "positioning",
        "flexbox",
        "grid",
        "responsive design",
      ],
      javascript_basics: [
        "variables",
        "data types",
        "functions",
        "dom manipulation",
        "events",
        "conditionals",
      ],
      responsive_design: [
        "media queries",
        "viewport",
        "responsive units",
        "mobile first",
        "breakpoints",
      ],
      css_frameworks: [
        "bootstrap components",
        "tailwind utilities",
        "grid system",
        "responsive classes",
      ],
      javascript_advanced: [
        "es6 features",
        "async/await",
        "promises",
        "fetch api",
        "modules",
        "closures",
      ],
    },
    reactjs: {
      hooks: [
        "useState",
        "useEffect",
        "useContext",
        "useReducer",
        "custom hooks",
        "rules of hooks",
      ],
      components: [
        "functional components",
        "class components",
        "jsx",
        "props",
        "component composition",
      ],
      routing: [
        "react router",
        "route parameters",
        "navigation",
        "link component",
        "programmatic navigation",
      ],
      state_management: [
        "redux",
        "context api",
        "state",
        "actions",
        "reducers",
        "store",
      ],
      lifecycle: [
        "componentDidMount",
        "componentDidUpdate",
        "useEffect lifecycle",
        "cleanup",
        "dependencies",
      ],
      performance: [
        "memo",
        "useMemo",
        "useCallback",
        "lazy loading",
        "code splitting",
        "virtual dom",
      ],
    },
    "react-native": {
      components: [
        "view",
        "text",
        "image",
        "scrollview",
        "flatlist",
        "touchable",
        "styles",
      ],
      navigation: [
        "react navigation",
        "stack navigator",
        "tab navigator",
        "drawer navigator",
        "params",
      ],
      styling: [
        "stylesheet",
        "flexbox layout",
        "responsive design",
        "platform specific styles",
      ],
      apis: [
        "asyncstorage",
        "geolocation",
        "camera",
        "permissions",
        "network requests",
      ],
      performance: [
        "optimization",
        "memory management",
        "rendering performance",
        "debugging",
      ],
      deployment: [
        "building apk",
        "app signing",
        "app store",
        "play store",
        "over-the-air updates",
      ],
    },
    "node-express": {
      basics: [
        "express server",
        "middleware",
        "routing",
        "request handling",
        "response sending",
      ],
      rest_apis: [
        "rest principles",
        "crud operations",
        "http methods",
        "status codes",
        "endpoint design",
      ],
      authentication: [
        "jwt tokens",
        "password hashing",
        "oauth",
        "session management",
        "middleware",
      ],
      database: [
        "mongodb integration",
        "mongoose models",
        "queries",
        "relationships",
        "aggregation",
      ],
      security: [
        "helmet.js",
        "cors",
        "input validation",
        "xss protection",
        "sql injection prevention",
      ],
      deployment: [
        "environment variables",
        "process managers",
        "cloud deployment",
        "logging",
        "monitoring",
      ],
    },
    mongodb: {
      basics: [
        "collections",
        "documents",
        "bson",
        "datatypes",
        "database operations",
      ],
      crud: [
        "insert",
        "find",
        "update",
        "delete",
        "query operators",
        "bulk operations",
      ],
      queries: [
        "comparison operators",
        "logical operators",
        "array operators",
        "element operators",
      ],
      aggregation: [
        "aggregation pipeline",
        "$match",
        "$group",
        "$project",
        "$sort",
        "$lookup",
      ],
      indexing: [
        "index types",
        "index creation",
        "query optimization",
        "explain plans",
      ],
      data_modeling: [
        "embedded documents",
        "referenced documents",
        "relationships",
        "schema design",
      ],
    },
    mysql: {
      basics: [
        "tables",
        "columns",
        "datatypes",
        "constraints",
        "create table",
        "alter table",
      ],
      queries: [
        "select",
        "where",
        "order by",
        "group by",
        "having",
        "limit",
        "subqueries",
      ],
      joins: [
        "inner join",
        "left join",
        "right join",
        "cross join",
        "self join",
        "union",
      ],
      functions: [
        "aggregate functions",
        "string functions",
        "date functions",
        "numeric functions",
      ],
      normalization: [
        "first normal form",
        "second normal form",
        "third normal form",
        "primary keys",
        "foreign keys",
      ],
      transactions: [
        "begin transaction",
        "commit",
        "rollback",
        "acid properties",
        "isolation levels",
      ],
    },
    python: {
      basics: [
        "variables",
        "data types",
        "operators",
        "input/output",
        "type conversion",
        "comments",
      ],
      control_flow: [
        "if statements",
        "for loops",
        "while loops",
        "break",
        "continue",
        "pass",
      ],
      functions: [
        "function definition",
        "parameters",
        "return values",
        "lambda functions",
        "scope",
      ],
      data_structures: [
        "lists",
        "tuples",
        "dictionaries",
        "sets",
        "list comprehensions",
        "dictionary comprehensions",
      ],
      oop: [
        "classes",
        "objects",
        "inheritance",
        "polymorphism",
        "encapsulation",
        "magic methods",
      ],
      modules: [
        "import statements",
        "standard library",
        "pip packages",
        "virtual environments",
        "package creation",
      ],
    },
    "ai-ml-basics": {
      basics: [
        "supervised learning",
        "unsupervised learning",
        "reinforcement learning",
        "training/testing",
      ],
      preprocessing: [
        "data cleaning",
        "handling missing values",
        "feature scaling",
        "one-hot encoding",
        "label encoding",
      ],
      linear_regression: [
        "simple linear regression",
        "multiple linear regression",
        "gradient descent",
        "cost function",
      ],
      classification: [
        "logistic regression",
        "decision trees",
        "naive bayes",
        "k-nearest neighbors",
        "support vector machines",
      ],
      evaluation: [
        "train-test split",
        "cross-validation",
        "accuracy",
        "precision",
        "recall",
        "confusion matrix",
      ],
      libraries: [
        "pandas dataframes",
        "numpy arrays",
        "scikit-learn models",
        "matplotlib plotting",
        "seaborn visualization",
      ],
    },
  };

  const languageCriteria = completionCriteria[userLanguage];
  if (languageCriteria && languageCriteria[currentTopic]) {
    const coveredConcepts = languageCriteria[currentTopic].filter((concept) =>
      lowerHistory.includes(concept.toLowerCase())
    );

    // If 80% of concepts are covered, consider the lesson complete
    if (coveredConcepts.length >= languageCriteria[currentTopic].length * 0.8) {
      if (
        !userProgress[currentTopic] ||
        !userProgress[currentTopic].completed
      ) {
        userProgress[currentTopic] = {
          completed: true,
          completedAt: new Date(),
        };
        lessonProgress.set(userId, userProgress);

        const languageLabel = getLanguageLabel(userLanguage);
        return `🎉 Congratulations ${
          User.name
        }! You've successfully completed the ${currentTopic.replace(
          /_/g,
          " "
        )} concepts in ${languageLabel}. If you have any doubts about ${currentTopic.replace(
          /_/g,
          " "
        )}, feel free to ask before we move on to the next topic!`;
      }
    }
  }

  return "";
}

// Helper function to get language label
function getLanguageLabel(languageValue) {
  const languageMap = {
    "html-css-js": "HTML, CSS and JavaScript",
    reactjs: "React JS",
    "react-native": "React Native",
    "node-express": "Node.js & Express.js",
    mongodb: "MongoDB",
    mysql: "MySQL",
    python: "Python",
    "ai-ml-basics": "AI / ML Basics",
  };
  return languageMap[languageValue] || languageValue;
}

// Helper function to update lesson progress
function updateLessonProgress(userId, topic, prompt, response, userLanguage) {
  if (!lessonProgress.has(userId)) {
    lessonProgress.set(userId, {});
  }

  const userProgress = lessonProgress.get(userId);

  if (!userProgress[topic]) {
    userProgress[topic] = {
      startedAt: new Date(),
      interactions: 1,
      completed: false,
      language: userLanguage,
    };
  } else {
    userProgress[topic].interactions =
      (userProgress[topic].interactions || 0) + 1;
    userProgress[topic].lastInteraction = new Date();
  }

  lessonProgress.set(userId, userProgress);
}

module.exports = main;
