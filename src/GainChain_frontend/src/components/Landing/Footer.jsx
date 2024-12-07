import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome styles

export default function Footer() {
  return (
    <MDBFooter className="bg-[#03045E] text-white text-center py-4">
      <MDBContainer className="d-flex flex-column align-items-center">
        <section className="mb-4">
          <MDBBtn
            floating
            className="m-1"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            <FontAwesomeIcon icon={faFacebookF} size="lg" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            <FontAwesomeIcon icon={faGoogle} size="lg" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </MDBBtn>
        </section>

        <h5 className="mb-1" style={{ color: '#CAF0F8' }}>Gain Chain AI</h5>
        <p style={{ color: '#90E0EF', fontSize: '1rem' }}>Innovating the Future with AI and Blockchain</p>

        <div className="d-flex justify-content-center mb-3">
          <a href="#" className="mx-2" style={{ color: '#00B4D8' }}>Legal Stuff</a>
          <a href="#" className="mx-2" style={{ color: '#00B4D8' }}>Privacy Policy</a>
          <a href="#" className="mx-2" style={{ color: '#00B4D8' }}>Security</a>
          <a href="#" className="mx-2" style={{ color: '#00B4D8' }}>Website Accessibility</a>
          <a href="#" className="mx-2" style={{ color: '#00B4D8' }}>Manage Cookies</a>
        </div>

        <p className="mb-4" style={{ fontSize: '1rem', color: '#90E0EF' }}>
          Contact us: <a href="mailto:gainchainai@gmail.com" style={{ color: '#0077B6' }}>gainchainai@gmail.com</a>
        </p>

        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 Gain Chain. All rights reserved.
        </div>
      </MDBContainer>
    </MDBFooter>
  );
}
