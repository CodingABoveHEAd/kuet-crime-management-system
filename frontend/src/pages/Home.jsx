import React, { useState, useEffect } from "react";
import "../styles/pagestyles/Home.css";
import "../index.css";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: "🚨",
      title: "Instant Crime Reporting",
      description:
        "Report incidents immediately with our fast, secure digital platform",
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description:
        "Track crime patterns and statistics with advanced data visualization",
    },
    {
      icon: "🔍",
      title: "Case Management",
      description:
        "Efficient investigation tracking and case resolution workflow",
    },
    {
      icon: "🛡️",
      title: "Campus Security",
      description: "24/7 monitoring and rapid response for KUET campus safety",
    },
    {
      icon: "💬",
      title: "Anonymous Reporting",
      description:
        "Ensure privacy while reporting sensitive incidents anonymously",
    },
    {
      icon: "🧠",
      title: "AI-Based Threat Detection",
      description:
        "AI-powered analytics detect unusual activities and predict crime patterns",
    },
  ];

  const stats = [
    { number: "2,450+", label: "Cases Resolved" },
    { number: "99.2%", label: "Response Rate" },
    { number: "15min", label: "Avg Response Time" },
    { number: "24/7", label: "Active Monitoring" },
  ];

  const steps = [
    {
      icon: "📝",
      title: "1. Submit Complaint",
      text: "Fill the online form with crime details and submit securely.",
    },
    {
      icon: "👮",
      title: "2. Admin Review",
      text: "Admin verifies and assigns case to KUET security authorities.",
    },
    {
      icon: "⚡",
      title: "3. Take Action",
      text: "Take proper action by the expert team or police.",
    },
    {
      icon: "✅️",
      title: "4. Update Status & send notification",
      text: "Update the case status based on various solving stages",
    },
    {
      icon: "🤝",
      title: "5. Solve Problem",
      text: "Solve the crime with proper planning and great expertize.",
    },
  ];

  const updates = [
    {
      title: "Increased Security Patrols Near Dormitories",
      date: "Sept 25, 2025",
    },
    {
      title: "Cyber Crime Awareness Workshop Conducted",
      date: "Sept 18, 2025",
    },
    { title: "Checking for drug dealing each month", date: "January 03, 2025" },
    {
      title:
        "New CCTV Installations Around Campus and inside residential halls",
      date: "December 26, 2024",
    },
    {
      title: "Harresment of Female students will now have more punishment",
      date: "March 18, 2024",
    },
    {
      title:
        "Teachers are associated to solve student ragging and bullying problem.",
      date: "Feb 9, 2023",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>

        <div className="hero-content">
          <div className={`hero-text ${isVisible ? "animate-in" : ""}`}>
            <h1 className="hero-title">
              <span className="kuet-text">KUET</span>
              <span className="main-text">DETECTIVES</span>
            </h1>
            <p className="hero-subtitle">
              Advanced digital platform ensuring campus safety through
              intelligent crime reporting, real-time monitoring, and rapid
              response coordination.
            </p>
            <div className="hero-buttons">
              <button className="cta-primary">
                <span style={{ color: "white" }}>Report Incident</span>
                <span className="arrow">→</span>
              </button>
              <button className="cta-secondary">
                <span>View Dashboard</span>
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="preview-title">Crime Dashboard</span>
              </div>
              <div className="preview-content">
                <div className="stat-cards">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    <div className="bar" style={{ height: "60%" }}></div>
                    <div className="bar" style={{ height: "80%" }}></div>
                    <div className="bar" style={{ height: "45%" }}></div>
                    <div className="bar" style={{ height: "90%" }}></div>
                    <div className="bar" style={{ height: "70%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Comprehensive Crime Management</h2>
          <p className="section-subtitle">
            Protecting our campus community with cutting-edge technology and
            rapid response systems
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${
                  index === currentSlide ? "active" : ""
                }`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Awareness / Testimonial Section */}
      <section className="awareness">
        <div className="container">
          <h2 className="section-title">Creating a Safer KUET Together</h2>
          <p className="section-subtitle">
            Every student, teacher, and staff member plays a role in building a
            secure campus. Stay alert. Report immediately. Save lives.
          </p>
        </div>
      </section>

      

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How the System Works</h2>
        <div className="steps-container">
          {steps.map((s, index) => (
            <div key={index} className="step-card">
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Updates Section */}
      <section className="updates">
        <h2 className="section-title">Recent Updates</h2>
        <div className="updates-list">
          {updates.map((u, i) => (
            <div key={i} className="update-card">
              <h4>{u.title}</h4>
              <span className="update-date">{u.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="emergency">
        <div className="container">
          <div className="emergency-card">
            <div className="emergency-content">
              <h3>Emergency? Need Immediate Help?</h3>
              <p>Contact KUET Security immediately for urgent situations</p>
            </div>
            <div className="emergency-actions">
              <button className="emergency-btn">📞 Call Security</button>
              <button className="emergency-btn secondary">
                🚨 Emergency Alert
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
