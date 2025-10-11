import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
import consultationStorage from '../utils/consultationStorage';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate credentials
      if (!credentials.username || !credentials.password) {
        throw new Error('Please enter both username and password');
      }

      // Check credentials with storage service
      const adminData = consultationStorage.validateAdmin(credentials.username, credentials.password);
      
      if (adminData) {
        // Store login session
        sessionStorage.setItem('admin_logged_in', 'true');
        sessionStorage.setItem('admin_login_time', new Date().toISOString());
        sessionStorage.setItem('admin_user_id', adminData.id);
        
        // Call parent component's login handler with admin data
        onLogin(adminData);
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-wrapper">
        <Card className="admin-login-card">
          <CardHeader className="text-center">
            <div className="admin-login-icon">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Access the consultation management dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="admin-login-form">
              {error && (
                <div className="error-message">
                  <Lock className="w-4 h-4" />
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  <User className="w-4 h-4" />
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="form-input password-input"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Login to Dashboard
                  </>
                )}
              </Button>
            </form>

            <div className="login-footer">
              <div className="default-credentials">
                <h4>Default Credentials:</h4>
                <p><strong>Username:</strong> admin</p>
                <p><strong>Password:</strong> softscape2024</p>
                <small className="security-note">
                  ⚠️ Please change these credentials after first login
                </small>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;