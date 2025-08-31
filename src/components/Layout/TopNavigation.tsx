import React from 'react';
import { Bell, Search, Menu, X, User } from 'lucide-react';

interface TopNavigationProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  currentUser: any;
  onRoleChange: (role: 'citizen' | 'staff' | 'admin') => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ 
  isSidebarOpen, 
  onToggleSidebar, 
  currentUser,
  onRoleChange 
}) => {
  return (
    <header className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-100 shadow-sm z-30 transition-all duration-300 ${
      isSidebarOpen ? 'left-64' : 'left-16'
    }`}>
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Role Switcher for Demo */}
          <select
            value={currentUser?.role || 'citizen'}
            onChange={(e) => onRoleChange(e.target.value as 'citizen' | 'staff' | 'admin')}
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="citizen">Citizen</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3">
            <img
              src={currentUser?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop'}
              alt={currentUser?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{currentUser?.name || 'John Citizen'}</p>
              <p className="text-xs text-gray-500 capitalize">{currentUser?.role || 'citizen'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;