import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ArrowLeft,
  Code,
  Users,
  Target,
  Heart,
  Award,
  Zap,
  Shield,
  Brain,
  Bot,
  Workflow,
  Menu,
  X,
} from "lucide-react";
import "./about.css";
import "./landingPage.css";

const About = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      {/* Navigation - matching landing page style */}
      <nav className="border-b nav-enhanced fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-slide-in-left">
              <img
                src="/softscape-logo.png"
                alt="SoftScape Solutions Logo"
                className="h-12 sm:h-16 md:h-20 w-auto -my-2 sm:-my-4 md:-my-4 mr-2 sm:mr-4"
              />
              <div className="text-gray-700 font-bold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm sm:text-lg md:text-xl">SoftScape Solutions</div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg"
              >
                Home
              </Link>
              <a
                href="/#services"
                className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg"
              >
                AI Tools
              </a>
              <a
                href="/#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg"
              >
                Contact
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-blue-600 transition-colors p-2"
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
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b shadow-lg animate-slide-in">
              <div className="px-4 py-4 space-y-4">
                <Link
                  to="/"
                  className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <a
                  href="/#services"
                  className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2"
                  onClick={toggleMobileMenu}
                >
                  AI Tools
                </a>
                <a
                  href="/#contact"
                  className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-in">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About
              <span className="gradient-text-ai block">
                SoftScape AI Solutions
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              We are passionate AI innovators creating intelligent solutions,
              autonomous agents, and smart tools that revolutionize businesses
              through the power of artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our AI Mission
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                At SoftScape AI Solutions, we are dedicated to delivering
                revolutionary artificial intelligence tools, smart automation
                agents, and intelligent systems that transform how businesses
                operate. Our commitment to AI excellence drives everything we
                create.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex items-center btn-primary-enhanced">
                  <Brain className="mr-2 h-5 w-5" />
                  Our AI Vision
                </Button>
                <Button variant="outline" className="hover-glow">
                  Join Our AI Team
                </Button>
              </div>
            </div>
            <div
              className="animate-slide-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="animate-gradient rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Our AI Promise</h3>
                </div>
                <p className="text-blue-100 text-lg leading-relaxed">
                  We promise to deliver AI solutions that not only meet your
                  technical requirements but revolutionize your business
                  operations with intelligent automation and smart
                  decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our AI Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The AI principles that guide every intelligent solution and
              autonomous agent we create
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 animate-pulse-glow">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">AI Innovation</CardTitle>
                <CardDescription className="text-base">
                  Pioneering the future with breakthrough artificial
                  intelligence and smart automation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-slide-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 animate-pulse-glow">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Excellence</CardTitle>
                <CardDescription className="text-base">
                  Delivering intelligent solutions with unmatched quality and
                  precision
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-slide-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 animate-pulse-glow">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">AI Ethics</CardTitle>
                <CardDescription className="text-base">
                  Building trustworthy AI systems with transparency and
                  responsible innovation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-slide-in"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 animate-pulse-glow">
                  <Workflow className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Intelligent Collaboration
                </CardTitle>
                <CardDescription className="text-base">
                  Partnering with AI agents and human expertise for
                  extraordinary results
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to delivering exceptional
              results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center group animate-slide-in">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                OA
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Omer Aqeel
              </h3>
              <p className="text-gray-600 mb-2">
                Lead AI Developer/Software Engineer
              </p>
              <p className="text-sm text-gray-500">
                AI systems architect with 4+ years in intelligent automation,
                specializing in natural language processing, LLM integration,
                and AI-driven solutions.
              </p>
            </div>

            <div
              className="text-center group animate-slide-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                SH
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Mohammad Saad Husnain
              </h3>
              <p className="text-gray-600 mb-2">AI UX Designer/Researcher</p>
              <p className="text-sm text-gray-500">
                Designing intuitive interfaces for intelligent systems/AI
                applications and Researching AI Implementation Strategies
              </p>
            </div>

            <div
              className="text-center group animate-slide-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                SR
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Saad ur Rehman
              </h3>
              <p className="text-gray-600 mb-2">
                Full Stack Developer/Project Manager
              </p>
              <p className="text-sm text-gray-500">
                Keeping AI infrastructure cool and optimally performing,
                developing communication protocols, ensuring seamless
                integration of AI solutions and Database management.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              We are a team of passionate professionals committed to delivering
              the best solutions for our clients. With expertise in various
              technologies and industries, we bring diverse perspectives to
              every project.
            </p>
            <Button
              size="lg"
              className="animate-slide-in"
              style={{ animationDelay: "0.3s" }}
            >
              Join Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  SoftScape AI Solutions
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Revolutionizing businesses through cutting-edge AI technology
                and intelligent automation.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>Services</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>hello@softscape.solutions</li>
                <li>+1 (555) 123-4567</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 SoftScape AI Solutions. Powering the future with
              artificial intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
