// Application route constants
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  AI_CHATBOTS: "/ai-chatbots",
  SMART_AUTOMATION: "/smart-automation",
  AI_APPLICATIONS: "/ai-applications",
  CUSTOM_AI: "/custom-ai",
  BOOK_CONSULTATION: "/book-consultation",
  CONTACT: "/contact",
  JOIN_TEAM: "/join-team",
  AI_VISION: "/ai-vision",
  EXPLORE_TOOLS: "/explore-tools"
};

// Navigation link configuration
export const NAVIGATION_LINKS = {
  desktop: [
    { href: "#services", label: "AI Tools", type: "anchor" },
    { to: ROUTES.ABOUT, label: "About", type: "link" },
    { to: ROUTES.BOOK_CONSULTATION, label: "Book Consultation", type: "link" },
    { href: "#contact", label: "Contact", type: "anchor" }
  ],
  mobile: [
    { href: "#services", label: "AI Tools", type: "anchor" },
    { to: ROUTES.ABOUT, label: "About", type: "link" },
    { to: ROUTES.BOOK_CONSULTATION, label: "Book Consultation", type: "link" },
    { href: "#contact", label: "Contact", type: "anchor" }
  ]
};

// Page-specific navigation overrides
export const PAGE_NAVIGATION = {
  [ROUTES.ABOUT]: {
    desktop: [
      { to: ROUTES.HOME, label: "Home", type: "link" },
      { href: "/#services", label: "AI Tools", type: "anchor" },
      { href: "/#contact", label: "Contact", type: "anchor" }
    ],
    mobile: [
      { to: ROUTES.HOME, label: "Home", type: "link" },
      { href: "/#services", label: "AI Tools", type: "anchor" },
      { href: "/#contact", label: "Contact", type: "anchor" }
    ]
  },
  [ROUTES.AI_CHATBOTS]: {
    desktop: [
      { to: ROUTES.HOME, label: "Home", type: "link" },
      { to: ROUTES.ABOUT, label: "About", type: "link" },
      { to: ROUTES.BOOK_CONSULTATION, label: "Book Consultation", type: "link" },
      { href: "#contact", label: "Contact", type: "anchor" }
    ],
    mobile: [
      { to: ROUTES.HOME, label: "Home", type: "link" },
      { to: ROUTES.ABOUT, label: "About", type: "link" },
      { to: ROUTES.BOOK_CONSULTATION, label: "Book Consultation", type: "link" },
      { href: "#contact", label: "Contact", type: "anchor" }
    ]
  }
};