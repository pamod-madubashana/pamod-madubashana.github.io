import { API_BASE_URL } from '../lib/apiConfig';

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'draft' | 'published';
  thumbnail?: string;
  screenshots?: string[];
  createdAt: string;
  updatedAt: string;
}

interface GetProjectsResponse {
  projects: Project[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const projectApi = {
  getProjects: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    featured?: boolean;
  }): Promise<GetProjectsResponse> => {
    // Build query string from params
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/projects${queryString ? '?' + queryString : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch projects: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  getProject: async (id: string): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch project: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  createProject: async (projectData: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>): Promise<{ message: string; project: Project }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create project: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  updateProject: async (id: string, projectData: Partial<Project>): Promise<{ message: string; project: Project }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update project: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  deleteProject: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete project: ${response.status} - ${errorText}`);
    }
    return response.json();
  },
};