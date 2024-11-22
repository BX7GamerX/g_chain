import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/profile/Sidebar"; // Sidebar Component
import Header from "../components/profile/Header"; // Header Component
import NewProject from "../components/profile/NewProject"; // Example Content
import MyProjects from "../components/profile/MyProjects"; // Example Content
import Research from "../components/profile/Research"; // Example Content
import MyReports from "../components/profile/MyReports"; // Example Content
import HelpCenter from "../components/profile/HelpCenter"; // Example Content
import Schedule from "../components/profile/Schedule"; // Example Content
import Settings from "../components/profile/Settings"; // Example Content
import { PlusCircle, Folder, Search, FileText, HelpCircle, Calendar, Settings as SettingsIcon } from "lucide-react"; // Icons

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("New Project");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user_id || !token) {
          throw new Error("user_id or token is missing");
        }
        const response = await axios.get(
          `http://127.0.0.1:5000/users/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [user_id, token]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const tabs = [
    { icon: PlusCircle, label: "New Project" },
    { icon: Folder, label: "My Projects" },
    { icon: Search, label: "Research" },
    { icon: FileText, label: "My Reports" },
    { icon: HelpCircle, label: "Help Center" },
    { icon: Calendar, label: "Schedule" },
    { icon: SettingsIcon, label: "Settings" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "New Project":
        return <NewProject />;
      case "My Projects":
        return <MyProjects />;
      case "Research":
        return <Research />;
      case "My Reports":
        return <MyReports />;
      case "Help Center":
        return <HelpCenter />;
      case "Schedule":
        return <Schedule />;
      case "Settings":
        return <Settings />;
      default:
        return <NewProject />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden ml-64 lg:ml-64 sm:ml-0">
        {/* Header */}
        <Header user={userData} toggleSidebar={toggleSidebar} username={username} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">{activeTab}</h1>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileDashboard;