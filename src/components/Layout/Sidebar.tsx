import React from 'react';
import { 
  Home, 
  MapPin, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Target
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentRole: 'citizen' | 'staff' | 'admin';
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentRole, currentPage, onPageChange }) => {
  const getMenuItems = () => {
    switch (currentRole) {
      case 'citizen':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'report-issue', label: 'Report Issue', icon: MapPin },
          { id: 'my-reports', label: 'My Reports', icon: FileText }
        ];
      case 'staff':
        return [
          { id: 'overview', label: 'Overview', icon: Home },
          { id: 'assigned-issues', label: 'Assigned Issues', icon: AlertCircle },
          { id: 'issue-detail', label: 'Issue Details', icon: FileText }
        ];
      case 'admin':
        return [
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'departments', label: 'Departments', icon: Users },
          { id: 'engagement', label: 'Citizen Engagement', icon: Target },
          { id: 'settings', label: 'System Settings', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="font-bold text-gray-900">CivicConnect</h1>
              <p className="text-xs text-gray-500 capitalize">{currentRole} Portal</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 hover:bg-gray-50 ${
                isActive ? 'bg-teal-50 border-r-2 border-teal-500 text-teal-700' : 'text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
              {isOpen && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;