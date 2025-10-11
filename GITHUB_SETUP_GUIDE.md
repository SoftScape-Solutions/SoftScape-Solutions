# GitHub Integration Setup Guide for Super Admins

## Backend GitHub Service Setup

The SoftScape Admin Dashboard uses a centralized GitHub service that requires **one-time setup by a super admin**. Regular admins can then create repositories without needing individual tokens.

### Super Admin Setup Process

#### Step 1: Access GitHub Management

1. **Login as Super Admin**
   - Only super admins can configure the organization token
   - Go to Admin Panel → "GitHub Management" tab

2. **Service Overview**
   - View current GitHub service status
   - Check if organization token is configured
   - Access repository management tools

#### Step 2: Create Organization Access Token

1. **Go to GitHub Settings**
   - Visit [https://github.com/settings/tokens](https://github.com/settings/tokens)
   - Or: GitHub → Profile → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a descriptive name like "SoftScape Organization Token"
   - Set expiration (recommended: 90 days or custom)

3. **Select Required Scopes**
   - ✅ **repo** (Full control of private repositories)
   - ✅ **admin:org** (Full control of orgs and teams, read and write org projects)
   - ✅ **user** (Read user info)
   - ✅ **project** (Read/write access to user and org projects)

4. **Generate and Copy Token**
   - Click "Generate token"
   - **Important**: Copy the token immediately (you won't see it again!)
   - Token format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### Step 3: Configure in Admin Dashboard

1. **Access Token Configuration**
   - In GitHub Management tab, click "Configure Token"
   - Enter your organization access token
   - Click "Configure Token"

2. **Verify Configuration**
   - Service status should show "Ready"
   - Organization access should be confirmed
   - Token info displays configured user and date

### Admin Repository Creation Process

Once the super admin has configured the organization token, all admins can:

#### 1. **Convert Consultation to Project**
   - Go to "Projects & Repos" tab
   - Click "Create Project" button
   - Select a completed consultation
   - Fill in project details
   - Click "Create Project"

#### 2. **Create GitHub Repository**
   - In the project card, click "Create Repo"
   - Configure repository settings:
     - **Name**: Auto-filled from project name (can customize)
     - **Description**: Auto-filled from project description
     - **Privacy**: Private (recommended) or Public
     - **Initialize**: Creates README, basic structure
     - **Collaborators**: Add team members by GitHub username

#### 3. **Automatic Features**
   - Repository naming: `project-name-proj_timestamp_id`
   - Professional README with project and client details
   - Basic folder structure (src/, docs/, tests/)
   - Project configuration file with metadata
   - Audit logging of all repository actions

### Repository Management Features

#### **Super Admin GitHub Management:**
- **View All Repositories**: Complete list of organization repositories
- **Repository Details**: View collaborators, commits, branches
- **Manage Collaborators**: Add/remove team members
- **Delete Repositories**: Remove repositories when needed
- **Audit Logs**: Track all repository actions and changes
- **Token Management**: Update or remove organization token

#### **Repository Structure Created:**
```
your-project-name-proj_123456789/
├── README.md                 # Professional project overview
├── project-config.json       # Project metadata and settings
├── src/                      # Source code directory
├── docs/                     # Documentation directory
└── tests/                    # Test files directory
```

#### **Automatic README Content:**
- Project and consultation IDs
- Client information
- Creation date and organization
- Professional project structure
- Development guidelines
- Contact information

### Security and Access Control

#### **Token Security:**
- **One Token**: Single organization token managed by super admin
- **Centralized Control**: No individual admin tokens required
- **Audit Trail**: All actions logged with admin attribution
- **Role-Based Access**: Only super admins can manage GitHub configuration

#### **Repository Security:**
- **Private by Default**: All client repositories created as private
- **Permission Control**: Granular collaborator permissions (pull/push/admin)
- **Organization Management**: All repositories under SoftScape-Solutions organization

#### **Access Levels:**
- **Super Admin**: Full GitHub management, token configuration, repository deletion
- **Admin**: Repository creation, collaborator management for their projects
- **Viewer**: Read-only access to project information

### Troubleshooting

#### **Common Issues:**

1. **"GitHub service not configured"**
   - Contact super admin to configure organization token
   - Verify super admin has completed token setup

2. **"Service Not Ready" for repository creation**
   - Organization token may have expired
   - Super admin needs to update token in GitHub Management

3. **"Permission denied" for repository operations**
   - Check if token has correct scopes (repo, admin:org)
   - Verify super admin has organization admin access

4. **Repository creation fails**
   - Repository name conflicts are automatically handled
   - Check organization limits and permissions
   - Verify token is still valid

#### **Super Admin Actions:**

1. **Update Token**: Remove old token and configure new one
2. **Check Service Status**: Monitor GitHub service health
3. **Review Audit Logs**: Track repository actions and user activity
4. **Manage Repositories**: Delete or transfer repositories as needed

### Service Status Indicators

#### **Dashboard Indicators:**
- **Service Status**: Ready / Not Configured
- **Token Status**: Configured / Missing
- **Organization Access**: Granted / Denied
- **Last Configuration**: Date and configuring admin

#### **Project Management Alerts:**
- Service alert shows when GitHub is not configured
- Repository creation buttons disabled when service not ready
- Clear messaging directs admins to contact super admin

### Contact and Support

For GitHub integration issues:
- **Super Admin**: Configure organization token and manage repositories
- **Technical Support**: softscapesolution@outlook.com
- **Organization**: SoftScape-Solutions on GitHub

---

**Important**: This backend approach ensures security and centralized control while providing seamless repository creation for all admin users. Only super admins need GitHub organization access.