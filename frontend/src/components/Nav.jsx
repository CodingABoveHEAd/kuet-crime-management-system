import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/componentstyles/Navbar.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'user'
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

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
      // Assuming messages that are not read have a 'read' field or you can count total
      // Adjust based on your backend implementation
      setUnreadCount(res.data.length || 0);
    } catch (error) {
      console.error("Failed to fetch unread messages:", error);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🛡️</span>
            <span className="brand-text">
              <span className="kuet-brand">KUET</span>
              <span className="cms-brand">CMS</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🏠</span>Home
          </Link>

          <Link to="/dashboard" className="nav-link">
            <span className="nav-icon">📊</span>Dashboard
          </Link>

          <Link to="/complaint" className="nav-link complaint-btn">
            <span className="nav-icon">🚨</span>File Complaint
          </Link>

          <Link to="/map" className="nav-link">
            <span className="nav-icon">📍</span>Map View
          </Link>

          <Link to="/about" className="nav-link">
            <span className="nav-icon">📍</span>About Us
          </Link>

          {(userRole !== "admin" && userRole !== "authority") && (
            <Link to="/Contact" className="nav-link">
              <span className="nav-icon">✉️</span>Contact Us
            </Link>
          )}

          {/* Show Messages only for admin with badge */}
          {(userRole === "admin" || userRole === "authority") && (
            <Link to="/admin/messages" className="nav-link nav-messages">
              <span className="nav-icon">📩</span>Messages
              {unreadCount > 0 && (
                <span className="message-badge">{unreadCount}</span>
              )}
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
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
            <button onClick={handleLogout} className="auth-link logout-btn">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-links">
          <Link to="/" className="mobile-link" onClick={toggleMenu}>
            🏠 Home
          </Link>
          <Link to="/dashboard" className="mobile-link" onClick={toggleMenu}>
            📊 Dashboard
          </Link>
          <Link to="/map" className="mobile-link" onClick={toggleMenu}>
            📍 Map View
          </Link>
          <Link
            to="/complaint"
            className="mobile-link complaint-mobile"
            onClick={toggleMenu}
          >
            🚨 File Complaint
          </Link>

          {/* Contact for user */}
          {(userRole !== "admin" && userRole !== "authority") && (
            <Link
              to="/contact"
              className="mobile-link"
              onClick={toggleMenu}
            >
              ✉️ Contact Us
            </Link>
          )}

          {/* Messages for admin with badge */}
          {(userRole === "admin" || userRole === "authority") && (
            <Link
              to="/admin/messages"
              className="mobile-link mobile-messages"
              onClick={toggleMenu}
            >
              <span className="mobile-icon">📩 Messages</span>
              {unreadCount > 0 && (
                <span className="message-badge-mobile">{unreadCount}</span>
              )}
            </Link>
          )}

          <div className="mobile-auth">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="mobile-auth-link"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mobile-auth-link"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="mobile-auth-link logout-btn"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}