// MyProjects.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch user's projects (you may need to adjust the API endpoint)
    const fetchProjects = async () => {
      const response = await axios.get(`/api/projects`);
      setProjects(response.data);
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>My Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyProjects;
