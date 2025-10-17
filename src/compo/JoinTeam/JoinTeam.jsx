import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ROUTES } from "../../constants/routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Brain,
  Users,
  Rocket,
  Heart,
  TrendingUp,
  Menu,
  X,
  Code,
  Palette,
  BarChart3,
  Zap,
  Award,
  Coffee,
} from "lucide-react";
import Layout from "../../components/common/Layout";
import "../LandingPage/LandingPage.css";
import "./JoinTeam.css";

const JoinTeam = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openPositions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / Jeddah",
      type: "Full-time",
      icon: Code,
      description: "Build cutting-edge AI solutions and work with the latest machine learning technologies.",
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote / Jeddah",
      type: "Full-time",
      icon: Palette,
      description: "Design beautiful, intuitive interfaces for our AI-powered applications.",
    },
    {
      title: "Data Scientist",
      department: "Data",
      location: "Remote / Jeddah",
      type: "Full-time",
      icon: BarChart3,
      description: "Analyze complex data sets and develop predictive models for our AI systems.",
    },
    {
      title: "AI Product Manager",
      department: "Product",
      location: "Remote / Jeddah",
      type: "Full-time",
      icon: Zap,
      description: "Lead product strategy and development for innovative AI solutions.",
    },
  ];

  const benefits = [
    {
      icon: Rocket,
      title: "Work on Cutting-Edge AI",
      description: "Build innovative solutions using the latest AI technologies",
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with talented, passionate team members",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Continuous learning and professional development opportunities",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work options",
    },
    {
      icon: Award,
      title: "Competitive Compensation",
      description: "Industry-leading salaries and equity packages",
    },
    {
      icon: Coffee,
      title: "Great Perks",
      description: "Health insurance, team events, and more",
    },
  ];

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="border-b nav-enhanced fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={ROUTES.HOME} className="flex items-center animate-slide-in-left">
              <img
                src="/softscape-logo.png"
                alt="SoftScape Solutions Logo"
                className="h-12 sm:h-16 md:h-20 w-auto -my-2 sm:-my-4 md:-my-4 mr-2 sm:mr-4"
              />
              <div className="text-gray-700 font-bold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm sm:text-lg md:text-xl">
                SoftScape Solutions
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              <Link to={ROUTES.HOME} className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
                Home
              </Link>
              <a href="/#services" className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
                AI Tools
              </a>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
                Contact
              </Link>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-blue-600 transition-colors p-2">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b shadow-lg animate-slide-in">
              <div className="px-4 py-4 space-y-4">
                <Link to={ROUTES.HOME} className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
                  Home
                </Link>
                <a href="/#services" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
                  AI Tools
                </a>
                <Link to="/about" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
                  About
                </Link>
                <Link to="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-in">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Join Our
              <span className="gradient-text-ai block">Team</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Help us build the future of AI. Join a team of passionate innovators creating intelligent solutions that transform businesses.
            </p>
            <Button size="lg" className="btn-primary-enhanced">
              View Open Positions
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Join SoftScape?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              We offer more than just a job – we offer a chance to shape the future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-enhanced hover-lift animate-slide-in">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Find your perfect role and join our mission
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {openPositions.map((position, index) => (
              <Card key={index} className="card-enhanced hover-lift animate-slide-in">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <position.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {position.department}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                          {position.type}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                          {position.location}
                        </span>
                      </div>
                      <CardDescription className="text-base mb-4">
                        {position.description}
                      </CardDescription>
                      <Button className="btn-primary-enhanced">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Don't see a position that fits? We're always looking for talented people.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="hover-glow">
                Send Us Your Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us in building the future of AI and transforming businesses worldwide
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 btn-primary-enhanced">
              Get in Touch
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  SoftScape AI Solutions
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Revolutionizing businesses through cutting-edge AI technology and intelligent automation.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to={ROUTES.HOME} className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to={ROUTES.ABOUT} className="hover:text-white transition-colors">About</Link></li>
                <li><Link to={ROUTES.CONTACT} className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Careers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/join-team" className="hover:text-white transition-colors">Open Positions</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Submit Resume</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SoftScape AI Solutions. Powering the future with artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JoinTeam;