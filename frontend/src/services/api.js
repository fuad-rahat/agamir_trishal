import axios from 'axios';

const normalizeApiBase = (value) => {
  if (!value) return 'http://localhost:5000/api';
  const trimmed = value.trim().replace(/\/+$/, '');
  if (trimmed.endsWith('/api')) return trimmed;
  return `${trimmed}/api`;
};

const API_BASE = normalizeApiBase(process.env.REACT_APP_API_URL || 'http://localhost:5000');

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminName');
      localStorage.removeItem('adminRole');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Unions API
export const unionsAPI = {
  getAll: () => api.get('/unions'),
  getById: (id) => api.get(`/unions/${id}`),
  create: (data) => api.post('/unions', data),
  update: (id, data) => api.put(`/unions/${id}`, data),
};

// Problems API
export const problemsAPI = {
  getAll: (params = {}) => api.get('/problems', { params }),
  getByUnion: (unionId) => api.get(`/problems/union/${unionId}`),
  getStats: (unionId) => api.get(`/problems/stats/${unionId}`),
  create: (data) => api.post('/problems', data),
  updateStatus: (id, status) => api.put(`/problems/${id}/status`, { status }),
  upvote: (id) => api.put(`/problems/${id}/upvote`),
};

// Polling Stations API
export const pollingStationsAPI = {
  getAll: () => api.get('/polling-stations'),
  getByUnion: (unionId) => api.get(`/polling-stations/union/${unionId}`),
  create: (data) => api.post('/polling-stations', data),
  update: (id, data) => api.put(`/polling-stations/${id}`, data),
  verify: (id) => api.put(`/polling-stations/${id}/verify`),
  delete: (id) => api.delete(`/polling-stations/${id}`),
};

// Infrastructure API
export const infrastructureAPI = {
  getAll: (params = {}) => api.get('/infrastructure', { params }),
  getByUnion: (unionId) => api.get(`/infrastructure/union/${unionId}`),
  getSummary: (unionId) => api.get(`/infrastructure/summary/${unionId}`),
  create: (data) => api.post('/infrastructure', data),
  update: (id, data) => api.put(`/infrastructure/${id}`, data),
  delete: (id) => api.delete(`/infrastructure/${id}`),
};

// Helpline API
export const helplineAPI = {
  getAll: () => api.get('/helpline'),
  getByCategory: (category) => api.get(`/helpline/category/${category}`),
  create: (data) => api.post('/helpline', data),
  update: (id, data) => api.put(`/helpline/${id}`, data),
  delete: (id) => api.delete(`/helpline/${id}`),
};

// Admin API
export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  register: (data) => api.post('/admin/register', data),
  getAll: () => api.get('/admin/admins'),
  delete: (id) => api.delete(`/admin/admins/${id}`),
  getDashboard: () => api.get('/admin/dashboard'),
  getPendingProblems: () => api.get('/admin/problems/pending'),
  approveProblem: (id) => api.put(`/admin/problems/${id}/approve`),
  hideProblem: (id) => api.put(`/admin/problems/${id}/hide`),
  initializeAdmin: () => api.post('/admin/initialize'),
};

export default api;
