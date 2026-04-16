export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = {
  base: API_BASE_URL,
  endpoints: {
    auth: {
      login: `${API_BASE_URL}/login/`,
      signup: `${API_BASE_URL}/signup/`,
      logout: `${API_BASE_URL}/logout/`,
      user: `${API_BASE_URL}/user/`,
    },
    jobs: {
      list: `${API_BASE_URL}/jobs/`,
      detail: (id) => `${API_BASE_URL}/jobs/${id}/`,
      apply: `${API_BASE_URL}/applications/`,
      applications: `${API_BASE_URL}/applications/`,
    },
    analytics: {
      jobs: `${API_BASE_URL}/analytics/jobs/`,
      applications: `${API_BASE_URL}/analytics/apps/`,
    },
  },
};
