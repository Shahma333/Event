import React, { useState } from "react";
 // Import your Axios instance
import "../styles/contact.css";
import { api } from "../axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [responseMessage, setResponseMessage] = useState(""); // Store response message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await api.post("/message/send", formData);

      if (data.success) {
        setResponseMessage("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
      } else {
        setResponseMessage(data.message || "Failed to send message.");
      }
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "An error occurred. Try again.");
    }
  };

  return (
    <section className="contact">
      <h2>CONTACT US</h2>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
