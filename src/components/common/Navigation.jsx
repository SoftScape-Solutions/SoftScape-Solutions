import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  logoClassName = "logo-text",
}) => {
  return (
    <nav className="border-b nav-enhanced fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center animate-slide-in-left">
            <img
              src="/softscape-logo.png"
              alt="SoftScape Solutions Logo"
              className="h-12 sm:h-16 md:h-20 w-auto -my-2 sm:-my-4 md:-my-4 mr-2 sm:mr-4"
            />
            <div className={logoClassName}>SoftScape Solutions</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
            <a href="#services" className="nav-link">
              AI Tools
            </a>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-container">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#services"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                AI Tools
              </a>
              <Link
                to="/about"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <a
                href="#contact"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
