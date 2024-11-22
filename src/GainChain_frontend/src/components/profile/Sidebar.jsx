import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Folder,
  Search,
  FileText,
  HelpCircle,
  Calendar,
  Settings as SettingsIcon,
} from "lucide-react"; // Icons

const Sidebar = ({ activeTab, setActiveTab, tabs, isOpen, toggleSidebar }) => {
  return (
    <motion.div
      initial={{ x: 250 }}
      animate={{ x: isOpen ? 0 : 250 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="fixed top-0 right-0 z-50 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg lg:relative lg:w-64 lg:block lg:sticky lg:right-0 sm:w-full sm:h-auto sm:flex sm:flex-row sm:justify-between sm:items-center sm:fixed sm:bottom-0"
    >
      {/* Sidebar Content */}
      <div className="flex flex-col justify-between h-full p-6 space-y-6 sm:space-y-0">
        {/* Profile Section */}
        <div className="flex items-center space-x-4 sm:space-x-0 sm:flex-col sm:items-start">
          {/* Profile Photo */}
          <div className="w-16 h-16 bg-gray-600 rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="text-gray-400 text-xl">👤</span>
          </div>
          {/* User Info */}
          <div className="flex flex-col sm:mt-2">
            <h3 className="text-lg font-bold text-gray-100 sm:text-base">User Name</h3>
            <p className="text-sm text-gray-400 sm:text-xs">View Profile</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 sm:mt-4">
          {tabs.map((tab, index) => (
            <li key={index} className="list-none">
              <button
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center px-4 py-3 w-full text-lg font-semibold rounded-lg transition-colors duration-200 ${
                  activeTab === tab.label
                    ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <tab.icon className="mr-4 w-6 h-6" />
                {tab.label}
              </button>
            </li>
          ))}
        </nav>

        {/* Footer: Settings */}
        <div className="mt-auto space-y-2 sm:mt-6 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <button className="flex items-center px-4 py-3 w-full text-lg font-semibold text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <SettingsIcon className="mr-4 w-6 h-6" />
            Settings
          </button>
        </div>
      </div>

      {/* Mobile Navbar at the bottom */}
      <div className="lg:hidden flex flex-row justify-between items-center fixed bottom-0 w-full bg-gradient-to-b from-gray-800 to-gray-900 p-2 shadow-lg">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center justify-center w-full p-3 text-lg font-medium transition-colors duration-200 ${
              activeTab === tab.label
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
          >
            <tab.icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
