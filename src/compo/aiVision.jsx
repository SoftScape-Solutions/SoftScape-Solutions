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
  Brain,
  Eye,
  Target,
  Lightbulb,
  Globe,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Menu,
  X,
  Sparkles,
  Rocket,
  Heart,
} from "lucide-react";
import "./landingPage.css";

const AIVision = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const visionPillars = [
    {
      icon: Brain,
      title: "Intelligent by Design",
      description: "Creating AI systems that learn, adapt, and evolve to meet changing business needs.",
    },
    {
      icon: Users,
      title: "Human-Centric AI",
      description: "Building technology that augments human capabilities and enhances decision-making.",
    },
    {
      icon: Shield,
      title: "Ethical & Trustworthy",
      description: "Developing AI with transparency, accountability, and responsible innovation at its core.",
    },
    {
      icon: Globe,
      title: "Globally Accessible",
      description: "Making advanced AI solutions available to businesses of all sizes worldwide.",
    },
  ];

  const futureGoals = [
    {
      icon: Rocket,
      title: "Advance AI Research",
      description: "Push the boundaries of what's possible with artificial intelligence and machine learning.",
    },
    {
      icon: Zap,
      title: "Democratize AI",
      description: "Make powerful AI tools accessible and affordable for every business.",
    },
    {
      icon: TrendingUp,
      title: "Drive Innovation",
      description: "Lead the industry in developing breakthrough AI applications and solutions.",
    },
    {
      icon: Heart,
      title: "Create Positive Impact",
      description: "Use AI to solve real-world problems and improve people's lives.",
    },
  ];

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="border-b nav-enhanced fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center animate-slide-in-left">
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
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
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
                <Link to="/" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
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
              <Eye className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our AI
              <span className="gradient-text-ai block">Vision</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Building a future where artificial intelligence empowers every business to achieve extraordinary results through intelligent automation and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <Card className="card-enhanced">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl mb-4">Our Vision</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                We envision a world where advanced AI technology is not a luxury for tech giants, but an accessible tool for businesses of all sizes. Our mission is to democratize artificial intelligence, making it simple, powerful, and transformative for every organization seeking to innovate and grow.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Vision Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Core Pillars of Our Vision
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              The fundamental principles guiding our AI innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {visionPillars.map((pillar, index) => (
              <Card key={index} className="card-enhanced hover-lift animate-slide-in">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <pillar.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-3">{pillar.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {pillar.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Future Goals
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Where we're heading and how we're getting there
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {futureGoals.map((goal, index) => (
              <Card key={index} className="card-enhanced hover-lift animate-slide-in text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <goal.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-3">{goal.title}</CardTitle>
                  <CardDescription className="text-base">
                    {goal.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                The Impact We Aim to Create
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Transform Industries
                    </h3>
                    <p className="text-gray-600">
                      Enable businesses across all sectors to leverage AI for competitive advantage and operational excellence.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Empower People
                    </h3>
                    <p className="text-gray-600">
                      Free humans from repetitive tasks, allowing them to focus on creativity, strategy, and meaningful work.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Drive Global Progress
                    </h3>
                    <p className="text-gray-600">
                      Contribute to solving global challenges through intelligent AI applications and responsible innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-in">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Join Our Journey</h3>
                <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                  Be part of shaping the future of AI. Whether you're a business looking for intelligent solutions or a talented professional wanting to make an impact, we'd love to work with you.
                </p>
                <div className="space-y-4">
                  <Link to="/book-consultation">
                    <Button size="lg" variant="secondary" className="w-full btn-primary-enhanced">
                      Partner With Us
                    </Button>
                  </Link>
                  <Link to="/join-team">
                    <Button size="lg" variant="outline" className="w-full text-white border-white hover:bg-white hover:text-blue-600">
                      Join Our Team
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build the Future Together
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience how our AI vision can transform your business
          </p>
          <Link to="/explore-ai-tools">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 btn-primary-enhanced">
              Explore Our AI Tools
              <Sparkles className="ml-2 h-5 w-5" />
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
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/ai-vision" className="hover:text-white transition-colors">AI Vision</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/join-team" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/explore-ai-tools" className="hover:text-white transition-colors">AI Tools</Link></li>
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

export default AIVision;