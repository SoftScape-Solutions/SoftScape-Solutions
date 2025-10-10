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

// AI Tools dropdown configuration
export const AI_TOOLS_DROPDOWN = [
    { to: ROUTES.AI_CHATBOTS, label: "AI Chatbots", description: "Intelligent conversational agents" },
    { to: ROUTES.SMART_AUTOMATION, label: "Smart Automation", description: "Automated business processes" },
    { to: ROUTES.AI_APPLICATIONS, label: "AI Applications", description: "Custom AI-powered solutions" },
    // { to: ROUTES.AI_VISION, label: "AI Vision", description: "Computer vision and image analysis" },
    { to: ROUTES.CUSTOM_AI, label: "Custom AI", description: "Tailored AI solutions" },
    { to: ROUTES.EXPLORE_TOOLS, label: "Explore All Tools", description: "Discover our full AI toolkit" }
];

// Navigation link configuration
export const NAVIGATION_LINKS = {
    desktop: [
        { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
        { to: ROUTES.ABOUT, label: "About Us", type: "link" },
        { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
    ],
    mobile: [
        { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
        { to: ROUTES.ABOUT, label: "About Us", type: "link" },
        { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
    ]
};

// Page-specific navigation overrides
export const PAGE_NAVIGATION = {
    [ROUTES.ABOUT]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.AI_CHATBOTS]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.SMART_AUTOMATION]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.AI_APPLICATIONS]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.AI_VISION]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.CUSTOM_AI]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.EXPLORE_TOOLS]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.BOOK_CONSULTATION]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About", type: "link" }
        ]
    },
    [ROUTES.CONTACT]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.JOIN_TEAM]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { label: "AI Tools", type: "dropdown", items: AI_TOOLS_DROPDOWN },
            { to: ROUTES.ABOUT, label: "About", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    }
};