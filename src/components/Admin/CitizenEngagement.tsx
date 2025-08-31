import React from 'react';
import { 
  Trophy, 
  Users, 
  TrendingUp, 
  Award, 
  Star,
  Medal,
  Target,
  Gift
} from 'lucide-react';
import { mockIssues } from '../../data/mockData';
import StatsCard from '../UI/StatsCard';

const CitizenEngagement: React.FC = () => {
  // Unassigned issues for drag & drop panel
  const unassignedIssues = mockIssues.filter(issue => !issue.assignedTo);
  const topReporters = [
    { id: '1', name: 'John Citizen', reports: 23, points: 1150, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop' },
    { id: '2', name: 'Alice Johnson', reports: 19, points: 950, avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop' },
    { id: '3', name: 'Mike Davis', reports: 17, points: 850, avatar: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?w=100&h=100&fit=crop' },
    { id: '4', name: 'Sarah Wilson', reports: 15, points: 750, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop' },
    { id: '5', name: 'David Brown', reports: 12, points: 600, avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100&h=100&fit=crop' }
  ];

  const rewards = [
    { id: '1', title: 'Civic Champion', description: 'Report 10 issues', points: 500, claimed: 156 },
    { id: '2', title: 'Community Guardian', description: 'Report 25 issues', points: 1000, claimed: 42 },
    { id: '3', title: 'Issue Hunter', description: 'Report 50 issues', points: 2000, claimed: 12 },
    { id: '4', title: 'Quality Reporter', description: '90% accuracy rate', points: 1500, claimed: 28 }
  ];

  return (
  <div className="space-y-10 bg-gray-50 min-h-screen py-10">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Citizen Engagement</h1>
        <button className="px-5 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl shadow hover:scale-105 hover:from-teal-500 hover:to-blue-600 transition-all duration-300">
          Export Leaderboard
        </button>
      </div>

      {/* Engagement Stats */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <StatsCard
          title="Active Citizens"
          value="1,234"
          subtitle="This month"
          icon={<Users className="w-6 h-6" />}
          color="blue"
          trend={{ value: "18%", isPositive: true }}
        />
        <StatsCard
          title="Total Reports"
          value="5,678"
          subtitle="All time"
          icon={<Target className="w-6 h-6" />}
          color="teal"
          trend={{ value: "25%", isPositive: true }}
        />
        <StatsCard
          title="Rewards Claimed"
          value="238"
          subtitle="This quarter"
          icon={<Gift className="w-6 h-6" />}
          color="purple"
        />
        <StatsCard
          title="Avg Engagement"
          value="89%"
          subtitle="User satisfaction"
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
          trend={{ value: "4%", isPositive: true }}
        />
      </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        {/* Leaderboard */}
  <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Top Reporters</span>
            </h3>
            <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>This Month</option>
              <option>This Quarter</option>
              <option>All Time</option>
            </select>
          </div>

          <div className="space-y-4">
            {topReporters.map((reporter, index) => (
              <div
                key={reporter.id}
                className="flex items-center space-x-4 p-4 hover:bg-teal-50 rounded-xl transition-all duration-300 shadow-sm hover:scale-[1.03]"
              >
                <div className="relative">
                  <img
                    src={reporter.avatar}
                    alt={reporter.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {index < 3 && (
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                    }`}>
                      {index + 1}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{reporter.name}</p>
                  <p className="text-sm text-gray-600">{reporter.reports} reports</p>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-teal-600">{reporter.points}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards System */}
  <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-500" />
              <span>Reward System</span>
            </h3>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
              Manage Rewards →
            </button>
          </div>

          <div className="space-y-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="border border-gray-100 rounded-xl p-5 bg-gray-50 hover:bg-white transition-all duration-300 shadow-sm hover:scale-[1.03]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{reward.title}</h4>
                  <span className="text-sm font-semibold text-teal-600">{reward.points} pts</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{reward.claimed} citizens earned this</span>
                  <Medal className="w-4 h-4 text-purple-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unassigned Issues Panel */}
  <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 transition-all duration-300 hover:shadow-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Drag & Drop Assignment</h3>
        <p className="text-sm text-gray-600 mb-6">
          Drag issues from below to department cards above to assign them
        </p>
        
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unassignedIssues.slice(0, 6).map((issue) => (
            <div
              key={issue.id}
              className="p-5 rounded-xl bg-gradient-to-br from-white to-gray-100 shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.03] border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-base">{issue.title}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  issue.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                  issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {issue.priority}
                </span>
              </div>
              <p className="text-xs text-gray-500 capitalize">{issue.category} • {issue.location.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitizenEngagement;