// Email Service for SoftScape Solutions
// This handles automated consultation confirmation emails using EmailJS only

import emailjs from '@emailjs/browser';

class EmailService {
  constructor() {
    // EmailJS configuration from environment variables
    this.serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    this.adminTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
    this.customerTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER;
    this.publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    if (!this.serviceId || !this.adminTemplateId || !this.customerTemplateId || !this.publicKey) {
      console.warn('EmailJS configuration is incomplete. Email functionality will be limited.');
    }
  }

  // Send consultation confirmation email using EmailJS
  async sendConsultationConfirmation(consultationData) {
    try {
      if (!this.serviceId || !this.customerTemplateId || !this.publicKey) {
        throw new Error('EmailJS configuration is incomplete');
      }

      const templateParams = {
        to_email: consultationData.email,
        from_name: 'SoftScape Solutions',
        customer_name: consultationData.name,
        company: consultationData.company || 'Not provided',
        project_type: consultationData.projectType,
        budget: consultationData.budget,
        timeline: consultationData.timeline || 'Flexible',
        selected_package: consultationData.selectedPackage || 'None selected',
        project_details: consultationData.projectDetails,
        submission_date: new Date().toLocaleString(),
        consultation_id: consultationData.id || 'N/A'
      };

      const response = await emailjs.send(
        this.serviceId,
        this.customerTemplateId,
        templateParams,
        this.publicKey
      );

      if (response.status === 200) {
        console.log('Confirmation email sent successfully via EmailJS');
        return { success: true, method: 'emailjs' };
      } else {
        throw new Error(`EmailJS failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Email confirmation failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Send admin notification email using EmailJS
  async sendAdminNotification(consultationData) {
    try {
      if (!this.serviceId || !this.adminTemplateId || !this.publicKey) {
        throw new Error('EmailJS configuration is incomplete');
      }

      const templateParams = {
        to_email: 'softscapesolution@outlook.com',
        from_name: consultationData.name,
        from_email: consultationData.email,
        phone: consultationData.phone || 'Not provided',
        company: consultationData.company || 'Not provided',
        project_type: consultationData.projectType,
        budget: consultationData.budget,
        timeline: consultationData.timeline || 'Flexible',
        selected_package: consultationData.selectedPackage || 'None selected',
        project_details: consultationData.projectDetails,
        submission_date: new Date().toLocaleString(),
        consultation_id: consultationData.id || 'N/A'
      };

      const response = await emailjs.send(
        this.serviceId,
        this.adminTemplateId,
        templateParams,
        this.publicKey
      );

      if (response.status === 200) {
        console.log('Admin notification sent successfully via EmailJS');
        return { success: true, method: 'emailjs' };
      } else {
        throw new Error(`EmailJS failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Admin notification failed:', error);
      return { success: false, error: error.message };
    }
  }
}

// Create and export singleton instance
const emailService = new EmailService();
export default emailService;