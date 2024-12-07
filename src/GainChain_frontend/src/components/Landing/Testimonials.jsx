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
      toast.error("Please fill in all fields.", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <section className="bg-[#3E78B2] py-16 sm:py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-[#4A525A] text-center">
          What Our Clients Say
        </h2>
        <div className="mt-8">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-gray-800 italic">"{testimonials[currentIndex].quote}"</p>
                <div className="flex items-center mt-4">
                  <FaUserCircle className="h-10 w-10 text-[#004BA8]" />
                  <div className="ml-4">
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="mt-6 text-white bg-[#004BA8] px-4 py-2 rounded hover:bg-[#3E78B2] transition duration-200"
        >
          {isFormVisible ? "Hide Form" : "Add Testimonial"}
        </button>

        {isFormVisible && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white">Add Your Testimonial</h3>
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
              className="w-full bg-[#004BA8] text-white font-semibold py-2 rounded hover:bg-[#3E78B2] transition duration-200"
            >
              Submit
            </button>
          </div>
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
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
      </div>
    </section>
  );
}