import { apiClient } from '../api'

export const albumService = {
  fetchAll: () =>
    apiClient.get('/music/view-albums').then((res) => res.data.albums ?? []),
  fetchById: (id) =>
    apiClient.get(`/music/view-albums/${id}`).then((res) => res.data.album),
  create: (payload) =>
    apiClient.post('/music/album', payload).then((res) => res.data.album),
}
