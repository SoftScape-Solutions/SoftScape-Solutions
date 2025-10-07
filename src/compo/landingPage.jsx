import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { ArrowRight, Code, Bot, Brain, Zap, Shield, Users, Cpu, Sparkles, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
import './landingPage.css'

const LandingPage = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="border-b nav-enhanced sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 animate-slide-in-left">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text-ai">SoftScape Solutions</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors hover-scale">AI Tools</a>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors hover-scale">About</Link>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors hover-scale">Contact</a>
              <Button size="sm" className="btn-primary-enhanced">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-bounce-in mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                <Brain className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              AI-Powered Software
              <span className="gradient-text-ai block">Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
              We create intelligent AI-powered tools, automation agents, and smart solutions that revolutionize 
              how businesses operate. Transform your workflow with cutting-edge artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-400">
              <Button size="lg" className="text-lg px-8 py-3 btn-primary-enhanced will-change-transform">
                Explore AI Tools
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 hover-glow will-change-transform">
                See AI Agents in Action
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce-in">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in animate-delay-100">
              AI-Powered <span className="gradient-text-ai">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in animate-delay-200">
              Cutting-edge artificial intelligence tools and autonomous agents that transform business operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-enhanced hover-lift animate-slide-in will-change-transform">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 icon-bounce animate-pulse-glow">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">AI Chatbots & Agents</CardTitle>
                <CardDescription className="text-base">
                  Intelligent conversational agents that automate customer service and business processes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in animate-delay-100 will-change-transform">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 icon-bounce animate-pulse-glow">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Automation Tools</CardTitle>
                <CardDescription className="text-base">
                  AI-powered workflow automation that eliminates repetitive tasks and boosts productivity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in animate-delay-200 will-change-transform">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 icon-bounce animate-pulse-glow">
                  <Workflow className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Process Intelligence</CardTitle>
                <CardDescription className="text-base">
                  AI systems that analyze and optimize business processes for maximum efficiency
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in animate-delay-300 will-change-transform">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 icon-bounce animate-pulse-glow">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">AI-Enhanced Applications</CardTitle>
                <CardDescription className="text-base">
                  Web and mobile applications powered by artificial intelligence for superior user experiences
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in animate-delay-400 will-change-transform">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 icon-bounce animate-pulse-glow">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Custom AI Solutions</CardTitle>
                <CardDescription className="text-base">
                  Tailored artificial intelligence systems designed specifically for your unique business needs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in animate-delay-500 will-change-transform">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 icon-bounce animate-pulse-glow">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">AI Security & Monitoring</CardTitle>
                <CardDescription className="text-base">
                  Intelligent security systems that protect and monitor your AI infrastructure 24/7
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* AI CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-bounce-in mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Embrace AI Innovation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Let's revolutionize your business with intelligent AI solutions, smart automation agents, and cutting-edge tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-400">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 btn-primary-enhanced will-change-transform">
              Start AI Transformation
              <Brain className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600 hover-glow will-change-transform">
              Explore AI Tools
            </Button>
          </div>
        </div>
      </section>

      {/* AI Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2 animate-slide-in-left">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text-ai">SoftScape AI Solutions</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Revolutionizing businesses through cutting-edge AI technology, intelligent automation, and smart digital solutions.
              </p>
            </div>
            <div className="animate-slide-in animate-delay-200">
              <h3 className="text-white font-semibold mb-4">AI Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">AI Chatbots</li>
                <li className="hover:text-white transition-colors cursor-pointer">Smart Automation</li>
                <li className="hover:text-white transition-colors cursor-pointer">AI Agents</li>
                <li className="hover:text-white transition-colors cursor-pointer">Custom AI Tools</li>
              </ul>
            </div>
            <div className="animate-slide-in animate-delay-400">
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">ai@softscape.solutions</li>
                <li className="hover:text-white transition-colors cursor-pointer">+1 (555) AI-TOOLS</li>
                <li className="hover:text-white transition-colors cursor-pointer">LinkedIn</li>
                <li className="hover:text-white transition-colors cursor-pointer">GitHub</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 animate-fade-in animate-delay-600">
            <p>&copy; 2025 SoftScape AI Solutions. Powering the future with artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default LandingPage