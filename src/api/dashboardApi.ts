import { API_BASE_URL } from '../lib/apiConfig';

export interface DashboardStats {
  articles: {
    total: number;
    published: number;
    drafts: number;
    change: string;
  };
  projects: {
    total: number;
    published: number;
    drafts: number;
    change: string;
  };
  timeline: {
    total: number;
  };
  interests: {
    total: number;
  };
  techSkills: {
    total: number;
  };
  users: {
    total: number;
    change: string;
  };
  engagement: {
    views: number;
    rate: string;
    change: string;
  };
}

export interface RecentActivity {
  id: string;
  title: string;
  type: 'article' | 'project';
  date: string;
  status: 'draft' | 'published';
  author: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: RecentActivity[];
  success: boolean;
}

export interface AnalyticsData {
  monthlyData: {
    month: string;
    articles: number;
    projects: number;
    views: number;
  }[];
  topArticles: any[];
  topProjects: any[];
  success: boolean;
}

export const dashboardApi = {
  getStats: async (token: string): Promise<DashboardData> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch dashboard stats: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  },

  getAnalytics: async (token: string): Promise<AnalyticsData> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/analytics`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch analytics: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  }
};