import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import ScrollToTop from "./components/common/ScrollToTop";

// Lazy load components for better performance
import LandingPage from "./compo/LandingPage/LandingPage";
import About from "./compo/About/About";
import AIChatbots from "./compo/AIChatbots/AIChatbots";
import SmartAutomation from "./compo/SmartAutomation/SmartAutomation";
import AIApplications from "./compo/AIApplications/AIApplications";
import CustomAI from "./compo/CustomAI/CustomAI";
import WebAppDevelopment from "./compo/WebAppDevelopment/WebAppDevelopment";
import BookConsultation from "./compo/BookConsultation/BookConsultation";
import Contact from "./compo/Contact/Contact";
import JoinTeam from "./compo/JoinTeam/JoinTeam";
import AIVision from "./compo/AIVision/AIVision";
import ExploreTools from "./compo/ExploreTools/ExploreTools";


import "./App.css";

// Route configuration for better maintainability
const routeConfig = [
  { path: ROUTES.HOME, element: <LandingPage /> },
  { path: ROUTES.ABOUT, element: <About /> },
  { path: ROUTES.AI_CHATBOTS, element: <AIChatbots /> },
  { path: ROUTES.SMART_AUTOMATION, element: <SmartAutomation /> },
  { path: ROUTES.AI_APPLICATIONS, element: <AIApplications /> },
  { path: ROUTES.CUSTOM_AI, element: <CustomAI /> },
  { path: ROUTES.WEBAPP_DEVELOPMENT, element: <WebAppDevelopment /> },
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
