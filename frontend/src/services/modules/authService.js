import { apiClient } from '../api'

export const authService = {
  login: (payload) => apiClient.post('/api/auth/login', payload).then((res) => res.data),
  register: (payload) => apiClient.post('/api/auth/register', payload).then((res) => res.data),
}
