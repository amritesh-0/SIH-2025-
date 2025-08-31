import { User, Issue, Department, Analytics } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.citizen@email.com',
    name: 'John Citizen',
    role: 'citizen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    email: 'sarah.staff@city.gov',
    name: 'Sarah Johnson',
    role: 'staff',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    email: 'admin@city.gov',
    name: 'Mike Administrator',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?w=100&h=100&fit=crop'
  }
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing damage to vehicles',
    category: 'road',
    status: 'in-progress',
    priority: 'high',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Main Street, Downtown'
    },
    photos: ['https://images.pexels.com/photos/163780/street-asphalt-road-marking-163780.jpeg?w=400&h=300&fit=crop'],
    reportedBy: '1',
    assignedTo: '2',
    createdAt: '2024-12-15T10:30:00Z',
    updatedAt: '2024-12-15T14:20:00Z',
    upvotes: 12,
    comments: [
      {
        id: '1',
        userId: '2',
        userName: 'Sarah Johnson',
        content: 'We have dispatched a crew to assess the damage. Should be resolved within 48 hours.',
        createdAt: '2024-12-15T14:20:00Z'
      }
    ],
    slaDeadline: '2024-12-17T10:30:00Z'
  },
  {
    id: '2',
    title: 'Broken Streetlight',
    description: 'Streetlight not working, area is dark at night',
    category: 'streetlight',
    status: 'pending',
    priority: 'medium',
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: '456 Park Avenue, Midtown'
    },
    photos: ['https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg?w=400&h=300&fit=crop'],
    reportedBy: '1',
    createdAt: '2024-12-14T18:45:00Z',
    updatedAt: '2024-12-14T18:45:00Z',
    upvotes: 8,
    comments: [],
    slaDeadline: '2024-12-16T18:45:00Z'
  },
  {
    id: '3',
    title: 'Overflowing Garbage Bins',
    description: 'Multiple garbage bins overflowing, attracting pests',
    category: 'garbage',
    status: 'resolved',
    priority: 'medium',
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: '789 Broadway, Theater District'
    },
    photos: ['https://images.pexels.com/photos/2982100/pexels-photo-2982100.jpeg?w=400&h=300&fit=crop'],
    reportedBy: '1',
    assignedTo: '2',
    createdAt: '2024-12-13T09:15:00Z',
    updatedAt: '2024-12-14T16:30:00Z',
    upvotes: 15,
    comments: [
      {
        id: '2',
        userId: '2',
        userName: 'Sarah Johnson',
        content: 'Issue has been resolved. Additional bins have been placed.',
        createdAt: '2024-12-14T16:30:00Z'
      }
    ],
    slaDeadline: '2024-12-15T09:15:00Z'
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Roads & Infrastructure',
    category: 'road',
    staffCount: 25,
    activeIssues: 18,
    avgResolutionTime: 3.2,
    slaCompliance: 87
  },
  {
    id: '2',
    name: 'Waste Management',
    category: 'garbage',
    staffCount: 15,
    activeIssues: 8,
    avgResolutionTime: 1.5,
    slaCompliance: 95
  },
  {
    id: '3',
    name: 'Public Utilities',
    category: 'streetlight',
    staffCount: 12,
    activeIssues: 5,
    avgResolutionTime: 2.1,
    slaCompliance: 92
  }
];

export const mockAnalytics: Analytics = {
  totalIssues: 156,
  resolvedIssues: 128,
  avgResolutionTime: 2.8,
  slaCompliance: 89,
  topCategories: [
    { category: 'Road', count: 45 },
    { category: 'Garbage', count: 32 },
    { category: 'Streetlight', count: 28 },
    { category: 'Water', count: 25 },
    { category: 'Electricity', count: 26 }
  ],
  weeklyTrends: [
    { week: 'Week 1', count: 23 },
    { week: 'Week 2', count: 31 },
    { week: 'Week 3', count: 28 },
    { week: 'Week 4', count: 34 },
    { week: 'Week 5', count: 40 }
  ],
  wardData: [
    { ward: 'Downtown', issues: 45 },
    { ward: 'Midtown', issues: 38 },
    { ward: 'Uptown', issues: 32 },
    { ward: 'East Side', issues: 25 },
    { ward: 'West Side', issues: 16 }
  ]
};