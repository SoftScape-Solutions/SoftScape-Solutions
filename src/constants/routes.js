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
        { to: ROUTES.ABOUT, label: "About Us", type: "link" },
        { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
    ],
    mobile: [
        { to: ROUTES.ABOUT, label: "About Us", type: "link" },
        { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
    ]
};

// Page-specific navigation overrides
export const PAGE_NAVIGATION = {
    [ROUTES.ABOUT]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.AI_CHATBOTS]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.SMART_AUTOMATION]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { to: ROUTES.ABOUT, label: "About", type: "link" },
            { to: ROUTES.BOOK_CONSULTATION, label: "Consultation", type: "link" }
        ]
    },
    [ROUTES.BOOK_CONSULTATION]: {
        desktop: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { to: ROUTES.ABOUT, label: "About Us", type: "link" }
        ],
        mobile: [
            { to: ROUTES.HOME, label: "Home", type: "link" },
            { to: ROUTES.ABOUT, label: "About", type: "link" }
        ]
    }
};