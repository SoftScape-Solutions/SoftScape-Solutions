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
  Calendar,
  CheckCircle2,
  Menu,
  X,
  Upload,
  Clock,
  Users,
  Target,
  AlertCircle,
} from "lucide-react";
import emailjs from '@emailjs/browser';
import "./landingPage.css";
import "./bookConsultation.css";

const BookConsultation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    projectType: "",
    budget: "",
    timeline: "",
    projectDetails: "",
    additionalNotes: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      const maxSize = 10 * 1024 * 1024;
      return file.size <= maxSize;
    });

    if (validFiles.length !== files.length) {
      setErrors((prev) => ({
        ...prev,
        files: "Some files were too large (max 10MB per file)",
      }));
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type";
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = "Project details are required";
    } else if (formData.projectDetails.trim().length < 50) {
      newErrors.projectDetails = "Please provide at least 50 characters of detail";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration from environment variables
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const customerEmail = import.meta.env.VITE_CUSTOMER_SERVICE_EMAIL;

      // Check if all required environment variables are set
      if (!serviceID || !templateID || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }

      // Prepare email data
      const emailData = {
        to_email: customerEmail || 'contact@softscape-solutions.com', // Fallback email
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        industry: formData.industry,
        project_type: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        project_details: formData.projectDetails,
        additional_notes: formData.additionalNotes,
        uploaded_files: uploadedFiles.length > 0 ? uploadedFiles.map(f => f.name).join(', ') : 'No files uploaded',
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString()
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceID,
        templateID,
        emailData,
        publicKey
      );

      console.log('Email sent successfully:', response);
      
      // Success - reset form
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        projectType: "",
        budget: "",
        timeline: "",
        projectDetails: "",
        additionalNotes: "",
      });
      setUploadedFiles([]);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      
      // Set user-friendly error message
      if (error.message.includes('EmailJS configuration')) {
        setSubmitError('Email service is not configured. Please contact us directly at contact@softscape-solutions.com');
      } else if (error.text && error.text.includes('rate limit')) {
        setSubmitError('Too many requests. Please try again in a few minutes.');
      } else {
        setSubmitError('Sorry, there was an error sending your consultation request. Please try again or contact us directly at contact@softscape-solutions.com');
      }

      // Clear error message after 10 seconds
      setTimeout(() => {
        setSubmitError("");
      }, 10000);
    }
  };

  const projectTypes = [
    "AI Chatbots & Agents",
    "Smart Automation Tools",
    "AI-Enhanced Applications",
    "Custom AI Solutions",
    "Multiple Services",
    "Not Sure Yet",
  ];

  const budgetRanges = [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+",
    "To be discussed",
  ];

  const timelines = [
    "ASAP (1-2 months)",
    "3-6 months",
    "6-12 months",
    "12+ months",
    "Flexible",
  ];

  if (submitSuccess) {
    return (
      <div className="relative min-h-screen">
        <nav className="border-b nav-enhanced fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center animate-slide-in-left">
                <img
                  src="/softscape-logo.png"
                  alt="SoftScape Solutions Logo"
                  className="h-12 sm:h-16 md:h-20 w-auto -my-2 sm:-my-4 md:-my-4 mr-2 sm:mr-4"
                />
                <div className="text-gray-700 font-bold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm sm:text-lg md:text-xl">
                  SoftScape Solutions
                </div>
              </Link>
            </div>
          </div>
        </nav>

        <div className="success-container px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="success-icon">
              <CheckCircle2 />
            </div>
            <h1 className="success-title">
              Consultation Request Received!
            </h1>
            <p className="success-description">
              Thank you for your interest! Our team will review your request and
              get back to you within 24 hours.
            </p>
            <div className="success-info-card text-left">
              <div className="success-info-item">
                <CheckCircle2 className="success-info-icon green" />
                <div>
                  <h3 className="success-info-title">What happens next?</h3>
                  <p className="success-info-text">
                    Our AI experts will review your project details and prepare a
                    customized consultation
                  </p>
                </div>
              </div>
              <div className="success-info-item">
                <Clock className="success-info-icon blue" />
                <div>
                  <h3 className="success-info-title">Response time</h3>
                  <p className="success-info-text">
                    You'll receive a personalized response within 24 hours
                  </p>
                </div>
              </div>
              <div className="success-info-item">
                <Calendar className="success-info-icon purple" />
                <div>
                  <h3 className="success-info-title">Schedule meeting</h3>
                  <p className="success-info-text">
                    We'll provide available time slots for your consultation
                  </p>
                </div>
              </div>
            </div>
            <div className="success-button-group">
              <Link to="/">
                <Button size="lg" className="btn-primary-enhanced">
                  Back to Home
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="hover-glow"
                onClick={() => setSubmitSuccess(false)}
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <nav className="border-b nav-enhanced fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center animate-slide-in-left">
              <img
                src="/softscape-logo.png"
                alt="SoftScape Solutions Logo"
                className="h-12 sm:h-16 md:h-20 w-auto -my-2 sm:-my-4 md:-my-4 mr-2 sm:mr-4"
              />
              <div className="text-gray-700 font-bold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm sm:text-lg md:text-xl">
                SoftScape Solutions
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
                Home
              </Link>
              <a href="/#services" className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
                AI Tools
              </a>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors hover-scale font-medium tracking-wide text-lg">
                About
              </Link>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-blue-600 transition-colors p-2">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b shadow-lg animate-slide-in">
              <div className="px-4 py-4 space-y-4">
                <Link to="/" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
                  Home
                </Link>
                <a href="/#services" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
                  AI Tools
                </a>
                <Link to="/about" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium tracking-wide text-lg py-2" onClick={toggleMobileMenu}>
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-in">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Book Your Free
              <span className="gradient-text-ai block">AI Consultation</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Let's discuss how AI can transform your business. Our experts will
              provide personalized recommendations tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            <Card className="benefit-card card-enhanced animate-slide-in">
              <CardHeader className="text-center">
                <div className="benefit-icon blue">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Expert Guidance</CardTitle>
                <CardDescription>Talk to experienced AI consultants</CardDescription>
              </CardHeader>
            </Card>

            <Card className="benefit-card card-enhanced animate-slide-in animate-delay-100">
              <CardHeader className="text-center">
                <div className="benefit-icon purple">
                  <Target className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Tailored Solutions</CardTitle>
                <CardDescription>Custom recommendations for your business</CardDescription>
              </CardHeader>
            </Card>

            <Card className="benefit-card card-enhanced animate-slide-in animate-delay-200">
              <CardHeader className="text-center">
                <div className="benefit-icon green">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Quick Response</CardTitle>
                <CardDescription>We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="consultation-form-container space-y-8">
            <Card className="consultation-card card-enhanced">
              <CardHeader>
                <CardTitle className="text-2xl">Personal Information</CardTitle>
                <CardDescription>Tell us about yourself so we can get in touch</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? "error" : ""}`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="error-message">
                        <AlertCircle />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? "error" : ""}`}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="error-message">
                        <AlertCircle />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${errors.phone ? "error" : ""}`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="error-message">
                        <AlertCircle />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your Company Inc."
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., Healthcare, Finance, Retail"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="consultation-card card-enhanced">
              <CardHeader>
                <CardTitle className="text-2xl">Project Information</CardTitle>
                <CardDescription>Help us understand your AI project needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="form-label">
                    Project Type <span className="required">*</span>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className={`form-select ${errors.projectType ? "error" : ""}`}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="error-message">
                      <AlertCircle />
                      {errors.projectType}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Expected Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">
                    Project Details / Requirements <span className="required">*</span>
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    rows="6"
                    className={`form-textarea ${errors.projectDetails ? "error" : ""}`}
                    placeholder="Please describe your project in detail. Include your goals, challenges, current situation, and what you hope to achieve with AI. The more details you provide, the better we can prepare for our consultation."
                  />
                  <div className="character-counter">
                    {errors.projectDetails && (
                      <p className="error-message">
                        <AlertCircle />
                        {errors.projectDetails}
                      </p>
                    )}
                    <p className="character-count">
                      {formData.projectDetails.length} characters (min. 50)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="form-label">Additional Documents</label>
                  <div className="file-upload-area">
                    <Upload className="file-upload-icon" />
                    <p className="file-upload-text">
                      Upload any relevant documents, mockups, or specifications
                    </p>
                    <p className="file-upload-hint">
                      PDF, DOC, DOCX, PNG, JPG (Max 10MB per file)
                    </p>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      multiple
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload").click()}
                    >
                      Choose Files
                    </Button>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="uploaded-file-item">
                          <div className="uploaded-file-info">
                            <CheckCircle2 className="uploaded-file-icon" />
                            <span className="uploaded-file-name">{file.name}</span>
                            <span className="uploaded-file-size">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="remove-file-button"
                          >
                            <X />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.files && (
                    <p className="error-message mt-2">
                      <AlertCircle />
                      {errors.files}
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows="4"
                    className="form-textarea"
                    placeholder="Any other information you'd like to share? Preferred consultation times? Specific questions?"
                  />
                </div>
              </CardContent>
            </Card>

            {submitError && (
              <div className="error-message global-error text-center mb-6">
                <AlertCircle />
                {submitError}
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Consultation Request
                    <Calendar className="h-5 w-5" />
                  </>
                )}
              </button>
              <p className="privacy-text">
                By submitting this form, you agree to our privacy policy and terms of service
              </p>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SoftScape AI Solutions</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Revolutionizing businesses through cutting-edge AI technology and intelligent automation.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li>AI Tools</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>consult@softscape.solutions</li>
                <li>+1 (555) AI-CONSULT</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SoftScape-Solutions. Powering the future with artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookConsultation;