import React from 'react';
import FeatureSection from './Landing/FeatureSection';
import BlockchainAI from './Landing/BlockChainAI';
import TestimonialSlider from './Landing/Testimonials';
import NewsSection from './Landing/NewsSection';
import Hero from './Landing/Hero';
import Header from './Landing/Header';
import Contact from './Landing/contact';
import Footer from './Landing/Footer';

const Landing = () => {
  return (
    <div className="bg-[#1B3022] text-white">
        <Header />
        <Hero className="bg-[#395756] py-20">
            <img src="path/to/your/ai-image.png" alt="AI Illustration" className="mx-auto" />
        </Hero>
        <FeatureSection />
        <BlockchainAI />
        <TestimonialSlider />
        <Contact />
        <NewsSection />
        <Footer />
    </div>
  )
}

export default Landing