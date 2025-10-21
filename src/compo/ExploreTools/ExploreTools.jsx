import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import { ROUTES } from '../../constants/routes';
import { 
  Sparkles, 
  Bot, 
  Zap, 
  Cpu, 
  Brain, 
  Globe, 
  Eye, 
  Smartphone,
  MessageSquare,
  Workflow,
  Layers,
  Code,
  Monitor,
  GraduationCap
} from 'lucide-react';
import './ExploreTools.css';

const ExploreTools = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Tools', icon: Sparkles },
    { id: 'chatbots', label: 'AI Chatbots', icon: Bot },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'applications', label: 'Applications', icon: Cpu },
    { id: 'webapp', label: 'Web Development', icon: Globe },
    { id: 'mobile', label: 'App Development', icon: Smartphone },
    { id: 'custom', label: 'Custom Solutions', icon: Brain }
  ];

  const tools = [
    {
      id: 'ai-chatbots',
      title: 'AI Chatbots & Agents',
      description: 'Intelligent conversational AI that handles customer service, sales, and support 24/7',
      category: 'chatbots',
      icon: Bot,
      gradient: 'from-blue-600 to-purple-600',
      features: ['24/7 Availability', 'Multi-language Support', 'Context Awareness', 'CRM Integration'],
      price: 'From $299/month',
      link: ROUTES.AI_CHATBOTS,
      popular: true
    },
    {
      id: 'smart-automation',
      title: 'Smart Automation Tools',
      description: 'Automate repetitive tasks and workflows to boost productivity by up to 90%',
      category: 'automation',
      icon: Workflow,
      gradient: 'from-blue-600 to-purple-600',
      features: ['Document Processing', 'Email Automation', 'Data Entry', '1000+ Integrations'],
      price: 'From $199/month',
      link: ROUTES.SMART_AUTOMATION,
      popular: false
    },
    {
      id: 'ai-applications',
      title: 'AI-Enhanced Applications',
      description: 'Custom mobile and web applications powered by artificial intelligence',
      category: 'applications',
      icon: Layers,
      gradient: 'from-blue-600 to-purple-600',
      features: ['Predictive Analytics', 'Smart Recommendations', 'Real-time Insights', 'Cloud-based'],
      price: 'From $999/project',
      link: ROUTES.AI_APPLICATIONS,
      popular: false
    },
    {
      id: 'custom-ai',
      title: 'Custom AI Solutions',
      description: 'Tailored AI systems designed specifically for your unique business requirements',
      category: 'custom',
      icon: Brain,
      gradient: 'from-blue-600 to-purple-600',
      features: ['Bespoke ML Models', 'Industry-Specific', 'Full Ownership', 'Expert Consultation'],
      price: 'From $5,000/project',
      link: ROUTES.CUSTOM_AI,
      popular: false
    },
    {
      id: 'webapp-development',
      title: 'Web App Development',
      description: 'Modern, scalable web applications built with cutting-edge technologies',
      category: 'webapp',
      icon: Globe,
      gradient: 'from-blue-600 to-purple-600',
      features: ['React/Next.js', 'Responsive Design', 'API Integration', 'Cloud Deployment'],
      price: 'From $2,500/project',
      link: ROUTES.WEBAPP_DEVELOPMENT,
      popular: true
    },
    {
      id: 'app-development',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for Android and iOS',
      category: 'mobile',
      icon: Smartphone,
      gradient: 'from-blue-600 to-purple-600',
      features: ['Native iOS/Android', 'Cross-Platform', 'App Store Ready', 'Push Notifications'],
      price: 'From $4,000/project',
      link: ROUTES.APP_DEVELOPMENT,
      popular: false
    },
    {
      id: 'ai-vision',
      title: 'AI Vision & Image Processing',
      description: 'Computer vision solutions for image recognition, analysis, and processing',
      category: 'applications',
      icon: Eye,
      gradient: 'from-blue-600 to-purple-600',
      features: ['Object Detection', 'Face Recognition', 'Image Classification', 'OCR'],
      price: 'Custom Pricing',
      link: ROUTES.AI_VISION,
      popular: false
    }
  ];

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  // Web Development Projects
  const webAppProjects = [
    {
      id: 'ecommerce-platform',
      title: 'E-Commerce Platform',
      description: 'Full-featured online store with payment integration and inventory management',
      techStack: 'React, Node.js, MongoDB',
      icon: Monitor,
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 'project-management-tool',
      title: 'Project Management Tool',
      description: 'Collaborative workspace with real-time updates and team management',
      techStack: 'Vue.js, Express, PostgreSQL',
      icon: Layers,
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 'learning-management-system',
      title: 'Learning Management System',
      description: 'Educational platform with course management and progress tracking',
      techStack: 'Angular, Django, MySQL',
      icon: GraduationCap,
      gradient: 'from-blue-600 to-purple-600'
    }
  ];

  const handleToolClick = (tool) => {
    navigate(tool.link);
  };

  const handleConsultation = () => {
    navigate(ROUTES.BOOK_CONSULTATION);
  };

  return (
    <Layout>
      <div className="explore-tools">
        {/* Hero Section */}
        <section className="explore-hero">
          <div className="container mx-auto px-4 text-center">
            <div className="explore-hero-icon">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Explore Our <span className="text-gradient">AI Tools</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              Discover our comprehensive suite of AI-powered tools designed to transform your business operations and drive innovation.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <section className="category-filter">
            <div className="category-buttons">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tools Grid */}
          <section className="tools-grid-section">
            {activeCategory === 'webapp' ? (
              // Show projects for Web Development category
              <div className="projects-section">
                <div className="projects-header">
                  <h2 className="text-3xl font-bold text-center mb-4">Recent Projects</h2>
                  <p className="text-gray-600 text-center mb-8">Explore some of our successful web application projects</p>
                </div>
                <div className="projects-grid">
                  {webAppProjects.map((project, index) => {
                    const ProjectIcon = project.icon;
                    return (
                      <div
                        key={project.id}
                        className="project-card"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`project-image bg-gradient-to-br ${project.gradient}`}>
                          <ProjectIcon className="w-16 h-16 text-white" />
                        </div>
                        <div className="project-content">
                          <h3 className="project-title">{project.title}</h3>
                          <p className="project-description">{project.description}</p>
                          <div className="project-tech">
                            <span className="tech-label">Tech Stack:</span>
                            <span className="tech-stack">{project.techStack}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="projects-cta">
                  <button
                    onClick={() => navigate(ROUTES.WEBAPP_DEVELOPMENT)}
                    className="webapp-btn"
                  >
                    Learn More About Web Development →
                  </button>
                </div>
              </div>
            ) : (
              // Show tools for other categories
              <div className="tools-grid">
                {filteredTools.map((tool, index) => {
                  const ToolIcon = tool.icon;
                  return (
                    <div
                      key={tool.id}
                      className={`tool-card ${tool.popular ? 'popular' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {tool.popular && (
                        <div className="popular-badge">
                          <Sparkles className="w-4 h-4" />
                          <span>Popular</span>
                        </div>
                      )}
                      
                      <div className={`tool-icon bg-gradient-to-br ${tool.gradient}`}>
                        <ToolIcon className="w-10 h-10 text-white" />
                      </div>

                      <h3 className="tool-title">{tool.title}</h3>
                      <p className="tool-description">{tool.description}</p>

                      <div className="tool-features">
                        {tool.features.map((feature, idx) => (
                          <div key={idx} className="feature-item">
                            <span className="feature-check">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="tool-footer">
                        <div className="tool-price">{tool.price}</div>
                        <button
                          onClick={() => handleToolClick(tool)}
                          className="tool-btn"
                        >
                          Learn More →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* CTA Section */}
          <section className="explore-cta">
            <div className="cta-content">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-xl mb-8">
                We specialize in creating custom AI solutions tailored to your specific needs. 
                Let's discuss how we can help transform your business.
              </p>
              <div className="cta-buttons">
                <button
                  onClick={handleConsultation}
                  className="cta-btn-primary"
                >
                  Book Free Consultation
                </button>
                <button
                  onClick={() => navigate(ROUTES.CONTACT)}
                  className="cta-btn-secondary"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ExploreTools;