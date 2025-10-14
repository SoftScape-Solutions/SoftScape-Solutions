// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import emailjs from '@emailjs/browser';
// import Layout from '../../components/common/Layout';
// import consultationStorage from '../../utils/consultationStorage';

// const BookConsultation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const selectedPackage = location.state?.selectedPackage;

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     projectType: selectedPackage?.service || '',
//     budget: selectedPackage?.price || '',
//     timeline: '',
//     projectDetails: selectedPackage?.description || '',
//     selectedPackage: selectedPackage?.name || ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   useEffect(() => {
//     // Pre-fill form if package was selected
//     if (selectedPackage) {
//       setFormData(prev => ({
//         ...prev,
//         projectType: selectedPackage.service || prev.projectType,
//         budget: selectedPackage.price || prev.budget,
//         projectDetails: selectedPackage.description 
//           ? `${selectedPackage.description}\n\nSelected Package: ${selectedPackage.name}\n\nIncluded Features:\n${selectedPackage.features?.join('\n') || ''}`
//           : prev.projectDetails,
//         selectedPackage: selectedPackage.name || prev.selectedPackage
//       }));
//     }
//   }, [selectedPackage]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       // Validate required fields
//       if (!formData.name || !formData.email || !formData.projectType || !formData.budget || !formData.projectDetails) {
//         throw new Error('Please fill in all required fields');
//       }

//       // Validate email format
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email)) {
//         throw new Error('Please enter a valid email address');
//       }

//       console.log('=== FORM SUBMISSION START ===');
//       console.log('Customer Email:', formData.email);
//       console.log('Customer Name:', formData.name);

//       const accessKey = formData.access_key;

//       // First submission: Admin notification
//       const adminFormData = {
//         access_key: accessKey,
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone || 'Not provided',
//         company: formData.company || 'Not provided',
//         project_type: formData.projectType,
//         budget: formData.budget,
//         timeline: formData.timeline || 'Not specified',
//         selected_package: formData.selectedPackage || 'None',
//         project_details: formData.projectDetails,
        
//         // Admin notification settings
//         subject: `🚀 NEW CONSULTATION REQUEST - ${formData.name} (${formData.projectType})`,
//         to: 'softscapesolution@outlook.com',
//         from_name: formData.name,
//         reply_to: formData.email,
        
//         message: `
// ========================================
// 🚀 NEW CONSULTATION REQUEST
// ========================================

// � CUSTOMER DETAILS:
// Name: ${formData.name}
// Email: ${formData.email}
// Phone: ${formData.phone || 'Not provided'}
// Company: ${formData.company || 'Not provided'}

// 💼 PROJECT INFORMATION:
// Type: ${formData.projectType}
// Budget: ${formData.budget}
// Timeline: ${formData.timeline || 'Flexible'}
// Package: ${formData.selectedPackage || 'None selected'}

// 📝 PROJECT DESCRIPTION:
// ${formData.projectDetails}

// 📅 SUBMITTED: ${new Date().toLocaleString()}

// ========================================
// ⚡ ACTION REQUIRED: Contact customer within 24 hours
// 📧 Reply directly to this email to respond to customer
// ========================================
//         `
//       };

//       // Second submission: Customer confirmation email
//       const customerFormData = {
//         access_key: accessKey,
//         name: 'SoftScape Solutions',
//         email: 'softscapesolution@outlook.com',
//         to: formData.email,
//         from_name: 'SoftScape Solutions',
//         reply_to: 'softscapesolution@outlook.com',
        
//         subject: '✅ Consultation Request Confirmed - SoftScape Solutions',
//         message: `Dear ${formData.name},

// 🎉 Thank you for reaching out to SoftScape Solutions!

// We have successfully received your consultation request and our team is excited to help transform your business with our cutting-edge AI solutions.

// 📋 YOUR REQUEST SUMMARY:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Project Type: ${formData.projectType}
// Budget Range: ${formData.budget}
// Timeline: ${formData.timeline || 'Flexible'}
// ${formData.selectedPackage ? `Selected Package: ${formData.selectedPackage}` : ''}

// 🚀 WHAT HAPPENS NEXT:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ Within 2 hours: Our team reviews your request
// ✅ Within 24 hours: A senior consultant contacts you
// ✅ Initial Discussion: We schedule a detailed consultation call
// ✅ Custom Proposal: You receive a tailored solution proposal

// 📞 NEED IMMEDIATE ASSISTANCE?
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📧 Email: softscapesolution@outlook.com
// 📱 Phone: +44 7789667804
// 🌐 Website: https://softscape-solutions.netlify.app

// We're committed to delivering AI solutions that drive real business results. 

// Thank you for choosing SoftScape Solutions!

// Best regards,
// The SoftScape Solutions Team

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// This is an automated confirmation.
// For inquiries, please contact us using the information above.`
//       };

//       // Debug logging to verify email addresses
//       console.log('=== EMAIL ROUTING DEBUG ===');
//       console.log('Customer Email from Form:', formData.email);
//       console.log('Customer Confirmation Will Be Sent To:', customerFormData.to);
//       console.log('Admin Notification Will Be Sent To:', adminFormData.to);
//       console.log('Form Data:', formData);
//       console.log('========================');

//       // Submit admin notification
//       console.log('Submitting admin notification...');
//       const adminResponse = await fetch('https://api.web3forms.com/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(adminFormData)
//       });

//       const adminResult = await adminResponse.json();
//       console.log('Admin submission result:', adminResult);

//       // Submit customer confirmation
//       console.log('Submitting customer confirmation...');
//       const customerResponse = await fetch('https://api.web3forms.com/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(customerFormData)
//       });

//       const customerResult = await customerResponse.json();
//       console.log('Customer submission result:', customerResult);

//       if (adminResult.success && customerResult.success) {
//         // Save to local storage as backup
//         await consultationStorage.saveConsultation({
//           ...formData,
//           service: formData.projectType,
//           submittedAt: new Date().toISOString()
//         });

//         setSubmitStatus({
//           type: 'success',
//           message: '🎉 Success! Consultation request submitted and confirmation email sent to customer. We will contact them within 24 hours.'
//         });

//         // Reset form after 4 seconds
//         setTimeout(() => {
//           navigate('/');
//         }, 4000);
//       } else {
//         // If one failed, show which one
//         const failedSubmissions = [];
//         if (!adminResult.success) failedSubmissions.push('admin notification');
//         if (!customerResult.success) failedSubmissions.push('customer confirmation');
        
//         throw new Error(`Failed to send ${failedSubmissions.join(' and ')}`);
//       }

//     } catch (error) {
//       console.error('Error submitting consultation:', error);
//       setSubmitStatus({
//         type: 'error',
//         message: `❌ Submission failed: ${error.message}. Please try again or contact us directly at softscapesolution@outlook.com`
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Book a Free Consultation
//             </h1>
//             <p className="text-xl text-gray-600">
//               Let's discuss your project and create a solution tailored to your needs
//             </p>
//           </div>

//           {/* Selected Package Info */}
//           {selectedPackage && (
//             <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-blue-600">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-center mb-2">
//                     <span className="text-2xl mr-3">📦</span>
//                     <h3 className="text-2xl font-bold text-gray-900">
//                       {selectedPackage.name} Package Selected
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 mb-4">{selectedPackage.description}</p>
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="bg-blue-100 px-4 py-2 rounded-lg">
//                       <span className="text-sm text-gray-600">Investment:</span>
//                       <span className="ml-2 text-lg font-bold text-blue-600">
//                         {selectedPackage.price}
//                       </span>
//                     </div>
//                     <div className="bg-green-100 px-4 py-2 rounded-lg">
//                       <span className="text-sm text-gray-600">Service:</span>
//                       <span className="ml-2 text-sm font-semibold text-green-700">
//                         {selectedPackage.service}
//                       </span>
//                     </div>
//                   </div>
//                   {selectedPackage.features && (
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700 mb-2">
//                         Package Includes:
//                       </p>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                         {selectedPackage.features.slice(0, 6).map((feature, index) => (
//                           <div key={index} className="flex items-start">
//                             <span className="text-green-500 mr-2">✓</span>
//                             <span className="text-sm text-gray-600">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
//                   title="Change package"
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Consultation Form */}
//           <div className="bg-white rounded-lg shadow-xl p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Web3Forms hidden fields - simplified since we use dual submission */}
//               <input type="hidden" name="access_key" value={formData.access_key} />
//               <input type="hidden" name="from_name" value={formData.name || 'Website Visitor'} />
//               <input type="hidden" name="reply_to" value={formData.email} />
              
//               {/* Honeypot field for spam protection */}
//               <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
              
//               {/* Personal Information */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="John Doe"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="john@example.com"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="+1 (555) 123-4567"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
//                     Company Name
//                   </label>
//                   <input
//                     type="text"
//                     id="company"
//                     name="company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="Your Company"
//                   />
//                 </div>
//               </div>

//               {/* Project Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
//                     Project Type *
//                   </label>
//                   <select
//                     id="projectType"
//                     name="projectType"
//                     required
//                     value={formData.projectType}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   >
//                     <option value="">Select a service</option>
//                     <option value="Web App Development">Web App Development</option>
//                     <option value="AI Chatbots">AI Chatbots</option>
//                     <option value="Smart Automation">Smart Automation</option>
//                     <option value="AI Applications">AI Applications</option>
//                     <option value="Custom AI Solutions">Custom AI Solutions</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
//                     Budget Range *
//                   </label>
//                   <select
//                     id="budget"
//                     name="budget"
//                     required
//                     value={formData.budget}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   >
//                     <option value="">Select budget range</option>
//                     <option value="$1,500">$1,500 (Starter)</option>
//                     <option value="$2,500">$2,500 (Professional)</option>
//                     <option value="$4,500">$4,500 (Enterprise)</option>
//                     <option value="$5,000+">$5,000+ (Custom)</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
//                   Desired Timeline
//                 </label>
//                 <select
//                   id="timeline"
//                   name="timeline"
//                   value={formData.timeline}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select timeline</option>
//                   <option value="ASAP">As soon as possible</option>
//                   <option value="1-2 weeks">1-2 weeks</option>
//                   <option value="2-4 weeks">2-4 weeks</option>
//                   <option value="1-2 months">1-2 months</option>
//                   <option value="Flexible">Flexible</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-2">
//                   Project Details *
//                 </label>
//                 <textarea
//                   id="projectDetails"
//                   name="projectDetails"
//                   required
//                   rows="6"
//                   value={formData.projectDetails}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//                   placeholder="Tell us about your project requirements, goals, and any specific features you need..."
//                 />
//                 <p className="mt-2 text-sm text-gray-500">
//                   Please provide as much detail as possible about your project
//                 </p>
//               </div>

//               {/* Submit Status */}
//               {submitStatus && (
//                 <div className={`p-4 rounded-lg ${
//                   submitStatus.type === 'success' 
//                     ? 'bg-green-100 border border-green-400 text-green-700' 
//                     : 'bg-red-100 border border-red-400 text-red-700'
//                 }`}>
//                   <p className="font-medium">{submitStatus.message}</p>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-xl ${
//                     isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isSubmitting ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Submitting...
//                     </span>
//                   ) : (
//                     'Submit Consultation Request'
//                   )}
//                 </button>
//               </div>
//             </form>

//             {/* Contact Information */}
//             <div className="mt-8 pt-8 border-t border-gray-200">
//               <p className="text-center text-gray-600 mb-4">
//                 Prefer to reach out directly?
//               </p>
//               <div className="flex flex-wrap justify-center gap-6">
//                 <a href="mailto:softscapesolution@outlook.com" className="flex items-center text-blue-600 hover:text-blue-700">
//                   <span className="mr-2">📧</span>
//                   softscapesolution@outlook.com
//                 </a>
//                 <a href="tel:+447789667804" className="flex items-center text-blue-600 hover:text-blue-700">
//                   <span className="mr-2">📱</span>
//                   +44 7789667804
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default BookConsultation;