import React, { useState } from "react";
import ProjectNameSection from "./ProjectNameSection";
import CodeGenerationPrompt from "./Codegeneration"; // Import the new prompt component
import BackendSection from "./BackendSection";
import FrontendCanvasSection from "./FrontendCanvasSection";
import ProjectFileSetupSection from "./ProjectFileSection";
import DeploymentSection from "./DeploymentSection";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import default styles for Toastify
import Logo from "../../images/neuro.png"; // Import your logo
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const NewProject = () => {
  const navigate = useNavigate(); // Hook for redirection
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [messages, setMessages] = useState([]); // State for chat messages
  const [userInput, setUserInput] = useState(""); // State for user input
  const [isLoading, setIsLoading] = useState(false); // State for loading animation
  const [isComplete, setIsComplete] = useState(false); // State for completion

  const handleUserInput = () => {
    if (userInput.trim() === "") return;

    setMessages((prev) => [...prev, { type: "user", text: userInput }]);
    setUserInput("");

    // AI responses based on the current step
    if (step === 1) {
      setMessages((prev) => [...prev, { type: "ai", text: "What is the name of your project?" }]);
      setStep(2);
    } else if (step === 2) {
      setProjectName(userInput);
      setMessages((prev) => [...prev, { type: "ai", text: "Great! Do you want to start with the backend or frontend?" }]);
      setStep(3);
    } else if (step === 3) {
      setMessages((prev) => [...prev, { type: "ai", text: "Let's start with the backend!" }]);
      setStep(4);
    } else if (step === 4) {
      // Proceed to backend section
      setMessages((prev) => [...prev, { type: "ai", text: "Now, let's set up the backend." }]);
      setStep(5);
    } else if (step === 5) {
      // Complete the process
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
      toast.success("Successfully saved in your projects!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "colored",
      });
      navigate("/my-projects"); // Redirect to My Projects
    }, 5000); // Simulate loading for 5 seconds
  };

  return (
    <div className="p-4 text-black bg-[#3E78B2] min-h-screen">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Project Setup Flow</h1>

      <ToastContainer />

      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <img src={Logo} alt="Loading..." className="animate-pulse w-32 h-32" />
        </div>
      )}

      {isComplete ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Project Completed!</h2>
          <p className="text-lg text-white">Your project files are ready.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto mb-4 overflow-y-auto h-96">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                <span className={`font-bold ${msg.type === "user" ? "text-[#004BA8]" : "text-[#3E78B2]"}`}>
                  {msg.type === "user" ? "You:" : "AI:"}
                </span>
                <span className={`block ${msg.type === "user" ? "bg-[#E0F7FA]" : "bg-[#F1F8E9]"} rounded-lg p-2 inline-block`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border rounded-lg p-2 mb-2 w-full max-w-md"
              placeholder="Type your response..."
            />
            <button
              className="bg-[#004BA8] text-white px-4 py-2 rounded hover:bg-[#3E78B2] transition"
              onClick={handleUserInput}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewProject;
