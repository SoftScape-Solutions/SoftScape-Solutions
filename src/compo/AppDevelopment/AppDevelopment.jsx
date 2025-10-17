import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Smartphone, 
  Tablet, 
  Shield, 
  Zap, 
  Globe,
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
  Download,
  Bell
} from 'lucide-react';
import Layout from '../../components/common/Layout';
import { ROUTES } from '../../constants/routes';
import { SERVICES_CONFIG } from '../../config';
import './AppDevelopment.css';

const AppDevelopment = () => {
  const navigate = useNavigate();

  // Get app development config
  const appConfig = SERVICES_CONFIG.appDevelopmentConfig;

  // Helper function to get icon component from string name
  const getIconComponent = (iconName) => {
    const iconMap = {
      'Smartphone': Smartphone,
      'Tablet': Tablet,
      'Globe': Globe,
      'Shield': Shield,
      'Download': Download,
      'Bell': Bell,
      'Star': Star,
      'Zap': Zap
    };
    return iconMap[iconName] || Smartphone;
  };

  const handleGetStarted = (packageInfo) => {
    navigate(ROUTES.BOOK_CONSULTATION, { 
      state: { 
        selectedPackage: packageInfo.title,
        service: 'Mobile App Development',
        price: packageInfo.price
      }
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-white/20 backdrop-blur-sm">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {appConfig.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-purple-100">
              {appConfig.hero.subtitle}
            </p>
            <button 
              onClick={() => navigate(ROUTES.BOOK_CONSULTATION)}
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              {appConfig.hero.ctaText}
            </button>
          </div>
        </section>

        {/* Service Packages */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Choose Your Development Approach
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select the perfect app development solution based on your target platforms, timeline, and business requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {appConfig.packages.map((pkg) => {
                const IconComponent = getIconComponent(pkg.icon);
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
                App Development Technologies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We use cutting-edge technologies and frameworks to build high-performance mobile applications
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {appConfig.technologies.map((tech, index) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* App Store Features */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Ready for App Stores
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We ensure your app meets all guidelines and requirements for successful publication
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {appConfig.appStoreFeatures.map((feature, index) => {
                const IconComponent = getIconComponent(feature.icon);
                return (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                    <div className={`${feature.bgColor} rounded-2xl p-4 w-fit mx-auto mb-6`}>
                      <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-white/20 backdrop-blur-sm">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {appConfig.cta.title}
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                {appConfig.cta.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate(ROUTES.BOOK_CONSULTATION)}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  {appConfig.cta.primaryButton}
                </button>
                <button
                  onClick={() => navigate(ROUTES.CONTACT)}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all"
                >
                  {appConfig.cta.secondaryButton}
                </button>
              </div>
              
              <div className="mt-12 flex justify-center items-center space-x-8 text-purple-200">
                {appConfig.cta.trustIndicators.map((indicator, index) => {
                  const IconComponent = getIconComponent(indicator.icon);
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <IconComponent className="w-5 h-5 text-yellow-400 fill-current" />
                      <span>{indicator.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AppDevelopment;