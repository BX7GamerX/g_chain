import React from "react";
import { motion } from "framer-motion";
import { Bell, LogOut, Menu, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../context/ThemeContext';

const Header = ({ toggleSidebar, username, notificationCount }) => {
  const navigate = useNavigate(); // Initialize navigate function
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className={`px-6 py-4 sticky top-0 z-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-[#333333]'}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <span className={`text-gray-600 hover:text-[#004BA8] transition-colors`}>
              &#9776;
            </span>
          </button>
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#004BA8]'}`}>
              Welcome back, {username}!
            </h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="text-gray-500 hover:text-[#004BA8] transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="relative">
            <span className={`text-gray-500 cursor-pointer hover:text-[#004BA8] transition-colors`}>
              &#128276;
            </span>
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {notificationCount}
              </span>
            )}
          </div>
          <button
            className={`flex items-center text-gray-500 hover:text-[#004BA8] transition-colors`}
            aria-label="Logout"
            onClick={() => {
              // Handle logout logic here
            }}
          >
            <span className={`text-gray-500`}>
              &#x2716;
            </span>
            <span className="ml-2 text-sm font-medium hidden sm:inline">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
