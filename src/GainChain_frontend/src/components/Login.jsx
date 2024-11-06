import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate a successful login
    navigate('/profile'); // Redirect to Profile page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">

          {/* Image Section */}
          <div className="md:w-1/3 hidden md:block">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="phone"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-2/3 p-8">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign In</h2>
            
            <div className="space-y-4">
              <input
                type="email"
                id="form1"
                placeholder="Email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-100"
              />
              
              <input
                type="password"
                id="form2"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
            </div>

            <button
              onClick={handleLogin} // Trigger redirect on click
              className="w-full mt-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Sign in
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
