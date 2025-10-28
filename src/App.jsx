import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import ScrollToTop from "./components/common/ScrollToTop";

import "./App.css";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: '16px' }}>Something went wrong</h1>
          <p style={{ marginBottom: '16px' }}>Please refresh the page or contact support.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

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
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
