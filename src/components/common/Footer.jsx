import React from "react";
import { Link } from "react-router-dom";
import { Bot } from "lucide-react";
import { ROUTES } from "../../constants/routes";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { to: ROUTES.HOME, label: "Home" },
      { to: ROUTES.ABOUT, label: "About" },
      { to: ROUTES.CONTACT, label: "Contact" },
    ],
    contact: [
      "softscapesolution@outlook.com",
      "+44 7789667804",
      "LinkedIn",
      "GitHub",
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2 animate-slide-in-left">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/softscape-logo.png" alt="SoftScape Logo" className="h-16 w-9" />
              <span className="text-lg sm:text-xl md:text-2xl font-bold gradient-text-ai">
                SoftScape Solutions
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md text-sm sm:text-base md:text-lg">
              Revolutionizing businesses through cutting-edge AI technology,
              intelligent automation, and smart digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-in animate-delay-200">
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg md:text-xl">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base md:text-lg">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-slide-in animate-delay-400">
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg md:text-xl">
              Connect
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base md:text-lg">
              {footerLinks.contact.map((contact, index) => (
                <li
                  key={index}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {contact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 animate-fade-in animate-delay-600">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg px-4">
            &copy; {currentYear} SoftScape AI Solutions. Powering the future
            with artificial intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
