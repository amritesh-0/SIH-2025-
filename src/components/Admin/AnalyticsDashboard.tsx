import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  MapPin,
  Target
} from 'lucide-react';
import StatsCard from '../UI/StatsCard';
import Chart from '../UI/Chart';
import Map from '../UI/Map';
import { mockAnalytics, mockIssues } from '../../data/mockData';

const AnalyticsDashboard: React.FC = () => {
  const resolvedPercentage = Math.round((mockAnalytics.resolvedIssues / mockAnalytics.totalIssues) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
          </select>
          <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Issues"
          value={mockAnalytics.totalIssues}
          subtitle="All time"
          icon={<BarChart3 className="w-6 h-6" />}
          color="blue"
          trend={{ value: "12%", isPositive: true }}
        />
        <StatsCard
          title="Resolution Rate"
          value={`${resolvedPercentage}%`}
          subtitle={`${mockAnalytics.resolvedIssues} resolved`}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="green"
          trend={{ value: "5%", isPositive: true }}
        />
        <StatsCard
          title="Avg Resolution Time"
          value={`${mockAnalytics.avgResolutionTime} days`}
          subtitle="Department average"
          icon={<Clock className="w-6 h-6" />}
          color="orange"
          trend={{ value: "0.3 days", isPositive: false }}
        />
        <StatsCard
          title="SLA Compliance"
          value={`${mockAnalytics.slaCompliance}%`}
          subtitle="On-time delivery"
          icon={<Target className="w-6 h-6" />}
          color="purple"
          trend={{ value: "2%", isPositive: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="line"
          title="Weekly Issue Trends"
          data={mockAnalytics.weeklyTrends.map(item => ({
            label: item.week,
            value: item.count
          }))}
        />
        <Chart
          type="doughnut"
          title="Issues by Category"
          data={mockAnalytics.topCategories.map((item, index) => ({
            label: item.category,
            value: item.count,
            color: [
              '#14B8A6', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'
            ][index]
          }))}
        />
      </div>

      {/* Map and Ward Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Issues Heatmap</h3>
            <Map issues={mockIssues} className="h-80" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues by Ward</h3>
          <div className="space-y-4">
            {mockAnalytics.wardData.map((ward) => (
              <div key={ward.ward} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{ward.ward}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${(ward.issues / Math.max(...mockAnalytics.wardData.map(w => w.issues))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8">{ward.issues}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Active Wards</h3>
          <div className="space-y-3">
            {mockAnalytics.wardData.slice(0, 3).map((ward, index) => (
              <div key={ward.ward} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                }`}>
                  {index + 1}
                </div>
                <span className="font-medium text-gray-900">{ward.ward}</span>
                <span className="text-sm text-gray-500">{ward.issues} issues</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
          <div className="space-y-3">
            {mockAnalytics.topCategories.slice(0, 3).map((category, index) => (
              <div key={category.category} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{category.category}</span>
                <span className="text-sm font-semibold text-gray-900">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Response Time</span>
              <span className="text-sm font-semibold text-green-600">1.2s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Uptime</span>
              <span className="text-sm font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="text-sm font-semibold text-blue-600">1,234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;