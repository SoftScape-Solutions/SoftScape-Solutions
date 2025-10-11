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
  Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import consultationStorage from '../utils/consultationStorage';
import './AdminUserManagement.css';

const AdminUserManagement = ({ currentAdmin }) => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit'
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    role: 'admin'
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
      role: 'admin'
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
      role: admin.role
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!formData.username || !formData.email || !formData.name) {
        throw new Error('Please fill in all required fields');
      }

      if (modalType === 'add' && !formData.password) {
        throw new Error('Password is required for new admin users');
      }

      if (modalType === 'add') {
        // Add new admin
        await consultationStorage.addAdmin(formData, currentAdmin.id);
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
        label: 'Admin' 
      },
      viewer: { 
        color: 'bg-green-100 text-green-800', 
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

  return (
    <div className="admin-user-management">
      {/* Header */}
      <div className="management-header">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin User Management</h2>
          <p className="text-gray-600">Manage administrator accounts and permissions</p>
        </div>
        
        {currentAdmin.role === 'super_admin' && (
          <Button onClick={openAddModal} className="add-admin-button">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Admin User
          </Button>
        )}
      </div>

      {/* Admin Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Administrator Accounts ({admins.length})</CardTitle>
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
                {modalType === 'add' ? 'Add New Admin User' : 'Edit Admin User'}
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
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super Admin</option>
                      <option value="viewer">Viewer</option>
                    </select>
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
    </div>
  );
};

export default AdminUserManagement;