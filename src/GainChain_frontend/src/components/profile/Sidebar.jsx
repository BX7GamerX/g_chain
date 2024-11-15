import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Optional: for navigation links
import { useLocation } from "react-router-dom"; // Optional: for active tab highlighting
import { Home, Folder, Search, FileText, HelpCircle, Calendar, Settings as SettingsIcon } from "lucide-react"; // Icons

const Sidebar = ({ activeTab, setActiveTab, tabs, isOpen, toggleSidebar }) => {
  return (
    <motion.div
      initial={{ x: 250 }}
      animate={{ x: isOpen ? 0 : 250 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="sidebar fixed top-0 right-0 z-50 h-full bg-gray-800 text-white w-64 overflow-y-auto lg:relative lg:w-64 lg:block lg:sticky lg:right-0 sm:w-full sm:h-auto sm:flex sm:flex-row sm:justify-between sm:space-x-4 sm:py-4 sm:items-center sm:bottom-0 sm:fixed sm:hidden"
    >
      {/* Sidebar Content */}
      <div className="flex flex-col lg:flex-row justify-between p-4 space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Logo and Hamburger Button (on mobile) */}
        <div className="flex justify-between items-center w-full">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white focus:outline-none"
          >
            <span className="text-2xl">&#9776;</span> {/* Hamburger Icon */}
          </button>
          <h2 className="text-2xl font-bold text-white">Gain Chain AI</h2>
        </div>

        {/* Navigation Links */}
        <nav className="lg:flex flex-col lg:flex-row w-full lg:space-x-4 space-y-4 lg:space-y-0">
          {tabs.map((tab, index) => (
            <li key={index} className="list-none">
              <button
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center px-4 py-2 w-full text-lg font-medium rounded-lg 
                  ${activeTab === tab.label ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
              >
                <tab.icon className="mr-3" />
                {tab.label}
              </button>
            </li>
          ))}
        </nav>
      </div>

      {/* For mobile, show just the icons at the bottom */}
      <div className="lg:hidden sm:flex flex-row justify-between items-center fixed bottom-0 w-full bg-gray-800 p-2 space-x-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center justify-center w-full p-2 text-lg font-medium rounded-lg ${
              activeTab === tab.label ? 'bg-gray-700 text-white' : 'text-gray-300'
            }`}
          >
            <tab.icon />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
