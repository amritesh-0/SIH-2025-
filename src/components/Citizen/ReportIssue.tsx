import React, { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  Upload, 
  Mic, 
  Car, 
  Trash2, 
  Lightbulb, 
  Droplets, 
  Zap,
  ArrowLeft 
} from 'lucide-react';

interface ReportIssueProps {
  onNavigate: (page: string) => void;
}

const ReportIssue: React.FC<ReportIssueProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState('123 Main Street, Downtown (Auto-detected)');

  const categories = [
    { id: 'road', label: 'Roads & Traffic', icon: Car, color: 'bg-blue-100 text-blue-600' },
    { id: 'garbage', label: 'Waste Management', icon: Trash2, color: 'bg-green-100 text-green-600' },
    { id: 'streetlight', label: 'Street Lighting', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'water', label: 'Water Issues', icon: Droplets, color: 'bg-cyan-100 text-cyan-600' },
    { id: 'electricity', label: 'Electrical', icon: Zap, color: 'bg-purple-100 text-purple-600' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    alert('Issue reported successfully!');
    onNavigate('dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Report an Issue</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">{category.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo/Video Upload */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Photos or Videos</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG, MP4 up to 10MB</p>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Choose Files
            </button>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700">Location automatically detected</span>
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter or verify location..."
              />
            </div>
            <div className="h-48 bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Interactive map preview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
          <div className="space-y-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Describe the issue in detail..."
            />
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Mic className="w-4 h-4" />
                <span>Voice Input</span>
              </button>
              <p className="text-sm text-gray-500">or use voice input to describe the issue</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedCategory || !description.trim()}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:from-teal-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssue;