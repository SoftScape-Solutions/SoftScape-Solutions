// Application Configuration
export const APP_CONFIG = {
  // Environment
  environment: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
  
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 30000,
    retryAttempts: 3
  },
  
  // Session Configuration
  session: {
    timeout: parseInt(import.meta.env.VITE_SESSION_TIMEOUT) || 86400000, // 24 hours
    maxLoginAttempts: parseInt(import.meta.env.VITE_MAX_LOGIN_ATTEMPTS) || 5,
    rememberMeDuration: 30 * 24 * 60 * 60 * 1000 // 30 days
  },
  
  // File Upload Configuration
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    maxFiles: 5
  },
  
  // Form Validation
  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    password: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    },
    projectDetails: {
      maxLength: 2000,
      minLength: 10
    }
  },
  
  // Animation Settings
  animations: {
    pageTransition: 300,
    scrollDuration: 1000,
    typewriterSpeed: 100,
    fadeInDelay: 200
  },
  
  // Feature Flags
  features: {
    enableAnalytics: true,
    enableChat: true,
    enableNotifications: true,
    enableOfflineMode: false,
    betaFeatures: false
  },
  
  // External Services
  external: {
    github: {
      apiUrl: 'https://api.github.com',
      testToken: import.meta.env.VITE_GITHUB_TEST_TOKEN
    }
  }
};

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  // Lazy Loading
  lazyLoading: {
    enabled: true,
    threshold: 0.1,
    rootMargin: '50px'
  },
  
  // Caching
  cache: {
    maxAge: 3600000, // 1 hour
    maxSize: 50 // Number of items
  },
  
  // Optimization
  optimization: {
    imageQuality: 85,
    bundleAnalysis: false,
    preloadCritical: true
  }
};

// SEO Configuration
export const SEO_CONFIG = {
  default: {
    title: "SoftScape AI Solutions - Transform Your Business with AI",
    description: "Leading AI solutions provider offering chatbots, automation, and custom AI development. Transform your business with cutting-edge artificial intelligence.",
    keywords: ["AI solutions", "artificial intelligence", "chatbots", "automation", "machine learning", "software development"],
    image: "/assets/images/og-image.jpg",
    url: "https://softscape-solutions.com"
  },
  
  pages: {
    home: {
      title: "AI-Powered Solutions for Modern Businesses | SoftScape",
      description: "Transform your business with cutting-edge AI solutions. Chatbots, automation, and custom AI development services."
    },
    about: {
      title: "About SoftScape AI Solutions - Leading AI Innovation",
      description: "Learn about SoftScape's mission to democratize AI and make cutting-edge solutions accessible to businesses of all sizes."
    },
    services: {
      title: "AI Services - Chatbots, Automation & Custom Solutions",
      description: "Explore our comprehensive AI services including intelligent chatbots, smart automation, and custom AI development."
    },
    contact: {
      title: "Contact SoftScape AI Solutions - Get Your AI Project Started",
      description: "Ready to transform your business with AI? Contact our experts for consultation and custom AI solutions."
    }
  }
};