import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
          setFormData({ name: '', email: '', message: '' }); // Reset the form
        },
        (error) => {
          setStatus('Failed to send message. Please try again later.');
          console.error('EmailJS Error:', error);
        }
      );
  };

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-teal-700 text-center">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-teal-600 text-center">
          Have questions, feedback, or opportunities to discuss? We'd love to hear from you.
        </p>
        {status && (
          <div className={`mt-6 text-center text-lg font-semibold ${status.includes('success') ? 'text-teal-500' : 'text-red-500'}`}>
            {status}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-12 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              className="mt-2 w-full rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
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
              className="mt-2 w-full rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-teal-600 rounded-md shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
