import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, LogOut, User } from "lucide-react"; // Removed Settings icon
import { useTheme } from "../../context/ThemeContext"; // Import useTheme

const Sidebar = ({ activeTab, setActiveTab, tabs, isOpen }) => {
  const { darkMode, customColor } = useTheme(); // Get darkMode and customColor from context

  const mockData = {
    username: "John Doe",
    role: "Software Engineer",
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`w-64 min-h-screen overflow-y-auto fixed lg:static lg:translate-x-0 shadow-lg z-20 flex flex-col ${
        darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-[#333333]'
      }`}
    >
      {/* Profile Section */}
      <div className={`px-6 py-4 flex items-center space-x-4 border-b ${darkMode ? 'border-gray-700' : 'border-[#3E78B2]'}`}>
        <div className={`w-12 h-12 flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full border-2 ${darkMode ? 'border-gray-500' : `border-${customColor}`}`}>
          <User size={24} className={darkMode ? 'text-gray-300' : customColor} /> {/* Profile icon */}
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : customColor}`}>{mockData.username}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{mockData.role}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="mt-4 px-4 flex-1">
        {tabs.map((tab) => (
          tab.label !== "Settings" && ( // Exclude Settings tab
            <motion.button
              key={tab.label}
              whileHover={{ x: 5 }}
              onClick={() => setActiveTab(tab.label)}
              aria-label={`Navigate to ${tab.label}`}
              className={`flex items-center space-x-3 py-3 px-4 w-full rounded-lg transition-colors ${
                activeTab === tab.label
                  ? `bg-${customColor} text-gray-300 border-l-4 border-${customColor} shadow-md` // Highlight active tab
                  : darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <tab.icon size={20} className={darkMode ? 'text-gray-300' : customColor} />
              <span className={`text-sm font-medium ${activeTab === tab.label ? 'text-gray-300' : darkMode ? 'text-gray-300' : customColor}`}>{tab.label}</span>
              {activeTab === tab.label && (
                <ChevronRight className={`ml-auto ${darkMode ? 'text-gray-300' : customColor}`} size={16} />
              )}
            </motion.button>
          )
        ))}
      </nav>
      <style>
        {`
          .active-tab-light {
            background-color: ${customColor};
          }
          .active-tab-light span,
          .active-tab-light svg {
            color: blue !important;
          }
        `}
      </style>

      {/* Logout Section */}
      <div className={`px-4 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-[#3E78B2]'}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Logout"
          className={`flex items-center space-x-3 py-3 px-4 w-full rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} mt-4`}
        >
          <LogOut size={20} className={darkMode ? 'text-gray-300' : customColor} />
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : customColor}`}>Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;