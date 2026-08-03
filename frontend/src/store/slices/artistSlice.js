import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { artistService } from '../../services/modules/artistService'
import { extractErrorMessage } from '../../utils/errors'

export const fetchArtist = createAsyncThunk(
  'artist/fetchBundle',
  async (artistId, { rejectWithValue }) => {
    try {
      const bundle = await artistService.fetchBundle(artistId)
      if (!bundle.artist) {
        return rejectWithValue('Artist not found')
      }
      return { artistId, ...bundle }
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

const initialState = {
  byId: {},
  status: 'idle',
  error: null,
}

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtist.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchArtist.fulfilled, (state, action) => {
        const { artistId, artist, tracks, albums } = action.payload
        state.byId[artistId] = { artist, tracks, albums }
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(fetchArtist.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { clearError: clearArtistError } = artistSlice.actions

export default artistSlice.reducer
