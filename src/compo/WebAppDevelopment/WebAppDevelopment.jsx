import React from 'react';
import { Link } from 'react-router-dom';
import './WebAppDevelopment.css';

const WebAppDevelopment = () => {
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
      features: [
        'Simple Web Application',
        'Responsive Design',
        'Basic UI/UX',
        'Contact Form Integration',
        '30 Days Support',
        'Basic SEO Optimization'
      ]
    },
    {
      name: 'Professional',
      price: '$2,500',
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
      featured: true
    },
    {
      name: 'Enterprise',
      price: '$4,500',
      features: [
        'Complex Web Application',
        'Advanced Features',
        'Real-time Functionality',
        'Multi-user System',
        'Third-party Integrations',
        '90 Days Support',
        'Cloud Deployment',
        'Maintenance Plan'
      ]
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

  return (
    <div className="webapp-development">
      {/* Hero Section */}
      <section className="webapp-hero">
        <div className="container">
          <div className="webapp-hero-content">
            <h1>Web Application Development</h1>
            <p>
              Transform your ideas into powerful, scalable web applications. 
              We build custom solutions that drive business growth and deliver exceptional user experiences.
            </p>
            <Link to="/book-consultation" className="btn btn-primary btn-large">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Features Section */}
        <section className="section">
          <div className="section-header">
            <h2>Why Choose Our Web App Development?</h2>
            <p>We deliver cutting-edge web applications that combine performance, security, and beautiful design</p>
          </div>
          
          <div className="webapp-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="webapp-feature-card">
                <div className="webapp-feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="webapp-tech-stack">
          <div className="section-header">
            <h2>Our Technology Stack</h2>
            <p>We use the latest and most reliable technologies to build your applications</p>
          </div>
          
          <div className="webapp-tech-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="webapp-tech-item">
                <div className="icon">{tech.icon}</div>
                <h4>{tech.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Development Process */}
        <section className="webapp-process">
          <div className="section-header">
            <h2>Our Development Process</h2>
            <p>A proven methodology that ensures project success from concept to deployment</p>
          </div>
          
          <div className="webapp-process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="webapp-process-step">
                <div className="webapp-process-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section className="webapp-portfolio">
          <div className="section-header">
            <h2>Recent Projects</h2>
            <p>Explore some of our successful web application projects</p>
          </div>
          
          <div className="webapp-portfolio-grid">
            {portfolioItems.map((item, index) => (
              <div key={index} className="webapp-portfolio-item">
                <div className="webapp-portfolio-image">
                  🖥️
                </div>
                <div className="webapp-portfolio-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="tech-tags">
                    <small><strong>Tech Stack:</strong> {item.tech}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Pricing Section */}
      <section className="webapp-pricing">
        <div className="container">
          <div className="section-header">
            <h2>Investment Packages</h2>
            <p>Choose the perfect package for your web application needs</p>
          </div>
          
          <div className="webapp-pricing-grid">
            {packages.map((pkg, index) => (
              <div key={index} className={`webapp-pricing-card ${pkg.featured ? 'featured' : ''}`}>
                <h3>{pkg.name}</h3>
                <div className="price">
                  <span className="amount">{pkg.price}</span>
                  <span className="period">per project</span>
                </div>
                <ul className="features-list">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <Link to="/book-consultation" className="btn btn-primary btn-full">
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        {/* CTA Section */}
        <section className="webapp-cta">
          <h2>Ready to Build Your Web Application?</h2>
          <p>
            Let's discuss your project requirements and create a solution that exceeds your expectations. 
            Our team is ready to turn your vision into reality.
          </p>
          <div className="cta-buttons">
            <Link to="/book-consultation" className="btn btn-primary btn-large">
              Book Free Consultation
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-large">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WebAppDevelopment;