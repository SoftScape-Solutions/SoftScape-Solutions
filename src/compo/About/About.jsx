import React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Code,
  Users,
  Target,
  Heart,
  Award,
  Zap,
  Shield,
  Brain,
  Bot,
  Workflow,
} from "lucide-react";

import Layout from "../../components/common/Layout";
import "./About.css";

const About = () => {
  return (
    <Layout logoClassName="about-logo-text">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-in">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About
              <span className="gradient-text-ai block">
                SoftScape Solutions
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              We are passionate AI innovators creating intelligent solutions,
              autonomous agents, and smart tools that revolutionize businesses
              through the power of artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our AI Mission
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                At SoftScape AI Solutions, we are dedicated to delivering
                revolutionary artificial intelligence tools, smart automation
                agents, and intelligent systems that transform how businesses
                operate. Our commitment to AI excellence drives everything we
                create.
              </p>
            </div>
            <div className="animate-slide-in about-hero-card">
              <div className="animate-gradient rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Our AI Promise</h3>
                </div>
                <p className="text-blue-100 text-lg leading-relaxed">
                  We promise to deliver AI solutions that not only meet your
                  technical requirements but revolutionize your business
                  operations with intelligent automation and smart
                  decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our AI Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The AI principles that guide every intelligent solution and
              autonomous agent we create
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-slide-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 animate-pulse-glow">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">AI Innovation</CardTitle>
                <CardDescription className="text-base">
                  Pioneering the future with breakthrough artificial
                  intelligence and smart automation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="about-values-card animate-slide-in about-values-card-1">
              <CardHeader className="text-center">
                <div className="about-values-icon-green">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Excellence</CardTitle>
                <CardDescription className="text-base">
                  Delivering intelligent solutions with unmatched quality and
                  precision
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="about-values-card animate-slide-in about-values-card-2">
              <CardHeader className="text-center">
                <div className="about-values-icon-purple">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">AI Ethics</CardTitle>
                <CardDescription className="text-base">
                  Building trustworthy AI systems with transparency and
                  responsible innovation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="about-values-card animate-slide-in about-values-card-3">
              <CardHeader className="text-center">
                <div className="about-values-icon-orange">
                  <Workflow className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Intelligent Collaboration
                </CardTitle>
                <CardDescription className="text-base">
                  Partnering with AI agents and human expertise for
                  extraordinary results
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to delivering exceptional
              results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center group animate-slide-in">
              <div className="about-team-avatar about-team-avatar-1">OA</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Omer Aqeel
              </h3>
              <p className="text-gray-600 mb-2">
                Lead AI Developer/Software Engineer
              </p>
              <p className="text-sm text-gray-500">
                AI systems architect with 4+ years in intelligent automation,
                specializing in natural language processing, LLM integration,
                and AI-driven solutions.
              </p>
            </div>

            <div className="text-center about-team-card animate-slide-in about-team-card-1">
              <div className="about-team-avatar about-team-avatar-2">SH</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Mohammad Saad Husnain
              </h3>
              <p className="text-gray-600 mb-2">AI UX Designer/Researcher</p>
              <p className="text-sm text-gray-500">
                Designing intuitive interfaces for intelligent systems/AI
                applications and Researching AI Implementation Strategies
              </p>
            </div>

            <div className="text-center about-team-card animate-slide-in about-team-card-2">
              <div className="about-team-avatar about-team-avatar-3">SR</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Saad ur Rehman
              </h3>
              <p className="text-gray-600 mb-2">
                Full Stack Developer/Project Manager
              </p>
              <p className="text-sm text-gray-500">
                Keeping AI infrastructure cool and optimally performing,
                developing communication protocols, ensuring seamless
                integration of AI solutions and Database management.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              We are a team of passionate professionals committed to delivering
              the best solutions for our clients. With expertise in various
              technologies and industries, we bring diverse perspectives to
              every project.
            </p>
            
            {/* Removing the button for now */}
            {/* <Button size="lg" className="animate-slide-in about-team-card-3">
              Join Our Team
            </Button> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
