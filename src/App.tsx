import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import TopNavigation from './components/Layout/TopNavigation';
import CitizenDashboard from './components/Citizen/CitizenDashboard';
import ReportIssue from './components/Citizen/ReportIssue';
import MyReports from './components/Citizen/MyReports';
import StaffOverview from './components/Staff/StaffOverview';
import AssignedIssues from './components/Staff/AssignedIssues';
import IssueDetail from './components/Staff/IssueDetail';
import AnalyticsDashboard from './components/Admin/AnalyticsDashboard';
import DepartmentManagement from './components/Admin/DepartmentManagement';
import CitizenEngagementPage from './components/Admin/CitizenEngagementPage';
import SystemSettings from './components/Admin/SystemSettings';
import { mockUsers } from './data/mockData';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentRole, setCurrentRole] = useState<'citizen' | 'staff' | 'admin'>('citizen');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const currentUser = mockUsers.find(user => user.role === currentRole);

  const handleRoleChange = (role: 'citizen' | 'staff' | 'admin') => {
    setCurrentRole(role);
    // Reset to appropriate dashboard for each role
    switch (role) {
      case 'citizen':
        setCurrentPage('dashboard');
        break;
      case 'staff':
        setCurrentPage('overview');
        break;
      case 'admin':
        setCurrentPage('analytics');
        break;
    }
  };

  const renderPageContent = () => {
    // Citizen pages
    if (currentRole === 'citizen') {
      switch (currentPage) {
        case 'dashboard':
          return <CitizenDashboard onNavigate={setCurrentPage} />;
        case 'report-issue':
          return <ReportIssue onNavigate={setCurrentPage} />;
        case 'my-reports':
          return <MyReports onNavigate={setCurrentPage} />;
        default:
          return <CitizenDashboard onNavigate={setCurrentPage} />;
      }
    }

    // Staff pages
    if (currentRole === 'staff') {
      switch (currentPage) {
        case 'overview':
          return <StaffOverview />;
        case 'assigned-issues':
          return <AssignedIssues />;
        case 'issue-detail':
          return <IssueDetail onNavigate={setCurrentPage} />;
        default:
          return <StaffOverview />;
      }
    }

    // Admin pages
    if (currentRole === 'admin') {
      switch (currentPage) {
        case 'analytics':
          return <AnalyticsDashboard />;
        case 'departments':
          return <DepartmentManagement />;
        case 'engagement':
          return <CitizenEngagementPage />;
        case 'settings':
          return <SystemSettings />;
        default:
          return <AnalyticsDashboard />;
      }
    }

    return <CitizenDashboard onNavigate={setCurrentPage} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        currentRole={currentRole}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <TopNavigation
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
      />

      <main className={`transition-all duration-300 pt-16 ${
        isSidebarOpen ? 'ml-64' : 'ml-16'
      }`}>
        <div className="p-6">
          {renderPageContent()}
        </div>
      </main>
    </div>
  );
}

export default App;