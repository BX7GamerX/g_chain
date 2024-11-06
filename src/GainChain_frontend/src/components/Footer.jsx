import React from 'react';
import './css/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../images/GAIN CHAIN AI.png'; 

const Footer = () => {
  return (
  
    <footer id="general-footer-unique">
  {/* Removed the hr */}
  <div id="footer-content-unique">
    <div id="logo-footer-unique">
      <img src={logo} alt="Logo" id="footer-logo-unique" />
    </div>

    {/* Social Media Section with For More Info */}
    <div id="social-media-section-unique">
      <h4>For more information:</h4>
      <div id="social-media-unique">
        <a href="https://web.facebook.com/UrbanRenewedLtd/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} />
        </a>
        <a href="https://x.com/urbanrenewed?lang=en" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={30} />
        </a>
        <a href="https://www.instagram.com/urbanrenewedltd?igshid=MzRlODBiNWFlZA%3D%3D" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} />
        </a>
      </div>
    </div>

    {/* Contact Info */}
    <div id="contact-info-unique">
      <p>Contact us:</p>
      <p>Phone: +254 733 976 958</p>
      <p>Email: info@urbanrenewed.co.ke</p>
    </div>
    <div id="footer-bottom-unique">
      <p>&copy; 2024 Urban Renewed Limited. All Rights Reserved.</p>
    </div>
  </div>
</footer>
  );
};

export default Footer;
