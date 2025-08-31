import React from 'react';
import { AlertTriangle, Clock, CheckCircle2, Users, TrendingUp } from 'lucide-react';
import StatsCard from '../UI/StatsCard';
import IssueCard from '../UI/IssueCard';
import { mockIssues } from '../../data/mockData';

const StaffOverview: React.FC = () => {
  const assignedIssues = mockIssues.filter(issue => issue.assignedTo === '2');
  const pendingIssues = assignedIssues.filter(issue => issue.status === 'pending');
  const inProgressIssues = assignedIssues.filter(issue => issue.status === 'in-progress');
  const urgentIssues = assignedIssues.filter(issue => issue.priority === 'urgent');

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {urgentIssues.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Urgent Issues Require Attention</h3>
              <p className="text-sm text-red-700">
                You have {urgentIssues.length} urgent issue{urgentIssues.length !== 1 ? 's' : ''} that need immediate attention.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Assigned Issues"
          value={assignedIssues.length}
          subtitle="Total active"
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Pending Review"
          value={pendingIssues.length}
          subtitle="Awaiting action"
          icon={<Clock className="w-6 h-6" />}
          color="orange"
        />
        <StatsCard
          title="In Progress"
          value={inProgressIssues.length}
          subtitle="Being worked on"
          icon={<TrendingUp className="w-6 h-6" />}
          color="teal"
        />
        <StatsCard
          title="SLA Compliance"
          value="92%"
          subtitle="On-time resolution"
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="green"
          trend={{ value: "3%", isPositive: true }}
        />
      </div>

      {/* Recent Assignments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Assignments</h2>
          <button 
            className="text-teal-600 hover:text-teal-700 font-medium text-sm"
            onClick={() => console.log('View all assignments')}
          >
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assignedIssues.slice(0, 4).map((issue) => (
            <IssueCard 
              key={issue.id} 
              issue={issue}
              onClick={() => console.log('View issue details:', issue.id)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Priority Queue</h3>
          <p className="text-sm text-gray-600 mb-4">View urgent and high-priority issues</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            View Queue
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Mark Resolved</h3>
          <p className="text-sm text-gray-600 mb-4">Complete and close resolved issues</p>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Update Status
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Performance</h3>
          <p className="text-sm text-gray-600 mb-4">View your resolution metrics</p>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            View Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffOverview;