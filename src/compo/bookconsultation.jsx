import React, { useState, useRef } from "react";
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
  Upload,
  Clock,
  Users,
  Target,
  AlertCircle,
  X,
  Mail,
  Phone,
} from "lucide-react";
import consultationStorage from "../utils/consultationStorage";
import Layout from "../components/common/Layout";
import "./landingPage.css";
import "./bookConsultation.css";

// Validation utilities with best practices
const ValidationUtils = {
  // Phone number validation - supports international formats
  validatePhone: (phone) => {
    if (!phone || phone.trim().length === 0) {
      return "Phone number is required";
    }

    // Remove all spaces, hyphens, and parentheses for validation
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

    // Check for minimum length and valid characters
    if (cleanPhone.length < 10) {
      return "Phone number must be at least 10 digits";
    }

    // International format validation
    const internationalPattern = /^\+\d{10,15}$/;
    const domesticPattern = /^\d{10,11}$/;

    if (
      !internationalPattern.test(cleanPhone) &&
      !domesticPattern.test(cleanPhone)
    ) {
      return "Please enter a valid phone number";
    }

    // Check for obviously invalid patterns
    const invalidPatterns = [
      /^0+$/, // All zeros
      /^1+$/, // All ones
      /^-1/, // Negative numbers
    ];

    for (const pattern of invalidPatterns) {
      if (pattern.test(cleanPhone)) {
        return "Please enter a valid phone number";
      }
    }

    return null;
  },

  // Text-only validation for names and similar fields
  validateTextOnly: (text, fieldName = "Field") => {
    if (!text || text.trim().length === 0) {
      return `${fieldName} is required`;
    }

    // Allow letters, spaces, hyphens, apostrophes, and dots (for names like "Jr.", "Sr.")
    const textOnlyPattern = /^[a-zA-Z\s\-\'.]+$/;

    if (!textOnlyPattern.test(text.trim())) {
      return `${fieldName} must contain only letters, spaces, hyphens, and apostrophes`;
    }

    if (text.trim().length < 2) {
      return `${fieldName} must be at least 2 characters long`;
    }

    if (text.trim().length > 50) {
      return `${fieldName} must be less than 50 characters`;
    }

    return null;
  },

  // Enhanced email validation
  validateEmail: (email) => {
    if (!email || email.trim().length === 0) {
      return "Email address is required";
    }

    // Basic email pattern with comprehensive validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email.trim())) {
      return "Please enter a valid email address";
    }

    // Additional checks for common issues
    if (email.includes("..")) {
      return "Email address cannot contain consecutive dots";
    }

    if (email.startsWith(".") || email.endsWith(".")) {
      return "Email address cannot start or end with a dot";
    }

    return null;
  },

  // Project details validation with meaningful content check
  validateProjectDetails: (details) => {
    if (!details || details.trim().length === 0) {
      return "Project details are required";
    }

    if (details.trim().length < 50) {
      return "Please provide at least 50 characters describing your project";
    }

    if (details.trim().length > 2000) {
      return "Project details must be less than 2000 characters";
    }

    // Check for meaningful content (not just repeated characters)
    const meaningfulPattern = /^(?!(.)\1{10,}).*$/;
    if (!meaningfulPattern.test(details.trim())) {
      return "Please provide meaningful project details";
    }

    return null;
  },

  // Company name validation
  validateCompanyName: (company) => {
    if (!company || company.trim().length === 0) {
      return null; // Company is optional
    }

    if (company.trim().length < 2) {
      return "Company name must be at least 2 characters";
    }

    if (company.trim().length > 100) {
      return "Company name must be less than 100 characters";
    }

    return null;
  },
};

const BookConsultation = () => {
  // Form state
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

  // UI state
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [touchedFields, setTouchedFields] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  // Refs for auto-scroll functionality
  const formRef = useRef(null);
  const firstErrorRef = useRef(null);

  // Individual refs for each form field for error navigation
  const formRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    company: useRef(null),
    industry: useRef(null),
    projectType: useRef(null),
    projectDetails: useRef(null),
    additionalNotes: useRef(null),
  };

  // Enhanced input change handler with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Mark field as touched
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Real-time validation for better UX
    if (touchedFields[name]) {
      validateSingleField(name, value);
    }
  };

  // Handle field blur for immediate validation feedback
  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateSingleField(name, value);
  };

  // Single field validation for real-time feedback
  const validateSingleField = (fieldName, value) => {
    let error = null;

    switch (fieldName) {
      case "name":
        error = ValidationUtils.validateTextOnly(value, "Full name");
        break;
      case "email":
        error = ValidationUtils.validateEmail(value);
        break;
      case "phone":
        error = ValidationUtils.validatePhone(value);
        break;
      case "company":
        error = ValidationUtils.validateCompanyName(value);
        break;
      case "industry":
        if (value && value.trim().length < 2) {
          error = "Industry must be at least 2 characters";
        }
        break;
      case "projectType":
        if (!value) {
          error = "Please select a project type";
        }
        break;
      case "projectDetails":
        error = ValidationUtils.validateProjectDetails(value);
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  // Get field validation class
  const getFieldClass = (fieldName, baseClass) => {
    const hasError = errors[fieldName];
    const hasValue =
      formData[fieldName] && formData[fieldName].toString().trim();
    const wasTouched = touchedFields[fieldName];

    let classes = baseClass;

    if (hasError) {
      classes += " error";
    } else if (wasTouched && hasValue && !hasError) {
      classes += " success";
    }

    return classes;
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
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.files;
        return newErrors;
      });
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Comprehensive form validation
  const validateForm = () => {
    const newErrors = {};

    // Validate all required fields
    const requiredFields = {
      name: ValidationUtils.validateTextOnly(formData.name, "Full name"),
      email: ValidationUtils.validateEmail(formData.email),
      phone: ValidationUtils.validatePhone(formData.phone),
      projectType: !formData.projectType
        ? "Please select a project type"
        : null,
      projectDetails: ValidationUtils.validateProjectDetails(
        formData.projectDetails
      ),
    };

    // Validate optional fields if they have values
    if (formData.company) {
      requiredFields.company = ValidationUtils.validateCompanyName(
        formData.company
      );
    }

    if (
      formData.industry &&
      formData.industry.trim().length > 0 &&
      formData.industry.trim().length < 2
    ) {
      requiredFields.industry = "Industry must be at least 2 characters";
    }

    // Filter out null errors
    Object.keys(requiredFields).forEach((key) => {
      if (requiredFields[key]) {
        newErrors[key] = requiredFields[key];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Auto-scroll to first error
  const scrollToFirstError = () => {
    const errorFields = Object.keys(errors);
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0];
      const fieldRef = formRefs[firstErrorField];

      if (fieldRef && fieldRef.current) {
        fieldRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Focus the input field
        const input = fieldRef.current.querySelector("input, select, textarea");
        if (input) {
          setTimeout(() => input.focus(), 300);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      scrollToFirstError();
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Prepare consultation data for local storage
      const consultationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        industry: formData.industry,
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        projectDetails: formData.projectDetails,
        additionalNotes: formData.additionalNotes,
        files: uploadedFiles.map(file => file.name),
        submissionDate: new Date().toISOString()
      };

      console.log("Saving consultation booking...", consultationData);

      // Save to local storage (this will automatically send emails)
      const savedConsultation = await consultationStorage.saveConsultation(consultationData);
      
      console.log("Consultation saved successfully:", savedConsultation.id);

      // Show success message
      setSubmitSuccess(true);
      setSuccessMessage({
        title: "Consultation Request Submitted Successfully! 🎉",
        message: `Thank you ${formData.name}! We've received your consultation request and sent a confirmation email to ${formData.email}. Our team will contact you within 24 hours.`,
        consultationId: savedConsultation.id
      });

      // Reset form
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
      setTouchedFields({});
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);

      let errorMessage =
        "There was an error submitting your form. Please try again or contact us directly.";

      // Provide more specific error messages
      if (error.message.includes("credentials need to be configured")) {
        errorMessage =
          "Email service is not properly configured. Please contact support at softscapesolution@outlook.com or call +44 7789667804.";
      } else if (error.message.includes("configuration is missing")) {
        errorMessage =
          "Email service configuration is missing. Please contact support directly at softscapesolution@outlook.com.";
      } else if (error.text && error.text.includes("Invalid")) {
        errorMessage =
          "Invalid email configuration. Please contact support at softscapesolution@outlook.com or call +44 7789667804.";
      } else if (error.status === 400) {
        errorMessage =
          "Invalid form data. Please check your entries and try again.";
      } else if (error.status === 404) {
        errorMessage =
          "Email service not found. Please contact support at softscapesolution@outlook.com.";
      }

      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    "AI Chatbot Development",
    "Machine Learning Model",
    "Data Analytics Platform",
    "Automation System",
    "Computer Vision Solution",
    "Natural Language Processing",
    "Predictive Analytics",
    "AI Integration Consulting",
    "Custom AI Solution",
    "Other",
  ];

  const budgetRanges = [
    "Under £5,000",
    "£5,000 - £15,000",
    "£15,000 - £50,000",
    "£50,000 - £100,000",
    "Over £100,000",
    "Let's discuss",
  ];

  const timelines = [
    "ASAP (Rush job)",
    "1-2 weeks",
    "1-2 months",
    "3-6 months",
    "6+ months",
    "Flexible timeline",
  ];

  if (submitSuccess) {
    return (
      <Layout>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen flex items-center">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {successMessage?.title || "Thank You! 🎉"}
            </h1>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-200 shadow-lg">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {successMessage?.message || "Your consultation request has been submitted successfully. We'll get back to you within 24 hours."}
              </p>
              
              {successMessage?.consultationId && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Consultation ID:</strong> {successMessage.consultationId}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Please save this ID for your records
                  </p>
                </div>
              )}
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">📧 What's Next?</h3>
                <ul className="text-sm text-green-700 text-left space-y-1">
                  <li>✅ Confirmation email sent to your inbox</li>
                  <li>⏱️ Our team will review your request within 2 hours</li>
                  <li>📞 A senior consultant will contact you within 24 hours</li>
                  <li>🎯 You'll receive a personalized AI solution proposal</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 mb-2">📞 Need Immediate Help?</h3>
                <p className="text-sm text-amber-700">
                  <strong>Email:</strong> softscapesolution@outlook.com<br/>
                  <strong>Phone:</strong> +44 7789667804
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link to="/">Return to Home</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto ml-0 sm:ml-4">
                <Link to="/explore-tools">Explore Our AI Tools</Link>
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Follow us on social media for AI insights and updates
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
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
                <CardDescription>
                  Talk to experienced AI consultants
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="benefit-card card-enhanced animate-slide-in animate-delay-100">
              <CardHeader className="text-center">
                <div className="benefit-icon purple">
                  <Target className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Tailored Solutions</CardTitle>
                <CardDescription>
                  Custom recommendations for your business
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="benefit-card card-enhanced animate-slide-in animate-delay-200">
              <CardHeader className="text-center">
                <div className="benefit-icon green">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Quick Response</CardTitle>
                <CardDescription>
                  We'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Direct Contact Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Prefer to Contact Us Directly?
              </h3>
              <p className="text-gray-600 mb-4">
                You can also reach us using the contact information below:
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <a
                    href="mailto:softscapesolution@outlook.com"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    softscapesolution@outlook.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  <a
                    href="tel:+447789667804"
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    +44 7789667804
                  </a>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="consultation-form-container space-y-8"
            ref={formRef}
          >
            <Card className="consultation-card card-enhanced">
              <CardHeader>
                <CardTitle className="text-2xl">Personal Information</CardTitle>
                <CardDescription>
                  Tell us about yourself so we can get in touch
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div ref={formRefs.name}>
                    <label className="form-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      className={getFieldClass("name", "form-input")}
                      placeholder="John Doe"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p className="error-message" id="name-error" role="alert">
                        <AlertCircle />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div ref={formRefs.email}>
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      className={getFieldClass("email", "form-input")}
                      placeholder="john@company.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p
                        className="error-message"
                        id="email-error"
                        role="alert"
                      >
                        <AlertCircle />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div ref={formRefs.phone}>
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      className={getFieldClass("phone", "form-input")}
                      placeholder="+966 5 1234 5678"
                      aria-invalid={errors.phone ? "true" : "false"}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                    />
                    {errors.phone && (
                      <p
                        className="error-message"
                        id="phone-error"
                        role="alert"
                      >
                        <AlertCircle />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div ref={formRefs.company}>
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      className={getFieldClass("company", "form-input")}
                      placeholder="Your Company Inc."
                      aria-invalid={errors.company ? "true" : "false"}
                      aria-describedby={
                        errors.company ? "company-error" : undefined
                      }
                    />
                    {errors.company && (
                      <p
                        className="error-message"
                        id="company-error"
                        role="alert"
                      >
                        <AlertCircle />
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>

                <div ref={formRefs.industry}>
                  <label className="form-label">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className={getFieldClass("industry", "form-input")}
                    placeholder="e.g., Healthcare, Finance, Retail"
                    aria-invalid={errors.industry ? "true" : "false"}
                    aria-describedby={
                      errors.industry ? "industry-error" : undefined
                    }
                  />
                  {errors.industry && (
                    <p
                      className="error-message"
                      id="industry-error"
                      role="alert"
                    >
                      <AlertCircle />
                      {errors.industry}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="consultation-card card-enhanced">
              <CardHeader>
                <CardTitle className="text-2xl">Project Information</CardTitle>
                <CardDescription>
                  Help us understand your AI project needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div ref={formRefs.projectType}>
                  <label className="form-label">
                    Project Type <span className="required">*</span>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className={getFieldClass("projectType", "form-select")}
                    aria-invalid={errors.projectType ? "true" : "false"}
                    aria-describedby={
                      errors.projectType ? "projectType-error" : undefined
                    }
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p
                      className="error-message"
                      id="projectType-error"
                      role="alert"
                    >
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

                <div ref={formRefs.projectDetails}>
                  <label className="form-label">
                    Project Details / Requirements{" "}
                    <span className="required">*</span>
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    rows="6"
                    className={getFieldClass("projectDetails", "form-textarea")}
                    placeholder="Please describe your project in detail. Include your goals, challenges, current situation, and what you hope to achieve with AI. The more details you provide, the better we can prepare for our consultation."
                    aria-invalid={errors.projectDetails ? "true" : "false"}
                    aria-describedby={
                      errors.projectDetails
                        ? "projectDetails-error"
                        : "projectDetails-help"
                    }
                  />
                  <div className="character-counter">
                    {errors.projectDetails && (
                      <p
                        className="error-message"
                        id="projectDetails-error"
                        role="alert"
                      >
                        <AlertCircle />
                        {errors.projectDetails}
                      </p>
                    )}
                    <p
                      className={`character-count ${
                        formData.projectDetails.length >= 50
                          ? "success"
                          : formData.projectDetails.length >= 25
                          ? "warning"
                          : ""
                      }`}
                      id="projectDetails-help"
                    >
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
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
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
                            <span className="uploaded-file-name">
                              {file.name}
                            </span>
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

                <div ref={formRefs.additionalNotes}>
                  <label className="form-label">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    rows="4"
                    className={getFieldClass(
                      "additionalNotes",
                      "form-textarea"
                    )}
                    placeholder="Any other information you'd like to share? Preferred consultation times? Specific questions?"
                    aria-invalid={errors.additionalNotes ? "true" : "false"}
                    aria-describedby={
                      errors.additionalNotes
                        ? "additionalNotes-error"
                        : undefined
                    }
                  />
                  {errors.additionalNotes && (
                    <p
                      className="error-message"
                      id="additionalNotes-error"
                      role="alert"
                    >
                      <AlertCircle />
                      {errors.additionalNotes}
                    </p>
                  )}
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
                By submitting this form, you agree to our privacy policy and
                terms of service
              </p>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default BookConsultation;
