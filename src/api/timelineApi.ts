import { API_BASE_URL } from '../lib/apiConfig';

export interface TimelineItem {
  _id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  icon: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineResponse {
  success: boolean;
  timeline: TimelineItem[];
}

export const timelineApi = {
  getTimeline: async (): Promise<TimelineItem[]> => {
    const response = await fetch(`${API_BASE_URL}/enhanced-dashboard/timeline`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch timeline: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  },

  getAllTimeline: async (token: string): Promise<TimelineItem[]> => {
    const response = await fetch(`${API_BASE_URL}/timeline`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch all timeline items: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  },

  createTimeline: async (token: string, timelineData: Omit<TimelineItem, '_id' | 'createdAt' | 'updatedAt'>): Promise<TimelineItem> => {
    const response = await fetch(`${API_BASE_URL}/timeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(timelineData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create timeline item: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  },

  updateTimeline: async (token: string, id: string, timelineData: Partial<Omit<TimelineItem, '_id' | 'createdAt' | 'updatedAt'>>): Promise<TimelineItem> => {
    const response = await fetch(`${API_BASE_URL}/timeline/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(timelineData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update timeline item: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  },

  deleteTimeline: async (token: string, id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/timeline/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete timeline item: ${response.status} - ${errorText}`);
    }
  }
};