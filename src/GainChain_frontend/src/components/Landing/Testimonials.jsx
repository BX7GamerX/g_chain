import React, { useEffect, useState } from "react";

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Gain Chain's AI-powered blockchain transforms user engagement and interaction with unmatched security.",
      name: "John Doe",
      role: "Blockchain Developer at Gain Chain",
      image: "", // Empty image URL
    },
    {
      quote: "Gain Chain’s decentralized protocols are revolutionizing how we think about blockchain security and scalability.",
      name: "Jane Smith",
      role: "AI Specialist at Gain Chain",
      image: "", // Empty image URL
    },
    {
      quote: "I love how Gain Chain allows users to earn while interacting with content on a fully decentralized platform.",
      name: "Alex Thompson",
      role: "Full-Stack Developer at Gain Chain",
      image: "", // Empty image URL
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [testimonials.length]);

  return (
    <section
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-12"
      style={{ backgroundColor: "#001F54" }} // Navy Blue
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,rgba(0,167,225,0.3),rgba(64,224,208,0.2))] opacity-80" />{" "}
      {/* Gradient: Cerulean to Turquoise */}
      <div className="mx-auto max-w-4xl text-center">
        <img
          alt="Gain Chain Logo"
          src="https://your-image-link-to-logo.png"
          className="mx-auto h-16"
        />
        <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
          What People Are Saying
        </h2>
        <p className="mt-4 text-lg text-blue-200 sm:mt-6">
          Join the conversation and discover how Gain Chain is reshaping blockchain technology.
        </p>

        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full px-4 sm:px-8 lg:px-12"
              >
                <div
                  className="p-8 rounded-xl shadow-lg"
                  style={{
                    backgroundColor: "#00A7E1", // Cerulean Blue
                  }}
                >
                  <blockquote className="text-center text-lg font-medium text-white sm:text-xl">
                    <p>“{testimonial.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-8 text-center">
                    <img
                      alt={testimonial.name}
                      src={
                        testimonial.image ||
                        "https://via.placeholder.com/150?text=No+Image"
                      } // Fallback to placeholder
                      className="mx-auto h-20 w-20 rounded-full object-cover border-4"
                      style={{ borderColor: "#FF4500" }} // Vibrant Orange-Red Border
                    />
                    <div className="mt-4 text-base text-white">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm" style={{ color: "#40E0D0" }}>
                        {testimonial.role}
                      </div>
                    </div>
                  </figcaption>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full ${
                currentIndex === index
                  ? "bg-orange-500" // Vibrant Orange-Red
                  : "bg-blue-300 hover:bg-blue-400"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
