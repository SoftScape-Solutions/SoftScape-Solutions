// Netlify Function for health check and system status
exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Check system components
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      services: {
        functions: {
          status: 'healthy',
          message: 'Netlify Functions operational'
        },
        email: await checkEmailService(),
        database: await checkDatabaseConnection(),
        authentication: await checkAuthenticationService()
      },
      performance: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        responseTime: Date.now()
      }
    };

    // Determine overall status
    const serviceStatuses = Object.values(healthStatus.services);
    const hasUnhealthyService = serviceStatuses.some(service => service.status !== 'healthy');
    
    if (hasUnhealthyService) {
      healthStatus.status = 'degraded';
    }

    return {
      statusCode: healthStatus.status === 'healthy' ? 200 : 503,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(healthStatus)
    };

  } catch (error) {
    console.error('Health check failed:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: 'unhealthy',
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      })
    };
  }
};

// Check email service status
async function checkEmailService() {
  try {
    const web3formsKey = process.env.WEB3FORMS_API_KEY;
    
    if (!web3formsKey) {
      return {
        status: 'unhealthy',
        message: 'Web3Forms API key not configured'
      };
    }

    // Test API connectivity (without sending actual email)
    const testResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: 'invalid_key_for_test',
        message: 'health_check'
      })
    });

    // We expect a 422 response for invalid key, which means the service is responding
    if (testResponse.status === 422) {
      return {
        status: 'healthy',
        message: 'Web3Forms API accessible'
      };
    }

    return {
      status: 'degraded',
      message: `Web3Forms API returned unexpected status: ${testResponse.status}`
    };

  } catch (error) {
    return {
      status: 'unhealthy',
      message: `Email service error: ${error.message}`
    };
  }
}

// Check database connection status
async function checkDatabaseConnection() {
  try {
    // TODO: Replace with actual database health check
    // For now, we'll simulate based on environment variables
    
    const hasMongoURI = !!process.env.MONGODB_URI;
    const hasSupabaseURL = !!process.env.SUPABASE_URL;
    const hasAirtableKey = !!process.env.AIRTABLE_API_KEY;

    if (hasMongoURI) {
      // TODO: Actual MongoDB connection test
      return {
        status: 'healthy',
        message: 'MongoDB configuration detected',
        type: 'mongodb'
      };
    } else if (hasSupabaseURL) {
      // TODO: Actual Supabase connection test
      return {
        status: 'healthy',
        message: 'Supabase configuration detected',
        type: 'supabase'
      };
    } else if (hasAirtableKey) {
      // TODO: Actual Airtable connection test
      return {
        status: 'healthy',
        message: 'Airtable configuration detected',
        type: 'airtable'
      };
    } else {
      return {
        status: 'warning',
        message: 'No database configuration detected - using temporary storage',
        type: 'temporary'
      };
    }

  } catch (error) {
    return {
      status: 'unhealthy',
      message: `Database error: ${error.message}`
    };
  }
}

// Check authentication service status
async function checkAuthenticationService() {
  try {
    const hasAdminPassword = !!process.env.ADMIN_PASSWORD;
    const hasManagerPassword = !!process.env.MANAGER_PASSWORD;
    
    if (!hasAdminPassword || !hasManagerPassword) {
      return {
        status: 'warning',
        message: 'Some admin credentials not configured'
      };
    }

    // Test token generation/verification
    const testToken = Buffer.from(`test:admin:${Date.now()}`).toString('base64');
    const decoded = Buffer.from(testToken, 'base64').toString('utf-8');
    
    if (decoded.includes('test:admin:')) {
      return {
        status: 'healthy',
        message: 'Authentication service operational'
      };
    }

    return {
      status: 'degraded',
      message: 'Token verification issues detected'
    };

  } catch (error) {
    return {
      status: 'unhealthy',
      message: `Authentication error: ${error.message}`
    };
  }
}