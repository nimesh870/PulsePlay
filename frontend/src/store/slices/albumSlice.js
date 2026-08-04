import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { albumService } from '../../services/modules/albumService'
import { normalizeAlbum, normalizeTrack } from '../../utils/normalizers'
import { extractErrorMessage } from '../../utils/errors'

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const albums = await albumService.fetchAll()
      return albums.map((album) => normalizeAlbum(album))
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const fetchAlbumById = createAsyncThunk(
  'albums/fetchById',
  async (albumId, { rejectWithValue }) => {
    try {
      const album = await albumService.fetchById(albumId)
      const artistName = album.artist?.username || ''
      return {
        album: normalizeAlbum(album),
        tracks: (album.musics ?? []).map((music) =>
          normalizeTrack(music, artistName, album.title),
        ),
      }
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const createAlbum = createAsyncThunk(
  'albums/create',
  async (payload, { rejectWithValue }) => {
    try {
      const album = await albumService.create(payload)
      return normalizeAlbum(album)
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const addAlbumMusic = createAsyncThunk(
  'albums/addMusic',
  async ({ albumId, title, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('music', file)
      formData.append('title', title)
      const album = await albumService.addMusic(albumId, formData)
      const artistName = album.artist?.username || ''
      return {
        album: normalizeAlbum(album),
        tracks: (album.musics ?? []).map((music) =>
          normalizeTrack(music, artistName, album.title),
        ),
      }
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

const initialState = {
  items: [],
  current: null,
  status: 'idle',
  error: null,
}

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchAlbumById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.current = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(fetchAlbumById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(createAlbum.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items]
        state.status = 'succeeded'
      })
      .addCase(createAlbum.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(addAlbumMusic.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(addAlbumMusic.fulfilled, (state, action) => {
        state.current = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(addAlbumMusic.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { clearError: clearAlbumError } = albumSlice.actions

export default albumSlice.reducer
