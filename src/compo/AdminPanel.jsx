import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { LogOut, Shield, Settings, Users, BarChart3, GitBranch, Server } from 'lucide-react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminUserManagement from './AdminUserManagement';
import ProjectManagement from './ProjectManagement';
import GitHubManagement from './GitHubManagement';
import consultationStorage from '../utils/consultationStorage';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'users', 'projects', 'github'

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = () => {
      const isLoggedInSession = sessionStorage.getItem('admin_logged_in');
      const loginTime = sessionStorage.getItem('admin_login_time');
      const adminId = sessionStorage.getItem('admin_user_id');
      
      if (isLoggedInSession === 'true' && loginTime && adminId) {
        // Check if session is still valid (24 hours)
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          const admin = consultationStorage.getAdminById(adminId);
          if (admin && admin.isActive) {
            setCurrentAdmin(admin);
            setIsLoggedIn(true);
          } else {
            handleLogout();
          }
        } else {
          // Session expired, clear storage
          handleLogout();
        }
      }
      
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleLogin = (adminData) => {
    if (adminData) {
      setCurrentAdmin(adminData);
      setIsLoggedIn(true);
      // Store admin info in session
      sessionStorage.setItem('admin_user_id', adminData.id);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_login_time');
    sessionStorage.removeItem('admin_user_id');
    setIsLoggedIn(false);
    setCurrentAdmin(null);
    setActiveTab('dashboard');
  };

  const formatLoginTime = () => {
    const loginTime = sessionStorage.getItem('admin_login_time');
    if (loginTime) {
      return new Date(loginTime).toLocaleString();
    }
    return '';
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner-large"></div>
        <p>Loading admin panel...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="admin-panel">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <Shield className="w-6 h-6 text-blue-600" />
          <h1 className="admin-title">SoftScape Admin Panel</h1>
        </div>
        
        <div className="admin-header-right">
          <div className="admin-session-info">
            <span className="session-text">
              Welcome, {currentAdmin?.name || 'Admin'}
            </span>
            <span className="session-text">
              Logged in since {formatLoginTime()}
            </span>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="logout-button"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-navigation">
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </button>
          
          <button
            className={`nav-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <GitBranch className="w-4 h-4 mr-2" />
            Projects & Repos
          </button>
          
          {currentAdmin?.role === 'super_admin' && (
            <button
              className={`nav-tab ${activeTab === 'github' ? 'active' : ''}`}
              onClick={() => setActiveTab('github')}
            >
              <Server className="w-4 h-4 mr-2" />
              GitHub Management
            </button>
          )}
          
          {currentAdmin?.role === 'super_admin' && (
            <button
              className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Users className="w-4 h-4 mr-2" />
              User Management
            </button>
          )}
        </div>
      </div>

      {/* Admin Content */}
      <div className="admin-content">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'projects' && <ProjectManagement />}
        {activeTab === 'github' && currentAdmin?.role === 'super_admin' && (
          <GitHubManagement currentAdmin={currentAdmin} />
        )}
        {activeTab === 'users' && currentAdmin?.role === 'super_admin' && (
          <AdminUserManagement currentAdmin={currentAdmin} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;