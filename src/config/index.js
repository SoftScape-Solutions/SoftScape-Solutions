// Main configuration index - exports all config modules
export { COMPANY_INFO, HERO_CONFIG, ABOUT_CONFIG } from './company.js';
export { CONTACT_INFO, CONTACT_FORM_CONFIG } from './contact.js';
export { SERVICES_CONFIG, PRICING_CONFIG } from './services.js';
export { APP_CONFIG, PERFORMANCE_CONFIG, SEO_CONFIG } from './app.js';

// Quick access to commonly used configs
export const CONFIG = {
  // Company basics
  COMPANY_NAME: "SoftScape AI Solutions",
  COMPANY_SHORT_NAME: "SoftScape",
  COMPANY_EMAIL: "softscapesolution@outlook.com",
  COMPANY_PHONE: "+966XXXXXXXXX",
  
  // URLs
  GITHUB_URL: "https://github.com/softscape-solutions",
  LINKEDIN_URL: "https://linkedin.com/company/softscape-solutions",
  
  // Common limits
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_PROJECT_DETAILS_LENGTH: 2000,
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  
  // Animation timings
  SCROLL_ANIMATION_DURATION: 1000,
  PAGE_TRANSITION_DURATION: 300,
  TYPING_SPEED: 100
};

// Environment-specific configurations
export const getEnvironmentConfig = () => {
  const env = import.meta.env.VITE_APP_ENVIRONMENT || 'development';
  
  const configs = {
    development: {
      apiUrl: 'http://localhost:3000',
      debug: true,
      analytics: false
    },
    production: {
      apiUrl: 'https://api.softscape.ai',
      debug: false,
      analytics: true
    },
    staging: {
      apiUrl: 'https://staging-api.softscape.ai',
      debug: true,
      analytics: false
    }
  };
  
  return configs[env] || configs.development;
};