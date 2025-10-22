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
  Mail,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Send,
} from "lucide-react";
import { CONTACT_INFO, COMPANY_INFO } from "../../config";
import "./Contact.css";

const Contact = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const contactInfo = CONTACT_INFO.quickContact.concat([
    {
      icon: "https://cdn.jsdelivr.net/npm/ionicons@7.2.1/dist/svg/time-outline.svg",
      type: "hours",
      label: "Business Hours",
      value: `${CONTACT_INFO.businessHours.workDays}: ${CONTACT_INFO.businessHours.hours}`,
      link: null,
      bgColor: "from-yellow-500 to-yellow-600"
    }
  ]).map(info => ({
    ...info,
    icon: info.type === "email" ? "https://cdn.jsdelivr.net/npm/ionicons@7.2.1/dist/svg/mail-outline.svg" :
          info.type === "phone" ? "https://cdn.jsdelivr.net/npm/ionicons@7.2.1/dist/svg/call-outline.svg" :
          info.type === "address" ? "https://cdn.jsdelivr.net/npm/feather-icons@4.29.0/dist/icons/map-pin.svg" :
          info.icon,
    bgColor: info.type === "email" ? "from-red-500 to-red-600" :
             info.type === "phone" ? "from-green-500 to-green-600" :
             info.type === "address" ? "from-blue-500 to-blue-600" :
             info.bgColor || "from-purple-500 to-purple-600"
  }));

  const socialLinks = [
    {
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg",
      name: "GitHub",
      url: CONTACT_INFO.social.github.url,
      username: CONTACT_INFO.social.github.username,
      bgColor: "from-gray-700 to-black"
    },
    {
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg",
      name: "LinkedIn", 
      url: CONTACT_INFO.social.linkedin.url,
      username: CONTACT_INFO.social.linkedin.username,
      bgColor: "from-blue-600 to-blue-800"
    }
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
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-4"
                style={{ display: 'none' }}
              >
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div className="text-gray-700 font-bold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm sm:text-lg md:text-xl">
                {COMPANY_INFO.name}
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              <Link to={ROUTES.HOME} className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
                Home
              </Link>
              <Link to="/explore-tools" className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
                Tools
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
                About
              </Link>
              <Link to="/contact" className="text-blue-600 font-medium tracking-wide text-lg">
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
                <Link to="/explore-tools" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
                  Tools
                </Link>
                <Link to="/about" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
                  About
                </Link>
                <Link to="/contact" className="block text-blue-600 font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
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
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Contact
              <span className="gradient-text-ai block">Us</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our team. We're here to help with your AI solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-enhanced hover-lift animate-slide-in text-center">
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-r ${info.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow`}>
                    {typeof info.icon === 'string' ? (
                      <img 
                        src={info.icon} 
                        alt={`${info.label || info.title} icon`}
                        className="h-8 w-8 object-contain filter brightness-0 invert"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : (
                      <info.icon className="h-8 w-8 text-white" />
                    )}
                    <div 
                      className="h-8 w-8 flex items-center justify-center text-white"
                      style={{ display: 'none' }}
                    >
                      <Brain className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{info.label || info.title}</CardTitle>
                  {info.link ? (
                    <a href={info.link} className="text-blue-600 hover:text-blue-700 transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <CardDescription className="text-base">
                      {info.value}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies We Use */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Technologies We Use
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to build powerful AI solutions and applications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { 
                name: 'React', 
                logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
                bg: 'bg-blue-50' 
              },
              { 
                name: 'Node.js', 
                logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg',
                bg: 'bg-green-50' 
              },
              { 
                name: 'Python', 
                logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg',
                bg: 'bg-yellow-50' 
              },
              // { 
              //   name: 'TensorFlow', 
              //   logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tensorflow.svg',
              //   bg: 'bg-orange-50' 
              // },
              { 
                name: 'OpenAI', 
                logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg',
                bg: 'bg-gray-50' 
              },
              { 
                name: 'MongoDB', 
                logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mongodb.svg',
                bg: 'bg-pink-50' 
              },
              // { 
              //   name: 'PostgreSQL', 
              //   logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg',
              //   bg: 'bg-blue-50' 
              // },
              // { 
              //   name: 'TypeScript', 
              //   logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg',
              //   bg: 'bg-blue-50' 
              // },
              { 
                name: 'Next.js', 
                logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg',
                bg: 'bg-purple-50' 
              }
              // { 
              //   name: 'FastAPI', 
              //   logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/fastapi.svg',
              //   bg: 'bg-green-50' 
              // }
            ].map((tech, index) => (
              <div key={index} className={`${tech.bg} rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group`}>
                <div className="flex justify-center mb-3">
                  <img 
                    src={tech.logo} 
                    alt={`${tech.name} logo`}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                    style={{ display: 'none' }}
                  >
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-gray-600">
              Follow our journey and stay updated with our latest AI innovations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {socialLinks.map((social, index) => (
              <Card key={index} className="card-enhanced hover-lift">
                <CardHeader className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${social.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <img 
                      src={social.logo} 
                      alt={`${social.name} logo`}
                      className="h-10 w-10 object-contain filter brightness-0 invert"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="h-10 w-10 flex items-center justify-center text-white"
                      style={{ display: 'none' }}
                    >
                      <Brain className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{social.name}</CardTitle>
                  <CardDescription className="text-base mb-4">
                    {social.username}
                  </CardDescription>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="btn-primary-enhanced">
                      Visit {social.name}
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our AI experts today
          </p>
          <Link to="/book-consultation">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 btn-primary-enhanced flex items-center">
              Book Consultation
              <Mail className="ml-2 h-5 w-5" style={{ display: 'none' }} />
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
                <img
                  src="/softscape-logo.png"
                  alt="SoftScape Solutions Logo"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  {COMPANY_INFO.name}
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
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{CONTACT_INFO.email.primary}</li>
                <li>{CONTACT_INFO.phone.primary}</li>
                <li>{CONTACT_INFO.address.city}, {CONTACT_INFO.address.country}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {COMPANY_INFO.copyright.year} {COMPANY_INFO.copyright.text}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;