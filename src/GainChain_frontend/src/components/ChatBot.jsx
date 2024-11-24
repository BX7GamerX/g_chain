import React, { useState } from 'react';
import chatbotAPI from '../services/Chatbot.js';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Fetch chatbot response
    const chatbotReply = await chatbotAPI.sendMessage(input);
    const botMessage = { sender: 'bot', text: chatbotReply };

    // Add bot reply to the chat
    setMessages((prev) => [...prev, botMessage]);

    // Clear input
    setInput('');
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Chat Messages */}
      <div className="p-4 h-80 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs text-white ${
                message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center border-t border-gray-200 p-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
