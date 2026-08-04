import { apiClient } from '../api'

export const authService = {
  login: (payload) => {
    console.log('Login payload:', payload)
    return apiClient
      .post('/api/auth/login', payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.log('Login error:', error.response?.data)
        throw error
      })
  },
  register: (payload) =>
    apiClient.post('/api/auth/register', payload).then((res) => res.data),
}
