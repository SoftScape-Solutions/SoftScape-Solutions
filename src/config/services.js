// Services Configuration
export const SERVICES_CONFIG = {
  // Main AI Services
  aiServices: [
    {
      id: "ai-chatbots",
      title: "AI Chatbots & Agents",
      description: "Intelligent conversational agents that automate customer service and business processes",
      detailedDescription: "Create intelligent chatbots that understand context, provide personalized responses, and seamlessly integrate with your existing systems.",
      icon: "Bot",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      link: "/ai-chatbots",
      features: [
        "Customer Support Bot",
        "Sales Assistant AI",
        "Virtual Receptionist",
        "24/7 Availability"
      ],
      benefits: [
        "Reduce response time by 90%",
        "Handle multiple conversations simultaneously",
        "Provide consistent, accurate information",
        "Integrate with existing CRM systems"
      ],
      pricing: {
        starting: "$299",
        tier: "per month"
      }
    },
    {
      id: "smart-automation",
      title: "Smart Automation Tools",
      description: "AI-powered workflow automation that eliminates repetitive tasks and boosts productivity",
      detailedDescription: "Streamline operations with intelligent automation that handles repetitive tasks, processes documents, and manages workflows.",
      icon: "Workflow",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      link: "/smart-automation",
      features: [
        "Document Processing AI",
        "Email Automation",
        "Data Entry Assistant",
        "1000+ Integrations"
      ],
      benefits: [
        "Save 20+ hours per week",
        "Reduce human errors by 95%",
        "Seamless integration with existing tools",
        "Real-time process monitoring"
      ],
      pricing: {
        starting: "$199",
        tier: "per month"
      }
    },
    {
      id: "ai-applications",
      title: "AI-Enhanced Applications",
      description: "Web and mobile applications powered by artificial intelligence for superior user experiences",
      detailedDescription: "Transform your digital presence with applications that learn from user behavior and provide intelligent insights.",
      icon: "Cpu",
      color: "orange",
      gradient: "from-orange-500 to-red-500",
      link: "/ai-applications",
      features: [
        "Smart Analytics Dashboard",
        "Predictive Mobile Apps",
        "AI-Powered CRM",
        "Real-time Intelligence"
      ],
      benefits: [
        "Increase user engagement by 60%",
        "Personalized user experiences",
        "Predictive analytics and insights",
        "Scalable cloud infrastructure"
      ],
      pricing: {
        starting: "$999",
        tier: "per project"
      }
    },
    {
      id: "custom-ai",
      title: "Custom AI Solutions",
      description: "Tailored artificial intelligence systems designed specifically for your unique business needs",
      detailedDescription: "Get AI solutions built specifically for your business challenges, from custom machine learning models to complete AI integrations.",
      icon: "Brain",
      color: "indigo",
      gradient: "from-indigo-500 to-purple-500",
      link: "/custom-ai",
      features: [
        "Bespoke ML Models",
        "Industry-Specific AI",
        "AI Integration Services",
        "Ongoing Support"
      ],
      benefits: [
        "Tailored to your exact needs",
        "Competitive advantage through AI",
        "Full ownership of solutions",
        "Expert consultation included"
      ],
      pricing: {
        starting: "$5,000",
        tier: "per project"
      }
    },
    {
      id: "webapp-development",
      title: "Web App Development",
      description: "Modern, responsive web applications built with cutting-edge technologies for optimal performance",
      detailedDescription: "Create powerful web applications that deliver exceptional user experiences with modern frameworks, responsive design, and scalable architecture.",
      icon: "Monitor",
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      link: "/webapp-development",
      features: [
        "React & Next.js Development",
        "Progressive Web Apps (PWA)",
        "E-commerce Solutions",
        "Dashboard & Analytics"
      ],
      benefits: [
        "Fast loading & responsive design",
        "Cross-platform compatibility",
        "SEO optimized architecture",
        "Scalable cloud deployment"
      ],
      pricing: {
        starting: "$2,500",
        tier: "per project"
      }
    },
    {
      id: "app-development",
      title: "App Development",
      description: "Native and cross-platform mobile applications for Android and iOS with exceptional user experiences",
      detailedDescription: "Build powerful mobile applications that work seamlessly on Android and iOS devices using modern frameworks and native technologies.",
      icon: "Smartphone",
      color: "indigo",
      gradient: "from-indigo-500 to-purple-500",
      link: "/app-development",
      features: [
        "Native iOS & Android Apps",
        "Cross-Platform Development",
        "App Store Optimization",
        "Push Notifications & Analytics"
      ],
      benefits: [
        "Native performance & UX",
        "App Store & Google Play ready",
        "Offline functionality support",
        "Device hardware integration"
      ],
      pricing: {
        starting: "$4,000",
        tier: "per project"
      }
    }
  ],

  // App Development Configuration
  appDevelopmentConfig: {
    hero: {
      title: "Mobile App Development",
      subtitle: "Build stunning mobile applications for Android and iOS that engage users and drive business growth with native performance and modern design",
      ctaText: "Get Started"
    },
    packages: [
      {
        id: 1,
        title: "Native iOS Apps",
        subtitle: "Built for iPhone & iPad",
        description: "High-performance native iOS applications built with Swift for optimal user experience",
        icon: "Smartphone",
        iconColor: "text-blue-600",
        bgColor: "bg-blue-100",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
        popular: false,
        price: "From $4,999/project",
        features: [
          "Swift Development",
          "App Store Optimization",
          "iOS Design Guidelines",
          "Core Data Integration",
          "Push Notifications"
        ]
      },
      {
        id: 2,
        title: "Native Android Apps",
        subtitle: "Built for Android devices",
        description: "Feature-rich Android applications using Kotlin/Java for Google Play Store",
        icon: "Tablet",
        iconColor: "text-green-600",
        bgColor: "bg-green-100",
        buttonColor: "bg-green-600 hover:bg-green-700",
        popular: false,
        price: "From $4,999/project",
        features: [
          "Kotlin/Java Development",
          "Material Design",
          "Google Play Services",
          "Room Database",
          "Firebase Integration"
        ]
      },
      {
        id: 3,
        title: "Cross-Platform Apps",
        subtitle: "One codebase, multiple platforms",
        description: "Efficient development using Flutter or React Native for iOS and Android simultaneously",
        icon: "Globe",
        iconColor: "text-purple-600",
        bgColor: "bg-purple-100",
        buttonColor: "bg-purple-600 hover:bg-purple-700",
        popular: true,
        price: "From $6,999/project",
        features: [
          "Flutter/React Native",
          "Shared Codebase",
          "Native Performance",
          "Cross-Platform UI",
          "Faster Time to Market"
        ]
      },
      {
        id: 4,
        title: "Enterprise Mobile Solutions",
        subtitle: "Scalable business applications",
        description: "Complex mobile solutions with advanced security, analytics, and enterprise integrations",
        icon: "Shield",
        iconColor: "text-orange-600",
        bgColor: "bg-orange-100",
        buttonColor: "bg-orange-600 hover:bg-orange-700",
        popular: false,
        price: "From $12,999/project",
        features: [
          "Enterprise Security",
          "Advanced Analytics",
          "API Integrations",
          "Multi-Platform Support",
          "24/7 Support"
        ]
      }
    ],
    technologies: [
      { 
        name: 'Swift', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
        bg: 'bg-orange-50' 
      },
      { 
        name: 'Kotlin', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
        bg: 'bg-purple-50' 
      },
      { 
        name: 'Flutter', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
        bg: 'bg-blue-50' 
      },
      { 
        name: 'React Native', 
        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
        bg: 'bg-blue-50' 
      },
      { 
        name: 'Firebase', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg',
        bg: 'bg-yellow-50' 
      },
      { 
        name: 'Xcode', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg',
        bg: 'bg-blue-50' 
      }
    ],
    appStoreFeatures: [
      {
        title: "App Store Optimization",
        description: "Complete ASO strategy including keywords, descriptions, and visual assets for maximum visibility",
        icon: "Download",
        iconColor: "text-blue-600",
        bgColor: "bg-blue-100"
      },
      {
        title: "Security & Compliance",
        description: "Apps built with security best practices and compliance with App Store and Google Play policies",
        icon: "Shield",
        iconColor: "text-green-600",
        bgColor: "bg-green-100"
      },
      {
        title: "Push Notifications",
        description: "Engage users with targeted push notifications and real-time updates to boost retention",
        icon: "Bell",
        iconColor: "text-purple-600",
        bgColor: "bg-purple-100"
      }
    ],
    cta: {
      title: "Ready to Launch Your Mobile App?",
      subtitle: "Let's bring your mobile app idea to life and reach millions of users on iOS and Android",
      primaryButton: "Start Your App Project",
      secondaryButton: "Discuss Your Idea",
      trustIndicators: [
        { icon: "Star", text: "4.9 Rating" },
        { icon: "Download", text: "App Store Ready" },
        { icon: "Zap", text: "Native Performance" }
      ]
    }
  },

  // About page configuration
  aboutConfig: {
    hero: {
      title: "About SoftScape Solutions",
      subtitle: "We are passionate about transforming businesses through innovative AI solutions",
      description: "At SoftScape Solutions, we specialize in creating intelligent automation systems, AI-powered applications, and cutting-edge software solutions that drive business growth and efficiency."
    },
    mission: {
      title: "Our AI Mission",
      description: "To revolutionize how businesses operate by providing accessible, intelligent AI solutions that automate processes, enhance decision-making, and unlock new opportunities for growth and innovation.",
      features: [
        "Democratize AI for businesses of all sizes",
        "Create intelligent automation solutions",
        "Bridge the gap between complex AI and practical business needs",
        "Foster innovation through cutting-edge technology"
      ]
    },
    values: [
      {
        title: "Innovation First",
        description: "We push the boundaries of AI technology to create solutions that transform industries",
        icon: "Lightbulb",
        iconColor: "text-green-600",
        bgColor: "bg-green-100"
      },
      {
        title: "Client Success",
        description: "Your success is our priority. We build lasting partnerships through exceptional service",
        icon: "Users",
        iconColor: "text-purple-600",
        bgColor: "bg-purple-100"
      },
      {
        title: "Quality Excellence", 
        description: "We deliver robust, scalable solutions with meticulous attention to detail and performance",
        icon: "Award",
        iconColor: "text-orange-600",
        bgColor: "bg-orange-100"
      }
    ],
    team: [
      {
        name: "Saad Amjad",
        role: "AI Systems Architect & Founder",
        description: "AI systems architect with 4+ years in intelligent automation, specializing in scalable AI solutions and business process optimization.",
        image: "/api/placeholder/150/150",
        skills: ["AI Strategy", "System Architecture", "Business Intelligence"]
      }
    ],
    stats: [
      { label: "AI Projects Delivered", value: "50+", icon: "Zap" },
      { label: "Businesses Transformed", value: "25+", icon: "Building" },
      { label: "Client Satisfaction", value: "98%", icon: "Star" },
      { label: "Years of Experience", value: "4+", icon: "Calendar" }
    ]
  },

  // Additional Services
  additionalServices: [
    {
      id: "ai-vision",
      title: "AI Vision & Image Processing",
      description: "Computer vision solutions for image recognition, analysis, and processing",
      icon: "Eye",
      color: "green",
      link: "/ai-vision"
    },
    {
      id: "consultation",
      title: "AI Consultation",
      description: "Expert guidance on AI strategy and implementation",
      icon: "MessageCircle",
      color: "blue",
      link: "/book-consultation"
    }
  ],

  // Service Categories
  categories: {
    automation: {
      name: "Automation",
      description: "Streamline your business processes",
      services: ["smart-automation", "ai-chatbots"]
    },
    development: {
      name: "Development",
      description: "Custom AI-powered applications",
      services: ["ai-applications", "custom-ai", "webapp-development", "app-development"]
    },
    consulting: {
      name: "Consulting",
      description: "Expert AI guidance and strategy",
      services: ["consultation", "ai-vision"]
    }
  }
};

// Pricing Configuration
export const PRICING_CONFIG = {
  plans: {
    starter: {
      name: "Starter",
      price: "$299",
      period: "per month",
      description: "Perfect for small businesses",
      features: [
        "Basic AI Chatbot",
        "Email Support",
        "Basic Analytics",
        "Up to 1,000 conversations/month"
      ],
      cta: "Get Started",
      popular: false
    },
    professional: {
      name: "Professional",
      price: "$599",
      period: "per month",
      description: "Ideal for growing companies",
      features: [
        "Advanced AI Chatbot",
        "Priority Support",
        "Advanced Analytics",
        "Up to 10,000 conversations/month",
        "Custom Integrations"
      ],
      cta: "Upgrade Now",
      popular: true
    },
    enterprise: {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations",
      features: [
        "Custom AI Solutions",
        "24/7 Dedicated Support",
        "White-label Options",
        "Unlimited Usage",
        "On-premise Deployment"
      ],
      cta: "Contact Sales",
      popular: false
    }
  }
};