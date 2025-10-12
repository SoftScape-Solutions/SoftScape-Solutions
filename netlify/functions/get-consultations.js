// Netlify Function for fetching consultations (Admin Dashboard)
const supabaseService = require('./supabaseService');

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
    // Verify authentication
    const authHeader = event.headers.authorization || event.headers.Authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Authentication required' })
      };
    }

    const token = authHeader.split(' ')[1];
    const userInfo = verifyToken(token);
    
    if (!userInfo) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Invalid authentication token' })
      };
    }

    // Check permissions
    if (!userInfo.permissions.includes('view_consultations')) {
      return {
        statusCode: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Insufficient permissions' })
      };
    }

    // Get consultations from database via Supabase service
    const consultations = await supabaseService.getConsultations();

    // Filter data based on user role
    const filteredConsultations = filterConsultationsByRole(consultations, userInfo.role);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        consultations: filteredConsultations,
        total: filteredConsultations.length,
        user: {
          username: userInfo.username,
          role: userInfo.role
        }
      })
    };

  } catch (error) {
    console.error('Error fetching consultations:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to fetch consultations'
      })
    };
  }
};

// Token verification function
function verifyToken(token) {
  try {
    // Simple token verification (in production, use JWT)
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [username, role, timestamp] = decoded.split(':');
    
    // Check if token is still valid (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (tokenAge > maxAge) {
      return null;
    }

    // Get permissions for role
    const permissions = getPermissions(role);
    
    return {
      username,
      role,
      permissions,
      tokenAge
    };
    
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Get permissions based on role
function getPermissions(role) {
  const permissions = {
    admin: [
      'view_consultations',
      'edit_consultations', 
      'delete_consultations',
      'manage_users',
      'view_analytics',
      'system_settings',
      'export_data'
    ],
    manager: [
      'view_consultations',
      'edit_consultations',
      'view_analytics',
      'export_data'
    ],
    viewer: [
      'view_consultations'
    ]
  };

  return permissions[role] || [];
}

// Remove old mock functions since we're using supabaseService now

// Filter consultations based on user role
function filterConsultationsByRole(consultations, role) {
  switch (role) {
    case 'admin':
      // Admin can see all consultations
      return consultations;
      
    case 'manager':
      // Manager can see all except sensitive admin data
      return consultations.map(consultation => ({
        ...consultation,
        // Remove sensitive fields if needed
      }));
      
    case 'viewer':
      // Viewer can only see basic consultation info
      return consultations.map(consultation => ({
        id: consultation.id,
        name: consultation.name,
        company: consultation.company,
        service: consultation.service,
        status: consultation.status,
        createdAt: consultation.createdAt,
        // Remove sensitive contact info
      }));
      
    default:
      return [];
  }
}