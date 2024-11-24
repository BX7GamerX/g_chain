import React from 'react';
import { MDBFooter, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter
      style={{
        backgroundColor: '#001F54',
        color: '#FFFFFF',
        padding: '2rem 0',
      }}
      className="text-center"
    >
      {/* Logo and Name */}
      <div className="mb-3">
        <img
          src="../images/GAIN CHAIN.png"
          alt="Gain Chain Logo"
          style={{
            height: '50px',
            marginBottom: '0.5rem',
          }}
        />
        <h5 style={{ color: '#FF4500', fontWeight: 'bold', margin: 0 }}>Gain Chain</h5>
      </div>

      {/* Social Media Icons */}
      <MDBContainer className="d-flex justify-content-center">
        <a
          href="https://linkedin.com/in/wendoh-joanne"
          target="_blank"
          rel="noopener noreferrer"
          className="me-4"
        >
          <MDBIcon fab icon="linkedin" style={{ color: '#40E0D0', fontSize: '1.5rem' }} />
        </a>
        <a
          href="https://x.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="me-4"
        >
          <MDBIcon fab icon="twitter" style={{ color: '#00A7E1', fontSize: '1.5rem' }} />
        </a>
        <a
          href="https://discord.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="me-4"
        >
          <MDBIcon fab icon="discord" style={{ color: '#40E0D0', fontSize: '1.5rem' }} />
        </a>
        <a
          href="https://telegram.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="me-4"
        >
          <MDBIcon fab icon="telegram" style={{ color: '#00A7E1', fontSize: '1.5rem' }} />
        </a>
      </MDBContainer>

      {/* Footer Bottom */}
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#40E0D0' }}>
        © 2024 Gain Chain. All rights reserved.
      </div>
    </MDBFooter>
  );
}
