import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import { ROUTES } from '../../constants/routes';
import './WebAppDevelopment.css';

const WebAppDevelopment = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🚀',
      title: 'High Performance',
      description: 'Lightning-fast web applications built with modern frameworks and optimized for speed and efficiency.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Fully responsive applications that work seamlessly across all devices and screen sizes.'
    },
    {
      icon: '🔒',
      title: 'Secure & Scalable',
      description: 'Enterprise-grade security measures and scalable architecture to grow with your business.'
    },
    {
      icon: '⚡',
      title: 'Real-time Features',
      description: 'Interactive real-time features including live chat, notifications, and collaborative tools.'
    },
    {
      icon: '🎨',
      title: 'Custom UI/UX',
      description: 'Beautiful, intuitive user interfaces designed specifically for your brand and users.'
    },
    {
      icon: '🔧',
      title: 'API Integration',
      description: 'Seamless integration with third-party APIs and services to extend functionality.'
    }
  ];

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'Vue.js', icon: '💚' },
    { name: 'Angular', icon: '🔺' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'AWS', icon: '☁️' }
  ];

  const packages = [
    {
      name: 'Starter',
      price: '$1,500',
      duration: 'per project',
      features: [
        'Simple Web Application',
        'Responsive Design',
        'Basic UI/UX',
        'Contact Form Integration',
        '30 Days Support',
        'Basic SEO Optimization'
      ],
      description: 'Perfect for small businesses and startups looking to establish their online presence.',
      recommended: false
    },
    {
      name: 'Professional',
      price: '$2,500',
      duration: 'per project',
      features: [
        'Full-Featured Web App',
        'Custom UI/UX Design',
        'User Authentication',
        'Database Integration',
        'API Development',
        '60 Days Support',
        'Advanced SEO',
        'Performance Optimization'
      ],
      description: 'Ideal for growing businesses that need advanced features and custom functionality.',
      recommended: true
    },
    {
      name: 'Enterprise',
      price: '$4,500',
      duration: 'per project',
      features: [
        'Complex Web Application',
        'Advanced Features',
        'Real-time Functionality',
        'Multi-user System',
        'Third-party Integrations',
        '90 Days Support',
        'Cloud Deployment',
        'Maintenance Plan'
      ],
      description: 'Comprehensive solution for large organizations with complex requirements.',
      recommended: false
    }
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Discovery',
      description: 'Understanding your requirements, goals, and target audience'
    },
    {
      number: '2',
      title: 'Planning',
      description: 'Creating wireframes, architecture, and project timeline'
    },
    {
      number: '3',
      title: 'Design',
      description: 'Crafting beautiful UI/UX designs tailored to your brand'
    },
    {
      number: '4',
      title: 'Development',
      description: 'Building your application with cutting-edge technologies'
    },
    {
      number: '5',
      title: 'Testing',
      description: 'Rigorous testing to ensure quality and performance'
    },
    {
      number: '6',
      title: 'Deployment',
      description: 'Launching your application and providing ongoing support'
    }
  ];

  const portfolioItems = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured online store with payment integration and inventory management',
      tech: 'React, Node.js, MongoDB'
    },
    {
      title: 'Project Management Tool',
      description: 'Collaborative workspace with real-time updates and team management',
      tech: 'Vue.js, Express, PostgreSQL'
    },
    {
      title: 'Learning Management System',
      description: 'Educational platform with course management and progress tracking',
      tech: 'Angular, Django, MySQL'
    }
  ];

  const handlePackageSelect = (pkg) => {
    navigate(ROUTES.bookConsultation, {
      state: {
        selectedPackage: {
          name: pkg.name,
          price: pkg.price,
          service: 'Web App Development',
          packageType: pkg.name,
          features: pkg.features,
          description: pkg.description
        }
      }
    });
  };

  return (
    <Layout>
      <div className="webapp-development">
        {/* Hero Section */}
        <section className="webapp-hero">
          <div className="container mx-auto px-4">
            <div className="webapp-hero-content max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Web Application Development
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Transform your ideas into powerful, scalable web applications. 
                We build custom solutions that drive business growth and deliver exceptional user experiences.
              </p>
              <button 
                onClick={() => navigate('/book-consultation')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Features Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our Web App Development?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver cutting-edge web applications that combine performance, security, and beautiful design
              </p>
            </div>
            
            <div className="webapp-features-grid">
              {features.map((feature, index) => (
                <div key={index} className="webapp-feature-card">
                  <div className="webapp-feature-icon">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="webapp-tech-stack">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Technology Stack
              </h2>
              <p className="text-xl text-gray-600">
                We use the latest and most reliable technologies to build your applications
              </p>
            </div>
            
            <div className="webapp-tech-grid">
              {techStack.map((tech, index) => (
                <div key={index} className="webapp-tech-item">
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h4 className="font-semibold">{tech.name}</h4>
                </div>
              ))}
            </div>
          </section>

          {/* Development Process */}
          <section className="webapp-process py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Development Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A proven methodology that ensures project success from concept to deployment
              </p>
            </div>
            
            <div className="webapp-process-steps">
              {processSteps.map((step, index) => (
                <div key={index} className="webapp-process-step">
                  <div className="webapp-process-number">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Portfolio */}
          <section className="webapp-portfolio py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Recent Projects
              </h2>
              <p className="text-xl text-gray-600">
                Explore some of our successful web application projects
              </p>
            </div>
            
            <div className="webapp-portfolio-grid">
              {portfolioItems.map((item, index) => (
                <div key={index} className="webapp-portfolio-item">
                  <div className="webapp-portfolio-image">
                    <span className="text-6xl">🖥️</span>
                  </div>
                  <div className="webapp-portfolio-content">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="text-sm text-gray-500">
                      <strong>Tech Stack:</strong> {item.tech}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Pricing Section */}
        <section className="webapp-pricing">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Investment Packages
              </h2>
              <p className="text-xl text-white opacity-90">
                Choose the perfect package for your web application needs
              </p>
            </div>
            
            <div className="webapp-pricing-grid">
              {packages.map((pkg, index) => (
                <div 
                  key={index} 
                  className={`webapp-pricing-card ${pkg.recommended ? 'featured' : ''}`}
                >
                  {pkg.recommended && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-4 py-1 rounded-bl-lg rounded-tr-lg font-semibold text-sm">
                      Recommended
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                    <span className="text-lg opacity-75 ml-2">{pkg.duration}</span>
                  </div>
                  <p className="text-sm opacity-90 mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                      pkg.recommended
                        ? 'bg-white text-blue-600 hover:bg-gray-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* CTA Section */}
          <section className="webapp-cta my-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Web Application?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Let's discuss your project requirements and create a solution that exceeds your expectations. 
              Our team is ready to turn your vision into reality.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    navigate(ROUTES.BOOK_CONSULTATION);
                  } catch (error) {
                    console.error('Navigation error:', error);
                  }
                }}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Book Free Consultation
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    navigate(ROUTES.CONTACT);
                  } catch (error) {
                    console.error('Navigation error:', error);
                  }
                }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
              >
                Contact Us
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default WebAppDevelopment;