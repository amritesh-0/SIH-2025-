import React, { useState } from 'react';
import { Filter, Search, ArrowLeft } from 'lucide-react';
import IssueCard from '../UI/IssueCard';
import { mockIssues } from '../../data/mockData';

interface MyReportsProps {
  onNavigate: (page: string) => void;
}

const MyReports: React.FC<MyReportsProps> = ({ onNavigate }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const myIssues = mockIssues.filter(issue => issue.reportedBy === '1');

  const filteredIssues = myIssues.filter(issue => {
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIssues.map((issue) => (
          <IssueCard 
            key={issue.id} 
            issue={issue} 
            showActions={true}
            onClick={() => console.log('View issue details:', issue.id)}
          />
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? 'Try adjusting your search terms.' : 'You haven\'t reported any issues yet.'}
          </p>
          <button
            onClick={() => onNavigate('report-issue')}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
          >
            Report Your First Issue
          </button>
        </div>
      )}
    </div>
  );
};

export default MyReports;