import React, { useState } from 'react';
import { Plus, Filter, MapPin, TrendingUp } from 'lucide-react';
import Map from '../UI/Map';
import IssueCard from '../UI/IssueCard';
import StatsCard from '../UI/StatsCard';
import { mockIssues } from '../../data/mockData';

interface CitizenDashboardProps {
  onNavigate: (page: string) => void;
}

const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('community');
  
  const myIssues = mockIssues.filter(issue => issue.reportedBy === '1');
  const communityIssues = mockIssues;
  const resolvedIssues = mockIssues.filter(issue => issue.status === 'resolved');

  const getTabContent = () => {
    switch (activeTab) {
      case 'my-reports':
        return myIssues;
      case 'community':
        return communityIssues;
      case 'resolved':
        return resolvedIssues;
      default:
        return communityIssues;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="My Reports"
          value={myIssues.length}
          subtitle="Total submitted"
          icon={<MapPin className="w-6 h-6" />}
          color="teal"
        />
        <StatsCard
          title="In Progress"
          value={myIssues.filter(i => i.status === 'in-progress').length}
          subtitle="Being resolved"
          icon={<TrendingUp className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Resolved"
          value={myIssues.filter(i => i.status === 'resolved').length}
          subtitle="Successfully fixed"
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
        />
        <StatsCard
          title="Community Impact"
          value={myIssues.reduce((sum, issue) => sum + issue.upvotes, 0)}
          subtitle="Total upvotes received"
          icon={<TrendingUp className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Issues Map</h2>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>
        <Map 
          issues={communityIssues} 
          showReportButton={true}
          onReportClick={() => onNavigate('report-issue')}
          className="h-96"
        />
      </div>

      {/* Issues Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'community', label: 'Community Issues', count: communityIssues.length },
              { id: 'my-reports', label: 'My Reports', count: myIssues.length },
              { id: 'resolved', label: 'Resolved', count: resolvedIssues.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getTabContent().map((issue) => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                showActions={true}
                onClick={() => console.log('View issue:', issue.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;