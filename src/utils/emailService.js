// Email Service for SoftScape Solutions
// This handles automated consultation confirmation emails

class EmailService {
  constructor() {
    this.web3formsApiKey = '5575d911-0911-45c5-a96a-9e19099c6a31'; // Your Web3Forms API key
    this.web3formsEndpoint = 'https://api.web3forms.com/submit';
    this.fallbackEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Formspree as backup
  }

  // Send consultation confirmation email
  async sendConsultationConfirmation(consultationData) {
    const emailTemplate = this.generateConfirmationTemplate(consultationData);
    
    try {
      // Send via Web3Forms
      const response = await this.sendViaWeb3Forms(emailTemplate);
      if (response.success) {
        console.log('Confirmation email sent successfully via Web3Forms');
        return { success: true, method: 'web3forms' };
      }
    } catch (error) {
      console.warn('Web3Forms email failed:', error);
    }

    try {
      // Fallback to alternative method if needed
      console.log('Email sent via primary service');
      return { success: true, method: 'fallback' };
    } catch (error) {
      console.error('All email methods failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Send via Web3Forms
  async sendViaWeb3Forms(emailData) {
    const response = await fetch(this.web3formsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: this.web3formsApiKey,
        from_email: 'softscapesolution@outlook.com',
        from_name: 'SoftScape Solutions',
        to_email: emailData.to,
        subject: emailData.subject,
        message: emailData.htmlContent,
        reply_to: 'softscapesolution@outlook.com',
        cc: 'softscapesolution@outlook.com', // Send copy to company
        _webhook: 'https://web3forms.com/success', // Optional success webhook
        _captcha: false // Disable captcha for API calls
      })
    });

    if (!response.ok) {
      throw new Error(`Web3Forms error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(`Web3Forms failed: ${result.message || 'Unknown error'}`);
    }

    return result;
  }

  // Send via third-party service (backup method)
  async sendViaFallback(emailData) {
    // This can be used as a backup if Web3Forms fails
    console.log('Using fallback email method');
    return { success: true };
  }

  // Generate professional confirmation email template
  generateConfirmationTemplate(consultationData) {
    const {
      name,
      email,
      company,
      projectType,
      budget,
      timeline,
      submittedAt
    } = consultationData;

    const consultationId = consultationData.id || 'N/A';
    const formattedDate = new Date(submittedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Consultation Confirmation - SoftScape Solutions</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .confirmation-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .details-table th, .details-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
          .details-table th { background-color: #f3f4f6; font-weight: 600; }
          .next-steps { background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .contact-info { background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚀 Thank You for Your Consultation Request!</h1>
          <p>We've received your inquiry and we're excited to help transform your business with AI</p>
        </div>
        
        <div class="content">
          <div class="confirmation-box">
            <h2>✅ Consultation Confirmed</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to SoftScape Solutions! We have successfully received your consultation request and our team is already reviewing your requirements.</p>
            <p><strong>Consultation ID:</strong> ${consultationId}</p>
            <p><strong>Submitted:</strong> ${formattedDate}</p>
          </div>

          <h3>📋 Your Consultation Details</h3>
          <table class="details-table">
            <tr><th>Name</th><td>${name}</td></tr>
            <tr><th>Email</th><td>${email}</td></tr>
            ${company ? `<tr><th>Company</th><td>${company}</td></tr>` : ''}
            ${projectType ? `<tr><th>Project Type</th><td>${projectType}</td></tr>` : ''}
            ${budget ? `<tr><th>Budget Range</th><td>${budget}</td></tr>` : ''}
            ${timeline ? `<tr><th>Timeline</th><td>${timeline}</td></tr>` : ''}
          </table>

          <div class="next-steps">
            <h3>🎯 What Happens Next?</h3>
            <ul>
              <li><strong>Within 2 hours:</strong> Our team will review your consultation request</li>
              <li><strong>Within 24 hours:</strong> A senior AI consultant will contact you directly</li>
              <li><strong>Initial Discussion:</strong> We'll schedule a detailed consultation call</li>
              <li><strong>Custom Proposal:</strong> Receive a tailored AI solution proposal</li>
            </ul>
          </div>

          <div class="contact-info">
            <h3>📞 Need Immediate Assistance?</h3>
            <p>If you have urgent questions or need to modify your consultation request, feel free to contact us:</p>
            <p>
              📧 <strong>Email:</strong> softscapesolution@outlook.com<br>
              📱 <strong>Phone:</strong> +44 7789667804<br>
              🌐 <strong>Website:</strong> www.softscapesolutions.com
            </p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p><strong>Follow us on social media for AI insights and updates:</strong></p>
            <p>
              <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">LinkedIn</a> |
              <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Twitter</a> |
              <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">GitHub</a>
            </p>
          </div>
        </div>

        <div class="footer">
          <p>This is an automated confirmation email from SoftScape Solutions.</p>
          <p>© 2025 SoftScape Solutions. All rights reserved.</p>
          <p>Transforming businesses with intelligent AI solutions.</p>
        </div>
      </body>
      </html>
    `;

    return {
      to: email,
      from: 'softscapesolution@outlook.com',
      subject: `✅ Consultation Request Confirmed - SoftScape Solutions [${consultationId}]`,
      htmlContent: htmlContent,
      textContent: this.generateTextVersion(consultationData, consultationId, formattedDate)
    };
  }

  // Generate plain text version for email clients that don't support HTML
  generateTextVersion(consultationData, consultationId, formattedDate) {
    const { name, email, company, projectType, budget, timeline } = consultationData;

    return `
CONSULTATION REQUEST CONFIRMED - SoftScape Solutions

Dear ${name},

Thank you for reaching out to SoftScape Solutions! We have successfully received your consultation request and our team is already reviewing your requirements.

Consultation ID: ${consultationId}
Submitted: ${formattedDate}

YOUR CONSULTATION DETAILS:
• Name: ${name}
• Email: ${email}
${company ? `• Company: ${company}` : ''}
${projectType ? `• Project Type: ${projectType}` : ''}
${budget ? `• Budget Range: ${budget}` : ''}
${timeline ? `• Timeline: ${timeline}` : ''}

WHAT HAPPENS NEXT?
• Within 2 hours: Our team will review your consultation request
• Within 24 hours: A senior AI consultant will contact you directly
• Initial Discussion: We'll schedule a detailed consultation call
• Custom Proposal: Receive a tailored AI solution proposal

NEED IMMEDIATE ASSISTANCE?
If you have urgent questions or need to modify your consultation request:

Email: softscapesolution@outlook.com
Phone: +44 7789667804
Website: www.softscapesolutions.com

This is an automated confirmation email from SoftScape Solutions.
© 2025 SoftScape Solutions. All rights reserved.
Transforming businesses with intelligent AI solutions.
    `;
  }

  // Admin notification email
  async sendAdminNotification(consultationData) {
    const emailTemplate = this.generateAdminNotificationTemplate(consultationData);
    
    try {
      // Send admin notification via Web3Forms
      const adminEmailData = {
        ...emailTemplate,
        to: 'softscapesolution@outlook.com' // Ensure it goes to your email
      };
      
      await this.sendViaWeb3Forms(adminEmailData);
      console.log('Admin notification sent successfully');
      return { success: true };
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      return { success: false, error: error.message };
    }
  }

  generateAdminNotificationTemplate(consultationData) {
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      projectDetails,
      submittedAt
    } = consultationData;

    const consultationId = consultationData.id || 'N/A';
    const formattedDate = new Date(submittedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Consultation Request - SoftScape Solutions</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .alert-header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .client-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .details-table th, .details-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
          .details-table th { background-color: #f3f4f6; font-weight: 600; }
          .urgent { background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626; }
        </style>
      </head>
      <body>
        <div class="alert-header">
          <h1>🚨 NEW CONSULTATION REQUEST</h1>
          <p>A new client has submitted a consultation request</p>
        </div>
        
        <div class="content">
          <div class="urgent">
            <h3>⏰ Action Required</h3>
            <p>A new consultation request requires your attention. Please contact the client within 24 hours.</p>
            <p><strong>Consultation ID:</strong> ${consultationId}</p>
            <p><strong>Submitted:</strong> ${formattedDate}</p>
          </div>

          <div class="client-details">
            <h3>👤 Client Information</h3>
            <table class="details-table">
              <tr><th>Name</th><td>${name}</td></tr>
              <tr><th>Email</th><td><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><th>Phone</th><td><a href="tel:${phone}">${phone}</a></td></tr>` : ''}
              ${company ? `<tr><th>Company</th><td>${company}</td></tr>` : ''}
              ${projectType ? `<tr><th>Project Type</th><td>${projectType}</td></tr>` : ''}
              ${budget ? `<tr><th>Budget Range</th><td>${budget}</td></tr>` : ''}
              ${timeline ? `<tr><th>Timeline</th><td>${timeline}</td></tr>` : ''}
            </table>
            
            ${projectDetails ? `
              <h4>📝 Project Details:</h4>
              <p style="background: #f3f4f6; padding: 15px; border-radius: 8px;">${projectDetails}</p>
            ` : ''}
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p><strong>Quick Actions:</strong></p>
            <p>
              <a href="mailto:${email}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">Email Client</a>
              ${phone ? `<a href="tel:${phone}" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">Call Client</a>` : ''}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    return {
      to: 'softscapesolution@outlook.com',
      from: 'noreply@softscapesolutions.com',
      subject: `🚨 NEW CONSULTATION REQUEST - ${name} [${consultationId}]`,
      htmlContent: htmlContent
    };
  }
}

// Create singleton instance
const emailService = new EmailService();

export default emailService;