import { apiClient } from '../api'

export const authService = {
  login: (payload) => apiClient.post('/auth/login', payload).then((res) => res.data),
  register: (payload) => apiClient.post('/auth/register', payload).then((res) => res.data),
}
