import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Shield, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  CheckCircle2,
  XCircle,
  Crown,
  User,
  Settings,
  UserCheck,
  UserCog,
  Code,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import consultationStorage from "../../utils/consultationStorage";
import './AdminUserManagement.css';

const AdminUserManagement = ({ currentAdmin }) => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit'
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showAuditLogs, setShowAuditLogs] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    role: 'viewer',
    department: '',
    skills: [],
    maxWorkload: 5
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = () => {
    try {
      const adminList = consultationStorage.getAllAdmins();
      setAdmins(adminList);
    } catch (error) {
      console.error('Error loading admins:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      email: '',
      name: '',
      role: 'viewer',
      department: '',
      skills: [],
      maxWorkload: 5
    });
    setError('');
    setShowPassword(false);
  };

  const openAddModal = () => {
    resetForm();
    setModalType('add');
    setSelectedAdmin(null);
    setShowModal(true);
  };

  const openEditModal = (admin) => {
    setFormData({
      username: admin.username,
      password: '', // Don't pre-fill password for security
      email: admin.email,
      name: admin.name,
      role: admin.role,
      department: admin.department || '',
      skills: admin.skills || [],
      maxWorkload: admin.maxWorkload || 5
    });
    setModalType('edit');
    setSelectedAdmin(admin);
    setError('');
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({
      ...prev,
      skills: skillsArray
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Strict role hierarchy validation - only super admins can create accounts
      if (currentAdmin.role !== 'super_admin') {
        throw new Error('Only Super Admins can create user accounts');
      }
      
      // Validation
      if (!formData.username || !formData.email || !formData.name) {
        throw new Error('Please fill in all required fields');
      }

      if (modalType === 'add' && !formData.password) {
        throw new Error('Password is required for new admin users');
      }

      if (modalType === 'add') {
        // Check if creating super admin and use enhanced method
        if (formData.role === 'super_admin') {
          // Confirm super admin creation
          const confirmCreate = window.confirm(
            '⚠️ SECURITY WARNING ⚠️\n\n' +
            'You are about to create a Super Administrator account.\n' +
            'Super Admins have full system access and can:\n' +
            '• Create other Super Admins\n' +
            '• Manage all users and data\n' +
            '• Access audit logs\n' +
            '• Delete accounts\n\n' +
            'Are you sure you want to proceed?'
          );
          
          if (!confirmCreate) {
            setLoading(false);
            return;
          }
          
          // Use enhanced super admin creation method
          await consultationStorage.addSuperAdmin(formData, currentAdmin.id);
        } else {
          // Add regular admin
          await consultationStorage.addAdmin(formData, currentAdmin.id);
        }
      } else {
        // Update existing admin
        const updates = { ...formData };
        if (!formData.password) {
          delete updates.password; // Don't update password if not provided
        }
        await consultationStorage.updateAdmin(selectedAdmin.id, updates, currentAdmin.id);
      }

      loadAdmins();
      setShowModal(false);
      resetForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin user? This action cannot be undone.')) {
      try {
        await consultationStorage.deleteAdmin(adminId, currentAdmin.id);
        loadAdmins();
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleToggleStatus = async (adminId) => {
    try {
      await consultationStorage.toggleAdminStatus(adminId, currentAdmin.id);
      loadAdmins();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      super_admin: { 
        color: 'bg-purple-100 text-purple-800', 
        icon: Crown, 
        label: 'Super Admin' 
      },
      admin: { 
        color: 'bg-blue-100 text-blue-800', 
        icon: Shield, 
        label: 'Manager' 
      },
      team_lead: { 
        color: 'bg-orange-100 text-orange-800', 
        icon: UserCheck, 
        label: 'Team Lead' 
      },
      executive: { 
        color: 'bg-indigo-100 text-indigo-800', 
        icon: Briefcase, 
        label: 'Executive' 
      },
      developer: { 
        color: 'bg-green-100 text-green-800', 
        icon: Code, 
        label: 'Developer' 
      },
      viewer: { 
        color: 'bg-gray-100 text-gray-800', 
        icon: Eye, 
        label: 'Viewer' 
      }
    };

    const config = roleConfig[role] || roleConfig.admin;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (isActive) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isActive ? (
          <>
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Active
          </>
        ) : (
          <>
            <XCircle className="w-3 h-3 mr-1" />
            Inactive
          </>
        )}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canModifyUser = (targetAdmin) => {
    // Super admin can modify anyone except themselves for deletion
    if (currentAdmin.role === 'super_admin') return true;
    // Regular admin can only modify themselves
    return currentAdmin.id === targetAdmin.id;
  };

  const canDeleteUser = (targetAdmin) => {
    return currentAdmin.role === 'super_admin' && currentAdmin.id !== targetAdmin.id;
  };

  const loadAuditLogs = () => {
    try {
      if (currentAdmin.role === 'super_admin') {
        const logs = consultationStorage.getAuditLogs(currentAdmin.id);
        setAuditLogs(logs);
        setShowAuditLogs(true);
      }
    } catch (error) {
      setError('Failed to load audit logs: ' + error.message);
    }
  };

  return (
    <div className="admin-user-management">
      {/* Header */}
      <div className="management-header">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600">Manage team members and roles (Super Admin Access Only)</p>
        </div>
        
        {currentAdmin.role === 'super_admin' && (
          <div className="flex gap-2">
            <Button onClick={loadAuditLogs} variant="outline" className="audit-logs-button">
              <Shield className="w-4 h-4 mr-2" />
              Audit Logs
            </Button>
            <Button onClick={openAddModal} className="add-admin-button">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        )}
      </div>

      {/* Admin Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({admins.length})</CardTitle>
          <CardDescription>
            Manage user accounts with different permission levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          {admins.length === 0 ? (
            <div className="empty-state">
              <Users className="w-12 h-12 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">No admin users found</h3>
              <p className="text-gray-500">Add your first admin user to get started.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Workload</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td>
                        <div className="user-info">
                          <div className="user-name">
                            {admin.name}
                            {admin.id === currentAdmin.id && (
                              <span className="current-user-badge">You</span>
                            )}
                          </div>
                          <div className="username">@{admin.username}</div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <div className="email">{admin.email}</div>
                        </div>
                      </td>
                      <td>{getRoleBadge(admin.role)}</td>
                      <td>
                        <div className="department-info">
                          {admin.department || 'Not Assigned'}
                        </div>
                      </td>
                      <td>
                        <div className="workload-info">
                          <span className="workload-value">
                            {admin.workload || 0}/{admin.maxWorkload || 5}
                          </span>
                          <div className="workload-bar">
                            <div 
                              className="workload-progress" 
                              style={{ 
                                width: `${((admin.workload || 0) / (admin.maxWorkload || 5)) * 100}%`,
                                backgroundColor: ((admin.workload || 0) / (admin.maxWorkload || 5)) > 0.8 ? '#ef4444' : '#22c55e'
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>{getStatusBadge(admin.isActive)}</td>
                      <td>{formatDate(admin.lastLogin)}</td>
                      <td>{formatDate(admin.createdAt)}</td>
                      <td>
                        <div className="action-buttons">
                          {canModifyUser(admin) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditModal(admin)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          )}
                          
                          {currentAdmin.role === 'super_admin' && admin.id !== currentAdmin.id && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleStatus(admin.id)}
                              className={admin.isActive ? 'text-red-600' : 'text-green-600'}
                            >
                              {admin.isActive ? <XCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                            </Button>
                          )}
                          
                          {canDeleteUser(admin) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteAdmin(admin.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Admin Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {modalType === 'add' ? 'Add New Team Member' : 'Edit Team Member'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                ×
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              {error && (
                <div className="error-message">
                  <XCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username *</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">
                    Password {modalType === 'add' ? '*' : '(leave blank to keep current)'}
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={modalType === 'add' ? 'Enter password' : 'Leave blank to keep current'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Department</option>
                    <option value="Management">Management</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Business Analysis">Business Analysis</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="maxWorkload">Max Project Workload</label>
                  <input
                    type="number"
                    id="maxWorkload"
                    name="maxWorkload"
                    value={formData.maxWorkload}
                    onChange={handleInputChange}
                    min="1"
                    max="20"
                    placeholder="Maximum concurrent projects"
                  />
                  <small className="help-text">Maximum number of projects this user can handle simultaneously</small>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="skills">Skills (comma-separated)</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills}
                  onChange={handleSkillsChange}
                  placeholder="React, Node.js, Project Management, etc."
                />
                <small className="help-text">Enter skills separated by commas</small>
              </div>

              {currentAdmin.role === 'super_admin' && (
                  <div className="form-group">
                    <label htmlFor="role">Role *</label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    >
                      {/* Super admin can create any role including other super admins */}
                      <option value="super_admin">Super Administrator</option>
                      <option value="admin">Manager</option>
                      <option value="team_lead">Team Lead</option>
                      <option value="executive">Executive</option>
                      <option value="developer">Developer</option>
                      <option value="viewer">Viewer</option>
                    </select>
                    <small className="help-text">
                      {formData.role === 'super_admin' 
                        ? '⚠️ Super Administrators have full system access and can create other super admins. Use with caution!'
                        : 'Only Super Admins can create user accounts. Choose the appropriate role for the user.'}
                    </small>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      {modalType === 'add' ? 'Adding...' : 'Updating...'}
                    </>
                  ) : (
                    <>
                      {modalType === 'add' ? (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Add Admin User
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Update Admin User
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit Logs Modal */}
      {showAuditLogs && currentAdmin.role === 'super_admin' && (
        <div className="modal-overlay">
          <div className="modal-content audit-modal">
            <div className="modal-header">
              <h3>🔐 Security Audit Logs</h3>
              <button onClick={() => setShowAuditLogs(false)} className="close-button">×</button>
            </div>
            
            <div className="modal-body">
              {auditLogs.length === 0 ? (
                <p className="text-gray-500">No audit logs available.</p>
              ) : (
                <div className="audit-logs-list">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="audit-log-entry">
                      <div className="audit-header">
                        <span className="audit-action">{log.action}</span>
                        <span className="audit-timestamp">{formatDate(log.timestamp)}</span>
                      </div>
                      <div className="audit-details">
                        <p><strong>Performed by:</strong> {log.createdBy} ({log.createdByEmail})</p>
                        {log.newAdminUsername && (
                          <p><strong>New Admin Created:</strong> {log.newAdminUsername} ({log.newAdminEmail})</p>
                        )}
                        <p><strong>IP Address:</strong> {log.ipAddress}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <Button onClick={() => setShowAuditLogs(false)} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;