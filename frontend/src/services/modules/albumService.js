import { apiClient } from '../api'

export const albumService = {
  fetchAll: () =>
    apiClient.get('/api/music/view-albums').then((res) => res.data.albums ?? []),
  fetchById: (id) =>
    apiClient.get(`/api/music/view-albums/${id}`).then((res) => res.data.album),
  create: (payload) =>
    apiClient.post('/api/music/album', payload).then((res) => res.data.album),
  addMusic: (albumId, formData) =>
    apiClient
      .post(`/api/music/album/${albumId}/add-music`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data.album),
}
