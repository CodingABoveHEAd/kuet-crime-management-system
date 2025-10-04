import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/componentstyles/Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      // (Optional) Call backend logout API
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Remove token from localStorage
      localStorage.removeItem("token");
      setIsLoggedIn(false);

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo/Brand */}
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🛡️</span>
            <span className="brand-text">
              <span className="kuet-brand">KUET</span>
              <span className="cms-brand">CMS</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link to="/dashboard" className="nav-link">
            <span className="nav-icon">📊</span>
            Dashboard
          </Link>
          <Link to="/complaint" className="nav-link complaint-btn">
            <span className="nav-icon">🚨</span>
            File Complaint
          </Link>
          <Link to="/admin/map" className="nav-link">
            <span className="nav-icon">📍</span>
            Map View
          </Link>
        </div>

        {/* Authentication Links */}
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
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
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
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link to="/dashboard" className="mobile-link" onClick={toggleMenu}>
            <span className="nav-icon">📊</span>
            Dashboard
          </Link>

          <Link to="/admin/map" className="mobile-link" onClick={toggleMenu}>
            <span className="nav-icon">📍</span>
            Map View
          </Link>

          <Link
            to="/complaint"
            className="mobile-link complaint-mobile"
            onClick={toggleMenu}
          >
            <span className="nav-icon">🚨</span>
            File Complaint
          </Link>

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
