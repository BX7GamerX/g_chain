import React, { useEffect, useState } from "react";
import logo from "../../images/gainchain.png"; // Original logo
import logo2 from "../../images/neuro.png"; // New logo on scroll

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = () => {
    setSticky(window.scrollY > 50);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        sticky
          ? "bg-orange-200 bg-opacity-90 backdrop-blur-md shadow-lg h-[90px]"
          : "bg-white h-[110px]"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src={sticky ? logo2 : logo}
            alt="Logo"
            className={`transition-all duration-300 ${
              sticky ? "w-16 h-auto" : "rounded-full w-20 h-20"
            }`}
          />
          <div className={`font-bold transition-all duration-300`}>
            <span
              className={`${
                sticky
                  ? "text-gray-900 text-sm uppercase"
                  : "text-black text-xl uppercase"
              }`}
            >
              GainChain AI
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          <a
            href="/"
            className={`font-medium ${
              sticky ? "text-gray-700" : "text-black"
            } hover:text-orange-600 transition-colors`}
          >
            Home
          </a>
          <a
            href="/about"
            className={`font-medium ${
              sticky ? "text-gray-700" : "text-black"
            } hover:text-orange-600 transition-colors`}
          >
            About
          </a>
          <a
            href="/contact"
            className={`font-medium ${
              sticky ? "text-gray-700" : "text-black"
            } hover:text-orange-600 transition-colors`}
          >
            Contact
          </a>
          <div className="relative group">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Get Started
            </button>
            <div className="absolute left-0 hidden mt-2 bg-white shadow-lg rounded-lg group-hover:block">
              <a
                href="/signup"
                className="block px-4 py-2 text-gray-800 hover:text-orange-600"
              >
                New to GainChain? Sign Up
              </a>
              <a
                href="/login"
                className="block px-4 py-2 text-gray-800 hover:text-orange-600"
              >
                Already Have an Account? Log In
              </a>
            </div>
          </div>
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="lg:hidden flex flex-col items-end" onClick={toggleMenu}>
          <div className="space-y-1.5 cursor-pointer">
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } bg-white absolute left-0 right-0 shadow-lg`}
      >
        <ul className="flex flex-col items-center space-y-4 py-6">
          <li>
            <a
              href="/"
              className="text-gray-800 font-medium hover:text-orange-600 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-gray-800 font-medium hover:text-orange-600 transition-colors"
              onClick={toggleMenu}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-gray-800 font-medium hover:text-orange-600 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
