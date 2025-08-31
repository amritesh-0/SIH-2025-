export interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'staff' | 'admin';
  avatar?: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'road' | 'garbage' | 'streetlight' | 'water' | 'electricity';
  status: 'pending' | 'acknowledged' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  photos: string[];
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  comments: Comment[];
  slaDeadline: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  category: string;
  staffCount: number;
  activeIssues: number;
  avgResolutionTime: number;
  slaCompliance: number;
}

export interface Analytics {
  totalIssues: number;
  resolvedIssues: number;
  avgResolutionTime: number;
  slaCompliance: number;
  topCategories: { category: string; count: number }[];
  weeklyTrends: { week: string; count: number }[];
  wardData: { ward: string; issues: number }[];
}