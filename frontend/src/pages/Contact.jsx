import React, { useState } from "react";
import axios from "axios";
import "../styles/pagestyles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/contact", formData);
      alert("Your message has been sent successfully!");
      setFormData({ username: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-desc">
        Have a question, suggestion, or complaint regarding the system? Please
        let us know — we value your feedback.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Your Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
