'use strict';

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAVIGATION_LINKS, PAGE_NAVIGATION, ROUTES } from "../../constants/routes";
import { cn } from "../../utils/helpers";
import "./Navigation.css";

const Navigation = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  logoClassName = "logo-text",
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Get navigation links based on current page (memoized)
  const navigationConfig = useMemo(() => {
    return PAGE_NAVIGATION[currentPath] || NAVIGATION_LINKS;
  }, [currentPath]);
  
  const desktopLinks = navigationConfig?.desktop || [];
  const mobileLinks = navigationConfig?.mobile || [];

  // Close dropdown when clicking outside (optimized with useCallback)
  const handleClickOutside = useCallback((event) => {
    // Don't close if clicking on mobile dropdown items or triggers
    if (event.target.closest('.mobile-dropdown-item') || 
        event.target.closest('.mobile-dropdown-trigger')) {
      return;
    }
    
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // Close dropdown when route changes
  useEffect(() => {
    setOpenDropdown(null);
  }, [currentPath]);

  // Helper functions for hover handling with delay (memoized)
  const handleMouseEnter = useCallback((dropdownKey) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    }
    setOpenDropdown(dropdownKey);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // 150ms delay before closing
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const renderNavLink = (link, isMobile = false) => {
    const baseClassName = isMobile ? "navigation-mobile-menu-link" : "navigation-menu-link";
    // Only add toggleMobileMenu for regular links, not dropdown items
    const onClick = (isMobile && link.type === "link") ? toggleMobileMenu : undefined;

    if (link.type === "dropdown") {
      const dropdownKey = link.label;
      const isOpen = openDropdown === dropdownKey;

      if (isMobile) {
        // Mobile dropdown - expand inline
        return (
          <div key={dropdownKey} className="mobile-dropdown">
            <button
              className="mobile-dropdown-trigger"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile dropdown trigger clicked');
                console.log('Current dropdownKey:', dropdownKey);
                console.log('Current isOpen:', isOpen);
                console.log('Current openDropdown state:', openDropdown);
                console.log('Will set to:', isOpen ? null : dropdownKey);
                setOpenDropdown(isOpen ? null : dropdownKey);
              }}
              type="button"
            >
              {link.label}
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="mobile-dropdown-menu">
                {link.items.map((item) => (
                  <div
                    key={item.to}
                    className="mobile-dropdown-item"
                    onClick={(e) => {
                      console.log('Mobile dropdown item clicked:', item.to);
                      
                      // Navigate using React Router
                      navigate(item.to);
                      
                      // Close the mobile menu and dropdown
                      setOpenDropdown(null);
                      if (isMobileMenuOpen) {
                        toggleMobileMenu();
                      }
                    }}
                    style={{
                      cursor: 'pointer',
                      userSelect: 'none',
                      WebkitTapHighlightColor: 'rgba(0,0,0,0.1)'
                    }}
                  >
                    <div>
                      <div className="mobile-dropdown-item-title">{item.label}</div>
                      <div className="mobile-dropdown-item-desc">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }

      // Desktop dropdown
      return (
        <div 
          key={dropdownKey} 
          className="nav-dropdown" 
          ref={dropdownRef}
          onMouseEnter={() => handleMouseEnter(dropdownKey)}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`${baseClassName} nav-dropdown-trigger`}
            onClick={() => setOpenDropdown(isOpen ? null : dropdownKey)}
          >
            {link.label}
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="nav-dropdown-menu">
              {link.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-dropdown-item"
                  onClick={() => setOpenDropdown(null)}
                >
                  <div>
                    <div className="nav-dropdown-item-title">{item.label}</div>
                    <div className="nav-dropdown-item-desc">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

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
          <Link to={ROUTES.HOME} className="flex items-center animate-slide-in-left">
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
