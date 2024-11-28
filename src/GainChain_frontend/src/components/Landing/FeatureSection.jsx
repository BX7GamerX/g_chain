import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import React from 'react';

const features = [
  {
    name: 'Blockchain-based Security',
    description:
      'Gain Chain uses blockchain technology to ensure secure transactions and data integrity across all interactions.',
    icon: LockClosedIcon,
    image: 'path-to-feature-image-1.jpg', // Replace with actual image
  },
  {
    name: 'Earn Rewards',
    description:
      'Users can earn G-Chain coins through active engagement such as sharing, liking, and interacting with content.',
    icon: CloudArrowUpIcon,
    image: 'path-to-feature-image-2.jpg', // Replace with actual image
  },
  {
    name: 'Community Governance',
    description:
      'Gain Chain is governed by the community, allowing users to participate in decision-making and platform improvements.',
    icon: ArrowPathIcon,
    image: 'path-to-feature-image-3.jpg', // Replace with actual image
  },
  {
    name: 'Transparent Finance',
    description:
      'Gain Chain ensures transparency in all financial transactions and interactions, fostering trust and accountability.',
    icon: FingerPrintIcon,
    image: 'path-to-feature-image-4.jpg', // Replace with actual image
  },
];

export default function FeatureSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      {/* Header Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          {/* Add a header image here */}
          <img
            src="src/images/GAIN CHAIN -logo.png" // Replace with the actual image path
            alt="Blockchain Illustration"
            className="mx-auto w-full max-w-md rounded-lg shadow-lg"
          />
          <h2 className="text-base font-semibold text-indigo-600 mt-8">
            Welcome to Gain Chain
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
            Empowering You with Blockchain-Driven Finance
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Gain Chain offers a decentralized, secure, and transparent platform to manage your finances, earn rewards, and contribute to community governance.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature, index) => (
            <div key={feature.name} className="relative pl-16">
              {/* Feature Icon */}
              <div className="absolute left-0 top-0 flex items-center justify-center rounded-lg bg-indigo-600 p-3">
                <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <dt className="text-base font-semibold text-gray-900 mt-6">
                {feature.name}
              </dt>
              {/* Feature-specific image */}
              <img
                src={feature.image} // Use the correct image path
                alt={`${feature.name} illustration`}
                className="mt-4 w-full max-w-xs rounded-lg shadow-sm"
              />
              <dd className="mt-4 text-base text-gray-600">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
