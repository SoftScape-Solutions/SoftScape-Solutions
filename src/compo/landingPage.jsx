import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Brain, Sparkles, Menu, X, Bot, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="border-b nav-enhanced fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-slide-in-left">
              <img
                src="/softscape-logo.png"
                alt="SoftScape Solutions Logo"
                className="h-12 sm:h-16 md:h-20 w-auto -my-2 sm:-my-4 md:-my-4 mr-2 sm:mr-4"
              />
              <div className="logo-text">SoftScape Solutions</div>
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

      {/* Hero Section - Full Screen */}
      <section className="hero-container hero-section">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            <div className="animate-bounce-in mb-8">
              <div className="hero-icon-container">
                <Brain className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="hero-title">
              AI-Powered Software
              <span className="gradient-text-ai block font-extrabold">
                Solutions
              </span>
            </h1>
            <p className="hero-description">
              We create intelligent AI-powered tools, automation agents, and
              smart solutions that revolutionize how businesses operate.
              Transform your workflow with cutting-edge artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in animate-delay-400 px-4">
              <Button size="lg" className="hero-button btn-primary-enhanced">
                <span className="hidden sm:inline">
                  Explore Our AI-Powered Tools
                </span>
                <span className="sm:hidden">Explore AI Tools</span>
                <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              {/* <Button variant="outline" size="lg" className="text-lg px-8 py-3 hover-glow will-change-transform">
          See AI Agents in Action
              </Button> */}
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Centered */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="scroll-indicator-container flex flex-col items-center">
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-500 rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="scroll-indicator-dot w-1 h-2 sm:h-3 bg-gray-600 rounded-full"></div>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2 sm:mt-3 text-center whitespace-nowrap">
              Scroll to explore
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections Wrapper */}
      <div className="content-sections">
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce-in">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-fade-in animate-delay-100">
                AI-Powered <span className="gradient-text-ai">Solutions</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto animate-fade-in animate-delay-200 px-4">
                Cutting-edge artificial intelligence tools and autonomous agents
                that transform business operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link to="/ai-chatbots" className="block">
                <Card className="card-enhanced hover-lift animate-slide-in will-change-transform cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="service-icon-blue icon-bounce">
                      <Bot className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl">
                      AI Chatbots & Agents
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base md:text-lg">
                      Intelligent conversational agents that automate customer
                      service and business processes
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Card className="card-enhanced hover-lift animate-slide-in animate-delay-100 will-change-transform">
                <CardHeader className="text-center">
                  <div className="service-icon-purple icon-bounce">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl">
                    Smart Automation Tools
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg">
                    AI-powered workflow automation that eliminates repetitive
                    tasks and boosts productivity
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-enhanced hover-lift animate-slide-in animate-delay-300 will-change-transform">
                <CardHeader className="text-center">
                  <div className="service-icon-orange icon-bounce">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl">
                    AI-Enhanced Applications
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg">
                    Web and mobile applications powered by artificial
                    intelligence for superior user experiences
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-enhanced hover-lift animate-slide-in animate-delay-400 will-change-transform">
                <CardHeader className="text-center">
                  <div className="service-icon-indigo icon-bounce">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl">
                    Custom AI Solutions
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg">
                    Tailored artificial intelligence systems designed
                    specifically for your unique business needs
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* AI CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 animate-gradient">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-bounce-in mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fade-in px-4">
              Ready to Embrace AI Innovation?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-200 px-4">
              Let's revolutionize your business with intelligent AI solutions,
              smart automation agents, and cutting-edge tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in animate-delay-400 px-4">
              <Button
                size="lg"
                variant="secondary"
                className="text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 btn-primary-enhanced will-change-transform"
              >
                Book A Consultation
                <Brain className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* AI Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2 animate-slide-in-left">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold gradient-text-ai">
                    SoftScape AI Solutions
                  </span>
                </div>
                <p className="text-gray-400 mb-4 max-w-md text-sm sm:text-base md:text-lg">
                  Revolutionizing businesses through cutting-edge AI technology,
                  intelligent automation, and smart digital solutions.
                </p>
              </div>
              <div className="animate-slide-in animate-delay-200">
                <h3 className="text-white font-semibold mb-4 text-base sm:text-lg md:text-xl">
                  AI Solutions
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm sm:text-base md:text-lg">
                  <li className="hover:text-white transition-colors cursor-pointer">
                    AI Chatbots
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Smart Automation
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    AI Agents
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    Custom AI Tools
                  </li>
                </ul>
              </div>
              <div className="animate-slide-in animate-delay-400">
                <h3 className="text-white font-semibold mb-4 text-base sm:text-lg md:text-xl">
                  Connect
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm sm:text-base md:text-lg">
                  <li className="hover:text-white transition-colors cursor-pointer">
                    ai@softscape.solutions
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    +1 (555) AI-TOOLS
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    LinkedIn
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    GitHub
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 animate-fade-in animate-delay-600">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg px-4">
                &copy; 2025 SoftScape AI Solutions. Powering the future with
                artificial intelligence.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
