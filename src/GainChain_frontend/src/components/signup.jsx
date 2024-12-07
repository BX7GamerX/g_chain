import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const SignUpPage = () => {
  // Handle Internet Identity Sign-In
  const handleInternetIdentityLogin = () => {
    console.log("Internet Identity login triggered.");
    // Check if toast.POSITION is available before using it
    if (toast && toast.POSITION) {
      toast.info("Redirecting to Internet Identity login...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } else {
      console.error("toast.POSITION is not defined");
    }
    // Redirect to the Internet Identity login page
    window.location.href = "https://identity.ic0.app/#authorize";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Half: Image Section with Teal Background */}
      <div className="w-full md:w-1/2 bg-teal-600 flex items-center justify-center">
        <div className="w-3/4 h-auto md:h-3/4 overflow-hidden rounded-lg shadow-lg">
          <img
            src="src/images/hand.jpg"
            alt="Sign Up Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Half: Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Create Your Account
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Choose a method to sign up and join our platform.
          </p>

          <div className="space-y-6">
            {/* Internet Identity Sign-In Button */}
            <button
              onClick={handleInternetIdentityLogin}
              className="w-full flex items-center justify-center py-3 px-4 text-white bg-teal-600 rounded-md font-semibold shadow-md hover:bg-teal-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 active:scale-95"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
                <path d="M12 6C9.24 6 7 8.24 7 11h2c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3v2c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
              </svg>
              Sign Up with Internet Identity
            </button>
          </div>

          {/* New Member Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-teal-600 font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
