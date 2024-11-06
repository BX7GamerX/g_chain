import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';

function Signup() {
  // Handle II Authentication here (placeholder for now)
  const handleIIAuth = () => {
    console.log("Initiate Internet Identity Login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto my-5 px-5">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Signup Form */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">Sign up now</h2>
            <p className="text-center text-gray-500 mb-6">
              Already have an account? <a href="/login" className="text-blue-500">LOGIN</a>
            </p>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />

            <div className="flex items-center justify-center mb-4">
              <input type="checkbox" id="newsletter" className="mr-2" />
              <label htmlFor="newsletter" className="text-gray-600">
                Subscribe to our newsletter
              </label>
            </div>

            <button
              onClick={handleIIAuth}
              className="w-full py-3 mb-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Sign up with Internet Identity
            </button>

            <button
              className="w-full py-3 mb-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Sign up
            </button>

            <div className="text-center text-gray-600 mt-4">
              <p>or sign up with:</p>
              <div className="flex justify-center gap-4 mt-3">
                <a href="#" className="text-blue-600">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-blue-400">
                  <FaTwitter />
                </a>
                <a href="#" className="text-red-500">
                  <FaGoogle />
                </a>
                <a href="#" className="text-gray-800">
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Signup;
