# Role Hierarchy and Access Control Documentation

## Updated Access Control Structure

### Role Definitions

#### **Super Admin** 
- **Classification**: System Administrator
- **Permissions**: 
  - Full system access
  - Create user accounts (all roles except Super Admin)
  - Manage GitHub integration
  - Access all projects and repositories
  - Team assignment management

#### **Manager** (formerly Admin)
- **Classification**: Project Manager 
- **Permissions**:
  - Create and manage projects
  - Create repositories for their projects
  - View assigned projects only
  - Cannot create user accounts
  - Cannot access system administration

#### **Team Lead**
- **Classification**: Team Leadership
- **Permissions**:
  - Manage assigned team members
  - View assigned projects only
  - Cannot create user accounts
  - Cannot create projects or repositories

#### **Executive**
- **Classification**: Business Role
- **Permissions**:
  - View assigned projects
  - Read-only access to project information
  - Cannot create accounts, projects, or repositories

#### **Developer**
- **Classification**: Development Team
- **Permissions**:
  - View assigned projects
  - Access to development-related project information
  - Cannot create accounts, projects, or repositories

#### **Viewer**
- **Classification**: Limited Access
- **Permissions**:
  - View assigned projects only
  - Read-only access
  - Cannot create accounts, projects, or repositories

### Access Control Rules

#### **Account Creation**
- ✅ **Super Admin**: Can create Manager, Team Lead, Executive, Developer, Viewer accounts
- ❌ **All Other Roles**: Cannot create any accounts
- ❌ **No One**: Can create Super Admin accounts (manual system setup only)

#### **Administrator Classification**
- ✅ **Super Admin**: Only role with administrator privileges
- ❌ **All Other Roles**: Non-administrative users with specific functional roles

#### **Project Management**
- ✅ **Super Admin**: Full project access and creation
- ✅ **Manager**: Can create projects and repositories
- ✅ **Team Lead**: View assigned projects only
- ✅ **Executive/Developer/Viewer**: View assigned projects only

#### **Team Management**
- ✅ **Super Admin**: Full team assignment control via Team Management interface
- ❌ **All Other Roles**: Cannot access team management interface

#### **GitHub Integration**
- ✅ **Super Admin**: Configure organization tokens, manage repositories
- ✅ **Manager**: Create repositories for their projects
- ❌ **All Other Roles**: Read-only access to repository information

### Role Hierarchy Enforcement

The system enforces a strict hierarchy where:

1. **Super Admin** is the only true administrator
2. **No role** can create accounts at their level or higher
3. **Only Super Admin** can create user accounts
4. **Manager role** is for project management, not system administration
5. **Team hierarchy** is managed through project assignments, not account creation

### Security Implications

- **Centralized Control**: Only Super Admin has system-level control
- **Principle of Least Privilege**: Each role has minimal required permissions
- **Clear Separation**: Administrative vs. functional roles are distinct
- **Audit Trail**: All account creation and role assignments logged by Super Admin

### Migration Notes

- Existing "Admin" users are now classified as "Managers"
- Manager role maintains project creation capabilities
- Team Management interface restricted to Super Admin only
- Role selection dropdowns updated to prevent privilege escalation

This structure ensures that only designated system administrators (Super Admin) can control user access while maintaining functional role separation for project and team management.