import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        'your_service_id', // Replace with your EmailJS service ID
        'your_template_id', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'gainchainai@gmail.com',
        },
        'your_user_id' // Replace with your EmailJS user ID
      )
      .then(
        () => {
          setStatus('Message sent successfully!');
          setIsLoading(false);
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          setStatus('Failed to send message. Please try again later.');
          setIsLoading(false);
          console.error('EmailJS Error:', error);
        }
      );
  };

  return (
    <section className="bg-[#3E78B2] py-16 sm:py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-[#4A525A] text-center">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-[#4A525A] text-center">
          We would love to hear from you! Please fill out the form below.
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                aria-label="Your Name"
                className="mt-2 w-full rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#004BA8] focus:border-[#004BA8]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                aria-label="Your Email"
                className="mt-2 w-full rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#004BA8] focus:border-[#004BA8]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
                rows="5"
                aria-label="Your Message"
                className="mt-2 w-full rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#004BA8] focus:border-[#004BA8]"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004BA8] ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#004BA8] hover:bg-[#3E78B2]'
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
