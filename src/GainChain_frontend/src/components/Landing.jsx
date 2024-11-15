import React from 'react';
import FeatureSection from './Landing/FeatureSection';
import BlockchainAI from './Landing/BlockChainAI';
import TestimonialSlider from './Landing/Testimonials';
import NewsSection from './Landing/NewsSection';
import Hero from './Landing/Hero';
import Header from './Landing/Header';


const Landing = () => {
  return (
    <div>
        <Header />
        <Hero />
        <FeatureSection />
        <BlockchainAI />
        <TestimonialSlider />
        <NewsSection />
    </div>
  )
}

export default Landing