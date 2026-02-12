import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/componentstyles/Navbar.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'user'
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check login and role on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setUserRole(decoded.role || "user");

        // Fetch unread messages for admin
        if (decoded.role === "admin" || decoded.role === "authority") {
          fetchUnreadMessages();
        }
      } catch (err) {
        console.error("Invalid token:", err);
        setIsLoggedIn(false);
        setUserRole(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  // Fetch unread messages count
  const fetchUnreadMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/contact/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setUnreadCount(res.data.length || 0);
    } catch (error) {
      console.error("Failed to fetch unread messages:", error);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUserRole(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-brand">
          <Link to="/" className="brand-link" aria-label="KUET Detectives Home">
            <Logo size={36} />
            <span className="brand-text">
              <span className="kuet-brand">KUET</span>
              <span className="cms-brand">DETECTIVES</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Home</span>
          </Link>

          <Link to="/dashboard" className="nav-link">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>Dashboard</span>
          </Link>

          {(userRole === "admin" || userRole === "authority") && (
            <Link to="/analytics" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              <span>Analytics</span>
            </Link>
          )}

          {(userRole !== "admin" && userRole !== "authority") && (
            <Link to="/complaint" className="nav-link complaint-btn">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              <span>File Complaint</span>
            </Link>
          )}

          {(userRole === "admin" || userRole === "authority") && (
            <Link to="/map" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
              <span>Map View</span>
            </Link>
          )}

          <Link to="/about" className="nav-link">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>About Us</span>
          </Link>

          {userRole !== "admin" && userRole !== "authority" && (
            <Link to="/contact" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Contact Us</span>
            </Link>
          )}

          {(userRole === "admin" || userRole === "authority") && (
            <Link to="/admin/messages" className="nav-link nav-messages">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>Messages</span>
              {unreadCount > 0 && (
                <span className="message-badge" aria-label={`${unreadCount} unread messages`}>{unreadCount}</span>
              )}
            </Link>
          )}
        </div>

        {/* Right side: Theme Toggle + Auth */}
        <div className="nav-right">
          <ThemeToggle />
          
          <div className="nav-auth">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="auth-link login-btn">
                  Login
                </Link>
                <Link to="/register" className="auth-link register-btn">
                  Register
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="auth-link logout-btn" aria-label="Logout">
                <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? "active" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-links">
          {/* Theme Toggle for Mobile */}
          <div className="mobile-theme-toggle">
            <span className="mobile-theme-label">Theme</span>
            <ThemeToggle />
          </div>
          
          <Link to="/" className="mobile-link" onClick={toggleMenu}>
            <svg className="mobile-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Home</span>
          </Link>
          
          <Link to="/dashboard" className="mobile-link" onClick={toggleMenu}>
            <svg className="mobile-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>Dashboard</span>
          </Link>

          {(userRole === "admin" || userRole === "authority") && (
            <Link to="/analytics" className="mobile-link" onClick={toggleMenu}>
              <svg className="mobile-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              <span>Analytics</span>
            </Link>
          )}

          {(userRole === "admin" || userRole === "authority") && (
            <Link to="/map" className="mobile-link" onClick={toggleMenu}>
              <svg className="mobile-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
              <span>Map View</span>
            </Link>
          )}
          
          {(userRole !== "admin" && userRole !== "authority") && (
            <Link to="/complaint" className="mobile-link complaint-mobile" onClick={toggleMenu}>
              <svg className="mobile-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              <span>File Complaint</span>
            </Link>
          )}

          <Link to="/about" className="mobile-link" onClick={toggleMenu}>
            <svg className="mobile-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>About Us</span>
          </Link>

          {userRole !== "admin" && userRole !== "authority" && (
            <Link to="/contact" className="mobile-link" onClick={toggleMenu}>
              <svg className="mobile-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Contact Us</span>
            </Link>
          )}

          {(userRole === "admin" || userRole === "authority") && (
            <Link to="/admin/messages" className="mobile-link mobile-messages" onClick={toggleMenu}>
              <div className="mobile-link-content">
                <svg className="mobile-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>Messages</span>
              </div>
              {unreadCount > 0 && (
                <span className="message-badge-mobile">{unreadCount}</span>
              )}
            </Link>
          )}

          <div className="mobile-auth">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="mobile-auth-link login" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/register" className="mobile-auth-link register" onClick={toggleMenu}>
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="mobile-auth-link logout"
              >
                <svg className="logout-icon-mobile" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
