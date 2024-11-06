import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Prompt() {
  const [idea, setIdea] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [frontend, setFrontend] = useState("React");
  const [backend, setBackend] = useState("Flask");
  const [generatedFiles, setGeneratedFiles] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Function to handle the submission of the project idea
  const submitIdea = async () => {
    setLoading(true);
    setResponse("");
    setShowLanguageOptions(false);
    setGeneratedFiles(null);

    // Mocking a backend call to an LLM
    setTimeout(() => {
      // Simulated response from an LLM
      const llmResponse = `Based on your idea "${idea}", here’s an optimized project outline: 
                           Build a web app focusing on task management with user authentication, 
                           task categorization, and reporting features. Choose your frontend and backend technologies below.`;
      
      setResponse(llmResponse);
      setShowLanguageOptions(true);
      setLoading(false);
    }, 2000); // Simulate a delay for backend processing
  };

  // Function to generate mock files based on chosen frontend and backend
  const generateFiles = () => {
    const mockFiles = {
      frontend: {
        React: `// App.js\nimport React from 'react';\n\nfunction App() {\n  return <h1>Hello, Task Manager!</h1>;\n}\n\nexport default App;`,
        Vue: `<template>\n  <h1>Hello, Task Manager!</h1>\n</template>\n\n<script>\nexport default {\n  name: 'App'\n};\n</script>`,
      },
      backend: {
        Flask: `# app.py\nfrom flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return "Hello, Task Manager!"\n\nif __name__ == '__main__':\n    app.run()`,
        Node: `// server.js\nconst express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello, Task Manager!');\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});`,
      }
    };

    setGeneratedFiles({
      frontend: mockFiles.frontend[frontend],
      backend: mockFiles.backend[backend],
    });
  };

  // Function to simulate generating a website preview with toastify
  const generatePreview = () => {
    setPreviewLoading(true);
    
    // Simulate delay for preview generation
    setTimeout(() => {
      setPreviewLoading(false);
      toast.info("Website preview is ready! (Not functional for now.)");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-2xl bg-gray-900 rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-4 text-yellow-500 text-center">Submit Your Project Idea</h2>
        
        {/* Idea Input Section */}
        <textarea
          className="w-full p-4 mb-4 bg-gray-800 text-gray-200 border-2 border-yellow-500 rounded-lg"
          rows="5"
          placeholder="Describe your project idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        
        <button
          onClick={submitIdea}
          disabled={loading}
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md"
        >
          {loading ? "Submitting..." : "Submit Idea"}
        </button>

        {/* Display LLM Response */}
        {response && (
          <div className="mt-6 p-4 bg-gray-800 border-2 border-yellow-500 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-400">Generated Project Outline</h3>
            <p className="text-gray-300 mt-2">{response}</p>
          </div>
        )}

        {/* Language Selection */}
        {showLanguageOptions && (
          <div className="mt-6 p-4 bg-gray-800 border-2 border-yellow-500 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-400">Choose Frontend and Backend Languages</h3>
            
            <div className="mt-4">
              <label className="text-yellow-300">Frontend: </label>
              <select
                value={frontend}
                onChange={(e) => setFrontend(e.target.value)}
                className="bg-gray-800 text-gray-200 border border-yellow-500 rounded-md p-2"
              >
                <option value="React">React</option>
                <option value="Vue">Vue</option>
              </select>
            </div>
            
            <div className="mt-4">
              <label className="text-yellow-300">Backend: </label>
              <select
                value={backend}
                onChange={(e) => setBackend(e.target.value)}
                className="bg-gray-800 text-gray-200 border border-yellow-500 rounded-md p-2"
              >
                <option value="Flask">Flask</option>
                <option value="Node">Node</option>
              </select>
            </div>

            <button
              onClick={generateFiles}
              className="mt-6 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md"
            >
              Generate Files
            </button>
          </div>
        )}

        {/* Display Generated Files */}
        {generatedFiles && (
          <div className="mt-6 p-4 bg-gray-800 border-2 border-yellow-500 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-400">Generated Files</h3>
            
            <div className="mt-4">
              <h4 className="text-lg font-bold text-yellow-300">Frontend ({frontend})</h4>
              <pre className="bg-gray-900 p-3 rounded-lg text-gray-300 overflow-x-auto">
                {generatedFiles.frontend}
              </pre>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-bold text-yellow-300">Backend ({backend})</h4>
              <pre className="bg-gray-900 p-3 rounded-lg text-gray-300 overflow-x-auto">
                {generatedFiles.backend}
              </pre>
            </div>

            {/* Button to simulate website preview */}
            <button
              onClick={generatePreview}
              disabled={previewLoading}
              className="mt-6 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md"
            >
              {previewLoading ? "Generating Preview..." : "Generate Website Preview"}
            </button>
          </div>
        )}

        {/* Toast Container for Toast Notifications */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Prompt;
