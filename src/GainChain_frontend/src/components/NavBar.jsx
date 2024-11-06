import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/GAIN CHAIN AI.png';  // Original logo
import logo2 from '../images/GAIN CHAIN.png';   // New logo on scroll
import './css/NavBar.css';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu state on click
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${sticky ? 'sticky' : ''}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <img
            src={sticky ? logo2 : logo}
            alt="Gain Chain Logo"
            className={`logo ${sticky ? 'sticky-logo' : ''}`}
          />
          {!sticky && (
            <div className="motto">
              <b>GAIN <br />CHAIN<br /> AI</b>
            </div>
          )}
        </div>

        {/* Hamburger Icon for Mobile Menu */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Mobile Menu */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li className="mobile-close" onClick={toggleMenu}>×</li>
          <li className="nav-item">
            <NavLink className="styled-link" exact to="/" activeClassName="active" onClick={toggleMenu}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="styled-link" to="/about" activeClassName="active" onClick={toggleMenu}>About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="styled-link" to="/services" activeClassName="active" onClick={toggleMenu}>GET STARTED</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
