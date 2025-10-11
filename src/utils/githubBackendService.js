// Backend-style GitHub Service with centralized token management
class GitHubBackendService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.organization = 'SoftScape-Solutions';
    this.tokenKey = 'github_org_token'; // Stored centrally by super admin
    this.isConfigured = false;
    this.initializeService();
  }

  // Initialize service and check if token is configured
  initializeService() {
    const token = this.getOrganizationToken();
    this.isConfigured = !!token;
  }

  // Super admin sets the organization token (one-time setup)
  async configureOrganizationToken(token, adminId) {
    try {
      // Validate token first
      const validation = await this.validateToken(token);
      
      if (!validation.valid) {
        throw new Error('Invalid GitHub token provided');
      }

      // Store the token with metadata
      const tokenData = {
        token: token,
        configuredBy: adminId,
        configuredAt: new Date().toISOString(),
        organizationAccess: validation.organizationAccess,
        userInfo: validation.user
      };

      localStorage.setItem(this.tokenKey, JSON.stringify(tokenData));
      this.isConfigured = true;

      return {
        success: true,
        message: 'Organization GitHub token configured successfully',
        userInfo: validation.user
      };
    } catch (error) {
      console.error('Error configuring GitHub token:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get the stored organization token
  getOrganizationToken() {
    try {
      const tokenData = localStorage.getItem(this.tokenKey);
      if (tokenData) {
        const parsed = JSON.parse(tokenData);
        return parsed.token;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving organization token:', error);
      return null;
    }
  }

  // Get token configuration info
  getTokenInfo() {
    try {
      const tokenData = localStorage.getItem(this.tokenKey);
      if (tokenData) {
        const parsed = JSON.parse(tokenData);
        return {
          configured: true,
          configuredBy: parsed.configuredBy,
          configuredAt: parsed.configuredAt,
          userInfo: parsed.userInfo,
          organizationAccess: parsed.organizationAccess
        };
      }
      return { configured: false };
    } catch (error) {
      console.error('Error getting token info:', error);
      return { configured: false };
    }
  }

  // Remove organization token (super admin only)
  removeOrganizationToken(adminId) {
    try {
      localStorage.removeItem(this.tokenKey);
      this.isConfigured = false;
      
      return {
        success: true,
        message: 'Organization GitHub token removed successfully',
        removedBy: adminId,
        removedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error removing GitHub token:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check if service is ready for repository operations
  isServiceReady() {
    return this.isConfigured && !!this.getOrganizationToken();
  }

  // Make authenticated API request
  async makeRequest(endpoint, options = {}) {
    if (!this.isServiceReady()) {
      throw new Error('GitHub service not configured. Please contact super admin to configure organization token.');
    }

    const token = this.getOrganizationToken();
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`GitHub API Error: ${response.status} - ${errorData.message || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GitHub API request failed:', error);
      throw error;
    }
  }

  // Validate GitHub token and check organization access
  async validateToken(token = null) {
    const testToken = token || this.getOrganizationToken();
    
    if (!testToken) {
      return { valid: false, error: 'No token provided' };
    }

    try {
      // Test user access
      const userResponse = await fetch(`${this.baseURL}/user`, {
        headers: {
          'Authorization': `token ${testToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!userResponse.ok) {
        return { valid: false, error: 'Invalid token or insufficient permissions' };
      }

      const user = await userResponse.json();

      // Test organization access
      const orgResponse = await fetch(`${this.baseURL}/orgs/${this.organization}`, {
        headers: {
          'Authorization': `token ${testToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      const organizationAccess = orgResponse.ok;

      // Test repository creation permissions
      const permissionsResponse = await fetch(`${this.baseURL}/orgs/${this.organization}/members/${user.login}`, {
        headers: {
          'Authorization': `token ${testToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      return {
        valid: true,
        user: user,
        organizationAccess: organizationAccess,
        canCreateRepos: organizationAccess,
        permissions: {
          user: true,
          organization: organizationAccess,
          repos: organizationAccess
        }
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  // Create repository (main function)
  async createRepository(repoData) {
    if (!this.isServiceReady()) {
      throw new Error('GitHub service not configured. Please contact super admin.');
    }

    const {
      name,
      description,
      consultationId,
      projectId,
      clientName,
      isPrivate = true,
      autoInit = true,
      createdBy
    } = repoData;

    const repositoryName = `${name.toLowerCase().replace(/\s+/g, '-')}-${projectId || consultationId}`;
    
    const repoPayload = {
      name: repositoryName,
      description: `${description} | Client: ${clientName} | Project ID: ${projectId || consultationId}`,
      private: isPrivate,
      auto_init: autoInit,
      gitignore_template: 'Node',
      license_template: 'mit'
    };

    try {
      // Create repository
      const repo = await this.makeRequest(`/orgs/${this.organization}/repos`, {
        method: 'POST',
        body: JSON.stringify(repoPayload)
      });

      // Setup initial structure
      await this.setupInitialStructure(repositoryName, consultationId, projectId, clientName);

      // Log repository creation
      this.logRepositoryAction('create', {
        repositoryName,
        projectId,
        consultationId,
        createdBy,
        timestamp: new Date().toISOString()
      });

      return {
        success: true,
        repository: repo,
        url: repo.html_url,
        cloneUrl: repo.clone_url,
        sshUrl: repo.ssh_url
      };
    } catch (error) {
      console.error('Error creating repository:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // List all organization repositories
  async listOrganizationRepositories() {
    if (!this.isServiceReady()) {
      throw new Error('GitHub service not configured. Please contact super admin.');
    }

    try {
      const repos = await this.makeRequest(`/orgs/${this.organization}/repos?sort=updated&direction=desc&per_page=100`);
      
      // Filter and enhance repo data for admin dashboard
      return repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        cloneUrl: repo.clone_url,
        sshUrl: repo.ssh_url,
        isPrivate: repo.private,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        language: repo.language,
        size: repo.size,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        // Extract project info from description
        projectInfo: this.extractProjectInfo(repo.description),
        collaboratorsUrl: repo.collaborators_url
      }));
    } catch (error) {
      console.error('Error listing repositories:', error);
      return [];
    }
  }

  // Get repository details
  async getRepositoryDetails(repoName) {
    if (!this.isServiceReady()) {
      throw new Error('GitHub service not configured. Please contact super admin.');
    }

    try {
      const repo = await this.makeRequest(`/repos/${this.organization}/${repoName}`);
      const collaborators = await this.getRepositoryCollaborators(repoName);
      const branches = await this.makeRequest(`/repos/${this.organization}/${repoName}/branches`);
      const commits = await this.makeRequest(`/repos/${this.organization}/${repoName}/commits?per_page=10`);

      return {
        repository: repo,
        collaborators: collaborators,
        branches: branches,
        recentCommits: commits,
        projectInfo: this.extractProjectInfo(repo.description)
      };
    } catch (error) {
      console.error('Error getting repository details:', error);
      return null;
    }
  }

  // Get repository collaborators
  async getRepositoryCollaborators(repoName) {
    try {
      return await this.makeRequest(`/repos/${this.organization}/${repoName}/collaborators`);
    } catch (error) {
      console.error('Error getting collaborators:', error);
      return [];
    }
  }

  // Add collaborators to repository
  async addCollaborators(repoName, collaborators, addedBy) {
    if (!this.isServiceReady()) {
      throw new Error('GitHub service not configured. Please contact super admin.');
    }

    const results = [];

    for (const collaborator of collaborators) {
      try {
        await this.makeRequest(`/repos/${this.organization}/${repoName}/collaborators/${collaborator.username}`, {
          method: 'PUT',
          body: JSON.stringify({
            permission: collaborator.permission || 'push'
          })
        });

        results.push({
          username: collaborator.username,
          permission: collaborator.permission || 'push',
          success: true
        });

        // Log collaborator addition
        this.logRepositoryAction('add_collaborator', {
          repositoryName: repoName,
          collaborator: collaborator.username,
          permission: collaborator.permission || 'push',
          addedBy,
          timestamp: new Date().toISOString()
        });

      } catch (error) {
        results.push({
          username: collaborator.username,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }

  // Remove collaborator from repository
  async removeCollaborator(repoName, username, removedBy) {
    if (!this.isServiceReady()) {
      throw new Error('GitHub service not configured. Please contact super admin.');
    }

    try {
      await this.makeRequest(`/repos/${this.organization}/${repoName}/collaborators/${username}`, {
        method: 'DELETE'
      });

      // Log collaborator removal
      this.logRepositoryAction('remove_collaborator', {
        repositoryName: repoName,
        collaborator: username,
        removedBy,
        timestamp: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      console.error('Error removing collaborator:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete repository (super admin only)
  async deleteRepository(repoName, deletedBy) {
    if (!this.isServiceReady()) {
      throw new Error('GitHub service not configured. Please contact super admin.');
    }

    try {
      await this.makeRequest(`/repos/${this.organization}/${repoName}`, {
        method: 'DELETE'
      });

      // Log repository deletion
      this.logRepositoryAction('delete', {
        repositoryName: repoName,
        deletedBy,
        timestamp: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      console.error('Error deleting repository:', error);
      return { success: false, error: error.message };
    }
  }

  // Setup initial repository structure
  async setupInitialStructure(repoName, consultationId, projectId, clientName) {
    try {
      const readmeContent = this.generateReadmeContent(consultationId, projectId, clientName);
      const projectConfigContent = this.generateProjectConfig(consultationId, projectId, clientName);

      await this.createFile(repoName, 'README.md', readmeContent, 'Initial project setup - README');
      await this.createFile(repoName, 'project-config.json', projectConfigContent, 'Add project configuration');
      await this.createFile(repoName, 'src/.gitkeep', '', 'Create src directory structure');
      await this.createFile(repoName, 'docs/.gitkeep', '', 'Create docs directory structure');
      await this.createFile(repoName, 'tests/.gitkeep', '', 'Create tests directory structure');

    } catch (error) {
      console.error('Error setting up initial structure:', error);
    }
  }

  // Create file in repository
  async createFile(repoName, path, content, message) {
    const encodedContent = btoa(decodeURIComponent(encodeURIComponent(content)));
    
    return await this.makeRequest(`/repos/${this.organization}/${repoName}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify({
        message,
        content: encodedContent
      })
    });
  }

  // Extract project information from repository description
  extractProjectInfo(description) {
    if (!description) return null;

    const clientMatch = description.match(/Client: ([^|]+)/);
    const projectIdMatch = description.match(/Project ID: ([^|]+)/);

    return {
      client: clientMatch ? clientMatch[1].trim() : null,
      projectId: projectIdMatch ? projectIdMatch[1].trim() : null
    };
  }

  // Log repository actions for audit trail
  logRepositoryAction(action, data) {
    try {
      const logs = JSON.parse(localStorage.getItem('github_audit_log') || '[]');
      logs.push({
        action,
        ...data,
        id: Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      });

      // Keep only last 1000 logs
      if (logs.length > 1000) {
        logs.splice(0, logs.length - 1000);
      }

      localStorage.setItem('github_audit_log', JSON.stringify(logs));
    } catch (error) {
      console.error('Error logging repository action:', error);
    }
  }

  // Get audit logs
  getAuditLogs() {
    try {
      return JSON.parse(localStorage.getItem('github_audit_log') || '[]');
    } catch (error) {
      console.error('Error getting audit logs:', error);
      return [];
    }
  }

  // Generate README content
  generateReadmeContent(consultationId, projectId, clientName) {
    return `# SoftScape Solutions - ${clientName} Project

## Project Information
- **Project ID**: ${projectId || consultationId}
- **Consultation ID**: ${consultationId}
- **Client**: ${clientName}
- **Created**: ${new Date().toLocaleDateString()}
- **Organization**: SoftScape Solutions

## Project Overview
This repository contains the project deliverables for ${clientName}.

## Project Status
🚀 **Active Development**

## Technology Stack
- [To be determined based on project requirements]

## Team Members
Team members will be added as collaborators to this repository.

## Project Structure
\`\`\`
├── src/          # Source code
├── docs/         # Documentation  
├── tests/        # Test files
└── README.md     # This file
\`\`\`

## Development Guidelines
1. Follow SoftScape coding standards
2. Create feature branches for new development
3. Submit pull requests for code review
4. Maintain comprehensive documentation

## Getting Started
[Setup instructions will be added here]

## Contact
- **Project Manager**: [To be assigned]
- **Company**: SoftScape Solutions
- **Email**: softscapesolution@outlook.com

---
*This repository was automatically created by SoftScape Solutions Admin Dashboard*
*Repository managed by SoftScape Solutions GitHub Service*
`;
  }

  // Generate project configuration
  generateProjectConfig(consultationId, projectId, clientName) {
    const config = {
      project: {
        id: projectId || consultationId,
        consultationId: consultationId,
        clientName: clientName,
        status: "active",
        createdAt: new Date().toISOString(),
        organization: this.organization,
        managedBy: "softscape-admin-dashboard"
      },
      repository: {
        organization: this.organization,
        autoCreated: true,
        createdBy: "github-backend-service"
      },
      team: {
        members: [],
        roles: {}
      },
      settings: {
        notifications: true,
        autoAssignReviews: false,
        branchProtection: false
      },
      milestones: [],
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: "1.0.0"
      }
    };

    return JSON.stringify(config, null, 2);
  }

  // Get service status
  getServiceStatus() {
    const tokenInfo = this.getTokenInfo();
    
    return {
      configured: this.isConfigured,
      ready: this.isServiceReady(),
      organization: this.organization,
      tokenInfo: tokenInfo
    };
  }
}

// Export singleton instance
const githubBackendService = new GitHubBackendService();
export default githubBackendService;