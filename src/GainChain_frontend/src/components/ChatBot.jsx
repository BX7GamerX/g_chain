import React, { useState } from "react";
import chatbotAPI from "../services/Chatbot.js";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Determine bot's reply
    let chatbotReply;

    if (messages.length === 0) {
      // Respond with a greeting and intro if it's the first message
      chatbotReply =
        "Hello! Welcome to Gain Chain 🚀. Gain Chain is a decentralized social media platform where you can interact, share, and earn G-Chain coins securely. How can I assist you today?";
    } else {
      // Fetch chatbot response for other messages
      chatbotReply = await chatbotAPI.sendMessage(input);
    }

    // Simulate typing delay for realism
    setTimeout(() => {
      const botMessage = { sender: "bot", text: chatbotReply };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    // Clear input
    setInput("");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-gray-100 shadow-xl rounded-lg border border-gray-300">
      {/* Chat Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-bold text-center">Chat with Gain Chain</h2>
      </div>

      {/* Chat Messages */}
      <div className="p-4 h-96 overflow-y-auto space-y-4 bg-white">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Start the conversation...
          </p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-800 shadow-inner"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Typing Indicator */}
      <div
        className={`p-2 text-gray-500 text-sm italic ${
          messages.some((msg) => msg.sender === "bot" && msg.text === "...typing")
            ? "visible"
            : "invisible"
        }`}
      >
        Gain Chain Assistant is typing...
      </div>

      {/* Input Box */}
      <div className="flex items-center border-t border-gray-300 p-2 bg-gray-100">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
