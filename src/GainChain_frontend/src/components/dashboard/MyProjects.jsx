import React from "react";

const MyProjects = ({ projects }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">My Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li
            key={index}
            className="border-b py-2 flex justify-between items-center"
          >
            <span>{project.name}</span>
            <span className={`text-sm ${project.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>
              {project.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProjects;
