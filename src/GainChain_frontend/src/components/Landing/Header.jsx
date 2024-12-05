import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import logo from "../../images/GAIN CHAIN AI.png";
import logo2 from "../../images/neuro.png";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to sections
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // Close menu on mobile
  };

  // Dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all ${
          sticky
            ? "bg-gradient-to-r from-blue-600 bg-opacity-90 backdrop-blur-md shadow-lg to-transparent"
            : "bg-gradient-to-r from-teal-400 to-blue-600 bg-opacity-90 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <img
            src={sticky ? logo2 : logo}
            alt="Logo"
            className={`transition-all duration-300 ${
              sticky ? "w-16 " : "w-20"
            } rounded-full`}
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              className="text-black hover:text-teal-500 transition-all"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </button>

            {/* Get Started Button */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white bg-teal-500 px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
              >
                Get Started
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md border z-50">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/signup");
                      setDropdownOpen(false);
                    }}
                  >
                    New Member
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/login");
                      setDropdownOpen(false);
                    }}
                  >
                    Log In
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-black text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ...
          </button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg z-40">
              <nav className="flex flex-col items-center space-y-6 py-6">
                <button
                  className="text-black hover:text-teal-500 transition-all"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact
                </button>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-white bg-teal-500 px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
                  >
                    Get Started
                  </button>

                  {/* Mobile Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="mt-2 w-48 bg-white shadow-lg rounded-md border z-50">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          navigate("/signup");
                          setDropdownOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        New Member
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          navigate("/login");
                          setDropdownOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        Log In
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
