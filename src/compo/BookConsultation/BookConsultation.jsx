import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Layout from '../../components/common/Layout';
import consultationStorage from '../../utils/consultationStorage';

const BookConsultation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPackage = location.state?.selectedPackage;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: selectedPackage?.service || '',
    budget: selectedPackage?.price || '',
    timeline: '',
    projectDetails: selectedPackage?.description || '',
    selectedPackage: selectedPackage?.name || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Pre-fill form if package was selected
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        projectType: selectedPackage.service || prev.projectType,
        budget: selectedPackage.price || prev.budget,
        projectDetails: selectedPackage.description 
          ? `${selectedPackage.description}\n\nSelected Package: ${selectedPackage.name}\n\nIncluded Features:\n${selectedPackage.features?.join('\n') || ''}`
          : prev.projectDetails,
        selectedPackage: selectedPackage.name || prev.selectedPackage
      }));
    }
  }, [selectedPackage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.projectType || !formData.budget || !formData.projectDetails) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate EmailJS environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const adminTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
      const customerTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debug logging for environment variables
      console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
      console.log('Service ID:', serviceId);
      console.log('Admin Template ID:', adminTemplateId);
      console.log('Customer Template ID:', customerTemplateId);
      console.log('Public Key:', publicKey);
      console.log('All env vars:', import.meta.env);
      console.log('=====================================');

      if (!serviceId || !adminTemplateId || !customerTemplateId || !publicKey) {
        const missingVars = [];
        if (!serviceId) missingVars.push('Service ID');
        if (!adminTemplateId) missingVars.push('Admin Template');
        if (!customerTemplateId) missingVars.push('Customer Template');
        if (!publicKey) missingVars.push('Public Key');
        throw new Error(`EmailJS configuration missing. Missing values: ${missingVars.join(', ')}`);
      }

      console.log('=== EMAILJS FORM SUBMISSION START ===');
      console.log('Customer Email:', formData.email);
      console.log('Customer Name:', formData.name);
      console.log('Service ID:', serviceId);

      // Prepare template parameters for admin notification
      // THIS MUST GO TO ADMIN ONLY - softscapesolution@outlook.com
      const adminTemplateParams = {
        to_email: 'softscapesolution@outlook.com', // ADMIN receives this
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        project_type: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline || 'Flexible',
        selected_package: formData.selectedPackage || 'None selected',
        project_details: formData.projectDetails,
        submission_date: new Date().toLocaleString(),
        // Additional fields to ensure proper routing
        admin_email: 'softscapesolution@outlook.com',
        customer_email: formData.email
      };

      // Prepare template parameters for customer auto-reply
      // THIS MUST GO TO CUSTOMER ONLY - the person who filled the form
      const customerTemplateParams = {
        to_email: formData.email, // CUSTOMER receives this
        to_name: formData.name,
        project_type: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline || 'Flexible',
        selected_package: formData.selectedPackage || 'None selected',
        company_email: 'softscapesolution@outlook.com',
        company_phone: '+44 7789667804',
        website_url: 'https://softscape-solutions.netlify.app',
        // Additional fields to ensure proper routing
        customer_name: formData.name,
        customer_email: formData.email
      };

      console.log('=== EMAIL ROUTING DEBUG ===');
      console.log('🔍 Customer filled form with email:', formData.email);
      console.log('🔍 Customer name:', formData.name);
      console.log('');
      console.log('📧 ADMIN NOTIFICATION will be sent to:', adminTemplateParams.to_email);
      console.log('📧 CUSTOMER CONFIRMATION will be sent to:', customerTemplateParams.to_email);
      console.log('');
      console.log('⚠️  IMPORTANT: Customer should ONLY receive the confirmation email!');
      console.log('⚠️  Admin should ONLY receive the notification email!');
      console.log('');
      console.log('Service ID:', serviceId);
      console.log('Admin Template ID:', adminTemplateId);
      console.log('Customer Template ID:', customerTemplateId);
      console.log('=====================================');

      // Send admin notification email ONLY
      console.log('🔴 SENDING ADMIN NOTIFICATION ONLY...');
      console.log('Admin Template ID:', adminTemplateId);
      console.log('Admin Recipient:', adminTemplateParams.to_email);
      let adminResponse;
      try {
        adminResponse = await emailjs.send(
          serviceId,
          adminTemplateId,
          adminTemplateParams,
          publicKey
        );
        console.log('✅ Admin email sent successfully:', adminResponse);
      } catch (adminError) {
        console.error('❌ Admin email failed:', adminError);
        throw new Error(`Admin email failed: ${adminError.message || adminError.text || 'Unknown error'}`);
      }

      // Send customer auto-reply email ONLY
      console.log('🔵 SENDING CUSTOMER AUTO-REPLY ONLY...');
      console.log('Customer Template ID:', customerTemplateId);
      console.log('Customer Recipient:', formData.email);
      let customerResponse;
      try {
        customerResponse = await emailjs.send(
          serviceId,
          customerTemplateId,
          customerTemplateParams,
          publicKey
        );
        console.log('✅ Customer email sent successfully:', customerResponse);
      } catch (customerError) {
        console.error('❌ Customer email failed:', customerError);
        throw new Error(`Customer email failed: ${customerError.message || customerError.text || 'Unknown error'}`);
      }

      if (adminResponse.status === 200 && customerResponse.status === 200) {
        // Save to local storage as backup
        await consultationStorage.saveConsultation({
          ...formData,
          service: formData.projectType,
          submittedAt: new Date().toISOString()
        });

        setSubmitStatus({
          type: 'success',
          message: '🎉 Success! Consultation request submitted successfully!'
        });

        // Reset form after 4 seconds
        setTimeout(() => {
          navigate('/');
        }, 4000);
      } else {
        // If one failed, show which one
        const failedSubmissions = [];
        if (adminResponse.status !== 200) failedSubmissions.push('admin notification');
        if (customerResponse.status !== 200) failedSubmissions.push('customer confirmation');
        
        throw new Error(`Failed to send ${failedSubmissions.join(' and ')}`);
      }

    } catch (error) {
      console.error('Error submitting consultation:', error);
      
      // Enhanced error logging
      console.error('Full error object:', error);
      console.error('Error message:', error.message);
      console.error('Error text:', error.text);
      console.error('Error status:', error.status);
      
      setSubmitStatus({
        type: 'error',
        message: `❌ submission failed: ${error.message || error.text || error || 'Unknown error'}. Please try again or contact us directly at softscapesolution@outlook.com`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book a Free Consultation
            </h1>
            <p className="text-xl text-gray-600">
              Let's discuss your project and create a solution tailored to your needs
            </p>
          </div>

          {/* Selected Package Info */}
          {selectedPackage && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-blue-600">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">📦</span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedPackage.name} Package Selected
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedPackage.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 px-4 py-2 rounded-lg">
                      <span className="text-sm text-gray-600">Investment:</span>
                      <span className="ml-2 text-lg font-bold text-blue-600">
                        {selectedPackage.price}
                      </span>
                    </div>
                    <div className="bg-green-100 px-4 py-2 rounded-lg">
                      <span className="text-sm text-gray-600">Service:</span>
                      <span className="ml-2 text-sm font-semibold text-green-700">
                        {selectedPackage.service}
                      </span>
                    </div>
                  </div>
                  {selectedPackage.features && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Package Includes:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedPackage.features.slice(0, 6).map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => navigate(-1)}
                  className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Change package"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Consultation Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EmailJS integration note - no hidden fields needed like Web3Forms */}
              
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="Web App Development">Web App Development</option>
                    <option value="AI Chatbots">AI Chatbots</option>
                    <option value="Smart Automation">Smart Automation</option>
                    <option value="AI Applications">AI Applications</option>
                    <option value="Custom AI Solutions">Custom AI Solutions</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select budget range</option>
                    <option value="$1,500">$1,500 (Starter)</option>
                    <option value="$2,500">$2,500 (Professional)</option>
                    <option value="$4,500">$4,500 (Enterprise)</option>
                    <option value="$5,000+">$5,000+ (Custom)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">As soon as possible</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="2-4 weeks">2-4 weeks</option>
                  <option value="1-2 months">1-2 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  required
                  rows="6"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  Please provide as much detail as possible about your project
                </p>
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 border border-green-400 text-green-700' 
                    : 'bg-red-100 border border-red-400 text-red-700'
                }`}>
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-xl ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting request...
                    </span>
                  ) : (
                    'Submit Consultation Request'
                  )}
                </button>
              </div>
            </form>

            {/* Contact Information */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-4">
                Prefer to reach out directly?
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="mailto:softscapesolution@outlook.com" className="flex items-center text-blue-600 hover:text-blue-700">
                  <span className="mr-2">📧</span>
                  softscapesolution@outlook.com
                </a>
                <a href="tel:+447789667804" className="flex items-center text-blue-600 hover:text-blue-700">
                  <span className="mr-2">📱</span>
                  +44 7789667804
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookConsultation;