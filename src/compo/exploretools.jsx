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
  Bot,
  Workflow,
  Sparkles,
  Cpu,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Zap,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import "./landingPage.css";
import "./exploretools.css";

const ExploreTools = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const tools = [
    {
      id: 1,
      title: "Intelligent Customer Support Bot",
      category: "chatbots",
      description: "24/7 AI-powered customer support that handles inquiries, resolves issues, and learns from every interaction.",
      icon: Bot,
      features: ["Natural Language Processing", "Multi-language Support", "Self-Learning"],
      link: "/ai-chatbots",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Sales Assistant AI",
      category: "chatbots",
      description: "Conversational AI that qualifies leads, schedules meetings, and assists in the sales process.",
      icon: MessageCircle,
      features: ["Lead Qualification", "Meeting Scheduling", "CRM Integration"],
      link: "/ai-chatbots",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Document Processing Automation",
      category: "automation",
      description: "Automatically extract, classify, and process documents with AI-powered OCR and data extraction.",
      icon: Workflow,
      features: ["OCR Technology", "Data Extraction", "Auto-Classification"],
      link: "/smart-automation",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Workflow Automation Engine",
      category: "automation",
      description: "Connect your apps and automate repetitive tasks with intelligent workflow automation.",
      icon: Zap,
      features: ["1000+ Integrations", "Smart Triggers", "No-Code Builder"],
      link: "/smart-automation",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "AI-Enhanced Mobile App",
      category: "applications",
      description: "Native mobile applications with built-in AI capabilities for personalization and smart features.",
      icon: Smartphone,
      features: ["iOS & Android", "Offline AI", "Push Notifications"],
      link: "/ai-applications",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      id: 6,
      title: "Predictive Analytics Platform",
      category: "applications",
      description: "Web-based analytics platform powered by machine learning for business intelligence.",
      icon: Sparkles,
      features: ["Real-time Insights", "Predictive Models", "Custom Dashboards"],
      link: "/ai-applications",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      id: 7,
      title: "Custom AI Model Training",
      category: "custom",
      description: "Train custom AI models on your proprietary data for unique business requirements.",
      icon: Cpu,
      features: ["Your Data", "Custom Models", "Full Ownership"],
      link: "/custom-ai",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      id: 8,
      title: "Enterprise AI Integration",
      category: "custom",
      description: "Seamlessly integrate AI capabilities into your existing enterprise systems and workflows.",
      icon: Brain,
      features: ["Legacy Integration", "Scalable", "Enterprise Security"],
      link: "/custom-ai",
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  const categories = [
    { id: "all", name: "All Tools" },
    { id: "chatbots", name: "AI Chatbots" },
    { id: "automation", name: "Automation" },
    { id: "applications", name: "Applications" },
    { id: "custom", name: "Custom Solutions" },
  ];

  const filteredTools = selectedCategory === "all" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

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
              <Link to="/explore-ai-tools" className="text-blue-600 font-medium tracking-wide text-lg">
                AI Tools
              </Link>
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
                <Link to="/explore-ai-tools" className="block text-blue-600 font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
                  AI Tools
                </Link>
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
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-in">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Explore Our
              <span className="gradient-text-ai block">AI Tools</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive suite of AI-powered tools designed to transform your business operations and drive innovation.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredTools.map((tool, index) => (
              <Card key={tool.id} className="card-enhanced hover-lift animate-slide-in">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse-glow`}>
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{tool.title}</CardTitle>
                      <CardDescription className="text-base mb-4">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={tool.link}>
                    <Button className="w-full btn-primary-enhanced">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss which AI tools are right for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-consultation">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3 btn-primary-enhanced">
                Book Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
                Contact Us
              </Button>
            </Link>
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
              <h3 className="text-white font-semibold mb-4">AI Tools</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/ai-chatbots" className="hover:text-white transition-colors">AI Chatbots</Link></li>
                <li><Link to="/smart-automation" className="hover:text-white transition-colors">Smart Automation</Link></li>
                <li><Link to="/ai-applications" className="hover:text-white transition-colors">AI Applications</Link></li>
                <li><Link to="/custom-ai" className="hover:text-white transition-colors">Custom AI</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/ai-vision" className="hover:text-white transition-colors">AI Vision</Link></li>
                <li><Link to="/join-team" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
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

export default ExploreTools;