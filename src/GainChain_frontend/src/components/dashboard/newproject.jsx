import React, { useState } from "react";

const NewProject = () => {
  const [projectName, setProjectName] = useState("");

  const handleAddProject = () => {
    alert(`Project "${projectName}" added!`);
    setProjectName("");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Start a New Project</h2>
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Enter project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button
        onClick={handleAddProject}
        className="w-full bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600"
      >
        Add Project
      </button>
    </div>
  );
};

export default NewProject;
