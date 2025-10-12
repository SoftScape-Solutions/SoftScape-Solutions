// Netlify Function for admin authentication
exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
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
    const { username, password } = JSON.parse(event.body);

    // Validate input
    if (!username || !password) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Username and password are required' 
        })
      };
    }

    // Admin credentials (in production, use environment variables and hashed passwords)
    const ADMIN_CREDENTIALS = {
      admin: process.env.ADMIN_PASSWORD || 'SoftScape2024!',
      manager: process.env.MANAGER_PASSWORD || 'Manager2024!',
      viewer: process.env.VIEWER_PASSWORD || 'Viewer2024!'
    };

    // Check credentials and determine role
    let role = null;
    if (username === 'admin' && password === ADMIN_CREDENTIALS.admin) {
      role = 'admin';
    } else if (username === 'manager' && password === ADMIN_CREDENTIALS.manager) {
      role = 'manager';
    } else if (username === 'viewer' && password === ADMIN_CREDENTIALS.viewer) {
      role = 'viewer';
    }

    if (!role) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Invalid credentials' 
        })
      };
    }

    // Generate simple token (in production, use JWT)
    const token = Buffer.from(`${username}:${role}:${Date.now()}`).toString('base64');

    // Define permissions based on role
    const permissions = getPermissions(role);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        token,
        user: {
          username,
          role,
          permissions,
          loginTime: new Date().toISOString()
        }
      })
    };

  } catch (error) {
    console.error('Authentication error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Authentication failed'
      })
    };
  }
};

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