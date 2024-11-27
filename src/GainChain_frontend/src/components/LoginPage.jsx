import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Handle Google Login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google token:", tokenResponse);
      // Navigate to profile page after successful login
      navigate("/profile");
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  // Handle Internet Identity Login
  const handleInternetIdentityLogin = () => {
    console.log("Internet Identity login triggered.");
    alert("Logged in with Internet Identity (mock data).");
    // Navigate to profile page after successful login
    navigate("/profile");
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left Half: Login Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-teal-900 px-8 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Log in to your account and continue where you left off.
          </p>

          <div className="space-y-6">
            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center py-3 px-4 text-white bg-teal-600 hover:bg-teal-700 rounded-md font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300 transform transition-transform hover:scale-105 duration-300"
            >
              {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google Logo"
                className="w-6 h-6 mr-2"
              /> */}
              Log in with Google
            </button>

            {/* Internet Identity Login Button */}
            <button
              onClick={handleInternetIdentityLogin}
              className="w-full flex items-center justify-center py-3 px-4 text-white bg-teal-500 hover:bg-teal-600 rounded-md font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300 transform transition-transform hover:scale-105 duration-300"
            >
              {/* <img
                src="https://internetcomputer.org/assets/logos/icp-logo.svg"
                alt="ICP Logo"
                className="w-6 h-6 mr-2"
              /> */}
              Log in with Internet Identity
            </button>
          </div>

          <p className="text-center text-gray-300 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-teal-400 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>

      {/* Right Half: Image Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-teal-800">
        <img
          src="src/images/login.jpg"
          alt="Login Illustration"
          className="w-4/5 h-3/4 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default LoginPage;
