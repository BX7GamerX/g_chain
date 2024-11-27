import React from "react";

const ChatSection = ({ messages }) => (
  <div className="bg-gray-700 p-6 rounded-md shadow-md">
    <h3 className="text-xl font-bold text-orange-500 mb-4">Chat Section</h3>
    <ul>
      {messages.map((msg, index) => (
        <li key={index} className="mb-3">
          <strong>{msg.sender}:</strong> {msg.message}
        </li>
      ))}
    </ul>
    <div className="mt-4">
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
      />
      <button className="bg-orange-500 text-white py-2 px-4 mt-2 rounded-md">
        Send
      </button>
    </div>
  </div>
);

export default ChatSection;
