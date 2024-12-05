import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import the profile icon
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import default styles for Toastify

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newTestimonial, setNewTestimonial] = useState({ quote: "", name: "", role: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const testimonials = [
    {
      quote: "Gain Chain's AI-powered blockchain transforms user engagement and interaction with unmatched security.",
      name: "John Doe",
      role: "Blockchain Developer at Gain Chain",
      image: "", // Placeholder for an image URL
    },
    {
      quote: "Gain Chain’s decentralized protocols are revolutionizing how we think about blockchain security and scalability.",
      name: "Jane Smith",
      role: "AI Specialist at Gain Chain",
      image: "", // Placeholder for an image URL
    },
    {
      quote: "I love how Gain Chain allows users to earn while interacting with content on a fully decentralized platform.",
      name: "Alex Thompson",
      role: "Full-Stack Developer at Gain Chain",
      image: "", // Placeholder for an image URL
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial({ ...newTestimonial, [name]: value });
  };

  const handleAddTestimonial = () => {
    if (newTestimonial.quote && newTestimonial.name && newTestimonial.role) {
      testimonials.push(newTestimonial);
      setNewTestimonial({ quote: "", name: "", role: "" });
      setIsFormVisible(false); // Hide the form after submission
      toast.success("Testimonial added successfully!", {
        position: "bottom-right", // Display toast at the bottom right
        autoClose: 3000, // Auto-close after 3 seconds
        theme: "colored", // Custom theme for colored notifications
      });
    } else {
      toast.error("Please fill in all fields before submitting.", {
        position: "bottom-right", // Display toast at the bottom right
        autoClose: 3000, // Auto-close after 3 seconds
        theme: "colored", // Custom theme for colored notifications
      });
    }
  };

  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-12" style={{ backgroundColor: "#001F54" }}>
      {/* Bot image peeking */}
      <img
        src="src/images/bot.png" // Replace with the path to your bot image
        alt="Peeping Bot"
        className="absolute top-9 right-8 w-150 h-50" // Adjusted size and opacity with blur
      />

      <div className="mx-auto max-w-4xl text-center">
        <img alt="Gain Chain Logo" src="src/images/neuro.png" className="mx-auto h-16" />
        <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">What People Are Saying</h2>
        <p className="mt-4 text-lg text-blue-200 sm:mt-6">Join the conversation and discover how Gain Chain is reshaping blockchain technology.</p>

        <div className="relative mt-10 overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-full px-4 sm:px-8 lg:px-12">
                <div className="p-8 rounded-xl shadow-lg" style={{ backgroundColor: "#00A7E1" }}>
                  <blockquote className="text-center text-lg font-medium text-white sm:text-xl">
                    <p>“{testimonial.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-8 text-center">
                    <div
                      className="mx-auto h-20 w-20 rounded-full flex items-center justify-center border-4"
                      style={{ borderColor: "#40E0D0", backgroundColor: "#fff" }}
                    >
                      {/* Display the profile icon if no image is provided */}
                      {testimonial.image ? (
                        <img
                          alt={testimonial.name}
                          src={testimonial.image}
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <FaUserCircle className="text-blue-500 w-12 h-12" />
                      )}
                    </div>
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
              className={`h-3 w-3 rounded-full ${currentIndex === index ? "bg-blue-500" : "bg-blue-300 hover:bg-blue-400"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Button to show/hide the form */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => setIsFormVisible((prev) => !prev)}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded shadow-lg hover:bg-blue-600 transition duration-200"
        >
          {isFormVisible ? "Hide Form" : "Add Testimonial"}
        </button>
      </div>

      {/* Display the form only when isFormVisible is true */}
      {isFormVisible && (
        <div className="mt-10 mx-auto w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-4">Add Your Testimonial</h3>
          <div>
            <input
              type="text"
              name="quote"
              placeholder="Your testimonial"
              value={newTestimonial.quote}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-blue-500 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={newTestimonial.name}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-blue-500 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="role"
              placeholder="Your Role"
              value={newTestimonial.role}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-blue-500 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleAddTestimonial}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Toast notifications container */}
      <ToastContainer
        position="bottom-right" // Display toasts at the bottom right
        autoClose={3000} // Auto-close after 3 seconds
        hideProgressBar={false} // Show progress bar (optional)
        newestOnTop={false} // Oldest toasts appear first
        closeOnClick // Close toast on click
        pauseOnHover // Pause on hover
        theme="colored" // Use colored theme for notifications
      />
      {/* Custom styles for Toast notifications */}
      <style>
        {`
          .Toastify__toast--success {
            background-color: #28a745; /* Green for success */
          }
          .Toastify__toast--error {
            background-color: #dc3545; /* Red for error */
          }
        `}
      </style>
    </section>
  );
}
