import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  UserMinus, 
  Crown, 
  Shield, 
  Settings,
  Search,
  Filter,
  Eye,
  Edit,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import consultationStorage from '../utils/consultationStorage';
import './TeamManagement.css';

const TeamManagement = ({ currentAdmin }) => {
  const [projects, setProjects] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [teamLogs, setTeamLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAssignTeamLead, setShowAssignTeamLead] = useState(false);
  const [showAssignMember, setShowAssignMember] = useState(false);
  const [showTeamHierarchy, setShowTeamHierarchy] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTeamLead, setSelectedTeamLead] = useState('');
  const [selectedMember, setSelectedMember] = useState('');

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      setLoading(true);
      
      // Get all projects (super admin can see all)
      const allProjects = consultationStorage.getAllProjects();
      setProjects(allProjects);
      
      // Get team leads and members
      const availableTeamLeads = consultationStorage.getAvailableTeamLeads();
      const availableMembers = consultationStorage.getAvailableTeamMembers();
      const allUsers = consultationStorage.getAllAdmins();
      
      setTeamLeads(availableTeamLeads);
      setTeamMembers(availableMembers);
      setAllAdmins(allUsers);
      
      // Get team management logs
      const logs = consultationStorage.getTeamManagementLogs();
      setTeamLogs(logs.slice(-20)); // Show last 20 actions
      
    } catch (error) {
      console.error('Error loading team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTeamLead = async (e) => {
    e.preventDefault();
    
    if (!selectedProject || !selectedTeamLead) {
      alert('Please select both project and team lead');
      return;
    }

    try {
      setLoading(true);
      
      await consultationStorage.assignTeamLeadToProject(
        selectedProject.id,
        selectedTeamLead,
        currentAdmin.id
      );
      
      alert(`Team lead assigned successfully to ${selectedProject.name}`);
      setShowAssignTeamLead(false);
      setSelectedProject(null);
      setSelectedTeamLead('');
      await loadTeamData();
      
    } catch (error) {
      console.error('Error assigning team lead:', error);
      alert('Error assigning team lead: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTeamLead = async (project) => {
    if (!confirm(`Remove team lead from ${project.name}?`)) return;

    try {
      setLoading(true);
      
      await consultationStorage.removeTeamLeadFromProject(
        project.id,
        currentAdmin.id
      );
      
      alert(`Team lead removed from ${project.name}`);
      await loadTeamData();
      
    } catch (error) {
      console.error('Error removing team lead:', error);
      alert('Error removing team lead: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTeamMember = async (e) => {
    e.preventDefault();
    
    if (!selectedProject || !selectedMember) {
      alert('Please select both project and team member');
      return;
    }

    try {
      setLoading(true);
      
      await consultationStorage.assignTeamMemberToProject(
        selectedProject.id,
        selectedMember,
        currentAdmin.id
      );
      
      alert(`Team member assigned successfully to ${selectedProject.name}`);
      setShowAssignMember(false);
      setSelectedProject(null);
      setSelectedMember('');
      await loadTeamData();
      
    } catch (error) {
      console.error('Error assigning team member:', error);
      alert('Error assigning team member: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTeamMember = async (project, member) => {
    if (!confirm(`Remove ${member.name} from ${project.name}?`)) return;

    try {
      setLoading(true);
      
      await consultationStorage.removeTeamMemberFromProject(
        project.id,
        member.id,
        currentAdmin.id
      );
      
      alert(`${member.name} removed from ${project.name}`);
      await loadTeamData();
      
    } catch (error) {
      console.error('Error removing team member:', error);
      alert('Error removing team member: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTeamHierarchy = (project) => {
    const hierarchy = consultationStorage.getProjectTeamHierarchy(project.id);
    setSelectedProject({ ...project, hierarchy });
    setShowTeamHierarchy(true);
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      planning: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      active: { color: 'bg-green-100 text-green-800', icon: TrendingUp },
      completed: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
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

  const getRoleBadge = (role) => {
    const roleConfig = {
      super_admin: { color: 'bg-purple-100 text-purple-800', icon: Crown },
      admin: { color: 'bg-blue-100 text-blue-800', icon: Shield },
      team_lead: { color: 'bg-green-100 text-green-800', icon: UserCheck },
      developer: { color: 'bg-gray-100 text-gray-800', icon: Users },
      viewer: { color: 'bg-yellow-100 text-yellow-800', icon: Eye }
    };

    const config = roleConfig[role] || roleConfig.viewer;
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {role.replace('_', ' ')}
      </span>
    );
  };

  const getWorkloadColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const teamStats = {
    totalProjects: projects.length,
    projectsWithTeamLead: projects.filter(p => p.teamLeadId).length,
    activeTeamLeads: teamLeads.filter(tl => (tl.workload || 0) > 0).length,
    availableTeamLeads: teamLeads.filter(tl => (tl.workload || 0) < (tl.maxWorkload || 5)).length,
    totalTeamMembers: teamMembers.length,
    activeMembers: teamMembers.filter(tm => (tm.workload || 0) > 0).length
  };

  if (loading) {
    return (
      <div className="team-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading team management...</p>
      </div>
    );
  }

  return (
    <div className="team-management">
      <div className="team-header">
        <div className="header-content">
          <h1>Team Management</h1>
          <p>Assign team leads and manage project teams</p>
        </div>
        <div className="header-actions">
          <Button onClick={() => setShowAssignTeamLead(true)} className="btn-primary">
            <UserPlus className="w-4 h-4 mr-2" />
            Assign Team Lead
          </Button>
          <Button onClick={() => setShowAssignMember(true)} variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Assign Member
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="stats-grid">
        <Card>
          <CardContent className="stat-card">
            <div className="stat-icon bg-blue-100">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Projects</p>
              <p className="stat-value">{teamStats.totalProjects}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="stat-card">
            <div className="stat-icon bg-green-100">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">With Team Lead</p>
              <p className="stat-value">{teamStats.projectsWithTeamLead}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="stat-card">
            <div className="stat-icon bg-purple-100">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Active Team Leads</p>
              <p className="stat-value">{teamStats.activeTeamLeads}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="stat-card">
            <div className="stat-icon bg-gray-100">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Active Members</p>
              <p className="stat-value">{teamStats.activeMembers}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects with Team Assignment */}
      <Card>
        <CardHeader>
          <CardTitle>Project Team Assignments</CardTitle>
          <CardDescription>Manage team leads and members for each project</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="empty-state">
              <BarChart3 className="w-12 h-12 text-gray-400 mb-4" />
              <h3>No projects found</h3>
              <p>Create projects from consultations first</p>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-team-card">
                  <div className="project-header">
                    <div className="project-title">
                      <h3>{project.name}</h3>
                      {getStatusBadge(project.status)}
                    </div>
                    <div className="project-actions">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewTeamHierarchy(project)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Team
                      </Button>
                    </div>
                  </div>

                  <div className="project-content">
                    <div className="project-meta">
                      <div className="meta-item">
                        <strong>Client:</strong> {project.clientName}
                      </div>
                      <div className="meta-item">
                        <strong>Created:</strong> {formatDate(project.createdAt)}
                      </div>
                    </div>

                    {/* Team Lead Section */}
                    <div className="team-section">
                      <div className="section-header">
                        <h4>Team Lead</h4>
                        {project.teamLeadId ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveTeamLead(project)}
                            className="btn-danger-outline"
                          >
                            <UserMinus className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedProject(project);
                              setShowAssignTeamLead(true);
                            }}
                          >
                            <UserPlus className="w-4 h-4 mr-1" />
                            Assign
                          </Button>
                        )}
                      </div>
                      
                      {project.teamLeadId ? (
                        <div className="team-lead-info">
                          <div className="member-info">
                            <strong>{project.teamLeadName}</strong>
                            {getRoleBadge('team_lead')}
                          </div>
                          <div className="assignment-meta">
                            Assigned {formatDate(project.assignedAt)}
                          </div>
                        </div>
                      ) : (
                        <div className="no-assignment">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <span>No team lead assigned</span>
                        </div>
                      )}
                    </div>

                    {/* Team Members Section */}
                    <div className="team-section">
                      <div className="section-header">
                        <h4>Team Members ({(project.teamMembers || []).length})</h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedProject(project);
                            setShowAssignMember(true);
                          }}
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      
                      {(project.teamMembers || []).length > 0 ? (
                        <div className="team-members-list">
                          {project.teamMembers.map((member) => (
                            <div key={member.id} className="team-member-item">
                              <div className="member-info">
                                <strong>{member.name}</strong>
                                {getRoleBadge(member.role)}
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveTeamMember(project, member)}
                                className="btn-danger-outline"
                              >
                                <UserMinus className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-assignment">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>No team members assigned</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Team Leads Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Team Leads Overview</CardTitle>
          <CardDescription>Current workload and availability of team leads</CardDescription>
        </CardHeader>
        <CardContent>
          {teamLeads.length === 0 ? (
            <div className="empty-state">
              <UserCheck className="w-12 h-12 text-gray-400 mb-4" />
              <h3>No team leads available</h3>
              <p>Promote users to team lead role in User Management</p>
            </div>
          ) : (
            <div className="team-leads-grid">
              {teamLeads.map((teamLead) => (
                <div key={teamLead.id} className="team-lead-card">
                  <div className="team-lead-header">
                    <h4>{teamLead.name}</h4>
                    {getRoleBadge(teamLead.role)}
                  </div>
                  <div className="team-lead-content">
                    <div className="workload-info">
                      <span className="workload-label">Workload:</span>
                      <span className={`workload-value ${getWorkloadColor(teamLead.workload || 0, teamLead.maxWorkload || 5)}`}>
                        {teamLead.workload || 0} / {teamLead.maxWorkload || 5}
                      </span>
                    </div>
                    <div className="availability-info">
                      <span className="availability-label">Available:</span>
                      <span className="availability-value">
                        {teamLead.availableCapacity} projects
                      </span>
                    </div>
                    {teamLead.skills && teamLead.skills.length > 0 && (
                      <div className="skills-info">
                        <span className="skills-label">Skills:</span>
                        <div className="skills-list">
                          {teamLead.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                          {teamLead.skills.length > 3 && (
                            <span className="skill-tag">+{teamLead.skills.length - 3} more</span>
                          )}
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

      {/* Assign Team Lead Modal */}
      {showAssignTeamLead && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Assign Team Lead</h2>
              <button onClick={() => setShowAssignTeamLead(false)}>×</button>
            </div>
            <form onSubmit={handleAssignTeamLead}>
              <div className="modal-content">
                <div className="form-group">
                  <label>Select Project</label>
                  <select
                    value={selectedProject?.id || ''}
                    onChange={(e) => {
                      const project = projects.find(p => p.id === e.target.value);
                      setSelectedProject(project);
                    }}
                    required
                  >
                    <option value="">Choose project...</option>
                    {projects.filter(p => !p.teamLeadId).map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name} - {project.clientName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Select Team Lead</label>
                  <select
                    value={selectedTeamLead}
                    onChange={(e) => setSelectedTeamLead(e.target.value)}
                    required
                  >
                    <option value="">Choose team lead...</option>
                    {teamLeads.filter(tl => tl.availableCapacity > 0).map(teamLead => (
                      <option key={teamLead.id} value={teamLead.id}>
                        {teamLead.name} - {teamLead.availableCapacity} slots available
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProject && (
                  <div className="project-preview">
                    <h4>Project Details:</h4>
                    <p><strong>Name:</strong> {selectedProject.name}</p>
                    <p><strong>Client:</strong> {selectedProject.clientName}</p>
                    <p><strong>Status:</strong> {selectedProject.status}</p>
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <Button type="button" variant="outline" onClick={() => setShowAssignTeamLead(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Assign Team Lead
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Team Member Modal */}
      {showAssignMember && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Assign Team Member</h2>
              <button onClick={() => setShowAssignMember(false)}>×</button>
            </div>
            <form onSubmit={handleAssignTeamMember}>
              <div className="modal-content">
                <div className="form-group">
                  <label>Select Project</label>
                  <select
                    value={selectedProject?.id || ''}
                    onChange={(e) => {
                      const project = projects.find(p => p.id === e.target.value);
                      setSelectedProject(project);
                    }}
                    required
                  >
                    <option value="">Choose project...</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name} - {project.clientName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Select Team Member</label>
                  <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    required
                  >
                    <option value="">Choose team member...</option>
                    {teamMembers.filter(tm => 
                      tm.availableCapacity > 0 && 
                      !(selectedProject?.teamMembers || []).find(ptm => ptm.id === tm.id)
                    ).map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name} ({member.role}) - {member.availableCapacity} slots available
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProject && (
                  <div className="project-preview">
                    <h4>Project Details:</h4>
                    <p><strong>Name:</strong> {selectedProject.name}</p>
                    <p><strong>Team Lead:</strong> {selectedProject.teamLeadName || 'Not assigned'}</p>
                    <p><strong>Current Members:</strong> {(selectedProject.teamMembers || []).length}</p>
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <Button type="button" variant="outline" onClick={() => setShowAssignMember(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Assign Team Member
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Hierarchy Modal */}
      {showTeamHierarchy && selectedProject && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h2>Team Hierarchy - {selectedProject.name}</h2>
              <button onClick={() => setShowTeamHierarchy(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="team-hierarchy">
                <div className="project-info">
                  <h3>Project Information</h3>
                  <div className="info-grid">
                    <div><strong>Client:</strong> {selectedProject.clientName}</div>
                    <div><strong>Status:</strong> {getStatusBadge(selectedProject.status)}</div>
                    <div><strong>Created:</strong> {formatDate(selectedProject.createdAt)}</div>
                  </div>
                </div>

                {selectedProject.hierarchy && (
                  <>
                    {selectedProject.hierarchy.teamLead ? (
                      <div className="hierarchy-level">
                        <h4>Team Lead</h4>
                        <div className="hierarchy-member lead">
                          <Crown className="w-5 h-5 text-yellow-600" />
                          <div className="member-details">
                            <strong>{selectedProject.hierarchy.teamLead.name}</strong>
                            <span>{selectedProject.hierarchy.teamLead.email}</span>
                            <div className="workload-badge">
                              Workload: {selectedProject.hierarchy.teamLead.workload}/{selectedProject.hierarchy.teamLead.maxWorkload}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="hierarchy-level">
                        <h4>Team Lead</h4>
                        <div className="no-assignment">
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                          <span>No team lead assigned</span>
                        </div>
                      </div>
                    )}

                    <div className="hierarchy-level">
                      <h4>Team Members ({selectedProject.hierarchy.teamMembers.length})</h4>
                      {selectedProject.hierarchy.teamMembers.length > 0 ? (
                        <div className="hierarchy-members">
                          {selectedProject.hierarchy.teamMembers.map((member) => (
                            <div key={member.id} className="hierarchy-member">
                              <Users className="w-5 h-5 text-blue-600" />
                              <div className="member-details">
                                <strong>{member.name}</strong>
                                <span>{member.email}</span>
                                <div className="member-meta">
                                  {getRoleBadge(member.role)}
                                  <span className="workload-badge">
                                    Workload: {member.workload}/{member.maxWorkload}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-assignment">
                          <Users className="w-5 h-5 text-gray-400" />
                          <span>No team members assigned</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <Button onClick={() => setShowTeamHierarchy(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;