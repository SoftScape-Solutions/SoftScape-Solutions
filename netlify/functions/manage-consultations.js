// Netlify Function for managing consultations (CRUD operations)
exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'PUT, DELETE, OPTIONS',
      },
      body: ''
    };
  }

  if (!['PUT', 'DELETE'].includes(event.httpMethod)) {
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

    const requestData = JSON.parse(event.body);
    const { id } = requestData;

    if (!id) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Consultation ID is required' })
      };
    }

    // Handle different HTTP methods
    if (event.httpMethod === 'PUT') {
      return await handleUpdateConsultation(id, requestData, userInfo);
    } else if (event.httpMethod === 'DELETE') {
      return await handleDeleteConsultation(id, userInfo);
    }

  } catch (error) {
    console.error('Error managing consultation:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to manage consultation'
      })
    };
  }
};

// Handle consultation update
async function handleUpdateConsultation(id, updateData, userInfo) {
  try {
    // Check permissions
    if (!userInfo.permissions.includes('edit_consultations')) {
      return {
        statusCode: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Insufficient permissions to edit consultations' })
      };
    }

    // Validate update data
    const allowedFields = [
      'status', 'priority', 'assignedTo', 'notes', 
      'followUpDate', 'estimatedValue', 'tags'
    ];
    
    const validUpdates = {};
    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key) && updateData[key] !== undefined) {
        validUpdates[key] = updateData[key];
      }
    });

    if (Object.keys(validUpdates).length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'No valid fields to update' })
      };
    }

    // Add metadata
    validUpdates.lastUpdated = new Date().toISOString();
    validUpdates.lastUpdatedBy = userInfo.username;

    // TODO: Update in database
    const updatedConsultation = await updateConsultationInStorage(id, validUpdates);

    if (!updatedConsultation) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Consultation not found' })
      };
    }

    // Log the update for audit trail
    await logActivity({
      action: 'consultation_updated',
      consultationId: id,
      user: userInfo.username,
      changes: validUpdates,
      timestamp: new Date().toISOString()
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Consultation updated successfully',
        consultation: updatedConsultation
      })
    };

  } catch (error) {
    console.error('Error updating consultation:', error);
    throw error;
  }
}

// Handle consultation deletion
async function handleDeleteConsultation(id, userInfo) {
  try {
    // Check permissions
    if (!userInfo.permissions.includes('delete_consultations')) {
      return {
        statusCode: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Insufficient permissions to delete consultations' })
      };
    }

    // TODO: Delete from database
    const deletedConsultation = await deleteConsultationFromStorage(id);

    if (!deletedConsultation) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Consultation not found' })
      };
    }

    // Log the deletion for audit trail
    await logActivity({
      action: 'consultation_deleted',
      consultationId: id,
      user: userInfo.username,
      timestamp: new Date().toISOString()
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Consultation deleted successfully',
        deletedId: id
      })
    };

  } catch (error) {
    console.error('Error deleting consultation:', error);
    throw error;
  }
}

// Token verification function (same as in get-consultations.js)
function verifyToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [username, role, timestamp] = decoded.split(':');
    
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (tokenAge > maxAge) {
      return null;
    }

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

// Temporary storage functions (replace with database)
async function updateConsultationInStorage(id, updates) {
  try {
    // TODO: Replace with actual database update
    console.log(`Updating consultation ${id} with:`, updates);
    
    // Mock updated consultation
    return {
      id,
      ...updates,
      lastUpdated: updates.lastUpdated
    };
    
  } catch (error) {
    console.error('Error updating consultation in storage:', error);
    return null;
  }
}

async function deleteConsultationFromStorage(id) {
  try {
    // TODO: Replace with actual database deletion
    console.log(`Deleting consultation ${id}`);
    
    // Mock successful deletion
    return { id, deleted: true };
    
  } catch (error) {
    console.error('Error deleting consultation from storage:', error);
    return null;
  }
}

// Activity logging for audit trail
async function logActivity(activity) {
  try {
    // TODO: Replace with actual activity logging
    console.log('Activity logged:', activity);
    
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}