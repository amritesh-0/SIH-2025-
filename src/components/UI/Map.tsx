import React from 'react';
import { MapPin, Plus } from 'lucide-react';

interface MapProps {
  issues?: any[];
  showReportButton?: boolean;
  onReportClick?: () => void;
  className?: string;
}

const Map: React.FC<MapProps> = ({ 
  issues = [], 
  showReportButton = false, 
  onReportClick,
  className = "h-96"
}) => {
  return (
    <div className={`relative bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg overflow-hidden ${className}`}>
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100" />
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Map Pins */}
      <div className="absolute inset-0 p-4">
        {issues.map((issue, index) => (
          <div
            key={issue.id}
            className="absolute animate-pulse cursor-pointer"
            style={{
              left: `${20 + (index * 15) % 60}%`,
              top: `${30 + (index * 10) % 40}%`
            }}
          >
            <div className="relative group">
              <MapPin 
                className={`w-6 h-6 transform transition-transform group-hover:scale-110 ${
                  issue.priority === 'urgent' ? 'text-red-500' :
                  issue.priority === 'high' ? 'text-orange-500' :
                  issue.priority === 'medium' ? 'text-blue-500' : 'text-gray-500'
                }`} 
              />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {issue.title}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Issue Button */}
      {showReportButton && (
        <button
          onClick={onReportClick}
          className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">Priority Levels</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-xs text-gray-600">Urgent</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-gray-600">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-600">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-600">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;