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
  Brain,
  Cpu,
  Target,
  Lightbulb,
  Menu,
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
  Zap,
  Users,
  Database,
  Network,
} from "lucide-react";
import Layout from "../components/common/Layout";
import "./landingPage.css";
import "./customAI.css";

const CustomAI = () => {

  const industries = [
    {
      name: "Healthcare",
      description: "AI for diagnostics, patient care, and medical research",
      icon: Shield,
    },
    {
      name: "Finance",
      description: "Predictive analytics, fraud detection, and risk management",
      icon: TrendingUp,
    },
    {
      name: "Retail",
      description: "Personalization, inventory optimization, and demand forecasting",
      icon: Users,
    },
    {
      name: "Manufacturing",
      description: "Quality control, predictive maintenance, and supply chain optimization",
      icon: Zap,
    },
  ];

  return (
    <Layout>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-in">
              <Cpu className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Custom AI
              <span className="gradient-text-ai block">Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Tailored artificial intelligence systems designed specifically for your unique business needs, challenges, and opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary-enhanced">
                Schedule Consultation
                <Target className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="hover-glow">
                View Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Custom AI Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Custom AI?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Off-the-shelf solutions can't address your unique challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Perfectly Tailored</CardTitle>
                <CardDescription className="text-base">
                  Solutions built specifically for your workflows, data, and business objectives
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Complete Control</CardTitle>
                <CardDescription className="text-base">
                  Own your AI models, data, and intellectual property with full customization rights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Competitive Edge</CardTitle>
                <CardDescription className="text-base">
                  Gain unique advantages that generic solutions can't provide
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Your Data, Your Models</CardTitle>
                <CardDescription className="text-base">
                  Train AI on your proprietary data for insights no one else can replicate
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Network className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Seamless Integration</CardTitle>
                <CardDescription className="text-base">
                  Works perfectly with your existing systems, tools, and infrastructure
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Scalable Growth</CardTitle>
                <CardDescription className="text-base">
                  Designed to evolve and scale as your business grows and changes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Custom AI solutions for every sector
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="card-enhanced hover-lift animate-slide-in">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${
                      index === 0 ? 'from-blue-500 to-cyan-500' :
                      index === 1 ? 'from-purple-500 to-pink-500' :
                      index === 2 ? 'from-green-500 to-emerald-500' :
                      'from-orange-500 to-red-500'
                    } rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse-glow`}>
                      <industry.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{industry.name}</CardTitle>
                      <CardDescription className="text-base">
                        {industry.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Custom AI Process
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Discovery & Analysis
                    </h3>
                    <p className="text-gray-600">
                      Deep dive into your business challenges, data, and objectives to identify AI opportunities
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Solution Design
                    </h3>
                    <p className="text-gray-600">
                      Architect custom AI systems tailored to your specific requirements and constraints
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Development & Training
                    </h3>
                    <p className="text-gray-600">
                      Build and train custom AI models using your data with rigorous testing
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Integration & Deployment
                    </h3>
                    <p className="text-gray-600">
                      Seamlessly integrate with your existing systems and deploy with minimal disruption
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Continuous Improvement
                    </h3>
                    <p className="text-gray-600">
                      Monitor performance, retrain models, and optimize for evolving needs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-in lg:pl-12">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">What You Get</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Custom AI Models</h4>
                      <p className="text-sm text-indigo-100">
                        Proprietary models trained on your specific data and use cases
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Data Pipeline</h4>
                      <p className="text-sm text-indigo-100">
                        Automated data collection, processing, and model training infrastructure
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Network className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">API & Integration</h4>
                      <p className="text-sm text-indigo-100">
                        Clean APIs and connectors for seamless system integration
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Security & Compliance</h4>
                      <p className="text-sm text-indigo-100">
                        Enterprise-grade security with industry compliance standards
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Training & Support</h4>
                      <p className="text-sm text-indigo-100">
                        Comprehensive training and ongoing technical support
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
              <Cpu className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Custom AI Solution?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how custom AI can transform your business and give you a competitive advantage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-consultation">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3 btn-primary-enhanced">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
              Get Custom Quote
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default CustomAI;