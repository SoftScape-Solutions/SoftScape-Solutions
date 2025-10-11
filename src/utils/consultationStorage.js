// Local Storage Service for Consultation Bookings
class ConsultationStorageService {
  constructor() {
    this.storageKey = 'consultation_bookings';
    this.adminKey = 'admin_users'; // Changed to support multiple admins
    this.initializeStorage();
  }

  // Initialize storage with default data if empty
  initializeStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
    
    // Set default admin users array (you should change these)
    if (!localStorage.getItem(this.adminKey)) {
      const defaultAdmins = [
        {
          id: 'admin_1',
          username: 'admin',
          password: 'softscape2024', // Change this!
          email: 'admin@softscape.com',
          role: 'super_admin', // super_admin (Administrator), admin (Manager), team_lead, executive, developer, viewer
          name: 'System Administrator',
          createdAt: new Date().toISOString(),
          lastLogin: null,
          isActive: true,
          skills: ['Project Management', 'System Administration'],
          department: 'Management',
          workload: 0, // Current number of active projects
          maxWorkload: 10, // Maximum projects they can handle
          teamLeadFor: [], // Array of project IDs they lead
          teamMemberOf: [] // Array of project IDs they're member of
        }
      ];
      localStorage.setItem(this.adminKey, JSON.stringify(defaultAdmins));
    }
  }

  // Save a new consultation booking
  async saveConsultation(consultationData) {
    try {
      const consultations = this.getAllConsultations();
      
      const newConsultation = {
        id: this.generateId(),
        ...consultationData,
        submittedAt: new Date().toISOString(),
        status: 'pending', // pending, contacted, completed, cancelled
        notes: '',
        followUpDate: null,
        emailSent: false,
        adminNotified: false
      };

      consultations.push(newConsultation);
      localStorage.setItem(this.storageKey, JSON.stringify(consultations));
      
      // Send automated emails (don't block the main save operation)
      this.sendAutomatedEmails(newConsultation).catch(error => {
        console.error('Email sending failed, but consultation was saved:', error);
      });
      
      return newConsultation;
    } catch (error) {
      console.error('Error saving consultation:', error);
      throw new Error('Failed to save consultation booking');
    }
  }

  // Send automated emails for new consultations
  async sendAutomatedEmails(consultationData) {
    try {
      // Dynamic import to avoid circular dependencies
      const { default: emailService } = await import('./emailService.js');
      
      // Send confirmation email to client
      const clientEmailResult = await emailService.sendConsultationConfirmation(consultationData);
      
      // Send notification email to admin
      const adminEmailResult = await emailService.sendAdminNotification(consultationData);
      
      // Update consultation with email status
      const consultations = this.getAllConsultations();
      const consultationIndex = consultations.findIndex(c => c.id === consultationData.id);
      
      if (consultationIndex !== -1) {
        consultations[consultationIndex].emailSent = clientEmailResult.success;
        consultations[consultationIndex].adminNotified = adminEmailResult.success;
        consultations[consultationIndex].emailSentAt = new Date().toISOString();
        localStorage.setItem(this.storageKey, JSON.stringify(consultations));
      }
      
      return {
        clientEmail: clientEmailResult,
        adminEmail: adminEmailResult
      };
    } catch (error) {
      console.error('Error in automated email sending:', error);
      throw error;
    }
  }

  // Get all consultation bookings
  getAllConsultations() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error retrieving consultations:', error);
      return [];
    }
  }

  // Get consultation by ID
  getConsultationById(id) {
    const consultations = this.getAllConsultations();
    return consultations.find(consultation => consultation.id === id);
  }

  // Update consultation status and notes
  updateConsultation(id, updates) {
    try {
      const consultations = this.getAllConsultations();
      const index = consultations.findIndex(consultation => consultation.id === id);
      
      if (index !== -1) {
        consultations[index] = {
          ...consultations[index],
          ...updates,
          lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem(this.storageKey, JSON.stringify(consultations));
        return consultations[index];
      }
      
      throw new Error('Consultation not found');
    } catch (error) {
      console.error('Error updating consultation:', error);
      throw error;
    }
  }

  // Delete consultation
  deleteConsultation(id) {
    try {
      const consultations = this.getAllConsultations();
      const filteredConsultations = consultations.filter(consultation => consultation.id !== id);
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredConsultations));
      return true;
    } catch (error) {
      console.error('Error deleting consultation:', error);
      return false;
    }
  }

  // Get consultations by status
  getConsultationsByStatus(status) {
    const consultations = this.getAllConsultations();
    return consultations.filter(consultation => consultation.status === status);
  }

  // Get consultations by date range
  getConsultationsByDateRange(startDate, endDate) {
    const consultations = this.getAllConsultations();
    return consultations.filter(consultation => {
      const consultationDate = new Date(consultation.submittedAt);
      return consultationDate >= new Date(startDate) && consultationDate <= new Date(endDate);
    });
  }

  // Search consultations by name, email, or company
  searchConsultations(searchTerm) {
    const consultations = this.getAllConsultations();
    const lowercaseSearch = searchTerm.toLowerCase();
    
    return consultations.filter(consultation =>
      consultation.name?.toLowerCase().includes(lowercaseSearch) ||
      consultation.email?.toLowerCase().includes(lowercaseSearch) ||
      consultation.company?.toLowerCase().includes(lowercaseSearch) ||
      consultation.phone?.includes(searchTerm)
    );
  }

  // Get dashboard statistics
  getDashboardStats() {
    const consultations = this.getAllConsultations();
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return {
      total: consultations.length,
      pending: consultations.filter(c => c.status === 'pending').length,
      contacted: consultations.filter(c => c.status === 'contacted').length,
      completed: consultations.filter(c => c.status === 'completed').length,
      thisWeek: consultations.filter(c => new Date(c.submittedAt) >= oneWeekAgo).length,
      thisMonth: consultations.filter(c => new Date(c.submittedAt) >= oneMonthAgo).length,
      byProjectType: this.groupByField(consultations, 'projectType'),
      byBudget: this.groupByField(consultations, 'budget'),
      recentBookings: consultations
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
        .slice(0, 5)
    };
  }

  // Helper function to group consultations by field
  groupByField(consultations, field) {
    return consultations.reduce((acc, consultation) => {
      const value = consultation[field] || 'Not specified';
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  // Generate unique ID
  generateId() {
    return 'consultation_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Admin authentication
  validateAdmin(username, password) {
    try {
      const adminData = localStorage.getItem(this.adminKey);
      if (!adminData) return false;
      
      const admins = JSON.parse(adminData);
      const admin = admins.find(a => a.username === username && a.password === password && a.isActive);
      
      if (admin) {
        // Update last login time
        admin.lastLogin = new Date().toISOString();
        localStorage.setItem(this.adminKey, JSON.stringify(admins));
        return admin;
      }
      
      return false;
    } catch (error) {
      console.error('Error validating admin:', error);
      return false;
    }
  }

  // Get all admin users
  getAllAdmins() {
    try {
      const adminData = localStorage.getItem(this.adminKey);
      return adminData ? JSON.parse(adminData) : [];
    } catch (error) {
      console.error('Error retrieving admins:', error);
      return [];
    }
  }

  // Add new admin user
  addAdmin(adminData, currentAdminId) {
    try {
      const admins = this.getAllAdmins();
      const currentAdmin = admins.find(a => a.id === currentAdminId);
      
      // Only super_admin can add new admins
      if (!currentAdmin || currentAdmin.role !== 'super_admin') {
        throw new Error('Only super administrators can add new admin users');
      }

      // Check if username already exists
      if (admins.some(a => a.username === adminData.username)) {
        throw new Error('Username already exists');
      }

      // Check if email already exists
      if (admins.some(a => a.email === adminData.email)) {
        throw new Error('Email already exists');
      }

      const newAdmin = {
        id: 'admin_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        username: adminData.username,
        password: adminData.password,
        email: adminData.email,
        role: adminData.role || 'admin',
        name: adminData.name,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        isActive: true,
        createdBy: currentAdminId
      };

      admins.push(newAdmin);
      localStorage.setItem(this.adminKey, JSON.stringify(admins));
      
      return newAdmin;
    } catch (error) {
      console.error('Error adding admin:', error);
      throw error;
    }
  }

  // Update admin user
  updateAdmin(adminId, updates, currentAdminId) {
    try {
      const admins = this.getAllAdmins();
      const currentAdmin = admins.find(a => a.id === currentAdminId);
      const targetAdmin = admins.find(a => a.id === adminId);

      if (!targetAdmin) {
        throw new Error('Admin user not found');
      }

      // Check permissions
      if (currentAdmin.role !== 'super_admin' && currentAdminId !== adminId) {
        throw new Error('You can only update your own account');
      }

      // Prevent changing role unless super_admin
      if (updates.role && currentAdmin.role !== 'super_admin') {
        throw new Error('Only super administrators can change user roles');
      }

      // Check if new username/email conflicts
      if (updates.username && admins.some(a => a.username === updates.username && a.id !== adminId)) {
        throw new Error('Username already exists');
      }

      if (updates.email && admins.some(a => a.email === updates.email && a.id !== adminId)) {
        throw new Error('Email already exists');
      }

      // Update admin
      const adminIndex = admins.findIndex(a => a.id === adminId);
      admins[adminIndex] = {
        ...admins[adminIndex],
        ...updates,
        lastUpdated: new Date().toISOString(),
        updatedBy: currentAdminId
      };

      localStorage.setItem(this.adminKey, JSON.stringify(admins));
      return admins[adminIndex];
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
  }

  // Delete admin user
  deleteAdmin(adminId, currentAdminId) {
    try {
      const admins = this.getAllAdmins();
      const currentAdmin = admins.find(a => a.id === currentAdminId);
      const targetAdmin = admins.find(a => a.id === adminId);

      if (!targetAdmin) {
        throw new Error('Admin user not found');
      }

      // Only super_admin can delete users
      if (currentAdmin.role !== 'super_admin') {
        throw new Error('Only super administrators can delete admin users');
      }

      // Cannot delete yourself
      if (currentAdminId === adminId) {
        throw new Error('You cannot delete your own account');
      }

      // Cannot delete the last super_admin
      const superAdmins = admins.filter(a => a.role === 'super_admin' && a.isActive);
      if (targetAdmin.role === 'super_admin' && superAdmins.length === 1) {
        throw new Error('Cannot delete the last super administrator');
      }

      const filteredAdmins = admins.filter(a => a.id !== adminId);
      localStorage.setItem(this.adminKey, JSON.stringify(filteredAdmins));
      
      return true;
    } catch (error) {
      console.error('Error deleting admin:', error);
      throw error;
    }
  }

  // Activate/Deactivate admin user
  toggleAdminStatus(adminId, currentAdminId) {
    try {
      const admins = this.getAllAdmins();
      const currentAdmin = admins.find(a => a.id === currentAdminId);
      const targetAdmin = admins.find(a => a.id === adminId);

      if (!targetAdmin) {
        throw new Error('Admin user not found');
      }

      // Only super_admin can toggle status
      if (currentAdmin.role !== 'super_admin') {
        throw new Error('Only super administrators can activate/deactivate users');
      }

      // Cannot deactivate yourself
      if (currentAdminId === adminId) {
        throw new Error('You cannot deactivate your own account');
      }

      // Cannot deactivate the last active super_admin
      const activeSuperAdmins = admins.filter(a => a.role === 'super_admin' && a.isActive);
      if (targetAdmin.role === 'super_admin' && activeSuperAdmins.length === 1 && targetAdmin.isActive) {
        throw new Error('Cannot deactivate the last active super administrator');
      }

      const adminIndex = admins.findIndex(a => a.id === adminId);
      admins[adminIndex].isActive = !admins[adminIndex].isActive;
      admins[adminIndex].lastUpdated = new Date().toISOString();
      admins[adminIndex].updatedBy = currentAdminId;

      localStorage.setItem(this.adminKey, JSON.stringify(admins));
      return admins[adminIndex];
    } catch (error) {
      console.error('Error toggling admin status:', error);
      throw error;
    }
  }

  // Get admin by ID
  getAdminById(adminId) {
    const admins = this.getAllAdmins();
    return admins.find(a => a.id === adminId);
  }

  // Update admin credentials
  updateAdminCredentials(currentPassword, newCredentials) {
    try {
      const adminData = localStorage.getItem(this.adminKey);
      if (!adminData) throw new Error('Admin not found');
      
      const admin = JSON.parse(adminData);
      if (admin.password !== currentPassword) {
        throw new Error('Current password is incorrect');
      }
      
      const updatedAdmin = { ...admin, ...newCredentials };
      localStorage.setItem(this.adminKey, JSON.stringify(updatedAdmin));
      return true;
    } catch (error) {
      console.error('Error updating admin credentials:', error);
      throw error;
    }
  }

  // Export data as JSON
  exportConsultations() {
    const consultations = this.getAllConsultations();
    const dataStr = JSON.stringify(consultations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `consultations_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Import data from JSON
  importConsultations(jsonData) {
    try {
      const importedData = JSON.parse(jsonData);
      if (!Array.isArray(importedData)) {
        throw new Error('Invalid data format');
      }
      
      const currentConsultations = this.getAllConsultations();
      const mergedConsultations = [...currentConsultations, ...importedData];
      
      localStorage.setItem(this.storageKey, JSON.stringify(mergedConsultations));
      return mergedConsultations.length;
    } catch (error) {
      console.error('Error importing consultations:', error);
      throw error;
    }
  }

  // ===================== PROJECT MANAGEMENT METHODS =====================

  // Convert consultation to project
  convertToProject(consultationId, projectData) {
    try {
      const consultations = this.getAllConsultations();
      const consultation = consultations.find(c => c.id === consultationId);
      
      if (!consultation) {
        throw new Error('Consultation not found');
      }

      const projectId = this.generateProjectId();
      const project = {
        id: projectId,
        consultationId: consultationId,
        name: projectData.name,
        description: projectData.description,
        clientName: consultation.name,
        clientEmail: consultation.email,
        clientCompany: consultation.company,
        projectType: consultation.service,
        status: 'planning', // planning, active, completed, on-hold, cancelled
        createdAt: new Date().toISOString(),
        startDate: projectData.startDate || null,
        estimatedEndDate: projectData.estimatedEndDate || null,
        actualEndDate: null,
        budget: projectData.budget || null,
        technologies: projectData.technologies || [],
        teamMembers: projectData.teamMembers || [],
        repositoryInfo: null, // Will be populated when repo is created
        milestones: [],
        notes: projectData.notes || '',
        createdBy: projectData.createdBy || 'admin'
      };

      // Update consultation status to 'converted'
      const consultationIndex = consultations.findIndex(c => c.id === consultationId);
      consultations[consultationIndex].status = 'converted';
      consultations[consultationIndex].projectId = projectId;
      consultations[consultationIndex].convertedAt = new Date().toISOString();

      // Save updated consultation
      localStorage.setItem(this.storageKey, JSON.stringify(consultations));

      // Save project
      this.saveProject(project);

      return project;
    } catch (error) {
      console.error('Error converting consultation to project:', error);
      throw error;
    }
  }

  // Generate project ID
  generateProjectId() {
    return 'proj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Save project
  saveProject(project) {
    try {
      const projects = this.getAllProjects();
      projects.push(project);
      localStorage.setItem('softscape_projects', JSON.stringify(projects));
      return project;
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  }

  // Get all projects
  getAllProjects() {
    try {
      const projectsData = localStorage.getItem('softscape_projects');
      return projectsData ? JSON.parse(projectsData) : [];
    } catch (error) {
      console.error('Error getting projects:', error);
      return [];
    }
  }

  // Get project by ID
  getProject(projectId) {
    const projects = this.getAllProjects();
    return projects.find(p => p.id === projectId);
  }

  // Update project
  updateProject(projectId, updateData) {
    try {
      const projects = this.getAllProjects();
      const projectIndex = projects.findIndex(p => p.id === projectId);
      
      if (projectIndex === -1) {
        throw new Error('Project not found');
      }

      projects[projectIndex] = {
        ...projects[projectIndex],
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('softscape_projects', JSON.stringify(projects));
      return projects[projectIndex];
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // Add repository info to project
  addRepositoryToProject(projectId, repositoryInfo) {
    return this.updateProject(projectId, {
      repositoryInfo: {
        name: repositoryInfo.repository.name,
        url: repositoryInfo.url,
        cloneUrl: repositoryInfo.cloneUrl,
        sshUrl: repositoryInfo.sshUrl,
        createdAt: new Date().toISOString(),
        ...repositoryInfo
      }
    });
  }

  // Add team member to project
  addTeamMember(projectId, teamMember) {
    const project = this.getProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const updatedTeamMembers = [...project.teamMembers, {
      ...teamMember,
      addedAt: new Date().toISOString()
    }];

    return this.updateProject(projectId, { teamMembers: updatedTeamMembers });
  }

  // Remove team member from project
  removeTeamMember(projectId, memberUsername) {
    const project = this.getProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const updatedTeamMembers = project.teamMembers.filter(
      member => member.username !== memberUsername
    );

    return this.updateProject(projectId, { teamMembers: updatedTeamMembers });
  }

  // Add milestone to project
  addMilestone(projectId, milestone) {
    const project = this.getProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const newMilestone = {
      id: this.generateId(),
      ...milestone,
      createdAt: new Date().toISOString(),
      status: 'pending' // pending, in-progress, completed
    };

    const updatedMilestones = [...project.milestones, newMilestone];
    return this.updateProject(projectId, { milestones: updatedMilestones });
  }

  // Update milestone
  updateMilestone(projectId, milestoneId, updateData) {
    const project = this.getProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const updatedMilestones = project.milestones.map(milestone =>
      milestone.id === milestoneId
        ? { ...milestone, ...updateData, updatedAt: new Date().toISOString() }
        : milestone
    );

    return this.updateProject(projectId, { milestones: updatedMilestones });
  }

  // Get projects by status
  getProjectsByStatus(status) {
    const projects = this.getAllProjects();
    return projects.filter(p => p.status === status);
  }

  // Get consultations that can be converted to projects
  getConvertibleConsultations() {
    const consultations = this.getAllConsultations();
    return consultations.filter(c => 
      c.status === 'completed' && !c.projectId
    );
  }

  // ===================== TEAM MANAGEMENT METHODS =====================

  // Assign team lead to project (super admin only)
  assignTeamLeadToProject(projectId, teamLeadId, assignedBy) {
    try {
      const project = this.getProject(projectId);
      const teamLead = this.getAdminById(teamLeadId);
      
      if (!project) {
        throw new Error('Project not found');
      }
      
      if (!teamLead || teamLead.role !== 'team_lead') {
        throw new Error('Team lead not found or invalid role');
      }

      // Update project with team lead
      const updatedProject = this.updateProject(projectId, {
        teamLeadId: teamLeadId,
        teamLeadName: teamLead.name,
        assignedBy: assignedBy,
        assignedAt: new Date().toISOString()
      });

      // Update team lead's workload
      this.updateAdminWorkload(teamLeadId, 'add', projectId);

      // Log the assignment
      this.logTeamAction('assign_team_lead', {
        projectId,
        teamLeadId,
        teamLeadName: teamLead.name,
        assignedBy,
        timestamp: new Date().toISOString()
      });

      return updatedProject;
    } catch (error) {
      console.error('Error assigning team lead to project:', error);
      throw error;
    }
  }

  // Remove team lead from project
  removeTeamLeadFromProject(projectId, removedBy) {
    try {
      const project = this.getProject(projectId);
      
      if (!project) {
        throw new Error('Project not found');
      }

      const oldTeamLeadId = project.teamLeadId;
      const oldTeamLeadName = project.teamLeadName;

      // Update project
      const updatedProject = this.updateProject(projectId, {
        teamLeadId: null,
        teamLeadName: null,
        removedBy: removedBy,
        removedAt: new Date().toISOString()
      });

      // Update team lead's workload
      if (oldTeamLeadId) {
        this.updateAdminWorkload(oldTeamLeadId, 'remove', projectId);
      }

      // Log the removal
      this.logTeamAction('remove_team_lead', {
        projectId,
        oldTeamLeadId,
        oldTeamLeadName,
        removedBy,
        timestamp: new Date().toISOString()
      });

      return updatedProject;
    } catch (error) {
      console.error('Error removing team lead from project:', error);
      throw error;
    }
  }

  // Assign team member to team lead (team lead can do this)
  assignTeamMemberToProject(projectId, memberId, assignedBy) {
    try {
      const project = this.getProject(projectId);
      const member = this.getAdminById(memberId);
      
      if (!project) {
        throw new Error('Project not found');
      }
      
      if (!member || (member.role !== 'developer' && member.role !== 'admin')) {
        throw new Error('Team member not found or invalid role');
      }

      // Check if assignedBy is team lead of this project or super admin
      const assignerRole = this.getAdminById(assignedBy);
      if (assignerRole.role !== 'super_admin' && project.teamLeadId !== assignedBy) {
        throw new Error('Only project team lead or super admin can assign team members');
      }

      // Add member to project team if not already added
      const currentTeamMembers = project.teamMembers || [];
      const memberExists = currentTeamMembers.find(tm => tm.id === memberId);
      
      if (memberExists) {
        throw new Error('Member already assigned to this project');
      }

      const newTeamMember = {
        id: memberId,
        name: member.name,
        username: member.username,
        role: member.role,
        assignedAt: new Date().toISOString(),
        assignedBy: assignedBy
      };

      const updatedTeamMembers = [...currentTeamMembers, newTeamMember];
      const updatedProject = this.updateProject(projectId, { teamMembers: updatedTeamMembers });

      // Update member's workload
      this.updateAdminWorkload(memberId, 'add', projectId);

      // Log the assignment
      this.logTeamAction('assign_team_member', {
        projectId,
        memberId,
        memberName: member.name,
        assignedBy,
        timestamp: new Date().toISOString()
      });

      return updatedProject;
    } catch (error) {
      console.error('Error assigning team member to project:', error);
      throw error;
    }
  }

  // Remove team member from project
  removeTeamMemberFromProject(projectId, memberId, removedBy) {
    try {
      const project = this.getProject(projectId);
      
      if (!project) {
        throw new Error('Project not found');
      }

      // Check permissions
      const removerRole = this.getAdminById(removedBy);
      if (removerRole.role !== 'super_admin' && project.teamLeadId !== removedBy) {
        throw new Error('Only project team lead or super admin can remove team members');
      }

      const currentTeamMembers = project.teamMembers || [];
      const memberToRemove = currentTeamMembers.find(tm => tm.id === memberId);
      
      if (!memberToRemove) {
        throw new Error('Member not found in project team');
      }

      const updatedTeamMembers = currentTeamMembers.filter(tm => tm.id !== memberId);
      const updatedProject = this.updateProject(projectId, { teamMembers: updatedTeamMembers });

      // Update member's workload
      this.updateAdminWorkload(memberId, 'remove', projectId);

      // Log the removal
      this.logTeamAction('remove_team_member', {
        projectId,
        memberId,
        memberName: memberToRemove.name,
        removedBy,
        timestamp: new Date().toISOString()
      });

      return updatedProject;
    } catch (error) {
      console.error('Error removing team member from project:', error);
      throw error;
    }
  }

  // Update admin workload
  updateAdminWorkload(adminId, action, projectId) {
    try {
      const admins = this.getAllAdmins();
      const adminIndex = admins.findIndex(a => a.id === adminId);
      
      if (adminIndex === -1) {
        throw new Error('Admin not found');
      }

      if (action === 'add') {
        admins[adminIndex].teamLeadFor = admins[adminIndex].teamLeadFor || [];
        admins[adminIndex].teamMemberOf = admins[adminIndex].teamMemberOf || [];
        
        if (admins[adminIndex].role === 'team_lead') {
          if (!admins[adminIndex].teamLeadFor.includes(projectId)) {
            admins[adminIndex].teamLeadFor.push(projectId);
          }
        } else {
          if (!admins[adminIndex].teamMemberOf.includes(projectId)) {
            admins[adminIndex].teamMemberOf.push(projectId);
          }
        }
        
        admins[adminIndex].workload = (admins[adminIndex].workload || 0) + 1;
      } else if (action === 'remove') {
        if (admins[adminIndex].role === 'team_lead') {
          admins[adminIndex].teamLeadFor = (admins[adminIndex].teamLeadFor || []).filter(id => id !== projectId);
        } else {
          admins[adminIndex].teamMemberOf = (admins[adminIndex].teamMemberOf || []).filter(id => id !== projectId);
        }
        
        admins[adminIndex].workload = Math.max((admins[adminIndex].workload || 0) - 1, 0);
      }

      localStorage.setItem(this.adminKey, JSON.stringify(admins));
      return admins[adminIndex];
    } catch (error) {
      console.error('Error updating admin workload:', error);
      throw error;
    }
  }

  // Get projects accessible to a specific admin based on their role and assignments
  getAccessibleProjects(adminId) {
    try {
      const admin = this.getAdminById(adminId);
      const allProjects = this.getAllProjects();
      
      if (!admin) {
        return [];
      }

      // Super admins can see all projects
      if (admin.role === 'super_admin') {
        return allProjects;
      }

      // Team leads can see projects they're assigned to
      if (admin.role === 'team_lead') {
        return allProjects.filter(project => 
          admin.teamLeadFor && admin.teamLeadFor.includes(project.id)
        );
      }

      // Developers/admins can see projects they're team members of
      if (admin.role === 'developer' || admin.role === 'admin') {
        return allProjects.filter(project => 
          admin.teamMemberOf && admin.teamMemberOf.includes(project.id)
        );
      }

      // Viewers see no projects by default
      return [];
    } catch (error) {
      console.error('Error getting accessible projects:', error);
      return [];
    }
  }

  // Get available team leads (users with team_lead role)
  getAvailableTeamLeads() {
    const admins = this.getAllAdmins();
    return admins.filter(admin => 
      admin.role === 'team_lead' && admin.isActive
    ).map(admin => ({
      ...admin,
      currentProjects: admin.teamLeadFor ? admin.teamLeadFor.length : 0,
      availableCapacity: (admin.maxWorkload || 5) - (admin.workload || 0)
    }));
  }

  // Get available team members (developers and admins not assigned to max projects)
  getAvailableTeamMembers() {
    const admins = this.getAllAdmins();
    return admins.filter(admin => 
      (admin.role === 'developer' || admin.role === 'admin') && 
      admin.isActive &&
      (admin.workload || 0) < (admin.maxWorkload || 5)
    ).map(admin => ({
      ...admin,
      currentProjects: admin.teamMemberOf ? admin.teamMemberOf.length : 0,
      availableCapacity: (admin.maxWorkload || 5) - (admin.workload || 0)
    }));
  }

  // Log team management actions
  logTeamAction(action, data) {
    try {
      const logs = JSON.parse(localStorage.getItem('team_management_log') || '[]');
      logs.push({
        action,
        ...data,
        id: Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      });

      // Keep only last 1000 logs
      if (logs.length > 1000) {
        logs.splice(0, logs.length - 1000);
      }

      localStorage.setItem('team_management_log', JSON.stringify(logs));
    } catch (error) {
      console.error('Error logging team action:', error);
    }
  }

  // Get team management logs
  getTeamManagementLogs() {
    try {
      return JSON.parse(localStorage.getItem('team_management_log') || '[]');
    } catch (error) {
      console.error('Error getting team management logs:', error);
      return [];
    }
  }

  // Get team hierarchy for a project
  getProjectTeamHierarchy(projectId) {
    try {
      const project = this.getProject(projectId);
      
      if (!project) {
        return null;
      }

      const teamLead = project.teamLeadId ? this.getAdminById(project.teamLeadId) : null;
      const teamMembers = (project.teamMembers || []).map(member => 
        this.getAdminById(member.id)
      ).filter(Boolean);

      return {
        project: {
          id: project.id,
          name: project.name,
          status: project.status
        },
        teamLead: teamLead ? {
          id: teamLead.id,
          name: teamLead.name,
          username: teamLead.username,
          email: teamLead.email,
          workload: teamLead.workload || 0,
          maxWorkload: teamLead.maxWorkload || 5
        } : null,
        teamMembers: teamMembers.map(member => ({
          id: member.id,
          name: member.name,
          username: member.username,
          email: member.email,
          role: member.role,
          workload: member.workload || 0,
          maxWorkload: member.maxWorkload || 5
        }))
      };
    } catch (error) {
      console.error('Error getting project team hierarchy:', error);
      return null;
    }
  }
}

// Create singleton instance
const consultationStorage = new ConsultationStorageService();

export default consultationStorage;