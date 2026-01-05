import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

export const zonesAPI = {
  list: (page = 1, perPage = 50) => api.get('/zones', { params: { page, per_page: perPage } }),
  get: (zoneId) => api.get(`/zones/${zoneId}`),
  update: (zoneId, settings) => api.patch(`/zones/${zoneId}`, settings),
  getSSL: (zoneId) => api.get(`/zones/${zoneId}/ssl`),
  updateSSL: (zoneId, mode) => api.patch(`/zones/${zoneId}/ssl`, { mode }),
};

export const dnsAPI = {
  list: (zoneId, params) => api.get(`/dns/${zoneId}/records`, { params }),
  create: (zoneId, record) => api.post(`/dns/${zoneId}/records`, record),
  update: (zoneId, recordId, record) => api.put(`/dns/${zoneId}/records/${recordId}`, record),
  delete: (zoneId, recordId) => api.delete(`/dns/${zoneId}/records/${recordId}`),
};

export const analyticsAPI = {
  get: (zoneId, since, until) => api.get(`/analytics/${zoneId}`, { params: { since, until } }),
};

export const cacheAPI = {
  purge: (zoneId, options) => api.post(`/cache/${zoneId}/purge`, options),
};

export default api;
