import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram} from 'react-icons/fa';
import './css/FooterStrip.css';

const FooterStrip = () => {
  return (
    <div className="footer-strip">
      {/* Left side: Navigation Links */}
      <div className="footer-strip-left">
      <a href="https://web.facebook.com/UrbanRenewedLtd/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="footer-icon" />
        </a>
        <a href="https://x.com/urbanrenewed?lang=en" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="footer-icon" />
        </a>
        <a href="https://www.instagram.com/urbanrenewedltd?igshid=MzRlODBiNWFlZA%3D%3D" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="footer-icon" />
        </a>
        

      </div>

      {/* Right side: Social Media Links */}
      <div className="footer-strip-right">
       
      <a href="#">Urban Renewed Limited</a>
      </div>
    </div>
  );
};

export default FooterStrip;
