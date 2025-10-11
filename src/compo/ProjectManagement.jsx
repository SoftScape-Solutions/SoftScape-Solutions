import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Users, 
  Plus, 
  Settings, 
  ExternalLink, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Code,
  FolderGit2,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Target,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import consultationStorage from '../utils/consultationStorage';
import githubBackendService from '../utils/githubBackendService';
import './ProjectManagement.css';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [convertibleConsultations, setConvertibleConsultations] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateRepo, setShowCreateRepo] = useState(false);
  const [showGitHubSetup, setShowGitHubSetup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [serviceReady, setServiceReady] = useState(false);

  // Form states
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    startDate: '',
    estimatedEndDate: '',
    budget: '',
    technologies: [],
    notes: ''
  });

  const [repoForm, setRepoForm] = useState({
    name: '',
    description: '',
    isPrivate: true,
    autoInit: true,
    collaborators: []
  });

  const [collaboratorForm, setCollaboratorForm] = useState({
    username: '',
    permission: 'push'
  });

  useEffect(() => {
    loadProjectData();
    checkGitHubService();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, statusFilter]);

  const loadProjectData = async () => {
    try {
      setLoading(true);
      const allProjects = consultationStorage.getAllProjects();
      const convertible = consultationStorage.getConvertibleConsultations();
      
      setProjects(allProjects);
      setConvertibleConsultations(convertible);
    } catch (error) {
      console.error('Error loading project data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkGitHubService = async () => {
    const status = githubBackendService.getServiceStatus();
    setServiceReady(status.ready);
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    
    if (!selectedConsultation) {
      alert('Please select a consultation to convert');
      return;
    }

    try {
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies.filter(tech => tech.trim()),
        createdBy: sessionStorage.getItem('admin_user') || 'admin'
      };

      const newProject = consultationStorage.convertToProject(selectedConsultation.id, projectData);
      
      await loadProjectData();
      setShowCreateProject(false);
      resetProjectForm();
      
      alert('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project: ' + error.message);
    }
  };

  const handleCreateRepository = async (e) => {
    e.preventDefault();
    
    if (!selectedProject) {
      alert('Please select a project');
      return;
    }

    if (!serviceReady) {
      alert('GitHub service not configured. Please contact super admin to configure organization token.');
      return;
    }

    try {
      setLoading(true);

      const repoData = {
        name: repoForm.name || selectedProject.name,
        description: repoForm.description || selectedProject.description,
        consultationId: selectedProject.consultationId,
        projectId: selectedProject.id,
        clientName: selectedProject.clientName,
        isPrivate: repoForm.isPrivate,
        autoInit: repoForm.autoInit,
        createdBy: sessionStorage.getItem('admin_user_id') || 'admin'
      };

      const result = await githubBackendService.createRepository(repoData);

      if (result.success) {
        // Add repository info to project
        consultationStorage.addRepositoryToProject(selectedProject.id, result);

        // Add collaborators if any
        if (repoForm.collaborators.length > 0) {
          await githubBackendService.addCollaborators(
            result.repository.name, 
            repoForm.collaborators,
            sessionStorage.getItem('admin_user_id') || 'admin'
          );
        }

        await loadProjectData();
        setShowCreateRepo(false);
        resetRepoForm();
        
        alert(`Repository created successfully!\nURL: ${result.url}`);
      } else {
        alert('Error creating repository: ' + result.error);
      }
    } catch (error) {
      console.error('Error creating repository:', error);
      alert('Error creating repository: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addCollaborator = () => {
    if (!collaboratorForm.username.trim()) return;

    const newCollaborator = { ...collaboratorForm };
    setRepoForm(prev => ({
      ...prev,
      collaborators: [...prev.collaborators, newCollaborator]
    }));
    
    setCollaboratorForm({ username: '', permission: 'push' });
  };

  const removeCollaborator = (index) => {
    setRepoForm(prev => ({
      ...prev,
      collaborators: prev.collaborators.filter((_, i) => i !== index)
    }));
  };

  const addTechnology = (tech) => {
    if (tech.trim() && !projectForm.technologies.includes(tech.trim())) {
      setProjectForm(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech.trim()]
      }));
    }
  };

  const removeTechnology = (index) => {
    setProjectForm(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const resetProjectForm = () => {
    setProjectForm({
      name: '',
      description: '',
      startDate: '',
      estimatedEndDate: '',
      budget: '',
      technologies: [],
      notes: ''
    });
    setSelectedConsultation(null);
  };

  const resetRepoForm = () => {
    setRepoForm({
      name: '',
      description: '',
      isPrivate: true,
      autoInit: true,
      collaborators: []
    });
    setSelectedProject(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      planning: { color: 'bg-blue-100 text-blue-800', icon: Calendar },
      active: { color: 'bg-green-100 text-green-800', icon: TrendingUp },
      completed: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle2 },
      'on-hold': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.planning;
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    planning: projects.filter(p => p.status === 'planning').length,
    completed: projects.filter(p => p.status === 'completed').length,
    withRepos: projects.filter(p => p.repositoryInfo).length
  };

  if (loading) {
    return (
      <div className="project-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading project data...</p>
      </div>
    );
  }

  return (
    <div className="project-management">
      <div className="project-header">
        <div className="header-content">
          <h1>Project Management</h1>
          <p>Manage projects and GitHub repositories</p>
        </div>
        <div className="header-actions">
          <Button onClick={() => setShowCreateProject(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </div>
      </div>

      {/* Service Status Alert */}
      {!serviceReady && (
        <div className="service-alert">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <div>
            <h3>GitHub Service Not Ready</h3>
            <p>Contact your super admin to configure the organization GitHub token for repository creation.</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-grid">
        <Card>
          <CardContent className="stat-card">
            <div className="stat-icon bg-blue-100">
              <FolderGit2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Projects</p>
              <p className="stat-value">{projectStats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="stat-card">
            <div className="stat-icon bg-green-100">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Active Projects</p>
              <p className="stat-value">{projectStats.active}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="stat-card">
            <div className="stat-icon bg-purple-100">
              <GitBranch className="w-6 h-6 text-purple-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">With Repositories</p>
              <p className="stat-value">{projectStats.withRepos}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="stat-card">
            <div className="stat-icon bg-yellow-100">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Convertible</p>
              <p className="stat-value">{convertibleConsultations.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Projects ({filteredProjects.length})</CardTitle>
          <CardDescription>Manage your active projects and repositories</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProjects.length === 0 ? (
            <div className="empty-state">
              <FolderGit2 className="w-12 h-12 text-gray-400 mb-4" />
              <h3>No projects found</h3>
              <p>Create your first project from a completed consultation</p>
              <Button onClick={() => setShowCreateProject(true)} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <div className="project-title">
                      <h3>{project.name}</h3>
                      {getStatusBadge(project.status)}
                    </div>
                    <div className="project-actions">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedProject(project);
                          setShowCreateRepo(true);
                        }}
                        disabled={!!project.repositoryInfo || !serviceReady}
                      >
                        <GitBranch className="w-4 h-4 mr-1" />
                        {!serviceReady 
                          ? 'Service Not Ready' 
                          : project.repositoryInfo 
                            ? 'Repo Created' 
                            : 'Create Repo'}
                      </Button>
                    </div>
                  </div>

                  <div className="project-content">
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-meta">
                      <div className="meta-item">
                        <strong>Client:</strong> {project.clientName}
                      </div>
                      <div className="meta-item">
                        <strong>Type:</strong> {project.projectType}
                      </div>
                      <div className="meta-item">
                        <strong>Created:</strong> {formatDate(project.createdAt)}
                      </div>
                      {project.startDate && (
                        <div className="meta-item">
                          <strong>Start:</strong> {formatDate(project.startDate)}
                        </div>
                      )}
                    </div>

                    {project.technologies.length > 0 && (
                      <div className="project-technologies">
                        <strong>Technologies:</strong>
                        <div className="tech-tags">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.teamMembers.length > 0 && (
                      <div className="project-team">
                        <strong>Team:</strong>
                        <div className="team-list">
                          {project.teamMembers.map((member, index) => (
                            <span key={index} className="team-member">
                              {member.username} ({member.permission})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.repositoryInfo && (
                      <div className="repository-info">
                        <strong>Repository:</strong>
                        <div className="repo-links">
                          <a 
                            href={project.repositoryInfo.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="repo-link"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View Repository
                          </a>
                          <code className="clone-url">{project.repositoryInfo.cloneUrl}</code>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* GitHub Setup Modal */}
      {showGitHubSetup && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>GitHub Configuration</h2>
              <button onClick={() => setShowGitHubSetup(false)}>×</button>
            </div>
            <form onSubmit={handleSetupGitHub}>
              <div className="modal-content">
                <div className="form-group">
                  <label>GitHub Personal Access Token</label>
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    placeholder="ghp_..."
                    required
                  />
                  <small>
                    Create a token at{' '}
                    <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
                      GitHub Settings → Developer settings → Personal access tokens
                    </a>
                    <br />
                    Required scopes: repo, admin:org
                  </small>
                </div>
              </div>
              <div className="modal-actions">
                <Button type="button" variant="outline" onClick={() => setShowGitHubSetup(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Configure Token
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateProject && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button onClick={() => setShowCreateProject(false)}>×</button>
            </div>
            <form onSubmit={handleCreateProject}>
              <div className="modal-content">
                <div className="form-group">
                  <label>Select Consultation to Convert</label>
                  <select
                    value={selectedConsultation?.id || ''}
                    onChange={(e) => {
                      const consultation = convertibleConsultations.find(c => c.id === e.target.value);
                      setSelectedConsultation(consultation);
                      if (consultation) {
                        setProjectForm(prev => ({
                          ...prev,
                          name: `${consultation.service} - ${consultation.company}`,
                          description: `Project for ${consultation.company}: ${consultation.message.slice(0, 100)}...`
                        }));
                      }
                    }}
                    required
                  >
                    <option value="">Choose consultation...</option>
                    {convertibleConsultations.map(consultation => (
                      <option key={consultation.id} value={consultation.id}>
                        {consultation.company} - {consultation.service} ({formatDate(consultation.submittedAt)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      value={projectForm.name}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Budget (Optional)</label>
                    <input
                      type="text"
                      value={projectForm.budget}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder="$10,000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date (Optional)</label>
                    <input
                      type="date"
                      value={projectForm.startDate}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Estimated End Date (Optional)</label>
                    <input
                      type="date"
                      value={projectForm.estimatedEndDate}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, estimatedEndDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Technologies</label>
                  <div className="tech-input">
                    <input
                      type="text"
                      placeholder="Add technology (press Enter)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTechnology(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                  {projectForm.technologies.length > 0 && (
                    <div className="tech-tags">
                      {projectForm.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(index)}
                            className="remove-tag"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Notes (Optional)</label>
                  <textarea
                    value={projectForm.notes}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, notes: e.target.value }))}
                    rows={2}
                    placeholder="Additional project notes..."
                  />
                </div>
              </div>
              <div className="modal-actions">
                <Button type="button" variant="outline" onClick={() => setShowCreateProject(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Repository Modal */}
      {showCreateRepo && selectedProject && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h2>Create GitHub Repository</h2>
              <button onClick={() => setShowCreateRepo(false)}>×</button>
            </div>
            <form onSubmit={handleCreateRepository}>
              <div className="modal-content">
                <div className="project-info">
                  <h3>Project: {selectedProject.name}</h3>
                  <p>Client: {selectedProject.clientName}</p>
                  <p>Project ID: {selectedProject.id}</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Repository Name</label>
                    <input
                      type="text"
                      value={repoForm.name}
                      onChange={(e) => setRepoForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={selectedProject.name}
                    />
                    <small>Leave empty to use project name</small>
                  </div>
                  <div className="form-group">
                    <label>Privacy</label>
                    <select
                      value={repoForm.isPrivate}
                      onChange={(e) => setRepoForm(prev => ({ ...prev, isPrivate: e.target.value === 'true' }))}
                    >
                      <option value="true">Private</option>
                      <option value="false">Public</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={repoForm.description}
                    onChange={(e) => setRepoForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={selectedProject.description}
                    rows={2}
                  />
                  <small>Leave empty to use project description</small>
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={repoForm.autoInit}
                      onChange={(e) => setRepoForm(prev => ({ ...prev, autoInit: e.target.checked }))}
                    />
                    Initialize with README
                  </label>
                </div>

                <div className="form-group">
                  <label>Add Collaborators</label>
                  <div className="collaborator-input">
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
                    <Button type="button" onClick={addCollaborator} size="sm">
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </div>
                  {repoForm.collaborators.length > 0 && (
                    <div className="collaborators-list">
                      {repoForm.collaborators.map((collaborator, index) => (
                        <div key={index} className="collaborator-item">
                          <span>{collaborator.username} ({collaborator.permission})</span>
                          <button
                            type="button"
                            onClick={() => removeCollaborator(index)}
                            className="remove-collaborator"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-actions">
                <Button type="button" variant="outline" onClick={() => setShowCreateRepo(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!serviceReady}>
                  <GitBranch className="w-4 h-4 mr-2" />
                  {serviceReady ? 'Create Repository' : 'Service Not Ready'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;