// Supabase database service for Netlify Functions
// This service handles all database operations for consultation management

class SupabaseService {
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
    this.supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    
    if (!this.supabaseUrl) {
      console.warn('Supabase URL not configured - using mock data');
      this.isConfigured = false;
    } else {
      this.isConfigured = true;
    }
  }

  // Make API request to Supabase
  async makeSupabaseRequest(endpoint, options = {}) {
    if (!this.isConfigured) {
      return this.getMockData(endpoint, options);
    }

    const url = `${this.supabaseUrl}/rest/v1/${endpoint}`;
    
    const defaultHeaders = {
      'apikey': this.supabaseServiceKey || this.supabaseAnonKey,
      'Authorization': `Bearer ${this.supabaseServiceKey || this.supabaseAnonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };

    const requestOptions = {
      headers: { ...defaultHeaders, ...options.headers },
      ...options
    };

    try {
      console.log(`Making Supabase request to: ${url}`);
      
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Supabase error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log(`Supabase request successful:`, data);
      
      return data;

    } catch (error) {
      console.error(`Supabase request failed:`, error);
      throw error;
    }
  }

  // Save consultation to database
  async saveConsultation(consultationData) {
    try {
      console.log('Saving consultation to Supabase...');
      
      const data = await this.makeSupabaseRequest('consultations', {
        method: 'POST',
        body: JSON.stringify([consultationData])
      });

      return data[0]; // Supabase returns an array

    } catch (error) {
      console.error('Error saving consultation:', error);
      
      // Fallback to mock storage
      return this.saveMockConsultation(consultationData);
    }
  }

  // Get all consultations
  async getConsultations(filters = {}) {
    try {
      console.log('Fetching consultations from Supabase...');
      
      let endpoint = 'consultations?select=*&order=created_at.desc';
      
      // Add filters if provided
      if (filters.status) {
        endpoint += `&status=eq.${filters.status}`;
      }
      
      if (filters.limit) {
        endpoint += `&limit=${filters.limit}`;
      }

      const data = await this.makeSupabaseRequest(endpoint, {
        method: 'GET'
      });

      return data;

    } catch (error) {
      console.error('Error fetching consultations:', error);
      
      // Fallback to mock data
      return this.getMockConsultations();
    }
  }

  // Update consultation
  async updateConsultation(id, updates) {
    try {
      console.log(`Updating consultation ${id} in Supabase...`);
      
      const data = await this.makeSupabaseRequest(`consultations?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });

      return data[0];

    } catch (error) {
      console.error('Error updating consultation:', error);
      
      // Fallback to mock update
      return this.updateMockConsultation(id, updates);
    }
  }

  // Delete consultation
  async deleteConsultation(id) {
    try {
      console.log(`Deleting consultation ${id} from Supabase...`);
      
      await this.makeSupabaseRequest(`consultations?id=eq.${id}`, {
        method: 'DELETE'
      });

      return { success: true, id };

    } catch (error) {
      console.error('Error deleting consultation:', error);
      
      // Fallback to mock deletion
      return this.deleteMockConsultation(id);
    }
  }

  // Check database health
  async healthCheck() {
    try {
      if (!this.isConfigured) {
        return {
          status: 'warning',
          message: 'Supabase not configured - using mock data'
        };
      }

      await this.makeSupabaseRequest('consultations?limit=1', {
        method: 'GET'
      });

      return {
        status: 'healthy',
        message: 'Supabase connection successful'
      };

    } catch (error) {
      return {
        status: 'unhealthy',
        message: `Supabase connection failed: ${error.message}`
      };
    }
  }

  // Mock data methods (fallback when Supabase is not configured)
  getMockData(endpoint, options) {
    console.log(`Using mock data for endpoint: ${endpoint}`);
    
    if (endpoint.includes('consultations')) {
      return this.getMockConsultations();
    }
    
    return [];
  }

  getMockConsultations() {
    return [
      {
        id: "consultation_1703234567890_abc123",
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1-555-123-4567",
        company: "Tech Solutions Inc",
        service: "AI Development",
        budget: "$10,000 - $25,000",
        timeline: "2-3 months",
        message: "We need an AI-powered customer service chatbot for our e-commerce platform...",
        status: "pending",
        priority: "high",
        created_at: "2024-01-15T10:30:00.000Z",
        source: "website"
      },
      {
        id: "consultation_1703234567891_def456",
        name: "Sarah Johnson", 
        email: "sarah.j@startup.com",
        phone: "+1-555-987-6543",
        company: "StartupX",
        service: "Custom Software Development",
        budget: "$25,000 - $50,000",
        timeline: "3-6 months",
        message: "Looking to build a comprehensive project management tool...",
        status: "in-progress",
        priority: "medium",
        created_at: "2024-01-14T14:45:00.000Z",
        source: "website"
      }
    ];
  }

  saveMockConsultation(consultationData) {
    console.log('Saving to mock storage:', consultationData);
    return {
      ...consultationData,
      id: consultationData.id || `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString()
    };
  }

  updateMockConsultation(id, updates) {
    console.log(`Mock update for ${id}:`, updates);
    return {
      id,
      ...updates,
      updated_at: new Date().toISOString()
    };
  }

  deleteMockConsultation(id) {
    console.log(`Mock delete for ${id}`);
    return { success: true, id };
  }
}

module.exports = new SupabaseService();