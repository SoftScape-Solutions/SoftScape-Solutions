import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAVIGATION_LINKS, PAGE_NAVIGATION } from "../../constants/routes";
import { cn } from "../../utils/helpers";
import "./Navigation.css";

const Navigation = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  logoClassName = "logo-text",
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Get navigation links based on current page
  const getNavigationLinks = () => {
    return PAGE_NAVIGATION[currentPath] || NAVIGATION_LINKS;
  };

  const navigationConfig = getNavigationLinks();
  const desktopLinks = navigationConfig?.desktop || [];
  const mobileLinks = navigationConfig?.mobile || [];

  const renderNavLink = (link, isMobile = false) => {
    const baseClassName = isMobile ? "mobile-nav-link" : "nav-link";
    const onClick = isMobile ? toggleMobileMenu : undefined;

    if (link.type === "link") {
      return (
        <Link
          key={link.to + link.label}
          to={link.to}
          className={baseClassName}
          onClick={onClick}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <a
        key={link.href + link.label}
        href={link.href}
        className={baseClassName}
        onClick={onClick}
      >
        {link.label}
      </a>
    );
  };
  return (
    <nav className="border-b nav-enhanced fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center animate-slide-in-left">
            <img
              src="/softscape-logo.png"
              alt="SoftScape Solutions Logo"
              className="h-12 sm:h-16 md:h-20 w-auto -my-2 sm:-my-4 md:-my-4 mr-2 sm:mr-4"
            />
            <div className={logoClassName}>SoftScape Solutions</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
            {desktopLinks.map((link) => renderNavLink(link))}
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
              {mobileLinks.map((link) => renderNavLink(link, true))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
