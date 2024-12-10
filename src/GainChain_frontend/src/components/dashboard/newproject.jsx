'use client'

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from 'lucide-react'
import "react-toastify/dist/ReactToastify.css";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
}

const NewProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [messages, setMessages] = useState([
    { 
      type: "ai", 
      text: "Hello! I'm G-Chain AI by Gain Chain AI Tech startup. I'm thrilled that you've chosen to explore Web3 and AI technologies. How can I assist you in creating your blockchain project today?" 
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const codeTemplates = {
    header: {
      description: "Generates a webpage header.",
      html: `
        <div class="header" style="background: #333; color: white; text-align: center; padding: 20px;">
            <h1>Welcome to My Blockchain App</h1>
        </div>
      `,
    },
    footer: {
      description: "Generates a webpage footer.",
      html: `
        <div class="footer" style="background: #444; color: white; text-align: center; padding: 10px;">
            <p>&copy; 2024 Gain Chain AI. All rights reserved.</p>
        </div>
      `,
    },
    wallet: {
      description: "Generates a blockchain wallet section.",
      html: `
        <div class="wallet-section" style="padding: 20px; background: #e6f7ff;">
            <h2>Blockchain Wallet</h2>
            <div class="wallet-info">
                <p>Balance: 0.00 ETH</p>
                <button class="connect-btn">Connect Wallet</button>
            </div>
        </div>
      `,
    },
    "smart-contract": {
      description: "Generates a smart contract interaction section.",
      html: `
        <div class="smart-contract" style="padding: 20px; background: #f4f4f4;">
            <h2>Smart Contract Interface</h2>
            <div class="contract-actions">
                <button>Deploy Contract</button>
                <button>Read State</button>
                <button>Write State</button>
            </div>
        </div>
      `,
    },
    transactions: {
      description: "Generates a transaction history section.",
      html: `
        <div class="transactions" style="padding: 20px; background: #eef;">
            <h2>Transaction History</h2>
            <div class="transaction-list">
                <div class="transaction-item">
                    <p>Transaction Hash: 0x123...</p>
                    <p>Status: Confirmed</p>
                </div>
            </div>
        </div>
      `,
    },
    "safaricom-akiba": {
      description: "Generates a Safaricom Akiba blockchain app",
      html: `
    <div class="font-sans bg-white text-gray-800">
      <header class="bg-green-600 text-white p-4">
        <h1 class="text-2xl font-bold">Safaricom Akiba</h1>
        <p>Secure Your Future with Blockchain</p>
      </header>
      
      <main class="p-6">
        <h2 class="text-xl font-semibold mb-4">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white shadow-md rounded-lg p-4 border-t-4 border-green-500">
            <h3 class="font-bold text-lg mb-2">M-Pesa Integration</h3>
            <p>Seamlessly connect your savings with M-Pesa for easy deposits and withdrawals.</p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-4 border-t-4 border-red-500">
            <h3 class="font-bold text-lg mb-2">Blockchain Savings</h3>
            <p>Secure and transparent savings powered by blockchain technology.</p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-4 border-t-4 border-green-500">
            <h3 class="font-bold text-lg mb-2">Smart Contracts</h3>
            <p>Automate your savings goals with smart contracts on the blockchain.</p>
          </div>
        </div>
      </main>
      
      <footer class="bg-red-600 text-white p-4 mt-8">
        <p>&copy; 2024 Safaricom Akiba. All rights reserved.</p>
        <p>Empowering financial futures with blockchain technology</p>
      </footer>
    </div>
      `,
      code: `
import React from 'react';

export const SafaricomAkiba = () => (
  <div className="font-sans bg-white text-gray-800">
    <header className="bg-green-600 text-white p-4">
      <h1 className="text-2xl font-bold">Safaricom Akiba</h1>
      <p>Secure Your Future with Blockchain</p>
    </header>
    
    <main className="p-6">
      <h2 className="text-xl font-semibold mb-4">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 border-t-4 border-green-500">
          <h3 className="font-bold text-lg mb-2">M-Pesa Integration</h3>
          <p>Seamlessly connect your savings with M-Pesa for easy deposits and withdrawals.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border-t-4 border-red-500">
          <h3 className="font-bold text-lg mb-2">Blockchain Savings</h3>
          <p>Secure and transparent savings powered by blockchain technology.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border-t-4 border-green-500">
          <h3 className="font-bold text-lg mb-2">Smart Contracts</h3>
          <p>Automate your savings goals with smart contracts on the blockchain.</p>
        </div>
      </div>
    </main>
    
    <footer className="bg-red-600 text-white p-4 mt-8">
      <p>&copy; 2024 Safaricom Akiba. All rights reserved.</p>
      <p>Empowering financial futures with blockchain technology</p>
    </footer>
  </div>
);
      `
    }
  };

  const generateCode = (input) => {
    const tokens = input.toLowerCase().split(" ");
    const matchedHTML = tokens
      .map((token) => codeTemplates[token]?.html)
      .filter(Boolean);
    return matchedHTML.join("\n");
  };

  const handleUserInput = () => {
    if (userInput.trim() === "") return;

    setMessages((prev) => [...prev, { type: "user", text: userInput }]);
    setIsLoading(true);

    setTimeout(() => {
      let aiResponse = "";
      if (step === 1) {
        setProjectName(userInput);
        aiResponse = `Excellent choice for a project name: "${userInput}"! Let's start building your Web3 blockchain application. What key features would you like to include? (e.g., smart contracts, decentralized storage, token creation)`;
        setStep(2);
      } else if (step === 2) {
        aiResponse = "Those are fantastic features for a blockchain app! I'll start generating a preview based on your choices. This might take a moment...";
        setGeneratedHTML(codeTemplates["safaricom-akiba"].html);
        setGeneratedCode(codeTemplates["safaricom-akiba"].code);
        setStep(3);
        setTimeout(() => {
          setShowPreview(true);
          setMessages((prev) => [
            ...prev,
            { 
              type: "ai", 
              text: "I've created a preview of your blockchain app, showcasing how we can integrate Web3 and AI technologies. You can see it in the preview section. Would you like to discuss any specific aspects or potential enhancements?",
              code: generatedCode
            }
          ]);
        }, 1500);
      } else if (step === 3) {
        aiResponse = "Great! I'm always here to help you. Your project has been successfully started and saved in My Projects. Feel free to explore the preview and let me know if you need any further assistance or have any questions about Web3 and blockchain technologies.";
        handleComplete();
      }

      setMessages((prev) => [...prev, { type: "ai", text: aiResponse }]);
      setIsLoading(false);
    }, 1500);

    setUserInput("");
  };

  const handleComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
      toast.success("🚀 Blockchain project successfully created!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/my-projects");
    }, 3000);
  };

  // Add new animation for messages
  const messageAnimation = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  }

  return (
    <div className="p-4 bg-gradient-to-br from-[#3E78B2] to-[#004BA8] min-h-screen flex flex-col items-center">
      <motion.h1 
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="text-4xl font-bold text-white text-center mb-8"
      >
        Web3 Blockchain Project Creator
      </motion.h1>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={scaleIn}
          className="flex-1 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6"
        >
          <div className="h-[500px] overflow-y-auto space-y-4 mb-4 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={messageAnimation}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      msg.type === "user"
                        ? "bg-[#004BA8] text-white"
                        : "bg-white/80 text-[#004BA8]"
                    } shadow-lg backdrop-blur-sm`}
                  >
                    <p className="font-semibold">
                      {msg.type === "user" ? "You:" : "G-Chain AI:"}
                    </p>
                    <p>{msg.text}</p>
                    {msg.code && (
                      <motion.pre 
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        className="bg-gray-800 text-white p-4 rounded mt-2 overflow-x-auto text-sm"
                      >
                        <code>{msg.code}</code>
                      </motion.pre>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="flex gap-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your response..."
              className="flex-1 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border-2 border-[#004BA8] focus:outline-none focus:border-[#3E78B2] transition-colors"
              onKeyPress={(e) => e.key === "Enter" && handleUserInput()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUserInput}
              disabled={isLoading}
              className="px-6 py-2 bg-[#004BA8] text-white rounded-lg hover:bg-[#3E78B2] transition-colors shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Send"
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="initial"
          animate="animate"
          variants={scaleIn}
          className="flex-1 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Project Preview: {projectName}
          </h2>
          {showPreview ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger 
                    value="preview"
                    className="text-white hover:bg-[#3E78B2]/50 data-[state=active]:bg-[#004BA8]"
                  >
                    Preview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="code"
                    className="text-white hover:bg-[#3E78B2]/50 data-[state=active]:bg-[#004BA8]"
                  >
                    Code
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-[#3E78B2] rounded-lg p-4 h-[450px] overflow-y-auto custom-scrollbar bg-white/80"
                  >
                    <div dangerouslySetInnerHTML={{ __html: generatedHTML }} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="code">
                  <motion.pre 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-[#3E78B2] rounded-lg p-4 h-[450px] overflow-y-auto custom-scrollbar bg-gray-800/90 text-white text-sm"
                  >
                    <code>{generatedCode}</code>
                  </motion.pre>
                </TabsContent>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div 
              initial="initial"
              animate="animate"
              variants={fadeIn}
              className="flex justify-center items-center h-[500px] text-white/80"
            >
              Your Web3 project preview will appear here after setup
            </motion.div>
          )}
        </motion.div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default NewProject

// Add this CSS to your global styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #004BA8;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #3E78B2;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.3s ease-out;
  }
`;