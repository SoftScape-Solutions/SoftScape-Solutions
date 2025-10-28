import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import FlipCard from "../../components/ui/flip-card";
import { Brain, Sparkles, Users, Zap, BarChart, ArrowRight, Check, Monitor, Smartphone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import { HERO_CONFIG, SERVICES_CONFIG, ICON_URLS } from "../../config";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrollingFromHero, setIsScrollingFromHero] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;

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

  // Get services from config and add icon URLs
  const services = SERVICES_CONFIG.aiServices.map(service => ({
    ...service,
    iconUrl: ICON_URLS[service.icon] || ICON_URLS.Bot,
    preview: {
      products: service.features.slice(0, 3),
      overview: service.detailedDescription
    }
  }));

  return (
    <Layout logoClassName="logo-text">
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
              {HERO_CONFIG.title.split(" ").slice(0, -1).join(" ")}
              <span className="gradient-text-ai block font-extrabold">
                {HERO_CONFIG.title.split(" ").slice(-1)}
              </span>
            </h1>
            <p className="hero-description">
              {HERO_CONFIG.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in animate-delay-400 px-4">
              <Link to={HERO_CONFIG.cta.primary.link}>
                <Button size="lg" className="hero-button btn-primary-enhanced">
                  <span className="hidden sm:inline">
                    {HERO_CONFIG.cta.primary.text}
                  </span>
                  <span className="sm:hidden">{HERO_CONFIG.cta.primary.mobileText}</span>
                  <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
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

            <div className="flex flex-wrap items-start justify-center gap-6">
              {services.map((service, index) => {
                const serviceColors = [
                  { bg: "bg-blue-600", text: "text-blue-600" }, // AI Chatbots
                  { bg: "bg-purple-600", text: "text-purple-600" }, // Smart Automation 
                  { bg: "bg-green-600", text: "text-green-600" }, // AI Applications
                  { bg: "bg-orange-600", text: "text-orange-600" }, // Custom AI
                  { bg: "bg-emerald-600", text: "text-emerald-600" }, // Web App Development
                  { bg: "bg-cyan-600", text: "text-cyan-600" } // App Development
                ];
                
                const serviceIcons = [
                  <Brain />, // AI Chatbots
                  <Zap />, // Smart Automation
                  <BarChart />, // AI Applications 
                  <Users />, // Custom AI
                  <Monitor />, // Web App Development
                  <Smartphone /> // App Development
                ];
                
                return (
                  <FlipCard
                    key={index}
                    className={`animate-slide-in ${
                      index === 1
                        ? "animate-delay-100"
                        : index === 2
                        ? "animate-delay-200"
                        : index === 3
                        ? "animate-delay-300"
                        : ""
                    }`}
                    onClick={() => navigate(service.link)}
                    bgColor={serviceColors[index]?.bg}
                    textColor={serviceColors[index]?.text}
                    icon={serviceIcons[index]}
                    title={service.title}
                    description={service.description}
                    price="Learn More"
                    category="AI Solutions"
                  />
                );
              })}
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
      </div>
    </Layout>
  );
};

export default LandingPage;