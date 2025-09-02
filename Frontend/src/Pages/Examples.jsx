import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaComments, FaCopy, FaPlay, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Examples = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedExample, setExpandedExample] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };

  // Example data
  const examples = [
    {
      id: 1,
      title: "React Component Generator",
      description: "Generate a complete React component with props and state management",
      category: "frontend",
      language: "javascript",
      code: `function WelcomeBanner({ userName }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="welcome-banner">
      <h1>Hello, {userName}!</h1>
      <p>Current time: {currentTime.toLocaleTimeString()}</p>
    </div>
  );
}`,
      explanation: "This React component demonstrates props usage, state management with useState, side effects with useEffect, and conditional rendering. It's a practical example of a welcome banner that updates the time every second.",
      prompt: "Create a React component that displays a welcome message with the current time updating every second"
    },
    {
      id: 2,
      title: "Python Data Analysis",
      description: "Python script to load, clean, and analyze a dataset using Pandas",
      category: "data-science",
      language: "python",
      code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv('data.csv')

# Data cleaning
df = df.dropna()
df = df[df['value'] < 100]  # Remove outliers

# Basic analysis
print(f"Dataset shape: {df.shape}")
print(f"Column names: {list(df.columns)}")
print(f"\\nSummary statistics:")
print(df.describe())

# Visualization
plt.figure(figsize=(10, 6))
plt.hist(df['value'], bins=20, edgecolor='black')
plt.title('Distribution of Values')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.show()`,
      explanation: "This Python script demonstrates a typical data analysis workflow using Pandas. It includes loading data, cleaning by removing missing values and outliers, generating summary statistics, and creating a visualization. This is a foundation for more advanced data analysis tasks.",
      prompt: "Create a Python script to load a CSV file, clean the data, and generate basic analysis with visualization"
    },
    {
      id: 3,
      title: "Node.js API Endpoint",
      description: "RESTful API endpoint with Express.js and MongoDB integration",
      category: "backend",
      language: "javascript",
      code: `const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// User model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new user
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;`,
      explanation: "This Node.js code demonstrates creating RESTful API endpoints with Express.js and MongoDB. It includes both GET and POST routes, input validation, error handling, and database operations. The code follows best practices for API development.",
      prompt: "Create Express.js API endpoints to get all users and create a new user with validation"
    },
    {
      id: 4,
      title: "CSS Grid Layout",
      description: "Responsive photo gallery using CSS Grid with hover effects",
      category: "frontend",
      language: "css",
      code: `.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.photo-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 4/3;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.photo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.photo-item:hover img {
  transform: scale(1.05);
}

.photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.photo-item:hover .photo-caption {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .photo-gallery {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.5rem;
  }
}`,
      explanation: "This CSS code creates a responsive photo gallery using CSS Grid. It includes hover effects with smooth transitions, a caption that slides up on hover, and responsive adjustments for mobile devices. The layout automatically adjusts based on screen size.",
      prompt: "Create a responsive CSS Grid photo gallery with hover effects and mobile responsiveness"
    },
    {
      id: 5,
      title: "SQL Query Optimization",
      description: "Optimized SQL query with indexing and performance considerations",
      category: "database",
      language: "sql",
      code: `-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_date ON orders(order_date);

-- Optimized query to get user orders with details
EXPLAIN ANALYZE
SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(o.id) as total_orders,
  SUM(o.total_amount) as total_spent,
  MAX(o.order_date) as latest_order
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2023-01-01'
  AND o.status = 'completed'
  AND o.total_amount > 50
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) >= 3
ORDER BY total_spent DESC
LIMIT 10;`,
      explanation: "This SQL example demonstrates query optimization techniques including proper indexing, efficient joins, filtering conditions, and aggregation. The EXPLAIN ANALYZE command helps understand the query execution plan. This is essential for working with large datasets.",
      prompt: "Write an optimized SQL query to find top customers with completed orders since January 2023"
    },
    {
      id: 6,
      title: "JavaScript Array Methods",
      description: "Practical examples of modern JavaScript array manipulation methods",
      category: "javascript",
      language: "javascript",
      code: `// Sample data
const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'electronics', stock: 15 },
  { id: 2, name: 'Phone', price: 699, category: 'electronics', stock: 0 },
  { id: 3, name: 'Desk', price: 250, category: 'furniture', stock: 8 },
  { id: 4, name: 'Chair', price: 120, category: 'furniture', stock: 20 },
  { id: 5, name: 'Book', price: 15, category: 'education', stock: 100 }
];

// 1. Filter electronics products in stock
const availableElectronics = products.filter(product => 
  product.category === 'electronics' && product.stock > 0
);

// 2. Map to product names with prices
const productList = products.map(product => 
  \`\${product.name}: $\${product.price}\`
);

// 3. Calculate total inventory value
const totalValue = products.reduce((total, product) => 
  total + (product.price * product.stock), 0
);

// 4. Find most expensive product
const mostExpensive = products.reduce((max, product) => 
  product.price > max.price ? product : max
);

// 5. Group products by category
const productsByCategory = products.reduce((groups, product) => {
  const category = product.category;
  if (!groups[category]) {
    groups[category] = [];
  }
  groups[category].push(product);
  return groups;
}, {});

console.log('Available electronics:', availableElectronics);
console.log('Product list:', productList);
console.log('Total inventory value:', totalValue);
console.log('Most expensive product:', mostExpensive);
console.log('Products by category:', productsByCategory);`,
      explanation: "This JavaScript example demonstrates practical use of array methods including filter, map, reduce, and find. These methods are essential for modern JavaScript development and provide a functional approach to data manipulation. The code shows how to process and transform arrays of objects efficiently.",
      prompt: "Show examples of using JavaScript array methods (filter, map, reduce) on a products array"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Examples' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'database', name: 'Database' },
    { id: 'javascript', name: 'JavaScript' }
  ];

  const filteredExamples = activeCategory === 'all' 
    ? examples 
    : examples.filter(example => example.category === activeCategory);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const toggleExpand = (id) => {
    if (expandedExample === id) {
      setExpandedExample(null);
    } else {
      setExpandedExample(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Code <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Examples</span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Explore these AI-generated code examples to see how Trinetra can help you learn and implement programming concepts across different languages and domains.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Examples Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredExamples.map(example => (
            <motion.div
              key={example.id}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-pink-600 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                    <p className="text-blue-200 text-sm">{example.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs uppercase">
                    {example.language}
                  </span>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4 relative">
                  <button
                    onClick={() => copyToClipboard(example.code)}
                    className="absolute top-2 right-2 p-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                    title="Copy code"
                  >
                    <FaCopy className="text-gray-400" />
                  </button>
                  <pre className="overflow-x-auto">
                    <code className={`language-${example.language}`}>
                      {example.code}
                    </code>
                  </pre>
                </div>

                <button
                  onClick={() => toggleExpand(example.id)}
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-2"
                >
                  {expandedExample === example.id ? (
                    <>
                      <FaChevronUp className="mr-1" /> Hide Details
                    </>
                  ) : (
                    <>
                      <FaChevronDown className="mr-1" /> Show Details
                    </>
                  )}
                </button>

                {expandedExample === example.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-pink-400">AI Prompt:</h4>
                      <p className="text-sm bg-gray-900 p-3 rounded">"{example.prompt}"</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-pink-400">Explanation:</h4>
                      <p className="text-sm text-blue-200">{example.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Generate Your Own Code?</h2>
          <p className="text-lg text-blue-200 mb-6">
            Trinetra can help you create custom code solutions for your specific needs.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300">
            Try Trinetra Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Examples;