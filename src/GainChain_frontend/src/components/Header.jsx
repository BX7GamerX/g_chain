import React from 'react';
import { User } from 'lucide-react'; // User icon from Lucide

const Header = ({ username, toggleSidebar, user }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md lg:px-8">
      <div className="flex items-center">
        {/* Hamburger Button (only visible on mobile) */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <span className="text-2xl">&#9776;</span> {/* Hamburger Icon */}
        </button>
        <h1 className="ml-4 text-xl font-bold text-gray-800">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <User className="text-gray-600" />
          <span className="ml-2">{username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
