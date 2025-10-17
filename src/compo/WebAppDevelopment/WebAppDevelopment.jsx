import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Smartphone, 
  Shield, 
  Zap, 
  Globe,
  Eye,
  ArrowRight,
  CheckCircle,
  Star,
  Code2,
  Heart,
  Triangle,
  Circle,
  Server,
  Database
} from 'lucide-react';
import Layout from '../../components/common/Layout';
import { ROUTES } from '../../constants/routes';

const WebAppDevelopment = () => {
  const navigate = useNavigate();

  // Service packages with the color scheme from the image
  const servicePackages = [
    {
      id: 1,
      title: "Starter Web Apps",
      subtitle: "Perfect for small businesses",
      description: "Simple yet effective web applications with essential features to get your business online",
      icon: Globe,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      popular: false,
      price: "From $1,999/project",
      features: [
        "Responsive Design",
        "Basic UI/UX",
        "Contact Forms", 
        "SEO Optimization",
        "30 Days Support"
      ]
    },
    {
      id: 2,
      title: "Professional Web Apps",
      subtitle: "Advanced business solutions", 
      description: "Feature-rich applications with custom functionality and advanced integrations",
      icon: Rocket,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100", 
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      popular: true,
      price: "From $4,999/project",
      features: [
        "Custom Features",
        "Database Integration",
        "User Authentication",
        "Admin Dashboard",
        "API Integration"
      ]
    },
    {
      id: 3,
      title: "Enterprise Solutions",
      subtitle: "Scalable enterprise apps",
      description: "Complex systems with advanced security, scalability and enterprise-grade features",
      icon: Shield,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      buttonColor: "bg-green-600 hover:bg-green-700", 
      popular: false,
      price: "From $9,999/project",
      features: [
        "Microservices Architecture",
        "Advanced Security",
        "Cloud Deployment", 
        "Performance Optimization",
        "24/7 Support"
      ]
    },
    {
      id: 4,
      title: "AI-Enhanced Apps",
      subtitle: "Intelligent web applications",
      description: "Custom applications powered by artificial intelligence and machine learning capabilities",
      icon: Eye,
      iconColor: "text-orange-600", 
      bgColor: "bg-orange-100",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
      popular: false,
      price: "From $7,999/project", 
      features: [
        "AI/ML Integration",
        "Smart Analytics",
        "Predictive Features",
        "Custom AI Models",
        "Advanced Insights"
      ]
    }
  ];

  const handleGetStarted = (packageInfo) => {
    navigate(ROUTES.BOOK_CONSULTATION, { 
      state: { 
        selectedPackage: packageInfo.title,
        service: 'Web Application Development',
        price: packageInfo.price
      }
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Web Application Development
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Transform your business ideas into powerful, scalable web applications that drive growth and deliver exceptional user experiences
            </p>
            <button 
              onClick={() => navigate(ROUTES.BOOK_CONSULTATION)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Project Today
            </button>
          </div>
        </section>

        {/* Service Packages */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Choose Your Perfect Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select from our range of web application development packages designed to meet different business needs and budgets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {servicePackages.map((pkg) => {
                const IconComponent = pkg.icon;
                return (
                  <div key={pkg.id} className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative border border-gray-100 flex flex-col h-full`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                          ⭐ Popular
                        </span>
                      </div>
                    )}
                    
                    <div className={`${pkg.bgColor} rounded-2xl p-4 w-fit mb-6`}>
                      <IconComponent className={`w-8 h-8 ${pkg.iconColor}`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {pkg.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm font-medium mb-4">
                      {pkg.subtitle}
                    </p>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                      {pkg.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <div className="text-lg font-bold text-gray-800 mb-4">
                        {pkg.price}
                      </div>
                      
                      <button
                        onClick={() => handleGetStarted(pkg)}
                        className={`w-full ${pkg.buttonColor} text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group`}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Technology Stack
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We use the latest and most reliable technologies to build robust, scalable applications
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
                  name: 'Vue.js', 
                  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
                  bg: 'bg-green-50' 
                },
                { 
                  name: 'Angular', 
                  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
                  bg: 'bg-red-50' 
                },
                { 
                  name: 'Node.js', 
                  logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg',
                  bg: 'bg-green-50' 
                },
                { 
                  name: 'Python', 
                  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
                  bg: 'bg-yellow-50' 
                },
                { 
                  name: 'MongoDB', 
                  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
                  bg: 'bg-green-50' 
                },
              ].map((tech, index) => {
                return (
                  <div key={index} className={`${tech.bg} rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group`}>
                    <div className="flex justify-center mb-3">
                      <img 
                        src={tech.logo} 
                        alt={`${tech.name} logo`}
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs font-bold hidden">
                        {tech.name.charAt(0)}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {tech.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Build Your Web Application?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Let's transform your vision into a powerful web application that drives your business forward
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate(ROUTES.BOOK_CONSULTATION)}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  Get Started Today
                </button>
                <button
                  onClick={() => navigate(ROUTES.CONTACT)}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all"
                >
                  Contact Us
                </button>
              </div>
              
              <div className="mt-12 flex justify-center items-center space-x-8 text-blue-200">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>5.0 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-300" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default WebAppDevelopment;