import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Blockchain-based Security',
    description: 'Gain Chain uses blockchain technology to ensure secure transactions and data integrity across all interactions.',
    icon: LockClosedIcon,
  },
  {
    name: 'Earn Rewards',
    description: 'Users can earn G-Chain coins through active engagement such as sharing, liking, and interacting with content.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Community Governance',
    description: 'Gain Chain is governed by the community, allowing users to participate in decision-making and platform improvements.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Transparent Finance',
    description: 'Gain Chain ensures transparency in all financial transactions and interactions, fostering trust and accountability.',
    icon: FingerPrintIcon,
  },
];

export default function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate the feature on the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // React Spring animation for hover effect
  const cardAnimation = useSpring({
    transform: activeFeature !== null ? 'scale(1.05)' : 'scale(1)',
    boxShadow: activeFeature !== null ? '0px 8px 20px rgba(0, 0, 0, 0.2)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
    config: { tension: 300, friction: 20 },
  });

  // React Spring animation for image overlay card
  const overlayAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div className="relative bg-white py-24 sm:py-32">
      {/* Fancy Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          Discover Our Amazing Features
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Explore how Gain Chain revolutionizes blockchain technology with transparency, rewards, and security.
        </p>
      </div>

      {/* Scattered Photos */}
      <div className="absolute -top-12 left-8 w-32 h-32">
        <img
          src="src/images/gainchain.png" // Replace with actual image paths
          alt="Decorative"
          className="rounded-xl shadow-lg rotate-6"
        />
      </div>
      <div className="absolute top-24 right-12 w-40 h-40">
        <img
          src="src/images/neuro.png"
          alt="Decorative"
          className="rounded-xl shadow-lg -rotate-3"
        />
      </div>
      <div className="absolute bottom-8 right-20 w-28 h-28">
        <img
          src="src/images/gainchain.png"
          alt="Decorative"
          className="rounded-xl shadow-lg -rotate-6"
        />
      </div>

      {/* Feature Cards */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap items-center">
          {/* Left: Feature Cards */}
          <div className="w-full lg:w-1/2 space-y-8">
            {features.map((feature, index) => (
              <animated.div
                key={index}
                style={index === activeFeature ? cardAnimation : undefined}
                className={`relative p-6 bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className="h-12 w-12 flex items-center justify-center bg-indigo-600 text-white rounded-full">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900">{feature.name}</h3>
                </div>
                {/* Description (Revealed on Hover) */}
                {activeFeature === index && (
                  <p className="mt-4 text-gray-600">{feature.description}</p>
                )}
              </animated.div>
            ))}
          </div>

          {/* Right: Feature Image */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="relative">
              <img
                src="src/images/aiimage.jpg" // Replace with your image
                alt="Features"
                className="rounded-lg shadow-lg object-cover w-full h-auto"
              />
              {/* Overlay Card */}
              <animated.div
                style={overlayAnimation}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-3/4 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg"
              >
                <p className="text-gray-900 text-lg font-medium text-center">
                  {features[currentIndex].name}: {features[currentIndex].description}
                </p>
              </animated.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
