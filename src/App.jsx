import React from 'react'
import LandingPage from './compo/landingPage'
import About from './compo/about'
import AIChatbots from './compo/aiChatbots'
import SmartAutomation from './compo/smartAutomation'
import AIApplications from './compo/aiApplications'
import CustomAI from './compo/customAI'
import BookConsultation from './compo/bookconsultation'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/ai-chatbots" element={<AIChatbots />} />
          <Route path="/smart-automation" element={<SmartAutomation />} />
          <Route path="/ai-applications" element={<AIApplications />} />
          <Route path="/custom-ai" element={<CustomAI />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App