import { apiClient } from '../api'

export const musicService = {
  fetchAll: () =>
    apiClient.get('/music/listen-music').then((res) => res.data.fetchMusic ?? []),
  upload: (formData) =>
    apiClient
      .post('/music/create-music', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data.music),
}
