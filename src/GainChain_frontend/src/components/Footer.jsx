import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/Footer.css';
import logo from '../images/GAIN CHAIN AI.png'; 

const Footer = () => {
  const location = useLocation();

  // Check if the current path is the homepage
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <footer id="general-footer-unique">
      {/* Footer content */}
      <div id="footer-content-unique">
        <div id="logo-footer-unique">
          <img src={logo} alt="Gain Chain AI Logo" id="footer-logo-unique" />
        </div>

        {/* Blockchain Hackathon Information */}
        <div id="hackathon-info-unique">
          <h4>For the Blockchain Hackathon 2024:</h4>
          <p>
            Gain Chain AI is proudly participating in the Blockchain Hackathon 2024, pushing the boundaries of innovation in decentralized technologies.
          </p>
        </div>

        {/* Footer Bottom */}
        <div id="footer-bottom-unique">
          <p>&copy; 2024 Gain Chain AI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
