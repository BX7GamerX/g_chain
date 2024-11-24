import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Settings, LogOut } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, tabs, isOpen }) => {
  console.log("Sidebar render", { activeTab, isOpen, tabs });

  // Mock data
  const mockData = {
    profilePicUrl: "https://via.placeholder.com/150/FF6347/FFFFFF?text=Profile", // Mock profile picture URL
    username: "John Doe", // Mock username
    role: "Software Engineer", // Mock role
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white w-64 min-h-screen overflow-y-auto fixed lg:static lg:translate-x-0 shadow-lg z-20"
    >
      <div className="px-6 py-4 flex items-center space-x-4">
        <img
          src={mockData.profilePicUrl} // Using mock profile picture URL
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{mockData.username}</h3>
          <p className="text-sm text-gray-600">{mockData.role}</p>
        </div>
      </div>
      
      <nav className="mt-8 px-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab.label}
            whileHover={{ x: 5 }}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center space-x-3 py-3 px-4 w-full rounded-lg transition-colors ${
              activeTab === tab.label
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
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

      {/* Settings and Logout section */}
      <div className="mt-auto px-4 py-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 py-3 px-4 w-full rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
        >
          <Settings size={20} />
          <span className="text-sm font-medium">Settings</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 py-3 px-4 w-full rounded-lg transition-colors text-gray-600 hover:bg-gray-100 mt-3"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
