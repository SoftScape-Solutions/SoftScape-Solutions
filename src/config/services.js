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
      icon: "Globe",
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
    }
  ],

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
      services: ["ai-applications", "custom-ai", "webapp-development"]
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