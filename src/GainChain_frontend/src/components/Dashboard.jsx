import React, { useState } from "react";
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
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import Overview from "../components/dashboard/Overview";
import CompanyProfile from "../components/dashboard/CompanyProfile";
import HelpCenter from "../components/dashboard/HelpCenter";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const mockEmployerData = {
    companyName: "Gain Chain Inc.",
    stats: {
      activeJobs: 12,
      applicants: 150,
      hires: 20,
    },
    profile: {
      name: "Gain Chain",
      location: "Nairobi, Kenya",
      industry: "Blockchain",
      description: "Decentralized social media platform for the future.",
    },
    faqs: [
      { question: "How to post a job?", answer: "Navigate to 'Overview' and click 'Add Job'." },
      { question: "How to track applicants?", answer: "Go to 'Overview' to view and manage applicants." },
    ],
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview stats={mockEmployerData.stats} />;
      case "Company Profile":
        return <CompanyProfile profile={mockEmployerData.profile} />;
      case "Help Center":
        return <HelpCenter faqs={mockEmployerData.faqs} />;
      default:
        return <Overview stats={mockEmployerData.stats} />;
    }
  };

  const tabs = [
    { icon: Home, label: "Overview" },
    { icon: Folder, label: "Company Profile" },
    { icon: HelpCircle, label: "Help Center" },
    { icon: Calendar, label: "Events" },
    { icon: Search, label: "Search" },
    { icon: FileText, label: "Reports" },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          companyName={mockEmployerData.companyName}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto bg-gray-800">
          <div className="container mx-auto px-6 py-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-6 text-orange-500">
                {activeTab}
              </h1>
              {renderContent()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
