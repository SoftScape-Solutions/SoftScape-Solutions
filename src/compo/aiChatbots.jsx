import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Bot,
  Brain,
  MessageCircle,
  Zap,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Send,
  Sparkles,
  CheckCircle2,
  Star,
} from "lucide-react";
import Layout from "../components/common/Layout";
import "./landingPage.css";
import "./aiChatbots.css";

const AIChatbots = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm an AI assistant. Ask me anything about our chatbot solutions!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { type: "user", text: inputMessage }];
    setChatMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Our AI chatbots can handle customer inquiries 24/7, reducing response time by 80%!",
        "We use advanced natural language processing to understand context and provide accurate responses.",
        "Our chatbots integrate seamlessly with your existing systems and can be customized for your brand.",
        "Interested in seeing how this could work for your business? Let's schedule a demo!",
        "Our AI agents can automate complex workflows and handle multiple conversations simultaneously.",
      ];
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      setChatMessages([...newMessages, { type: "bot", text: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-in">
              <Bot className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI Chatbots &
              <span className="gradient-text-ai block">Intelligent Agents</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform customer interactions with intelligent AI-powered
              chatbots and autonomous agents that work 24/7 to deliver
              exceptional experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="hover-glow">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our AI Chatbots?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Intelligent automation that drives real business results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">24/7 Availability</CardTitle>
                <CardDescription className="text-base">
                  Never miss a customer inquiry. Our AI agents work round the
                  clock to engage with your customers instantly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Learning</CardTitle>
                <CardDescription className="text-base">
                  Advanced NLP and machine learning ensure your chatbot gets
                  smarter with every interaction
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Boost Conversions</CardTitle>
                <CardDescription className="text-base">
                  Increase sales by 40% with personalized recommendations and
                  instant support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Secure & Compliant</CardTitle>
                <CardDescription className="text-base">
                  Enterprise-grade security with GDPR compliance and data
                  encryption
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Multi-Channel</CardTitle>
                <CardDescription className="text-base">
                  Deploy across website, mobile app, WhatsApp, Facebook
                  Messenger, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Easy Integration</CardTitle>
                <CardDescription className="text-base">
                  Seamlessly integrate with your existing CRM, helpdesk, and
                  business tools
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Try Our AI Chatbot Now
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the power of intelligent conversation firsthand
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="card-enhanced shadow-2xl">
              <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">
                      SoftScape AI Assistant
                    </CardTitle>
                    <p className="text-sm text-blue-100">Online now</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      } animate-fade-in`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white shadow-md text-gray-800"
                        }`}
                      >
                        {message.type === "bot" && (
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-semibold text-gray-600">
                              AI Assistant
                            </span>
                          </div>
                        )}
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-white shadow-md rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce typing-dot-2"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce typing-dot-3"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t p-4 bg-white rounded-b-lg">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="rounded-full px-6 btn-primary-enhanced"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Advanced AI Capabilities
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Natural Language Understanding
                    </h3>
                    <p className="text-gray-600">
                      Advanced NLP models understand context, intent, and
                      sentiment for human-like conversations
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Personalized Responses
                    </h3>
                    <p className="text-gray-600">
                      Tailor conversations based on user history, preferences,
                      and behavior patterns
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Multi-Language Support
                    </h3>
                    <p className="text-gray-600">
                      Communicate with customers in 100+ languages with accurate
                      translations
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Seamless Handoff to Humans
                    </h3>
                    <p className="text-gray-600">
                      Smart routing to human agents when complex issues require
                      personal attention
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-in lg:pl-12">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Proven Results</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Star className="h-8 w-8 text-yellow-300 flex-shrink-0" />
                    <div>
                      <p className="text-3xl font-bold mb-1">80%</p>
                      <p className="text-blue-100">
                        Reduction in response time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Star className="h-8 w-8 text-yellow-300 flex-shrink-0" />
                    <div>
                      <p className="text-3xl font-bold mb-1">40%</p>
                      <p className="text-blue-100">
                        Increase in customer satisfaction
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Star className="h-8 w-8 text-yellow-300 flex-shrink-0" />
                    <div>
                      <p className="text-3xl font-bold mb-1">90%</p>
                      <p className="text-blue-100">
                        Query resolution without human intervention
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-bounce-in mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Customer Engagement?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using our AI chatbots to deliver
            exceptional customer experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-consultation">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3 btn-primary-enhanced"
              >
                Book A Consultation
                <Bot className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AIChatbots;
