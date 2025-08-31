import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Target, 
  Plus, 
  Edit, 
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { mockDepartments, mockIssues } from '../../data/mockData';

const DepartmentManagement: React.FC = () => {
  const [draggedIssue, setDraggedIssue] = useState<string | null>(null);

  const unassignedIssues = mockIssues.filter(issue => !issue.assignedTo);

  const handleDragStart = (issueId: string) => {
    setDraggedIssue(issueId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, departmentId: string) => {
    e.preventDefault();
    if (draggedIssue) {
      alert(`Issue ${draggedIssue} assigned to department ${departmentId}`);
      setDraggedIssue(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDepartments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, dept.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{dept.name}</h3>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Edit className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Staff</p>
                    <p className="font-semibold text-gray-900">{dept.staffCount}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-500">Active Issues</p>
                    <p className="font-semibold text-gray-900">{dept.activeIssues}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Resolution</span>
                  <span className="font-medium">{dept.avgResolutionTime} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">SLA Compliance</span>
                  <span className={`font-medium ${
                    dept.slaCompliance >= 90 ? 'text-green-600' : 
                    dept.slaCompliance >= 80 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {dept.slaCompliance}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      dept.slaCompliance >= 90 ? 'bg-green-500' : 
                      dept.slaCompliance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${dept.slaCompliance}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Issue Assignment Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Unassigned Issues</h3>
            <span className="text-sm text-gray-500">{unassignedIssues.length} items</span>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {unassignedIssues.map((issue) => (
              <div
                key={issue.id}
                draggable
                onDragStart={() => handleDragStart(issue.id)}
                className="p-4 border border-gray-200 rounded-lg cursor-move hover:border-teal-300 hover:bg-teal-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{issue.title}</p>
                    <p className="text-sm text-gray-600 capitalize">{issue.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      issue.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {issue.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Overview</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-800">Assignment Tips</h4>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Drag issues from the left panel to assign them</li>
                <li>• Consider department capacity and expertise</li>
                <li>• Urgent issues should be assigned immediately</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Unassigned</span>
                  <span className="font-medium">{unassignedIssues.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Urgent Priority</span>
                  <span className="font-medium text-red-600">
                    {unassignedIssues.filter(i => i.priority === 'urgent').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Age</span>
                  <span className="font-medium">2.3 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;