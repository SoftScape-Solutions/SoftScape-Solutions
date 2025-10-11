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
  Workflow,
  Zap,
  Clock,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Settings,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import Layout from "../../components/common/Layout";
import { SERVICES_CONFIG, COMPANY_INFO } from "../../config";
import "../LandingPage/LandingPage.css";
import "./SmartAutomation.css";
import "./smartAutomation.css";

const SmartAutomation = () => {
  const automationProcesses = [
    {
      title: "Identify",
      description: "We analyze your workflow to find repetitive tasks",
      icon: BarChart3,
      color: "blue",
    },
    {
      title: "Design",
      description: "Create custom automation solutions for your needs",
      icon: Settings,
      color: "purple",
    },
    {
      title: "Implement",
      description: "Deploy AI-powered automation seamlessly",
      icon: Zap,
      color: "green",
    },
    {
      title: "Optimize",
      description: "Continuously improve with machine learning",
      icon: RefreshCw,
      color: "orange",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-in">
              <Workflow className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Automation
              <span className="gradient-text-ai block">Tools</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-powered workflow automation that eliminates repetitive tasks,
              boosts productivity by 70%, and frees your team to focus on what
              matters most
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary-enhanced">
                Get Started Free
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="hover-glow">
                See Demo
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
              Why Automate with AI?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your business operations with intelligent automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Save 20+ Hours Weekly</CardTitle>
                <CardDescription className="text-base">
                  Automate repetitive tasks and reclaim valuable time for
                  strategic work
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">
                  70% Productivity Boost
                </CardTitle>
                <CardDescription className="text-base">
                  Accelerate workflows and accomplish more with less effort
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-enhanced hover-lift animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">99.9% Accuracy</CardTitle>
                <CardDescription className="text-base">
                  Eliminate human error with precise AI-driven automation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Automation Process
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              From analysis to implementation, we make automation seamless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {automationProcesses.map((process, index) => (
              <Card
                key={index}
                className="card-enhanced hover-lift animate-slide-in text-center"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${
                      process.color === "blue"
                        ? "from-blue-500 to-cyan-500"
                        : process.color === "purple"
                        ? "from-purple-500 to-pink-500"
                        : process.color === "green"
                        ? "from-green-500 to-emerald-500"
                        : "from-orange-500 to-red-500"
                    } rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow`}
                  >
                    <process.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {process.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {process.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Powerful Automation Features
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Workflow Integration
                    </h3>
                    <p className="text-gray-600">
                      Connect seamlessly with 1000+ apps and services including
                      Slack, Gmail, Salesforce, and more
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Smart Triggers
                    </h3>
                    <p className="text-gray-600">
                      AI-powered triggers that know when to act based on complex
                      conditions and patterns
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Real-time Analytics
                    </h3>
                    <p className="text-gray-600">
                      Track performance, identify bottlenecks, and optimize your
                      automated workflows
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No-Code Builder
                    </h3>
                    <p className="text-gray-600">
                      Create complex automations with our intuitive
                      drag-and-drop interface
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-in lg:pl-12">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Success Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Time Saved</span>
                      <span className="font-bold">75%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className="bg-white rounded-full h-3"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Error Reduction</span>
                      <span className="font-bold">95%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className="bg-white rounded-full h-3"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Cost Savings</span>
                      <span className="font-bold">60%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className="bg-white rounded-full h-3"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Employee Satisfaction</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className="bg-white rounded-full h-3"
                        style={{ width: "85%" }}
                      ></div>
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
              <Workflow className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Automate Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses saving time and money with intelligent
            automation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-3 btn-primary-enhanced"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SmartAutomation;
