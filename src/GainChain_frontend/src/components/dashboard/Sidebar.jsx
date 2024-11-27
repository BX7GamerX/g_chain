import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, LogOut } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, tabs, isOpen }) => {
  const mockData = {
    profilePicUrl: "https://via.placeholder.com/150/FF6347/FFFFFF?text=Profile",
    username: "John Doe",
    role: "Software Engineer",
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-64 min-h-screen overflow-y-auto fixed lg:static lg:translate-x-0 shadow-lg z-20"
    >
      {/* Profile Section */}
      <div className="px-6 py-4 flex items-center space-x-4 border-b dark:border-gray-700">
        <img
          src={mockData.profilePicUrl}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
        />
        <div>
          <h3 className="text-lg font-semibold">{mockData.username}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{mockData.role}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="mt-4 px-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab.label}
            whileHover={{ x: 5 }}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center space-x-3 py-3 px-4 w-full rounded-lg transition-colors ${
              activeTab === tab.label
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <tab.icon size={20} />
            <span className="text-sm font-medium">{tab.label}</span>
            {activeTab === tab.label && (
              <ChevronRight className="ml-auto" size={16} />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="mt-auto px-4 py-4 border-t dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 py-3 px-4 w-full rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
