import React from 'react';

function Profile() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    projects: [
      { id: 1, title: "Project Alpha", description: "A web application for task management." },
      { id: 2, title: "Project Beta", description: "A mobile app for social networking." },
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-2xl bg-gray-900 rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-4 text-yellow-500 text-center">My Profile</h2>
        
        {/* User Info Section */}
        <div className="mb-8 p-4 border-2 border-yellow-500 rounded-lg">
          <h3 className="text-xl font-semibold text-yellow-400">Name</h3>
          <p className="text-gray-300">{user.name}</p>

          <h3 className="text-xl font-semibold text-yellow-400 mt-4">Email</h3>
          <p className="text-gray-300">{user.email}</p>
        </div>

        {/* Projects Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-yellow-500">Projects</h3>
          <ul>
            {user.projects.map((project) => (
              <li key={project.id} className="mb-6 p-4 bg-gray-800 border-2 border-yellow-500 rounded-lg">
                <h4 className="font-bold text-lg text-yellow-400">{project.title}</h4>
                <p className="text-gray-300">{project.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
