import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const OverviewPage = ({ user }) => {
  const [userData, setUserData] = useState([]);
  const [coinsData, setCoinsData] = useState([]);

  // Mock data for the graphs
  const activityData = [
    { name: "Jan", posts: 20, likes: 50, shares: 15 },
    { name: "Feb", posts: 25, likes: 60, shares: 20 },
    { name: "Mar", posts: 30, likes: 70, shares: 25 },
  ];

  const blockchainData = [
    { name: "Jan", coins: 10 },
    { name: "Feb", coins: 15 },
    { name: "Mar", coins: 20 },
  ];

  // Mock Fetch: Replace with API call
  useEffect(() => {
    setUserData(activityData); // Fetch activity data
    setCoinsData(blockchainData); // Fetch coins data
  }, []);

  return (
    <div className="bg-black text-teal-100 min-h-screen px-6 py-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Welcome, {user?.name || "User"}!
        </h1>
        <p className="mt-2 text-gray-300">
          Explore your activity and contributions in the Gain Chain AI and Blockchain community.
        </p>
      </div>

      {/* Graph Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Activity Graph */}
        <div className="bg-teal-900 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
          <LineChart
            width={400}
            height={250}
            data={userData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="posts" stroke="#00d1b2" strokeWidth={2} />
            <Line type="monotone" dataKey="likes" stroke="#4db6ac" strokeWidth={2} />
            <Line type="monotone" dataKey="shares" stroke="#26a69a" strokeWidth={2} />
          </LineChart>
        </div>

        {/* Blockchain Coins Graph */}
        <div className="bg-teal-900 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Earned G-Chain Coins</h2>
          <LineChart
            width={400}
            height={250}
            data={coinsData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="coins" stroke="#00d1b2" strokeWidth={2} />
          </LineChart>
        </div>
      </div>

      {/* Additional AI and Blockchain Highlights */}
      <div className="mt-12 bg-teal-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Community Highlights</h2>
        <ul className="text-gray-300 space-y-3">
          <li>📈 Total Active Users: <span className="text-teal-400">5,230</span></li>
          <li>🔗 Latest Blockchain Transactions: <span className="text-teal-400">1,045</span></li>
          <li>🤖 AI-Generated Insights: <span className="text-teal-400">123 summaries</span></li>
        </ul>
      </div>
    </div>
  );
};

export default OverviewPage;
