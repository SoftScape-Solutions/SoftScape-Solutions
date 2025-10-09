import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Brain, Sparkles, Menu, X, Bot, Cpu, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import "./landingPage.css";
import "./animations.css";

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrollingFromHero, setIsScrollingFromHero] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleServiceHover = (service, event) => {
    setHoveredService(service);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleServiceLeave = () => {
    setHoveredService(null);
  };

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;

      // Hide scroll indicator when user starts scrolling
      if (scrollPosition > 10 && showScrollIndicator) {
        setShowScrollIndicator(false);
      }

      if (isScrollingFromHero) {
        return;
      }

      clearTimeout(scrollTimeout);

      if (scrollPosition > 10 && scrollPosition < heroHeight * 0.8) {
        scrollTimeout = setTimeout(() => {
          if (!isScrollingFromHero) {
            setIsScrollingFromHero(true);

            if (
              scrollPosition > lastScrollY &&
              scrollPosition < heroHeight * 0.5
            ) {
              window.scrollTo({
                top: heroHeight,
                behavior: "smooth",
              });
            } else if (
              scrollPosition < lastScrollY &&
              scrollPosition < heroHeight * 0.3
            ) {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            } else {
              setIsScrollingFromHero(false);
              return;
            }

            setTimeout(() => setIsScrollingFromHero(false), 1000);
          }
        }, 150);
      }

      setLastScrollY(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrollingFromHero, lastScrollY, showScrollIndicator]);

  const services = [
    {
      title: "AI Chatbots & Agents",
      description: "Intelligent conversational agents that automate customer service and business processes",
      icon: Bot,
      color: "blue",
      link: "/ai-chatbots",
      preview: {
        products: ["Customer Support Bot", "Sales Assistant AI", "Virtual Receptionist"],
        overview: "24/7 intelligent chat solutions that handle customer inquiries, qualify leads, and provide instant support across multiple platforms."
      }
    },
    {
      title: "Smart Automation Tools",
      description: "AI-powered workflow automation that eliminates repetitive tasks and boosts productivity",
      icon: Workflow,
      color: "purple",
      link: "/smart-automation",
      preview: {
        products: ["Document Processing AI", "Email Automation", "Data Entry Assistant"],
        overview: "Streamline operations with intelligent automation that handles repetitive tasks, processes documents, and manages workflows."
      }
    },
    {
      title: "AI-Enhanced Applications",
      description: "Web and mobile applications powered by artificial intelligence for superior user experiences",
      icon: Sparkles,
      color: "orange",
      link: "/ai-applications",
      preview: {
        products: ["Smart Analytics Dashboard", "Predictive Mobile Apps", "AI-Powered CRM"],
        overview: "Transform your digital presence with applications that learn from user behavior and provide intelligent insights."
      }
    },
    {
      title: "Custom AI Solutions",
      description: "Tailored artificial intelligence systems designed specifically for your unique business needs",
      icon: Cpu,
      color: "indigo",
      link: "/custom-ai",
      preview: {
        products: ["Bespoke ML Models", "Industry-Specific AI", "AI Integration Services"],
        overview: "Get AI solutions built specifically for your business challenges, from custom machine learning models to complete AI integrations."
      }
    }
  ];

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
              <Link to="/explore-tools" className="nav-link">AI Tools</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/book-consultation" className="nav-link">Book Consultation</Link>
              <a href="#contact" className="nav-link">Contact</a>
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
                <Link to="/explore-tools" className="mobile-nav-link" onClick={toggleMobileMenu}>AI Tools</Link>
                <Link to="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
                <Link to="/book-consultation" className="mobile-nav-link" onClick={toggleMobileMenu}>Book Consultation</Link>
                <a href="#contact" className="mobile-nav-link" onClick={toggleMobileMenu}>Contact</a>
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
              <Link to="/explore-tools">
                <Button size="lg" className="hero-button btn-primary-enhanced">
                  <span className="hidden sm:inline">
                    Explore Our AI-Powered Tools
                  </span>
                  <span className="sm:hidden">Explore AI Tools</span>
                  <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
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
        <section
          id="services"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-white first-content-section"
        >
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

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Link key={index} to={service.link} className="block">
                  <Card 
                    className={`service-card-container card-enhanced hover-lift animate-slide-in ${
                      index === 1 ? 'animate-delay-100' : 
                      index === 2 ? 'animate-delay-200' :
                      index === 3 ? 'animate-delay-300' : ''
                    } will-change-transform cursor-pointer relative overflow-hidden`}
                    onMouseEnter={(e) => handleServiceHover(service, e)}
                    onMouseLeave={handleServiceLeave}
                  >
                    {/* Main Card Content */}
                    <div className="main-card-content">
                      <CardHeader className="text-center">
                        <div className={`service-icon-${service.color} icon-bounce`}>
                          <service.icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl md:text-2xl">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base md:text-lg">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                    </div>
                    
                    {/* Sliding Preview Panel */}
                    <div className="preview-panel">
                      <div className="preview-content">
                        <div className="preview-header">
                          <div className="preview-header-content">
                            <div className={`service-icon-${service.color} icon-small`}>
                              <service.icon className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="preview-title">{service.title}</h4>
                          </div>
                        </div>
                        <div className="preview-body">
                          <p className="preview-overview">{service.preview?.overview}</p>
                          <div className="preview-products">
                            <h5 className="products-title">Our Products:</h5>
                            <ul className="products-list">
                              {service.preview?.products.map((product, idx) => (
                                <li key={idx} className="product-item">
                                  <span className="product-bullet"></span>
                                  {product}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
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
              <Link to="/book-consultation">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 btn-primary-enhanced will-change-transform"
                >
                  Book A Consultation
                  <Brain className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2 animate-slide-in-left">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse-glow">
                    <img src="/softscape-logo.png" alt="SoftScape Logo" className="w-6 h-6" />
                  </div>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold gradient-text-ai">
                    SoftScape-Solutions
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
                    <Link to="/ai-chatbots">AI Chatbots</Link>
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    <Link to="/smart-automation">Smart Automation</Link>
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    <Link to="/ai-applications">AI Applications</Link>
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    <Link to="/custom-ai">Custom AI Solutions</Link>
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
                &copy; 2025 SoftScape Solutions. Powering the future with
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