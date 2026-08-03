import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { musicService } from '../../services/modules/musicService'
import { normalizeTrack } from '../../utils/normalizers'
import { extractErrorMessage } from '../../utils/errors'

export const fetchMusic = createAsyncThunk(
  'music/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const tracks = await musicService.fetchAll()
      return tracks.map((track) => normalizeTrack(track))
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const uploadMusic = createAsyncThunk(
  'music/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const music = await musicService.upload(formData)
      return normalizeTrack(music)
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusic.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMusic.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(fetchMusic.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(uploadMusic.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(uploadMusic.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items]
        state.status = 'succeeded'
      })
      .addCase(uploadMusic.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { clearError: clearMusicError } = musicSlice.actions

export const selectTracks = (state) => state.music.items

export default musicSlice.reducer
