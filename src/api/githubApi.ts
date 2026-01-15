import { API_BASE_URL } from '@/lib/apiConfig';

const GITHUB_API_BASE_URL = `${API_BASE_URL}/github`;

export const githubApi = {
  getRepos: async (username: string) => {
    const response = await fetch(`${GITHUB_API_BASE_URL}/repos?username=${encodeURIComponent(username)}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch repos: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  getRepoDetails: async (owner: string, repo: string) => {
    const response = await fetch(`${GITHUB_API_BASE_URL}/repo/${owner}/${repo}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch repo details: ${response.status} - ${errorText}`);
    }
    return response.json();
  }
};