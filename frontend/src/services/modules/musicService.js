import { apiClient } from '../api'

export const musicService = {
  fetchAll: () =>
    apiClient.get('/api/music/listen-music').then((res) => res.data.fetchMusic ?? []),
  upload: (formData) =>
    apiClient
      .post('/api/music/create-music', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data.music),
}
