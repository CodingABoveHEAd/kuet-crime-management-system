import React, { useState, useEffect } from 'react';
import "../styles/pagestyles/Home.css";
import "../index.css"

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: '🚨',
      title: 'Instant Crime Reporting',
      description: 'Report incidents immediately with our fast, secure digital platform'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track crime patterns and statistics with advanced data visualization'
    },
    {
      icon: '🔍',
      title: 'Case Management',
      description: 'Efficient investigation tracking and case resolution workflow'
    },
    {
      icon: '🛡️',
      title: 'Campus Security',
      description: '24/7 monitoring and rapid response for KUET campus safety'
    }
  ];

  const stats = [
    { number: '2,450+', label: 'Cases Resolved' },
    { number: '99.2%', label: 'Response Rate' },
    { number: '15min', label: 'Avg Response Time' },
    { number: '24/7', label: 'Active Monitoring' }
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
          <div className={`hero-text ${isVisible ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              <span className="kuet-text">KUET</span>
              <span className="main-text">Crime Management System</span>
            </h1>
            <p className="hero-subtitle">
              Advanced digital platform ensuring campus safety through intelligent crime reporting, 
              real-time monitoring, and rapid response coordination.
            </p>
            <div className="hero-buttons">
              <button className="cta-primary">
                <span style={{color:'white'}}>Report Incident</span>
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
                  <span></span><span></span><span></span>
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
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar" style={{height: '80%'}}></div>
                    <div className="bar" style={{height: '45%'}}></div>
                    <div className="bar" style={{height: '90%'}}></div>
                    <div className="bar" style={{height: '70%'}}></div>
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
            Protecting our campus community with cutting-edge technology and rapid response systems
          </p>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
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
              <button className="emergency-btn">
                📞 Call Security
              </button>
              <button className="emergency-btn secondary">
                🚨 Emergency Alert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>KUET Crime Management</h4>
              <p>Ensuring campus safety through technology and community cooperation.</p>
            </div>
            <div className="footer-section">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#report">Report Crime</a></li>
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Emergency Contacts</h5>
              <ul>
                <li>Security: +880-1234-567890</li>
                <li>Admin: +880-0987-654321</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 KUET Crime Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;