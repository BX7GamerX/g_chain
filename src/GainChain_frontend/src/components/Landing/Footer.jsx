import React from 'react';
import { MDBFooter, MDBContainer, MDBIcon, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome styles

export default function Footer() {
  return (
    <MDBFooter
      style={{
        backgroundColor: '#001F54',
        color: '#FFFFFF',
        padding: '3rem 0',
      }}
      className="text-center"
    >
      <MDBContainer className="d-flex justify-content-between">
        {/* Left Side Content */}
        <div style={{ flex: 1 }}>
          {/* Logo and Name */}
          <div className="mb-4">
            <img
              src="src/images/neuro.png"
              alt="Gain Chain Logo"
              style={{
                height: '90px',
                width: '90px',
                marginBottom: '1rem',
              }}
            />
            <h5 style={{ color: '#FF4500', fontWeight: 'bold' }}>Gain Chain</h5>
            <p style={{ fontSize: '0.9rem', color: '#B0B0B0' }}>
              Empowering communities through blockchain technology.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h6 style={{ color: '#40E0D0', fontWeight: 'bold' }}>Contact Us</h6>
            <p style={{ fontSize: '0.9rem', color: '#B0B0B0' }}>
              Address: 123 Blockchain Ave, Nairobi, Kenya
            </p>
            <p style={{ fontSize: '0.9rem', color: '#B0B0B0' }}>
              Email: <a href="mailto:gainchainai@gmail.com" style={{ color: '#40E0D0' }}>gainchainai@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Right Side Content: Connect with us */}
        <div style={{ flex: 1, textAlign: 'right' }}>
          <h6 style={{ color: '#40E0D0', fontWeight: 'bold' }}>Connect with us</h6>
          <MDBContainer className="d-flex justify-content-end flex-wrap">
            <a
              href="https://linkedin.com/in/wendoh-joanne"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 mb-2"
            >
              <MDBIcon fab icon="linkedin" style={{ color: '#40E0D0', fontSize: '1.8rem' }} />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 mb-2"
            >
              <MDBIcon fab icon="twitter" style={{ color: '#00A7E1', fontSize: '1.8rem' }} />
            </a>
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 mb-2"
            >
              <MDBIcon fab icon="discord" style={{ color: '#40E0D0', fontSize: '1.8rem' }} />
            </a>
            <a
              href="https://telegram.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 mb-2"
            >
              <MDBIcon fab icon="telegram" style={{ color: '#00A7E1', fontSize: '1.8rem' }} />
            </a>
            <a
              href="https://wa.me/yourwhatsappnumber" // Replace with your actual WhatsApp number link
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 mb-2"
            >
              <MDBIcon fab icon="whatsapp" style={{ color: '#25D366', fontSize: '1.8rem' }} />
            </a>
            <a
              href="https://www.instagram.com/yourusername" // Replace with your actual Instagram link
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 mb-2"
            >
              <MDBIcon fab icon="instagram" style={{ color: '#C13584', fontSize: '1.8rem' }} />
            </a>
            <a
              href="https://openchat.org/yourchatlink" // Replace with your actual OpenChat link
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 mb-2"
            >
              <MDBIcon fab icon="chat" style={{ color: '#0084FF', fontSize: '1.8rem' }} />
            </a>
            <a
              href="mailto:gainchainai@gmail.com"
              className="mx-2 mb-2"
            >
              <MDBIcon fas icon="envelope" style={{ color: '#40E0D0', fontSize: '1.8rem' }} />
            </a>
          </MDBContainer>
        </div>
      </MDBContainer>

      {/* Footer Bottom */}
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#40E0D0' }}>
        <p>&copy; 2024 Gain Chain. All rights reserved.</p>
      </div>
    </MDBFooter>
  );
}
