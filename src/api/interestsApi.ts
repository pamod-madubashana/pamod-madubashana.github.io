import { API_BASE_URL } from '../lib/apiConfig';

export interface Interest {
  _id: string;
  icon: string;
  label: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface InterestsResponse {
  success: boolean;
  interests: Interest[];
}

export const interestsApi = {
  getInterests: async (): Promise<Interest[]> => {
    const response = await fetch(`${API_BASE_URL}/enhanced-dashboard/interests`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch interests: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  },

  getAllInterests: async (token: string): Promise<Interest[]> => {
    const response = await fetch(`${API_BASE_URL}/interests`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch all interests: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  },

  createInterest: async (token: string, interestData: Omit<Interest, '_id' | 'createdAt' | 'updatedAt'>): Promise<Interest> => {
    const response = await fetch(`${API_BASE_URL}/interests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(interestData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create interest: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  },

  updateInterest: async (token: string, id: string, interestData: Partial<Omit<Interest, '_id' | 'createdAt' | 'updatedAt'>>): Promise<Interest> => {
    const response = await fetch(`${API_BASE_URL}/interests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(interestData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update interest: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  },

  deleteInterest: async (token: string, id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/interests/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete interest: ${response.status} - ${errorText}`);
    }
  }
};