import React,{ useEffect, useState } from 'react';

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      quote: "Gain Chain's AI-powered blockchain transforms user engagement and interaction with unmatched security.",
      name: "John Doe",
      role: "Blockchain Developer at Gain Chain",
      image: "https://images.unsplash.com/photo-1502720705681-b4c9d0857462?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg2MXwwfDF8c2VhY2h8NXx8c3BhY2V8ZW58MHx8fHwxNjg0MjkzNzE5&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "Gain Chain’s decentralized protocols are revolutionizing how we think about blockchain security and scalability.",
      name: "Jane Smith",
      role: "AI Specialist at Gain Chain",
      image: "https://images.unsplash.com/photo-1560846541-8fca5a5c9ea0?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg2MXwwfDF8c2VhY2h8Nnx8c2VjdXJpdHklMjBhcHBsaWNhdGlvbnx8ZW58MHx8fHwxNjg0MjkzNzE5&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "I love how Gain Chain allows users to earn while interacting with content on a fully decentralized platform.",
      name: "Alex Thompson",
      role: "Full-Stack Developer at Gain Chain",
      image: "https://images.unsplash.com/photo-1591538288770-8f9fc7f9e0ff?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjg2MXwwfDF8c2VhY2h8MXx8ZnVsbC1zdGFjayUyMGRldmVsb3BtZW50fGVufDB8fHx8fDE2ODQyOTM3MTk&ixlib=rb-4.0.3&q=80&w=1080"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleMouseEnter = () => {
    clearInterval(); // Pause the slider on hover
  };

  const handleMouseLeave = () => {
    setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Resume the slider on hover exit
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-24 sm:py-32 lg:px-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img
          alt="Gain Chain Logo"
          src="https://your-image-link-to-logo.png"
          className="mx-auto h-12"
        />
        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-full mx-2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <blockquote className="text-center text-xl font-semibold text-gray-900 sm:text-2xl">
                    <p>“{testimonial.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-10 text-center">
                    <img
                      alt={testimonial.name}
                      src={testimonial.image}
                      className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-white"
                    />
                    <div className="mt-4 text-base text-gray-900">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </figcaption>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
