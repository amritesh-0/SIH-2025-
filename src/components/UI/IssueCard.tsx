import React from 'react';
import { 
  MapPin, 
  Clock, 
  ThumbsUp, 
  MessageCircle, 
  AlertTriangle,
  CheckCircle2,
  Timer,
  Zap
} from 'lucide-react';
import { Issue } from '../../types';

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
  showActions?: boolean;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick, showActions = false }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'acknowledged': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Zap className="w-4 h-4 text-red-500" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'medium': return <Timer className="w-4 h-4 text-blue-500" />;
      case 'low': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getProgressWidth = (status: string) => {
    switch (status) {
      case 'pending': return '25%';
      case 'acknowledged': return '50%';
      case 'in-progress': return '75%';
      case 'resolved': return '100%';
      default: return '0%';
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{issue.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{issue.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getPriorityIcon(issue.priority)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
            {issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace('-', ' ')}
          </span>
        </div>
      </div>

      {issue.photos.length > 0 && (
        <div className="mb-4">
          <img
            src={issue.photos[0]}
            alt={issue.title}
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {issue.location.address}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-teal-500 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: getProgressWidth(issue.status) }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{issue.upvotes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{issue.comments.length}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {showActions && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>Upvote</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>Comment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueCard;