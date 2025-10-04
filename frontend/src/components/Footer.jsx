// src/components/Footer.jsx
import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaTwitter, FaShieldAlt } from "react-icons/fa";
import "../styles/componentstyles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo & Description */}
        <div className="footer-section about">
          <h2 className="footer-logo">KUET Crime Management System</h2>
          <p className="footer-desc">
            A secure platform to report, track, and resolve incidents within the KUET campus. 
            Ensuring safety, transparency, and accountability through technology.
          </p>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/complaints">Submit Complaint</a></li>
            <li><a href="/status">Track Status</a></li>
            <li><a href="/about">About System</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Right Section: Contact Info */}
        <div className="footer-section contact">
          <h3>Contact</h3>
          <p><FaMapMarkerAlt /> KUET, Khulna, Bangladesh</p>
          <p><FaEnvelope /> support@kuetcrimeportal.edu.bd</p>
          <p><FaPhoneAlt /> +880-1234-567890</p>

          <div className="footer-social">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaShieldAlt /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} KUET Crime Management Authority. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
