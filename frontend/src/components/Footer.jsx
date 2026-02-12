// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaTwitter, FaShieldAlt } from "react-icons/fa";
import "../styles/componentstyles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer" role="contentinfo">
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
        <nav className="footer-section links" aria-label="Footer navigation">
          <h3>Quick Links</h3>
          <ul role="list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/complaint">Report Incident</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        {/* Right Section: Contact Info */}
        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>
            <FaMapMarkerAlt aria-hidden="true" />
            <span>KUET, Khulna, Bangladesh</span>
          </p>
          <p>
            <FaEnvelope aria-hidden="true" />
            <a href="mailto:support@kuetcrimeportal.edu.bd">support@kuetcrimeportal.edu.bd</a>
          </p>
          <p>
            <FaPhoneAlt aria-hidden="true" />
            <a href="tel:+8801234567890">+880-1234-567890</a>
          </p>

          <div className="footer-social" role="list" aria-label="Social media links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook aria-hidden="true" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter aria-hidden="true" />
            </a>
            <a href="/about" aria-label="Security information">
              <FaShieldAlt aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <p>© {currentYear} KUET Crime Management Authority. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
