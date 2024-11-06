import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

// Placeholder images
const flowchartImage = "path/to/flowchart.jpg"; // Replace with actual image path
const benefitsImage = "path/to/benefits.jpg"; // Replace with actual image path
const techStackImage = "path/to/tech-stack.jpg"; // Replace with actual image path
const clientImage = "path/to/client.jpg"; // Replace with actual image path

// AnimatedSection Component (for animation purposes)
const AnimatedSection = ({ children }) => {
  return (
    <div className="transition-all duration-500 transform hover:scale-105">
      {children}
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <AnimatedSection>
      <section className="bg-black text-gold py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Gain Chain AI</h1>
          <p className="text-lg md:text-xl mb-6">Transform your website or app into a decentralized platform using AI and blockchain technology.</p>
          <button className="bg-gold text-black py-2 px-6 rounded-full hover:bg-yellow-500 transition">Get Started</button>
        </div>
      </section>
    </AnimatedSection>
  );
};

// How It Works Section
const HowItWorks = () => {
  return (
    <AnimatedSection>
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">How Gain Chain AI Works</h2>
          <p className="text-center mb-6">Gain Chain AI uses advanced AI algorithms to convert your regular website or app into a decentralized platform seamlessly.</p>
          <ul className="space-y-4 text-center">
            <li>Step 1: Integrate with your platform</li>
            <li>Step 2: AI scans and analyzes your site/app</li>
            <li>Step 3: Smart contracts are generated</li>
            <li>Step 4: Blockchain integration completes the decentralization</li>
          </ul>
          <img className="mt-8 mx-auto rounded-lg shadow-lg" src={flowchartImage} alt="Process Flow" />
        </div>
      </section>
    </AnimatedSection>
  );
};

// Benefits Section
const BenefitsSection = () => {
  return (
    <AnimatedSection>
      <section className="bg-black text-gold py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Gain Chain AI?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="benefit bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Decentralized Control</h3>
              <p>Maintain full control over your data and operations.</p>
            </div>
            <div className="benefit bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Improved Security</h3>
              <p>Blockchain ensures your app or website is more secure.</p>
            </div>
            <div className="benefit bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Cost-Efficiency</h3>
              <p>Save money by reducing reliance on centralized servers and infrastructure.</p>
            </div>
          </div>
          <img className="mt-8 mx-auto rounded-lg shadow-lg" src={benefitsImage} alt="Blockchain Benefits" />
        </div>
      </section>
    </AnimatedSection>
  );
};

// Technology Stack Section
const TechStack = () => {
  return (
    <AnimatedSection>
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Technology Stack</h2>
          <p className="text-center mb-6">Gain Chain AI utilizes the latest AI models and blockchain technology to decentralize your app or website.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="stack-item bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">AI (LLM)</h3>
              <p>We use advanced LLMs for seamless integration and conversion.</p>
            </div>
            <div className="stack-item bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Blockchain</h3>
              <p>Blockchain ensures transparency, security, and decentralized control.</p>
            </div>
          </div>
          <img className="mt-8 mx-auto rounded-lg shadow-lg" src={techStackImage} alt="Technology Stack" />
        </div>
      </section>
    </AnimatedSection>
  );
};

// Customer Testimonials Section
const Testimonials = () => {
  return (
    <AnimatedSection>
      <section className="bg-black text-gold py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">What Our Clients Say</h2>
          <div className="testimonial bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <p className="mb-4">"Gain Chain AI revolutionized our app with seamless decentralization!"</p>
            <span>- Company Name</span>
            <img className="mt-4 mx-auto rounded-full w-16 h-16" src={clientImage} alt="Client" />
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
      <section className="bg-gold text-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready to Transform Your Platform?</h2>
          <p className="mb-8">Get started with Gain Chain AI today and decentralize your website or app with ease.</p>
          <button className="bg-black text-gold py-2 px-6 rounded-full hover:bg-gray-800 transition">Get Started</button>
        </div>
      </section>
    </AnimatedSection>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white">
      <NavBar />
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
