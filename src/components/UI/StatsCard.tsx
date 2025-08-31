import React, { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'teal' | 'blue' | 'green' | 'orange' | 'red' | 'purple';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend,
  color = 'teal'
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'teal': return 'from-teal-500 to-teal-600';
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'orange': return 'from-orange-500 to-orange-600';
      case 'red': return 'from-red-500 to-red-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      default: return 'from-teal-500 to-teal-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '↗' : '↘'} {trend.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last week</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(color)} rounded-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;