import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  User, 
  MessageCircle, 
  Camera, 
  ThumbsUp,
  ArrowLeft,
  Save
} from 'lucide-react';
import { mockIssues } from '../../data/mockData';

interface IssueDetailProps {
  onNavigate: (page: string) => void;
}

const IssueDetail: React.FC<IssueDetailProps> = ({ onNavigate }) => {
  const [selectedStatus, setSelectedStatus] = useState('in-progress');
  const [newComment, setNewComment] = useState('');
  
  // Using first issue as example
  const issue = mockIssues[0];

  const handleStatusUpdate = () => {
    alert(`Status updated to: ${selectedStatus}`);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      alert(`Comment added: ${newComment}`);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => onNavigate('overview')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Issue Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issue Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{issue.title}</h2>
                <p className="text-gray-600">{issue.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                issue.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                issue.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {issue.priority} Priority
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Reported by Citizen #123</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{issue.location.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ThumbsUp className="w-4 h-4" />
                <span>{issue.upvotes} community upvotes</span>
              </div>
            </div>

            {/* Photos */}
            {issue.photos.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>Photos</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {issue.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Issue photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Comments & Updates</span>
            </h3>
            
            <div className="space-y-4 mb-6">
              {issue.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">{comment.userName}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                placeholder="Add a comment or update..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Status Update</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="pending">Pending</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <button
                onClick={handleStatusUpdate}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
              >
                <Save className="w-4 h-4" />
                <span>Update Status</span>
              </button>
            </div>
          </div>

          {/* Issue Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Progress Timeline</h3>
            
            <div className="space-y-4">
              {[
                { status: 'Reported', date: issue.createdAt, completed: true },
                { status: 'Acknowledged', date: issue.updatedAt, completed: true },
                { status: 'In Progress', date: issue.updatedAt, completed: issue.status !== 'pending' },
                { status: 'Resolved', date: '', completed: issue.status === 'resolved' }
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    step.completed ? 'bg-teal-500' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      step.completed ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.status}
                    </p>
                    {step.date && (
                      <p className="text-xs text-gray-500">
                        {new Date(step.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">SLA Information</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Deadline:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(issue.slaDeadline).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Time Remaining:</span>
                <span className="text-sm font-medium text-orange-600">2 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-teal-500 to-blue-600 h-2 rounded-full w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;