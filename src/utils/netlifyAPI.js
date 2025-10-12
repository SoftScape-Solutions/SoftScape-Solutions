// API service for Netlify Functions integration
class NetlifyAPIService {
  constructor() {
    // Use environment variables for API base URL
    this.baseURL = import.meta.env.VITE_API_BASE_URL || '/.netlify/functions';
    this.functionsURL = import.meta.env.VITE_NETLIFY_FUNCTIONS_URL || '/.netlify/functions';
  }

  // Generic API call method with error handling
  async makeAPICall(endpoint, options = {}) {
    const url = `${this.functionsURL}/${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const requestOptions = { ...defaultOptions, ...options };

    try {
      console.log(`Making API call to: ${url}`, requestOptions);
      
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP ${response.status}`);
      }

      console.log(`API call successful:`, data);
      return data;

    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      throw new Error(error.message || 'Network error occurred');
    }
  }

  // Submit consultation form
  async submitConsultation(consultationData) {
    try {
      console.log('Submitting consultation via Netlify Functions...');
      
      const response = await this.makeAPICall('submit-consultation', {
        method: 'POST',
        body: JSON.stringify(consultationData)
      });

      console.log('Consultation submitted successfully:', response);
      return response;

    } catch (error) {
      console.error('Consultation submission failed:', error);
      throw error;
    }
  }

  // Admin authentication
  async authenticateAdmin(credentials) {
    try {
      console.log('Authenticating admin via Netlify Functions...');
      
      const response = await this.makeAPICall('admin-auth', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });

      console.log('Admin authentication successful:', response);
      return response;

    } catch (error) {
      console.error('Admin authentication failed:', error);
      throw error;
    }
  }

  // Get consultations for admin dashboard
  async getConsultations(authToken) {
    try {
      console.log('Fetching consultations via Netlify Functions...');
      
      const response = await this.makeAPICall('get-consultations', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log('Consultations fetched successfully:', response);
      return response;

    } catch (error) {
      console.error('Failed to fetch consultations:', error);
      throw error;
    }
  }

  // Update consultation status
  async updateConsultation(consultationId, updates, authToken) {
    try {
      console.log(`Updating consultation ${consultationId}...`);
      
      const response = await this.makeAPICall('manage-consultations', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          id: consultationId,
          ...updates
        })
      });

      console.log('Consultation updated successfully:', response);
      return response;

    } catch (error) {
      console.error('Failed to update consultation:', error);
      throw error;
    }
  }

  // Delete consultation
  async deleteConsultation(consultationId, authToken) {
    try {
      console.log(`Deleting consultation ${consultationId}...`);
      
      const response = await this.makeAPICall('manage-consultations', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          id: consultationId
        })
      });

      console.log('Consultation deleted successfully:', response);
      return response;

    } catch (error) {
      console.error('Failed to delete consultation:', error);
      throw error;
    }
  }

  // Send test email
  async sendTestEmail(emailData, authToken) {
    try {
      console.log('Sending test email...');
      
      const response = await this.makeAPICall('send-email', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(emailData)
      });

      console.log('Test email sent successfully:', response);
      return response;

    } catch (error) {
      console.error('Failed to send test email:', error);
      throw error;
    }
  }

  // Health check for functions
  async healthCheck() {
    try {
      const response = await this.makeAPICall('health-check', {
        method: 'GET'
      });

      return response;

    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
const apiService = new NetlifyAPIService();

export default apiService;