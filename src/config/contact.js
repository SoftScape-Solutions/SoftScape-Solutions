// Contact Information Configuration
export const CONTACT_INFO = {
  // Primary Contact
  email: {
    primary: "softscapesolution@outlook.com",
    support: "support@softscape.ai",
    sales: "sales@softscape.ai",
    careers: "careers@softscape.ai"
  },
  
  // Phone Numbers
  phone: {
    primary: "+966XXXXXXXXX",
    support: "+44 7789667804",
    international: "+1-555-0123"
  },
  
  // Physical Address
  address: {
    street: "123 AI Innovation District",
    city: "Riyadh",
    state: "Riyadh Province",
    country: "Saudi Arabia",
    postalCode: "12345",
    full: "123 AI Innovation District, Riyadh, Saudi Arabia"
  },
  
  // Business Hours
  businessHours: {
    timezone: "GMT+3",
    workDays: "Sunday - Thursday",
    hours: "9:00 AM - 6:00 PM",
    support: "24/7 Online Support Available"
  },
  
  // Social Media Links
  social: {
    github: {
      url: "https://github.com/softscape-solutions",
      username: "@softscape-solutions"
    },
    linkedin: {
      url: "https://linkedin.com/company/softscape-solutions",
      username: "SoftScape Solutions"
    },
    twitter: {
      url: "https://twitter.com/softscape_ai",
      username: "@softscape_ai"
    },
    facebook: {
      url: "https://facebook.com/softscapesolutions",
      username: "SoftScape Solutions"
    }
  },
  
  // Quick Contact Options
  quickContact: [
    {
      type: "email",
      label: "Email Us",
      value: "softscapesolution@outlook.com",
      link: "mailto:softscapesolution@outlook.com",
      icon: "Mail"
    },
    {
      type: "phone",
      label: "Call Us",
      value: "+966XXXXXXXXX",
      link: "tel:+966XXXXXXXXX",
      icon: "Phone"
    },
    {
      type: "location",
      label: "Visit Us",
      value: "Riyadh, Saudi Arabia",
      link: "#",
      icon: "MapPin"
    }
  ]
};

// Contact Form Configuration
export const CONTACT_FORM_CONFIG = {
  fields: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      placeholder: "Your Full Name"
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      placeholder: "your.email@example.com"
    },
    phone: {
      required: false,
      placeholder: "+1 (555) 123-4567"
    },
    subject: {
      required: true,
      maxLength: 100,
      placeholder: "How can we help you?"
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000,
      placeholder: "Tell us about your project or inquiry..."
    }
  },
  
  submitButton: {
    text: "Send Message",
    loadingText: "Sending...",
    successText: "Message Sent!"
  },
  
  validation: {
    messages: {
      required: "This field is required",
      email: "Please enter a valid email address",
      minLength: "Minimum {min} characters required",
      maxLength: "Maximum {max} characters allowed"
    }
  }
};