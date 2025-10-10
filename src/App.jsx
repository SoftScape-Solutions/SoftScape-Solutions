import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import ScrollToTop from "./components/common/ScrollToTop";

// Lazy load components for better performance
import LandingPage from "./compo/landingPage";
import About from "./compo/about";
import AIChatbots from "./compo/aiChatbots";
import SmartAutomation from "./compo/smartAutomation";
import AIApplications from "./compo/aiApplications";
import CustomAI from "./compo/customAI";
import BookConsultation from "./compo/bookconsultation";
import Contact from "./compo/contact";
import JoinTeam from "./compo/jointeam";
import AIVision from "./compo/aiVision";
import ExploreTools from "./compo/exploretools";

import "./App.css";

// Route configuration for better maintainability
const routeConfig = [
  { path: ROUTES.HOME, element: <LandingPage /> },
  { path: ROUTES.ABOUT, element: <About /> },
  { path: ROUTES.AI_CHATBOTS, element: <AIChatbots /> },
  { path: ROUTES.SMART_AUTOMATION, element: <SmartAutomation /> },
  { path: ROUTES.AI_APPLICATIONS, element: <AIApplications /> },
  { path: ROUTES.CUSTOM_AI, element: <CustomAI /> },
  { path: ROUTES.BOOK_CONSULTATION, element: <BookConsultation /> },
  { path: ROUTES.CONTACT, element: <Contact /> },
  { path: ROUTES.JOIN_TEAM, element: <JoinTeam /> },
  { path: ROUTES.AI_VISION, element: <AIVision /> },
  { path: ROUTES.EXPLORE_TOOLS, element: <ExploreTools /> },
];

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Routes>
          {routeConfig.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
