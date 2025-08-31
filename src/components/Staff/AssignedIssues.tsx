import React, { useState } from 'react';
import { Filter, Download, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { mockIssues } from '../../data/mockData';

const AssignedIssues: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  const assignedIssues = mockIssues.filter(issue => issue.assignedTo === '2');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'acknowledged': return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'resolved': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-blue-100 text-blue-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Assigned Issues</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Categories</option>
            <option value="road">Roads</option>
            <option value="garbage">Garbage</option>
            <option value="streetlight">Streetlight</option>
            <option value="water">Water</option>
            <option value="electricity">Electricity</option>
          </select>

          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="deadline">SLA Deadline</option>
            <option value="priority">Priority</option>
            <option value="created">Date Created</option>
            <option value="status">Status</option>
          </select>

          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SLA Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignedIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{issue.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{issue.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize text-sm text-gray-700">{issue.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{issue.location.address}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityBadge(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(issue.status)}
                      <span className="text-sm capitalize">{issue.status.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">
                      {new Date(issue.slaDeadline).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(issue.slaDeadline) < new Date() ? 'Overdue' : 'On track'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-teal-500 text-white text-xs rounded-lg hover:bg-teal-600 transition-colors">
                        Update
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg hover:bg-gray-200 transition-colors">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedIssues;