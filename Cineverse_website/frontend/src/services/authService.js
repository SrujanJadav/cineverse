import api from './api';

const authService = {
  register: (userData) => {
    return api.post('/auth/register', userData);
  },

  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  logout: () => {
    return api.post('/auth/logout');
  },

  forgotPassword: (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword });
  },

  getCurrentUser: () => {
    return api.get('/auth/me');
  }
};

export default authService;
