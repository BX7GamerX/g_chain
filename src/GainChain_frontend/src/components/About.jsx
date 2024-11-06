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
            Gain Chain AI is a cutting-edge decentralized platform that integrates Artificial Intelligence and blockchain to revolutionize the way users interact with digital content. Our goal is to empower individuals and communities to engage with content more meaningfully while earning rewards for their participation. By leveraging AI, blockchain, and innovative data-sharing technologies, we are creating a fair and secure ecosystem for users across the globe.
          </p>
          <p>
            With a commitment to privacy, security, and community governance, Gain Chain AI seeks to ensure that users control their own data and are rewarded for their interactions. Our platform uses the Internet Computer Protocol (ICP) and other decentralized technologies to create a seamless and user-friendly experience for people to earn digital assets as they engage with content.
          </p>
          <p>
            Our team consists of passionate professionals from diverse fields, including AI, blockchain, data science, and software development. We are dedicated to creating a platform that is not only innovative but also sustainable, ensuring that the ecosystem benefits both users and the broader digital landscape.
          </p>
          <p>
            Our approach is driven by principles of transparency, inclusivity, and innovation. We aim to build a platform that serves the needs of everyday users, from creators to everyday consumers, by ensuring that everyone can participate in the digital economy and benefit from it.
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
                  To be the leading decentralized platform that empowers users to participate in the digital economy through AI-driven insights, community governance, and blockchain technology.
                  <br /><br />
                  Our vision is to create an inclusive, sustainable, and secure ecosystem for digital content engagement where users earn rewards for meaningful interactions. We achieve this through:
                  <br /><br />
                  1. <strong>AI-Driven Insights:</strong> Leveraging artificial intelligence to provide users with personalized content recommendations, data insights, and rewards based on their interactions.
                  <br /><br />
                  2. <strong>Blockchain Technology:</strong> Ensuring transparency and security in all transactions, enabling users to trust the platform with their data and interactions.
                  <br /><br />
                  3. <strong>Community Governance:</strong> Allowing users to have a say in the platform's development and decision-making through decentralized governance mechanisms.
                  <br /><br />
                  4. <strong>Inclusive Participation:</strong> Creating an open platform where users from all backgrounds can engage, earn rewards, and contribute to the growth of the ecosystem.
                  <br /><br />
                  5. <strong>Sustainable Growth:</strong> Focusing on long-term growth strategies, fostering partnerships, and utilizing innovative technologies to ensure that the platform scales responsibly.
                </>
              )
              : "To be the leading decentralized platform that empowers users to participate in the digital economy through AI-driven insights, community governance, and blockchain technology."
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
              ? `To revolutionize the digital economy by providing a decentralized platform where users can engage with content, earn rewards, and participate in governance decisions in a transparent, secure, and user-centric ecosystem.
                
                Our mission is to leverage the power of AI and blockchain to create a more equitable and rewarding digital experience for everyone. By working with global communities, technology experts, and industry leaders, Gain Chain AI is building the next generation of digital platforms that align with the values of fairness, transparency, and decentralization.`
              : "To revolutionize the digital economy by providing a decentralized platform where users can engage with content, earn rewards, and participate in governance decisions in a transparent, secure, and user-centric ecosystem."}
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
