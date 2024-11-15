import React from 'react';

const FooterSection = () => {
  return (
    <footer className="bg-dark-purple text-white py-8 px-6 md:px-12 text-center">
      <p className="mb-4">&copy; 2024 Gain Chain. All Rights Reserved.</p>
      <div className="space-x-4">
        <a href="#" className="text-light-cyan hover:text-white">Facebook</a>
        <a href="#" className="text-light-cyan hover:text-white">Twitter</a>
        <a href="#" className="text-light-cyan hover:text-white">LinkedIn</a>
      </div>
    </footer>
  );
};

export default FooterSection;
