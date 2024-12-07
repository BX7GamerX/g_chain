import React from 'react';

const ProjectFileSetupSection = ({ projectName }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-[#004BA8]">Set Up Your Project Files</h2>
      <p className="my-4 text-[#333333]">Project: {projectName}</p>
      <button className="bg-[#00bfae] text-white p-2 rounded mt-4">
        Set Up Files
      </button>
    </div>
  );
};

export default ProjectFileSetupSection;
