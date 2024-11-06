import React from "react";
import './css/HomePage.css';
import Footer from "./Footer";
// Placeholder images
const flowchartImage = "path/to/flowchart.jpg"; // Replace with actual image path
const benefitsImage = "path/to/benefits.jpg"; // Replace with actual image path
const techStackImage = "path/to/tech-stack.jpg"; // Replace with actual image path
const clientImage = "path/to/client.jpg"; // Replace with actual image path

// AnimatedSection Component (for animation purposes)
const AnimatedSection = ({ children }) => {
  return (
    <div className="animated-section">
      {children}
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <AnimatedSection>
      <section className="hero">
        <div className="container">
          <h1>Welcome to Gain Chain AI</h1>
          <p>Transform your website or app into a decentralized platform using AI and blockchain technology.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

// How It Works Section
const HowItWorks = () => {
  return (
    <AnimatedSection>
      <section className="how-it-works">
        <div className="container">
          <h2>How Gain Chain AI Works</h2>
          <p>Gain Chain AI uses advanced AI algorithms to convert your regular website or app into a decentralized platform seamlessly.</p>
          <ul className="steps-list">
            <li>Step 1: Integrate with your platform</li>
            <li>Step 2: AI scans and analyzes your site/app</li>
            <li>Step 3: Smart contracts are generated</li>
            <li>Step 4: Blockchain integration completes the decentralization</li>
          </ul>
          <img src={flowchartImage} alt="Process Flow" />
        </div>
      </section>
    </AnimatedSection>
  );
};

// Benefits Section
const BenefitsSection = () => {
  return (
    <AnimatedSection>
      <section className="benefits-section">
        <div className="container">
          <h2>Why Choose Gain Chain AI?</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <h3>Decentralized Control</h3>
              <p>Maintain full control over your data and operations.</p>
            </div>
            <div className="benefit">
              <h3>Improved Security</h3>
              <p>Blockchain ensures your app or website is more secure.</p>
            </div>
            <div className="benefit">
              <h3>Cost-Efficiency</h3>
              <p>Save money by reducing reliance on centralized servers and infrastructure.</p>
            </div>
          </div>
          <img src={benefitsImage} alt="Blockchain Benefits" />
        </div>
      </section>
    </AnimatedSection>
  );
};

// Technology Stack Section
const TechStack = () => {
  return (
    <AnimatedSection>
      <section className="tech-stack">
        <div className="container">
          <h2>Our Technology Stack</h2>
          <p>Gain Chain AI utilizes the latest AI models and blockchain technology to decentralize your app or website.</p>
          <div className="stack-grid">
            <div className="stack-item">
              <h3>AI (LLM)</h3>
              <p>We use advanced LLMs for seamless integration and conversion.</p>
            </div>
            <div className="stack-item">
              <h3>Blockchain</h3>
              <p>Blockchain ensures transparency, security, and decentralized control.</p>
            </div>
          </div>
          <img src={techStackImage} alt="Technology Stack" />
        </div>
      </section>
    </AnimatedSection>
  );
};

// Customer Testimonials Section
const Testimonials = () => {
  return (
    <AnimatedSection>
      <section className="testimonials">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <p>"Gain Chain AI revolutionized our app with seamless decentralization!"</p>
              <span>- Company Name</span>
              <img src={clientImage} alt="Client" />
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

// Call to Action Section
const CallToAction = () => {
  return (
    <AnimatedSection>
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Platform?</h2>
          <p>Get started with Gain Chain AI today and decentralize your website or app with ease.</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </section>
    </AnimatedSection>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <BenefitsSection />
      <TechStack />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
