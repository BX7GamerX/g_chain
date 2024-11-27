import React from 'react';

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
];

const stats = [
  { name: 'Global Users', value: '1+' },
  { name: 'GCH Coins Circulated', value: '999,999,999+' },
  { name: 'Blockchain Sites Built', value: '1' },
  { name: 'Community-driven Governance', value: '100%' },
];

export default function GainChainOverview() {
  return (
    <div className="relative isolate overflow-hidden bg-[#001F3F] py-24 sm:py-32"> {/* Deep Navy Blue */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#00A7E1] via-[#40E0D0] to-[#FF4500] opacity-20" /> {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="src/images/login.jpg"
          alt="Gain Chain Background"
          className="h-full w-full object-cover opacity-10"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-bold tracking-tight text-white sm:text-7xl justify-center">
            Join the Gain Chain AI Revolution
          </h2>
          <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl">
            Empowering developers to build blockchain sites with AI, seamlessly. Earn and trade GCH Coins while connecting with our global community.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="hover:underline">
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base font-medium text-gray-300">{stat.name}</dt>
                <dd className="text-4xl font-bold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
