import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/componentstyles/Navbar.css"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                </div>

                {/* Authentication Links */}
                <div className="nav-auth">
                    <Link to="/login" className="auth-link login-btn">
                        Login
                    </Link>
                    <Link to="/register" className="auth-link register-btn">
                        Register
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="mobile-menu-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <div className="mobile-links">
                    <Link to="/" className="mobile-link" onClick={toggleMenu}>
                        <span className="nav-icon">🏠</span>
                        Home
                    </Link>
                    <Link to="/dashboard" className="mobile-link" onClick={toggleMenu}>
                        <span className="nav-icon">📊</span>
                        Dashboard
                    </Link>
                    <Link to="/complaint" className="mobile-link complaint-mobile" onClick={toggleMenu}>
                        <span className="nav-icon">🚨</span>
                        File Complaint
                    </Link>
                    <div className="mobile-auth">
                        <Link to="/login" className="mobile-auth-link" onClick={toggleMenu}>
                            Login
                        </Link>
                        <Link to="/register" className="mobile-auth-link" onClick={toggleMenu}>
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}