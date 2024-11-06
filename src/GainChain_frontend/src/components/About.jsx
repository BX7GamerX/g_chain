import React, { useState } from 'react';
import './css/About.css';
import Footer from './Footer';

const About = () => {
  const [showFullVision, setShowFullVision] = useState(false);
  const [showFullMission, setShowFullMission] = useState(false);

  const toggleVision = () => setShowFullVision(!showFullVision);
  const toggleMission = () => setShowFullMission(!showFullMission);

  return (
    <div className="about-page">
      <header className="about-headr">
        <section className="about-us">
          <h2>Who We Are</h2>
          <p>
            Urban Renewed Ltd is a one-stop construction development and engineering company delivering creative, cost-effective, and energy-efficient building engineering solutions. With over 15 years of experience, we have partnered and collaborated with registered building professionals, engineers, and contractors to offer our expertise in electrical and ICT services, plumbing, security systems, and civil & structural engineering.
          </p>
          <p>
            We are on a mission to drive positive change in the built environment, and our commitment to sustainability and innovation is at the heart of everything we do. By this, we are Edge Certified (DfGE), U.S. LEED Certified, and a member of the UN Global Compact.
          </p>
          <p>
            Since our inception, we have worked closely with clients in various sectors and project developments to provide services that are not only technically sound but also environmentally responsible. Our team of highly qualified engineers, financial analysts, and project managers brings a wealth of knowledge and experience in building convenient, unique, and modern projects.
          </p>
          <p>
            Our approach is grounded in strong ethical values, teamwork, and respect. We strive to build trust with our clients by delivering projects that meet and exceed expectations.
          </p>
        </section>
      </header>

      <section className="mission-vision">
      <div className="vision">
  <h2>VISION</h2>
  <p>
    {showFullVision
      ? (
        <>
          To be the real estate developer of choice creating affordable, sustainable, eco-friendly buildings in Africa.
          <br /><br />
          Achieving this vision requires a combination of strategic planning, partnerships, innovation, and deep knowledge of local markets. Below are the main key pointers driving us:
          <br /><br />
          1. <strong>Research & Feasibility Studies:</strong> Conducting extensive research on local real estate markets across Africa to understand the specific needs, preferences, and regulatory environments of each region.
          <br /><br />
          2. <strong>Focusing on Sustainable and Eco-Friendly Building Practices:</strong> Sourcing locally available, sustainable materials such as bamboo, compressed earth blocks, or recycled materials. Integrating solar power, rainwater harvesting, natural ventilation, and energy-efficient appliances in our projects.
          <br /><br />
          3. <strong>Green Certification Training:</strong> Gaining certifications such as LEED (Leadership in Energy and Environmental Design) or EDGE (Excellence in Design for Greater Efficiencies) to enhance our brand credibility in eco-friendly development.
          <br /><br />
          4. <strong>Leveraging Public-Private Partnerships:</strong> Collaborating with local governments and international organizations to access grants, subsidies, or land at lower costs, especially for affordable housing projects.
          <br /><br />
          5. <strong>Securing Funding:</strong> Utilizing an innovative blend of financing options, including traditional financing, impact investing, and other creative funding mechanisms.
        </>
      )
      : "To be the real estate developer of choice creating affordable, sustainable, eco-friendly buildings in Africa."
    }
  </p>
  <button className="read-more-btn" onClick={toggleVision}>
    {showFullVision ? "Read Less" : "Read More"}
  </button>
</div>


        <div className="purpose">
          <h2>MISSION</h2>
          <p>
            {showFullMission
              ? `To Offer Convenient, Unique and Modern building construction solutions through streamlined project management, transparent communication, and on-time delivery.
                
                Through collaboration with local real estate agencies, architects, engineers, contractors, and government bodies, it has helped us gain insights into regional trends, regulations, and potential project sites. Further, the use of Building Information Modeling (BIM) helps us plan and execute construction projects more efficiently, identify cost-saving opportunities, and ensure sustainable building practices are maintained throughout the project lifecycle.`
              : "To Offer Convenient, Unique and Modern building construction solutions through streamlined project management, transparent communication, and on-time delivery."}
          </p>
          <button className="read-more-btn" onClick={toggleMission}>
            {showFullMission ? "Read Less" : "Read More"}
          </button>
        </div>
      </section>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
