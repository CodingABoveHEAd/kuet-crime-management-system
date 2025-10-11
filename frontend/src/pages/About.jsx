import React from "react";
import "../styles/pagestyles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About KUET Crime Management System</h1>
        <p>Empowering Safety Through Technology</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            The KUET Crime Management System (KUET CMS) aims to create a secure
            and transparent platform where students, faculty, and staff can
            easily report, track, and analyze incidents within the KUET campus.
            We strive to build a safer environment through efficient reporting,
            quick response, and data-driven insights.
          </p>
        </section>

        <section className="about-section">
          <h2>Why We Built This</h2>
          <p>
            Campus safety is one of the top priorities in any academic
            institution. However, the lack of a centralized system often leads
            to delays and inefficiency. Our platform bridges this gap by
            providing a simple, digital solution that connects users with
            authorities seamlessly.
          </p>
        </section>

        <section className="about-section">
          <h2>Features Overview</h2>
          <ul>
            <li>🛡️ Anonymous & Secure Complaint Reporting</li>
            <li>📍 Map-based Visualization of Reported Crimes</li>
            <li>📊 Real-time Analytics Dashboard</li>
            <li>👮 Admin Control for Review & Resolution</li>
            <li>📱 Responsive Design for All Devices</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            To make KUET a role model in campus safety management through
            innovation, accountability, and community awareness. We envision a
            system that can later be scaled and implemented across universities
            nationwide.
          </p>
        </section>

        {/* 🖼️ Gallery Section */}
        <section className="about-section about-gallery">
          <h2>Gallery</h2>
          <p className="gallery-intro">
            A glimpse into the development and inspiration behind KUET CMS.
          </p>
          <div className="gallery-grid">
            <img
              src="/images/image1.jpg"
              alt="Campus safety meeting"
              className="gallery-img"
            />
            <img
              src="/images/image2.jpg"
              alt="KUET main gate"
              className="gallery-img"
            />
            <img
              src="/images/image3.jpg"
              alt="Developers at work"
              className="gallery-img"
            />
            
            <img
              src="/images/image4.jpg"
              alt="Tech innovation session"
              className="gallery-img"
            />
            {/* <img
              src="/images/image5.jpg"
              alt="Tech innovation session"
              className="gallery-img"
            /> */}
            <img
              src="/images/image6.jpg"
              alt="Tech innovation session"
              className="gallery-img"
            />
            <img
              src="/images/image7.jpg"
              alt="Tech innovation session"
              className="gallery-img"
            />
            <img
              src="/images/image8.jpg"
              alt="Tech innovation session"
              className="gallery-img"
            />
          </div>
        </section>

        <section className="about-section about-team">
          <h2>Developed By</h2>
          <p>
            A passionate team of KUET CSE students committed to creating
            meaningful digital solutions for real-world problems.
          </p>
          <p className="credit-line">
            <strong>Project Lead:</strong> Niloy Chowdhury  
            <br />
            <strong>Department of Computer Science & Engineering</strong>, KUET
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
