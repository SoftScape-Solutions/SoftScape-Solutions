// GitHub API Service for Repository Management
class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.organization = 'SoftScape-Solutions'; // Your GitHub organization
    this.token = null; // Will be set when admin provides their token
  }

  // Set GitHub token (should be stored securely in production)
  setToken(token) {
    this.token = token;
    localStorage.setItem('github_token', token);
  }

  // Get stored token
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('github_token');
    }
    return this.token;
  }

  // Make authenticated API request
  async makeRequest(endpoint, options = {}) {
    const token = this.getToken();
    if (!token) {
      throw new Error('GitHub token not configured. Please set your GitHub token first.');
    }

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
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

  // Create a new repository
  async createRepository(repoData) {
    const {
      name,
      description,
      consultationId,
      projectId,
      clientName,
      isPrivate = true,
      autoInit = true
    } = repoData;

    const repositoryName = `${name.toLowerCase().replace(/\s+/g, '-')}-${projectId || consultationId}`;
    
    const repoPayload = {
      name: repositoryName,
      description: `${description} | Client: ${clientName} | Project ID: ${projectId || consultationId}`,
      private: isPrivate,
      auto_init: autoInit,
      gitignore_template: 'Node', // Default to Node.js gitignore
      license_template: 'mit'
    };

    try {
      // Create repository in organization
      const repo = await this.makeRequest(`/orgs/${this.organization}/repos`, {
        method: 'POST',
        body: JSON.stringify(repoPayload)
      });

      // Create initial project structure
      await this.setupInitialStructure(repositoryName, consultationId, projectId);

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

  // Setup initial project structure
  async setupInitialStructure(repoName, consultationId, projectId) {
    try {
      const readmeContent = this.generateReadmeContent(consultationId, projectId);
      const projectConfigContent = this.generateProjectConfig(consultationId, projectId);

      // Create README.md
      await this.createFile(repoName, 'README.md', readmeContent, 'Initial project setup');

      // Create project configuration file
      await this.createFile(repoName, 'project-config.json', projectConfigContent, 'Add project configuration');

      // Create basic folder structure
      await this.createFile(repoName, 'src/.gitkeep', '', 'Create src directory');
      await this.createFile(repoName, 'docs/.gitkeep', '', 'Create docs directory');
      await this.createFile(repoName, 'tests/.gitkeep', '', 'Create tests directory');

    } catch (error) {
      console.error('Error setting up initial structure:', error);
      // Don't throw here as the repo was created successfully
    }
  }

  // Create a file in the repository
  async createFile(repoName, path, content, message) {
    // Encode content as base64 (Unicode-safe)
    const encodedContent = btoa(unescape(encodeURIComponent(content)));
    
    return await this.makeRequest(`/repos/${this.organization}/${repoName}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify({
        message,
        content: encodedContent
      })
    });
  }

  // Add collaborators to repository
  async addCollaborators(repoName, collaborators) {
    const results = [];

    for (const collaborator of collaborators) {
      try {
        await this.makeRequest(`/repos/${this.organization}/${repoName}/collaborators/${collaborator.username}`, {
          method: 'PUT',
          body: JSON.stringify({
            permission: collaborator.permission || 'push' // push, pull, admin
          })
        });

        results.push({
          username: collaborator.username,
          success: true
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

  // List organization repositories
  async listRepositories() {
    try {
      return await this.makeRequest(`/orgs/${this.organization}/repos?sort=updated&direction=desc`);
    } catch (error) {
      console.error('Error listing repositories:', error);
      return [];
    }
  }

  // Get repository details
  async getRepository(repoName) {
    try {
      return await this.makeRequest(`/repos/${this.organization}/${repoName}`);
    } catch (error) {
      console.error('Error getting repository:', error);
      return null;
    }
  }

  // List repository collaborators
  async getCollaborators(repoName) {
    try {
      return await this.makeRequest(`/repos/${this.organization}/${repoName}/collaborators`);
    } catch (error) {
      console.error('Error getting collaborators:', error);
      return [];
    }
  }

  // Generate README content
  generateReadmeContent(consultationId, projectId) {
    return `# SoftScape Solutions Project

## Project Information
- **Consultation ID**: ${consultationId}
- **Project ID**: ${projectId || consultationId}
- **Created**: ${new Date().toLocaleDateString()}
- **Client**: [Client Name]
- **Project Manager**: [To be assigned]

## Project Overview
[Project description will be added here]

## Technology Stack
- [To be determined based on project requirements]

## Team Members
- [Team members will be added as collaborators]

## Project Structure
\`\`\`
├── src/          # Source code
├── docs/         # Documentation
├── tests/        # Test files
└── README.md     # This file
\`\`\`

## Getting Started
[Setup instructions will be added here]

## Contributing
Please follow our coding standards and submit pull requests for any changes.

## Contact
For questions about this project, contact: softscapesolution@outlook.com

---
*This repository was automatically created by SoftScape Solutions Admin Dashboard*
`;
  }

  // Generate project configuration
  generateProjectConfig(consultationId, projectId) {
    const config = {
      project: {
        id: projectId || consultationId,
        consultationId: consultationId,
        name: "",
        description: "",
        client: "",
        status: "active",
        createdAt: new Date().toISOString(),
        technologies: [],
        team: [],
        timeline: {
          startDate: null,
          estimatedEndDate: null,
          milestones: []
        }
      },
      repository: {
        organization: this.organization,
        createdBy: "admin-dashboard",
        autoCreated: true
      },
      settings: {
        notifications: true,
        autoAssignReviews: false,
        branchProtection: false
      }
    };

    return JSON.stringify(config, null, 2);
  }

  // Validate GitHub token
  async validateToken() {
    try {
      const user = await this.makeRequest('/user');
      return {
        valid: true,
        user: user
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  // Search for GitHub users (for adding collaborators)
  async searchUsers(query) {
    try {
      const response = await this.makeRequest(`/search/users?q=${encodeURIComponent(query)}`);
      return response.items || [];
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  }
}

// Export singleton instance
const githubService = new GitHubService();
export default githubService;