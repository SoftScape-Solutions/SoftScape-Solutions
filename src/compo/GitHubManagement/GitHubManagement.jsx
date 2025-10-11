import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Shield, 
  GitBranch, 
  Users, 
  Trash2, 
  Eye, 
  Plus,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  Code,
  Activity,
  UserPlus,
  UserMinus,
  Key,
  Server
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import githubBackendService from "../../utils/githubBackendService";
import consultationStorage from "../../utils/consultationStorage";
import './GitHubManagement.css';

const GitHubManagement = ({ currentAdmin }) => {
  const [serviceStatus, setServiceStatus] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repoDetails, setRepoDetails] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTokenConfig, setShowTokenConfig] = useState(false);
  const [showRepoDetails, setShowRepoDetails] = useState(false);
  const [showAuditLogs, setShowAuditLogs] = useState(false);
  
  // Form states
  const [tokenForm, setTokenForm] = useState({ token: '', confirmRemove: false });
  const [collaboratorForm, setCollaboratorForm] = useState({ username: '', permission: 'push' });

  useEffect(() => {
    loadGitHubData();
  }, []);

  const loadGitHubData = async () => {
    try {
      setLoading(true);
      
      // Get service status
      const status = githubBackendService.getServiceStatus();
      setServiceStatus(status);
      
      // Load repositories if service is ready
      if (status.ready) {
        const repos = await githubBackendService.listOrganizationRepositories();
        setRepositories(repos);
      }
      
      // Load audit logs
      const logs = githubBackendService.getAuditLogs();
      setAuditLogs(logs.slice(-50)); // Show last 50 actions
      
    } catch (error) {
      console.error('Error loading GitHub data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigureToken = async (e) => {
    e.preventDefault();
    
    if (!tokenForm.token || tokenForm.token.trim() === '') {
      alert('Please enter a GitHub token');
      return;
    }
    
    try {
      setLoading(true);
      const result = await githubBackendService.configureOrganizationToken(
        tokenForm.token, 
        currentAdmin.id
      );
      
      if (result.success) {
        let message = 'GitHub organization token configured successfully!';
        
        if (result.warnings && result.warnings.length > 0) {
          message += '\n\nWarnings:\n' + result.warnings.join('\n');
        }
        
        if (!result.organizationAccess) {
          message += '\n\nNote: Limited organization access. You may need to:\n' +
                    '1. Be added to the SoftScape-Solutions organization\n' +
                    '2. Grant organization permissions to your token\n' +
                    '3. Contact the organization owner';
        }
        
        alert(message);
        setShowTokenConfig(false);
        setTokenForm({ token: '', confirmRemove: false });
        await loadGitHubData();
      } else {
        alert('Error configuring token:\n\n' + result.error + '\n\nPlease check:\n' +
              '1. Token is valid and not expired\n' +
              '2. Token has required permissions (repo, admin:org, user)\n' +
              '3. You have access to the GitHub account');
      }
    } catch (error) {
      alert('Error: ' + error.message + '\n\nPlease check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestToken = async () => {
    if (!tokenForm.token || tokenForm.token.trim() === '') {
      alert('Please enter a GitHub token to test');
      return;
    }
    
    try {
      setLoading(true);
      const validation = await githubBackendService.validateToken(tokenForm.token.trim());
      
      if (validation.valid) {
        let message = '✅ Token is valid!\n\n';
        message += `User: ${validation.user.login}\n`;
        message += `Organization Access: ${validation.organizationAccess ? 'Yes' : 'No'}\n`;
        
        if (validation.warnings && validation.warnings.length > 0) {
          message += '\nWarnings:\n' + validation.warnings.join('\n');
        }
        
        if (validation.organizationError) {
          message += '\nOrganization Issue:\n' + validation.organizationError;
        }
        
        alert(message);
      } else {
        alert('❌ Token validation failed:\n\n' + validation.error);
      }
    } catch (error) {
      alert('❌ Test failed:\n\n' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveToken = async () => {
    if (!tokenForm.confirmRemove) {
      alert('Please confirm token removal by checking the confirmation box');
      return;
    }

    try {
      setLoading(true);
      const result = githubBackendService.removeOrganizationToken(currentAdmin.id);
      
      if (result.success) {
        alert('GitHub organization token removed successfully!');
        setShowTokenConfig(false);
        setTokenForm({ token: '', confirmRemove: false });
        await loadGitHubData();
      } else {
        alert('Error removing token: ' + result.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRepository = async (repo) => {
    try {
      setLoading(true);
      setSelectedRepo(repo);
      
      const details = await githubBackendService.getRepositoryDetails(repo.name);
      setRepoDetails(details);
      setShowRepoDetails(true);
    } catch (error) {
      console.error('Error loading repository details:', error);
      alert('Error loading repository details: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCollaborator = async (e) => {
    e.preventDefault();
    
    if (!selectedRepo || !collaboratorForm.username.trim()) return;

    try {
      setLoading(true);
      const results = await githubBackendService.addCollaborators(
        selectedRepo.name,
        [collaboratorForm],
        currentAdmin.id
      );
      
      const result = results[0];
      if (result.success) {
        alert(`Collaborator ${collaboratorForm.username} added successfully!`);
        setCollaboratorForm({ username: '', permission: 'push' });
        // Refresh repository details
        await handleViewRepository(selectedRepo);
      } else {
        alert('Error adding collaborator: ' + result.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCollaborator = async (username) => {
    if (!confirm(`Remove ${username} from ${selectedRepo.name}?`)) return;

    try {
      setLoading(true);
      const result = await githubBackendService.removeCollaborator(
        selectedRepo.name,
        username,
        currentAdmin.id
      );
      
      if (result.success) {
        alert(`Collaborator ${username} removed successfully!`);
        // Refresh repository details
        await handleViewRepository(selectedRepo);
      } else {
        alert('Error removing collaborator: ' + result.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRepository = async (repo) => {
    const confirmDelete = prompt(
      `To delete "${repo.name}", type "DELETE" to confirm:`
    );
    
    if (confirmDelete !== 'DELETE') {
      alert('Repository deletion cancelled');
      return;
    }

    try {
      setLoading(true);
      const result = await githubBackendService.deleteRepository(repo.name, currentAdmin.id);
      
      if (result.success) {
        alert(`Repository ${repo.name} deleted successfully!`);
        await loadGitHubData();
      } else {
        alert('Error deleting repository: ' + result.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRepoStatusColor = (repo) => {
    const daysSinceUpdate = (new Date() - new Date(repo.updatedAt)) / (1000 * 60 * 60 * 24);
    
    if (daysSinceUpdate < 1) return 'text-green-600';
    if (daysSinceUpdate < 7) return 'text-blue-600';
    if (daysSinceUpdate < 30) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (loading && !serviceStatus) {
    return (
      <div className="github-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading GitHub management...</p>
      </div>
    );
  }

  return (
    <div className="github-management">
      <div className="github-header">
        <div className="header-content">
          <h1>GitHub Organization Management</h1>
          <p>Manage repositories and organization settings</p>
        </div>
        <div className="header-actions">
          <Button onClick={() => setShowTokenConfig(true)} variant="outline">
            <Key className="w-4 h-4 mr-2" />
            Configure Token
          </Button>
          <Button onClick={() => setShowAuditLogs(true)} variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Audit Logs
          </Button>
        </div>
      </div>

      {/* Service Status */}
      <Card className="service-status-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            GitHub Service Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="status-grid">
            <div className="status-item">
              <div className="status-label">Service Status</div>
              <div className={`status-value ${serviceStatus?.ready ? 'text-green-600' : 'text-red-600'}`}>
                {serviceStatus?.ready ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Ready
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Not Configured
                  </>
                )}
              </div>
            </div>

            <div className="status-item">
              <div className="status-label">Organization</div>
              <div className="status-value">
                <GitBranch className="w-4 h-4 mr-1" />
                {serviceStatus?.organization}
              </div>
            </div>

            <div className="status-item">
              <div className="status-label">Token Configured</div>
              <div className={`status-value ${serviceStatus?.tokenInfo?.configured ? 'text-green-600' : 'text-red-600'}`}>
                {serviceStatus?.tokenInfo?.configured ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Yes
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    No
                  </>
                )}
              </div>
            </div>

            {serviceStatus?.tokenInfo?.configured && (
              <div className="status-item">
                <div className="status-label">Configured By</div>
                <div className="status-value">
                  <Shield className="w-4 h-4 mr-1" />
                  {serviceStatus.tokenInfo.userInfo?.login || 'Unknown'}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Repositories Section */}
      {serviceStatus?.ready ? (
        <Card>
          <CardHeader>
            <CardTitle>Organization Repositories ({repositories.length})</CardTitle>
            <CardDescription>Manage your organization's repositories</CardDescription>
          </CardHeader>
          <CardContent>
            {repositories.length === 0 ? (
              <div className="empty-state">
                <GitBranch className="w-12 h-12 text-gray-400 mb-4" />
                <h3>No repositories found</h3>
                <p>Create repositories from the Projects & Repos tab</p>
              </div>
            ) : (
              <div className="repositories-grid">
                {repositories.map((repo) => (
                  <div key={repo.id} className="repository-card">
                    <div className="repo-header">
                      <div className="repo-title">
                        <h3>{repo.name}</h3>
                        <div className="repo-badges">
                          {repo.isPrivate && <span className="badge private">Private</span>}
                          {repo.language && <span className="badge language">{repo.language}</span>}
                        </div>
                      </div>
                      <div className="repo-actions">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewRepository(repo)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(repo.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          GitHub
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteRepository(repo)}
                          className="btn-danger"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="repo-content">
                      <p className="repo-description">{repo.description}</p>
                      
                      {repo.projectInfo && (
                        <div className="project-info">
                          <strong>Client:</strong> {repo.projectInfo.client}<br />
                          <strong>Project ID:</strong> {repo.projectInfo.projectId}
                        </div>
                      )}

                      <div className="repo-stats">
                        <div className="stat">
                          <strong>Size:</strong> {(repo.size / 1024).toFixed(1)} MB
                        </div>
                        <div className="stat">
                          <strong>Updated:</strong> 
                          <span className={getRepoStatusColor(repo)}>
                            {formatDate(repo.updatedAt)}
                          </span>
                        </div>
                        {repo.stars > 0 && (
                          <div className="stat">
                            <strong>Stars:</strong> {repo.stars}
                          </div>
                        )}
                        {repo.openIssues > 0 && (
                          <div className="stat">
                            <strong>Issues:</strong> {repo.openIssues}
                          </div>
                        )}
                      </div>

                      <div className="clone-info">
                        <strong>Clone URL:</strong>
                        <code className="clone-url">{repo.cloneUrl}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">GitHub Service Not Configured</h3>
            <p className="text-gray-600 mb-4">
              Configure your organization's GitHub token to manage repositories
            </p>
            <Button onClick={() => setShowTokenConfig(true)}>
              <Key className="w-4 h-4 mr-2" />
              Configure GitHub Token
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Token Configuration Modal */}
      {showTokenConfig && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>GitHub Organization Token</h2>
              <button onClick={() => setShowTokenConfig(false)}>×</button>
            </div>
            <div className="modal-content">
              {!serviceStatus?.tokenInfo?.configured ? (
                <form onSubmit={handleConfigureToken}>
                  <div className="form-group">
                    <label>Organization Access Token</label>
                    <input
                      type="password"
                      value={tokenForm.token}
                      onChange={(e) => setTokenForm(prev => ({ ...prev, token: e.target.value }))}
                      placeholder="ghp_..."
                      required
                    />
                    <small>
                      This token will be used for all repository operations in the organization.
                      Required scopes: repo, admin:org, user, project
                    </small>
                  </div>
                  <div className="modal-actions">
                    <Button type="button" variant="outline" onClick={() => setShowTokenConfig(false)}>
                      Cancel
                    </Button>
                    <Button type="button" variant="outline" onClick={handleTestToken} disabled={loading}>
                      {loading ? 'Testing...' : 'Test Token'}
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Configuring...' : 'Configure Token'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="token-info">
                  <div className="token-status">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3>Token Configured</h3>
                      <p>Organization GitHub token is active and working</p>
                    </div>
                  </div>
                  
                  <div className="token-details">
                    <div className="detail-item">
                      <strong>Configured by:</strong> {serviceStatus.tokenInfo.userInfo?.login}
                    </div>
                    <div className="detail-item">
                      <strong>Configured at:</strong> {formatDate(serviceStatus.tokenInfo.configuredAt)}
                    </div>
                    <div className="detail-item">
                      <strong>Organization access:</strong> 
                      {serviceStatus.tokenInfo.organizationAccess ? (
                        <span className="text-green-600">✓ Granted</span>
                      ) : (
                        <span className="text-red-600">✗ Denied</span>
                      )}
                    </div>
                  </div>

                  <div className="danger-zone">
                    <h4>Danger Zone</h4>
                    <p>Removing the token will disable all GitHub operations</p>
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={tokenForm.confirmRemove}
                          onChange={(e) => setTokenForm(prev => ({ ...prev, confirmRemove: e.target.checked }))}
                        />
                        I understand this will disable GitHub functionality
                      </label>
                    </div>
                    <Button onClick={handleRemoveToken} className="btn-danger">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Token
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Repository Details Modal */}
      {showRepoDetails && selectedRepo && repoDetails && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h2>{selectedRepo.name}</h2>
              <button onClick={() => setShowRepoDetails(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="repo-details">
                <div className="detail-section">
                  <h3>Repository Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Description:</strong> {repoDetails.repository.description}
                    </div>
                    <div className="detail-item">
                      <strong>Created:</strong> {formatDate(repoDetails.repository.created_at)}
                    </div>
                    <div className="detail-item">
                      <strong>Last Updated:</strong> {formatDate(repoDetails.repository.updated_at)}
                    </div>
                    <div className="detail-item">
                      <strong>Default Branch:</strong> {repoDetails.repository.default_branch}
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Collaborators ({repoDetails.collaborators.length})</h3>
                  <form onSubmit={handleAddCollaborator} className="add-collaborator-form">
                    <input
                      type="text"
                      placeholder="GitHub username"
                      value={collaboratorForm.username}
                      onChange={(e) => setCollaboratorForm(prev => ({ ...prev, username: e.target.value }))}
                    />
                    <select
                      value={collaboratorForm.permission}
                      onChange={(e) => setCollaboratorForm(prev => ({ ...prev, permission: e.target.value }))}
                    >
                      <option value="pull">Pull (Read)</option>
                      <option value="push">Push (Write)</option>
                      <option value="admin">Admin</option>
                    </select>
                    <Button type="submit" size="sm">
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </form>
                  
                  <div className="collaborators-list">
                    {repoDetails.collaborators.map((collaborator) => (
                      <div key={collaborator.id} className="collaborator-item">
                        <img 
                          src={collaborator.avatar_url} 
                          alt={collaborator.login}
                          className="collaborator-avatar"
                        />
                        <div className="collaborator-info">
                          <strong>{collaborator.login}</strong>
                          <span className="permission-badge">{collaborator.permissions?.admin ? 'admin' : collaborator.permissions?.push ? 'push' : 'pull'}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveCollaborator(collaborator.login)}
                          className="btn-danger"
                        >
                          <UserMinus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Recent Activity</h3>
                  <div className="commits-list">
                    {repoDetails.recentCommits.slice(0, 5).map((commit) => (
                      <div key={commit.sha} className="commit-item">
                        <div className="commit-info">
                          <div className="commit-message">{commit.commit.message}</div>
                          <div className="commit-meta">
                            by {commit.commit.author.name} • {formatDate(commit.commit.author.date)}
                          </div>
                        </div>
                        <code className="commit-sha">{commit.sha.slice(0, 7)}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <Button 
                onClick={() => window.open(selectedRepo.url, '_blank')}
                variant="outline"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in GitHub
              </Button>
              <Button onClick={() => setShowRepoDetails(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Logs Modal */}
      {showAuditLogs && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h2>GitHub Audit Logs</h2>
              <button onClick={() => setShowAuditLogs(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="audit-logs">
                {auditLogs.length === 0 ? (
                  <p>No audit logs available</p>
                ) : (
                  auditLogs.reverse().map((log) => (
                    <div key={log.id} className="audit-log-item">
                      <div className="log-action">{log.action.replace('_', ' ')}</div>
                      <div className="log-details">
                        {log.repositoryName && <span>Repository: {log.repositoryName}</span>}
                        {log.collaborator && <span>User: {log.collaborator}</span>}
                        {log.createdBy && <span>By: {log.createdBy}</span>}
                      </div>
                      <div className="log-timestamp">{formatDate(log.timestamp)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="modal-actions">
              <Button onClick={() => setShowAuditLogs(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubManagement;