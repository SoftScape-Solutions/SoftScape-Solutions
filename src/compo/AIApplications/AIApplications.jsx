import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Brain,
  Sparkles,
  Smartphone,
  Globe,
  CheckCircle2,
  Rocket,
  Users,
  Eye,
  Code,
  Palette,
  Zap,
} from "lucide-react";
import Layout from "../../components/common/Layout";
import { SERVICES_CONFIG, COMPANY_INFO } from "../../config";
import "../LandingPage/LandingPage.css";
import "./AIApplications.css";
// import "./aiApplications.css";

const AIApplications = () => {

  const applicationTypes = [
    {
      title: "Web Applications",
      description: "Responsive, AI-powered web apps that deliver exceptional user experiences",
      icon: Globe,
      features: ["Progressive Web Apps", "Real-time AI Features", "Cloud-Native Architecture"],
    },
    {
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps with intelligent AI capabilities",
      icon: Smartphone,
      features: ["iOS & Android", "ML Kit Integration", "Offline AI Processing"],
    },
    {
      title: "Enterprise Solutions",
      description: "Scalable AI applications designed for enterprise-level operations",
      icon: Users,
      features: ["Custom AI Models", "Enterprise Security", "Legacy Integration"],
    },
  ];

  return (
    <Layout>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-in">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI-Enhanced
              <span className="gradient-text-ai block">Applications</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Web and mobile applications powered by artificial intelligence for superior user experiences, intelligent features, and breakthrough innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary-enhanced">
                Start Your Project
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="hover-glow">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Intelligent Applications for Every Platform
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              From web to mobile, we build AI-powered applications that transform user experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {applicationTypes.map((app, index) => (
              <Card key={index} className="card-enhanced hover-lift animate-slide-in">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${
                    index === 0 ? 'from-blue-500 to-cyan-500' :
                    index === 1 ? 'from-orange-500 to-pink-500' :
                    'from-purple-500 to-indigo-500'
                  } rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow`}>
                    <app.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-4">{app.title}</CardTitle>
                  <CardDescription className="text-base mb-4">
                    {app.description}
                  </CardDescription>
                  <div className="space-y-2 text-left">
                    {app.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI Capabilities We Integrate
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Cutting-edge AI technologies that make your applications smarter
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Machine Learning</CardTitle>
                <CardDescription className="text-base">
                  Custom ML models for predictions, recommendations, and pattern recognition
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Computer Vision</CardTitle>
                <CardDescription className="text-base">
                  Image recognition, object detection, and visual search capabilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Natural Language</CardTitle>
                <CardDescription className="text-base">
                  NLP for text analysis, sentiment detection, and language understanding
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Predictive Analytics</CardTitle>
                <CardDescription className="text-base">
                  AI-driven forecasting and data-driven decision support systems
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Personalization</CardTitle>
                <CardDescription className="text-base">
                  AI-powered user personalization and adaptive interfaces
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">API Integration</CardTitle>
                <CardDescription className="text-base">
                  Seamless integration with leading AI platforms and services
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Development Approach
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Discovery & Planning
                    </h3>
                    <p className="text-gray-600">
                      We understand your goals, users, and requirements to design the perfect AI-enhanced solution
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      AI-First Design
                    </h3>
                    <p className="text-gray-600">
                      Create intuitive interfaces that leverage AI capabilities for seamless user experiences
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Agile Development
                    </h3>
                    <p className="text-gray-600">
                      Iterative development with continuous testing and AI model refinement
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Launch & Support
                    </h3>
                    <p className="text-gray-600">
                      Seamless deployment with ongoing monitoring, optimization, and AI model updates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-in lg:pl-12">
              <div className="bg-gradient-to-br from-orange-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Technology Stack</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Frontend
                    </h4>
                    <p className="text-sm text-orange-100">
                      React, Next.js, Vue.js, Flutter, React Native
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      AI & ML
                    </h4>
                    <p className="text-sm text-orange-100">
                      TensorFlow, PyTorch, OpenAI, Hugging Face, Google AI
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Backend
                    </h4>
                    <p className="text-sm text-orange-100">
                      Node.js, Python, FastAPI, GraphQL, PostgreSQL
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Cloud & DevOps
                    </h4>
                    <p className="text-sm text-orange-100">
                      AWS, Google Cloud, Azure, Docker, Kubernetes
                    </p>
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
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's create an AI-enhanced application that sets you apart from the competition
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 btn-primary-enhanced">
              Discuss Your Project
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default AIApplications;