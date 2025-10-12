import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Plus,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import consultationStorage from '../../utils/consultationStorage';
import netlifyAPI from '../../utils/netlifyAPI';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage (set during login)
    const userInfo = localStorage.getItem('adminUser');
    const authToken = localStorage.getItem('adminToken');
    
    if (userInfo && authToken) {
      setUser(JSON.parse(userInfo));
      loadDashboardData(authToken);
    } else {
      setError('Authentication required. Please log in again.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    filterConsultations();
  }, [consultations, searchTerm, statusFilter, dateFilter]);

  const loadDashboardData = async (authToken) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading dashboard data from Netlify Functions...');
      
      // Fetch consultations from Netlify Functions
      const response = await netlifyAPI.getConsultations(authToken);
      
      setConsultations(response.consultations || []);
      
      // Calculate stats from the fetched data
      const dashboardStats = calculateStats(response.consultations || []);
      setStats(dashboardStats);
      
      console.log('Dashboard data loaded successfully:', response);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError(`Failed to load dashboard data: ${error.message}`);
      
      // If token is invalid, redirect to login
      if (error.message.includes('Authentication') || error.message.includes('token')) {
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
        window.location.href = '/admin';
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate dashboard statistics
  const calculateStats = (consultationsData) => {
    const total = consultationsData.length;
    const pending = consultationsData.filter(c => c.status === 'pending').length;
    const inProgress = consultationsData.filter(c => c.status === 'in-progress').length;
    const completed = consultationsData.filter(c => c.status === 'completed').length;
    
    // Calculate this month's consultations
    const now = new Date();
    const thisMonth = consultationsData.filter(c => {
      const createdDate = new Date(c.createdAt);
      return createdDate.getMonth() === now.getMonth() && 
             createdDate.getFullYear() === now.getFullYear();
    }).length;

    return {
      total,
      pending,
      inProgress,
      completed,
      thisMonth,
      conversionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const filterConsultations = () => {
    let filtered = [...consultations];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(consultation => 
        consultation.name?.toLowerCase().includes(searchLower) ||
        consultation.email?.toLowerCase().includes(searchLower) ||
        consultation.company?.toLowerCase().includes(searchLower) ||
        consultation.service?.toLowerCase().includes(searchLower) ||
        consultation.message?.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(consultation => consultation.status === statusFilter);
    }

    // Date filter
    const now = new Date();
    switch (dateFilter) {
      case 'today':
        filtered = filtered.filter(consultation => {
          const consultationDate = new Date(consultation.createdAt);
          return consultationDate.toDateString() === now.toDateString();
        });
        break;
      case 'week':
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(consultation => 
          new Date(consultation.createdAt) >= oneWeekAgo
        );
        break;
      case 'month':
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(consultation => 
          new Date(consultation.createdAt) >= oneMonthAgo
        );
        break;
    }

    setFilteredConsultations(filtered);
  };

  // Handle consultation status update
  const handleStatusUpdate = async (consultationId, newStatus) => {
    try {
      const authToken = localStorage.getItem('adminToken');
      
      await netlifyAPI.updateConsultation(consultationId, { status: newStatus }, authToken);
      
      // Refresh the data
      loadDashboardData(authToken);
      
      console.log(`Consultation ${consultationId} status updated to ${newStatus}`);
      
    } catch (error) {
      console.error('Error updating consultation status:', error);
      setError(`Failed to update consultation: ${error.message}`);
    }
  };

  // Handle consultation deletion
  const handleDeleteConsultation = async (consultationId) => {
    if (!window.confirm('Are you sure you want to delete this consultation?')) {
      return;
    }

    try {
      const authToken = localStorage.getItem('adminToken');
      
      await netlifyAPI.deleteConsultation(consultationId, authToken);
      
      // Refresh the data
      loadDashboardData(authToken);
      
      console.log(`Consultation ${consultationId} deleted successfully`);
      
    } catch (error) {
      console.error('Error deleting consultation:', error);
      setError(`Failed to delete consultation: ${error.message}`);
    }
  };

  // Refresh dashboard data
  const handleRefresh = () => {
    const authToken = localStorage.getItem('adminToken');
    if (authToken) {
      loadDashboardData(authToken);
    }
  };

  const updateConsultationStatus = async (id, status, notes = '') => {
    try {
      const updated = consultationStorage.updateConsultation(id, { status, notes });
      await loadDashboardData();
      
      if (selectedConsultation && selectedConsultation.id === id) {
        setSelectedConsultation(updated);
      }
    } catch (error) {
      console.error('Error updating consultation:', error);
      alert('Error updating consultation status');
    }
  };

  const deleteConsultation = async (id) => {
    if (window.confirm('Are you sure you want to delete this consultation?')) {
      try {
        consultationStorage.deleteConsultation(id);
        await loadDashboardData();
        setShowModal(false);
      } catch (error) {
        console.error('Error deleting consultation:', error);
        alert('Error deleting consultation');
      }
    }
  };

  const exportData = () => {
    consultationStorage.exportConsultations();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      contacted: { color: 'bg-blue-100 text-blue-800', icon: Mail },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
      cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-500`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline w-3 h-3 mr-1" />
            {trendValue} from last period
          </p>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <RefreshCw className="animate-spin w-8 h-8" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage consultation bookings and client inquiries</p>
        </div>
        <div className="header-actions">
          <Button onClick={loadDashboardData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Consultations"
          value={stats.total || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Pending"
          value={stats.pending || 0}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="This Week"
          value={stats.thisWeek || 0}
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Completed"
          value={stats.completed || 0}
          icon={CheckCircle2}
          color="green"
        />
      </div>

      {/* Filters and Search */}
      <Card className="filters-card">
        <CardHeader>
          <CardTitle>Filter Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="filters-container">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Consultations Table */}
      <Card className="consultations-table-card">
        <CardHeader>
          <CardTitle>Consultation Bookings ({filteredConsultations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredConsultations.length === 0 ? (
            <div className="empty-state">
              <Users className="w-12 h-12 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">No consultations found</h3>
              <p className="text-gray-500">No consultation bookings match your current filters.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="consultations-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Contact</th>
                    <th>Project Type</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsultations.map((consultation) => (
                    <tr key={consultation.id}>
                      <td>
                        <div className="client-info">
                          <div className="client-name">{consultation.name}</div>
                          {consultation.company && (
                            <div className="client-company">
                              <Building className="w-3 h-3 mr-1" />
                              {consultation.company}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <div className="contact-item">
                            <Mail className="w-3 h-3 mr-1" />
                            {consultation.email}
                          </div>
                          {consultation.phone && (
                            <div className="contact-item">
                              <Phone className="w-3 h-3 mr-1" />
                              {consultation.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>{consultation.projectType || 'Not specified'}</td>
                      <td>{consultation.budget || 'Not specified'}</td>
                      <td>{getStatusBadge(consultation.status)}</td>
                      <td>{formatDate(consultation.submittedAt)}</td>
                      <td>
                        <div className="action-buttons">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedConsultation(consultation);
                              setShowModal(true);
                            }}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateConsultationStatus(consultation.id, 'contacted')}
                            disabled={consultation.status === 'contacted'}
                          >
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteConsultation(consultation.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
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

      {/* Consultation Detail Modal */}
      {showModal && selectedConsultation && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Consultation Details</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="modal-body">
              <div className="consultation-details">
                <div className="detail-section">
                  <h3>Client Information</h3>
                  <p><strong>Name:</strong> {selectedConsultation.name}</p>
                  <p><strong>Email:</strong> {selectedConsultation.email}</p>
                  {selectedConsultation.phone && (
                    <p><strong>Phone:</strong> {selectedConsultation.phone}</p>
                  )}
                  {selectedConsultation.company && (
                    <p><strong>Company:</strong> {selectedConsultation.company}</p>
                  )}
                  {selectedConsultation.industry && (
                    <p><strong>Industry:</strong> {selectedConsultation.industry}</p>
                  )}
                </div>

                <div className="detail-section">
                  <h3>Project Information</h3>
                  <p><strong>Project Type:</strong> {selectedConsultation.projectType || 'Not specified'}</p>
                  <p><strong>Budget:</strong> {selectedConsultation.budget || 'Not specified'}</p>
                  <p><strong>Timeline:</strong> {selectedConsultation.timeline || 'Not specified'}</p>
                  {selectedConsultation.projectDetails && (
                    <div>
                      <strong>Project Details:</strong>
                      <p className="project-details">{selectedConsultation.projectDetails}</p>
                    </div>
                  )}
                  {selectedConsultation.additionalNotes && (
                    <div>
                      <strong>Additional Notes:</strong>
                      <p className="additional-notes">{selectedConsultation.additionalNotes}</p>
                    </div>
                  )}
                </div>

                <div className="detail-section">
                  <h3>Status & Tracking</h3>
                  <p><strong>Current Status:</strong> {getStatusBadge(selectedConsultation.status)}</p>
                  <p><strong>Submitted:</strong> {formatDate(selectedConsultation.submittedAt)}</p>
                  {selectedConsultation.lastUpdated && (
                    <p><strong>Last Updated:</strong> {formatDate(selectedConsultation.lastUpdated)}</p>
                  )}
                </div>

                <div className="detail-section">
                  <h3>Update Status</h3>
                  <div className="status-buttons">
                    <Button
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'pending')}
                      className={selectedConsultation.status === 'pending' ? 'active' : ''}
                      variant="outline"
                      size="sm"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Pending
                    </Button>
                    <Button
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'contacted')}
                      className={selectedConsultation.status === 'contacted' ? 'active' : ''}
                      variant="outline"
                      size="sm"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contacted
                    </Button>
                    <Button
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'completed')}
                      className={selectedConsultation.status === 'completed' ? 'active' : ''}
                      variant="outline"
                      size="sm"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Completed
                    </Button>
                    <Button
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'cancelled')}
                      className={selectedConsultation.status === 'cancelled' ? 'active' : ''}
                      variant="outline"
                      size="sm"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Cancelled
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;