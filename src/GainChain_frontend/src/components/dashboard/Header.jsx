import React from "react";
import { motion } from "framer-motion";
import { Bell, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, username, notificationCount }) => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <Menu
              className="text-gray-600 hover:text-teal-500 transition-colors"
              size={24}
            />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Welcome back, {username}!
            </h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell
              className="text-gray-500 cursor-pointer hover:text-teal-500 transition-colors"
              size={20}
              aria-label="Notifications"
            />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {notificationCount}
              </span>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer flex items-center text-gray-500 hover:text-teal-500 transition-colors"
            aria-label="Logout"
            onClick={() => {
              // Handle logout logic here
            }}
          >
            <LogOut size={18} />
            <span className="ml-2 text-sm font-medium hidden sm:inline">
              Logout
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
