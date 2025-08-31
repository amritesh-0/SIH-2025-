import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Bell, 
  Globe,
  Lock,
  Key,
  Monitor,
  Save
} from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('roles');

  const tabs = [
    { id: 'roles', label: 'Roles & Permissions', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'blockchain', label: 'Blockchain Logs', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const renderRolesSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Roles</h3>
        
        <div className="space-y-4">
          {[
            { role: 'citizen', users: 1234, permissions: ['Report Issues', 'View Community Issues', 'Comment & Vote'] },
            { role: 'staff', users: 45, permissions: ['Manage Assigned Issues', 'Update Status', 'Add Comments'] },
            { role: 'admin', users: 8, permissions: ['Full System Access', 'User Management', 'Analytics'] }
          ].map((roleData) => (
            <div key={roleData.role} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 capitalize">{roleData.role}</h4>
                <span className="text-sm text-gray-500">{roleData.users} users</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {roleData.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Configuration</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Policy
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Strong (12+ chars, mixed case, numbers, symbols)</option>
                <option>Medium (8+ chars, mixed case, numbers)</option>
                <option>Basic (6+ chars)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
                <option>8 hours</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Require 2FA for admin users</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">API Rate Limiting</h4>
                <p className="text-sm text-gray-600">Limit API requests per user</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBlockchainLogs = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Blockchain Verification Logs</h3>
        
        <div className="space-y-4">
          {[
            { id: '1', action: 'Issue Reported', hash: '0x1a2b3c...', timestamp: '2024-12-15T10:30:00Z', verified: true },
            { id: '2', action: 'Status Updated', hash: '0x4d5e6f...', timestamp: '2024-12-15T11:15:00Z', verified: true },
            { id: '3', action: 'Issue Resolved', hash: '0x7g8h9i...', timestamp: '2024-12-15T14:20:00Z', verified: true },
            { id: '4', action: 'Reward Claimed', hash: '0xj1k2l3...', timestamp: '2024-12-15T15:45:00Z', verified: true }
          ].map((log) => (
            <div key={log.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{log.action}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  log.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {log.verified ? 'Verified' : 'Pending'}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Hash: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{log.hash}</code></p>
                <p>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          {[
            { id: 'new-issues', label: 'New Issue Reports', description: 'Notify when citizens report new issues' },
            { id: 'urgent-issues', label: 'Urgent Issues', description: 'Immediate alerts for urgent priority issues' },
            { id: 'sla-warnings', label: 'SLA Warnings', description: 'Alert when issues approach deadline' },
            { id: 'resolution-updates', label: 'Resolution Updates', description: 'Notify when issues are resolved' }
          ].map((notification) => (
            <div key={notification.id} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{notification.label}</h4>
                <p className="text-sm text-gray-600">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'roles' && renderRolesSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'blockchain' && renderBlockchainLogs()}
          {activeTab === 'notifications' && renderNotificationSettings()}
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Reset to Defaults
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;