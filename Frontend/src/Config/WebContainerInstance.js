import { WebContainer } from '@webcontainer/api';

let webcontainerInstance;

export const initializeWebContainer = async () => {
  try {
    if (!webcontainerInstance) {
      webcontainerInstance = await WebContainer.boot();
      console.log('WebContainer initialized successfully');
    }
    return webcontainerInstance;
  } catch (error) {
    console.error('Failed to initialize WebContainer:', error);
    throw error;
  }
};

export const getWebContainerInstance = () => {
  if (!webcontainerInstance) {
    throw new Error('WebContainer not initialized. Call initializeWebContainer first.');
  }
  return webcontainerInstance;
};

export const isWebContainerInitialized = () => {
  return !!webcontainerInstance;
};

export const setupReactProject = async (webcontainer) => {
  // Create package.json for React
  await webcontainer.fs.writeFile('/package.json', JSON.stringify({
    name: 'react-project',
    type: 'module',
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      '@vitejs/plugin-react': '^4.0.0',
      'vite': '^4.3.0'
    },
    scripts: {
      'dev': 'vite',
      'build': 'vite build',
      'preview': 'vite preview'
    }
  }, null, 2));

  // Create Vite config
  await webcontainer.fs.writeFile('/vite.config.js', `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
`);

  // Create index.html
  await webcontainer.fs.writeFile('/index.html', `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);

  // Create src directory and files
  await webcontainer.fs.mkdir('/src');
  
  // Create main.jsx
  await webcontainer.fs.writeFile('/src/main.jsx', `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);

  // Create App.jsx
  await webcontainer.fs.writeFile('/src/App.jsx', `
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Hello from React!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
`);

  // Create App.css
  await webcontainer.fs.writeFile('/src/App.css', `
.App {
  text-align: center;
}

.card {
  padding: 2em;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}
`);

  // Create index.css
  await webcontainer.fs.writeFile('/src/index.css', `
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}
`);

  console.log('React project setup completed');
};

export const installDependencies = async (webcontainer) => {
  const installProcess = await webcontainer.spawn('npm', ['install']);
  
  return new Promise((resolve, reject) => {
    installProcess.output.pipeTo(new WritableStream({
      write(data) {
        console.log(data);
      }
    }));
    
    installProcess.exit.then((exitCode) => {
      if (exitCode === 0) {
        console.log('Dependencies installed successfully');
        resolve();
      } else {
        reject(new Error(`Installation failed with exit code ${exitCode}`));
      }
    });
  });
};

export const startDevServer = async (webcontainer) => {
  const devProcess = await webcontainer.spawn('npm', ['run', 'dev']);
  
  devProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }));
  
  // Wait for server to be ready
  webcontainer.on('server-ready', (port, url) => {
    console.log(`Server ready on ${url}`);
  });
  
  return devProcess;
};