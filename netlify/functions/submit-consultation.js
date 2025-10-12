// Netlify Function for handling consultation form submissions
const supabaseService = require('./supabaseService');

exports.handler = async (event, context) => {
  // Only allow POST method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, phone, company, service, budget, message, timeline } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !service) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Missing required fields: name, email, and service are required' 
        })
      };
    }

    // Create consultation data
    const consultationData = {
      id: `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone: phone || '',
      company: company || '',
      service,
      budget: budget || '',
      message: message || '',
      timeline: timeline || '',
      status: 'pending',
      priority: 'medium',
      created_at: new Date().toISOString(),
      source: 'website'
    };

    // Save to database via Supabase service
    const savedConsultation = await supabaseService.saveConsultation(consultationData);

    // Send confirmation email using Web3Forms
    const emailResponse = await sendConsultationEmail(consultationData);

    if (!emailResponse.success) {
      console.error('Email sending failed:', emailResponse.error);
      // Don't fail the entire request if email fails
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Consultation request submitted successfully',
        consultationId: savedConsultation.id,
        data: savedConsultation
      })
    };

  } catch (error) {
    console.error('Error processing consultation:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to process consultation request'
      })
    };
  }
};

// Email sending function using Web3Forms
async function sendConsultationEmail(consultationData) {
  try {
    const web3formsKey = process.env.WEB3FORMS_API_KEY;
    
    if (!web3formsKey) {
      throw new Error('Web3Forms API key not configured');
    }

    const emailData = {
      access_key: web3formsKey,
      subject: `New Consultation Request - ${consultationData.service}`,
      from_name: "SoftScape Solutions Website",
      from_email: "noreply@softscapesolutions.com",
      to_email: process.env.CUSTOMER_SERVICE_EMAIL || "softscapesolution@outlook.com",
      message: `
New consultation request received:

Name: ${consultationData.name}
Email: ${consultationData.email}
Phone: ${consultationData.phone}
Company: ${consultationData.company}
Service: ${consultationData.service}
Budget: ${consultationData.budget}
Timeline: ${consultationData.timeline}
Message: ${consultationData.message}

Submitted: ${consultationData.createdAt}
Consultation ID: ${consultationData.id}
      `
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();
    
    if (result.success) {
      return { success: true };
    } else {
      throw new Error(result.message || 'Email sending failed');
    }

  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}