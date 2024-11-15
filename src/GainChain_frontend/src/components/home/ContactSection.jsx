import React from 'react';

const ContactSection = ({ onSubmit, formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-deep-blue text-white py-16 px-6 md:px-12">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-8">Contact Us</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-4 rounded-lg bg-dark-purple text-white placeholder-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-4 rounded-lg bg-dark-purple text-white placeholder-gray-400"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="6"
            className="w-full p-4 rounded-lg bg-dark-purple text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-light-cyan text-deep-blue py-3 px-6 rounded-lg text-lg font-semibold hover:bg-deep-blue hover:text-white transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
