'use strict';

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import ScrollToTop from "./components/common/ScrollToTop";

import "./App.css";

// Lazy load components for better performance and code splitting
const LandingPage = lazy(() => import("./compo/LandingPage/LandingPage"));
const About = lazy(() => import("./compo/About/About"));
const AIChatbots = lazy(() => import("./compo/AIChatbots/AIChatbots"));
const SmartAutomation = lazy(() => import("./compo/SmartAutomation/SmartAutomation"));
const AIApplications = lazy(() => import("./compo/AIApplications/AIApplications"));
const CustomAI = lazy(() => import("./compo/CustomAI/CustomAI"));
const WebAppDevelopment = lazy(() => import("./compo/WebAppDevelopment/WebAppDevelopment"));
const AppDevelopment = lazy(() => import("./compo/AppDevelopment/AppDevelopment"));
const BookConsultation = lazy(() => import("./compo/BookConsultation/BookConsultation"));
const Contact = lazy(() => import("./compo/Contact/Contact"));
const JoinTeam = lazy(() => import("./compo/JoinTeam/JoinTeam"));
const AIVision = lazy(() => import("./compo/AIVision/AIVision"));
const ExploreTools = lazy(() => import("./compo/ExploreTools/ExploreTools"));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  }}>
    <div style={{
      fontSize: '1.5rem',
      color: '#3b82f6',
      fontWeight: '600'
    }}>
      Loading...
    </div>
  </div>
);

// Route configuration for better maintainability
const routeConfig = [
  { path: ROUTES.HOME, element: <LandingPage /> },
  { path: ROUTES.ABOUT, element: <About /> },
  { path: ROUTES.AI_CHATBOTS, element: <AIChatbots /> },
  { path: ROUTES.SMART_AUTOMATION, element: <SmartAutomation /> },
  { path: ROUTES.AI_APPLICATIONS, element: <AIApplications /> },
  { path: ROUTES.CUSTOM_AI, element: <CustomAI /> },
  { path: ROUTES.WEBAPP_DEVELOPMENT, element: <WebAppDevelopment /> },
  { path: ROUTES.APP_DEVELOPMENT, element: <AppDevelopment /> },
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
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {routeConfig.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
