import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/modules/authService'
import { normalizeUser } from '../../utils/normalizers'
import { extractErrorMessage } from '../../utils/errors'
import { getToken, getUser, setAuth, clearAuth } from '../../utils/storage'

export const login = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.login(payload)
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const register = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.register(payload)
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

const initialState = {
  user: getUser(),
  token: getToken(),
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      clearAuth()
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = normalizeUser(action.payload.user)
        setAuth({ token: action.payload.token, user })
        state.token = action.payload.token
        state.user = user
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        const user = normalizeUser(action.payload.createUser)
        setAuth({ token: action.payload.token, user })
        state.token = action.payload.token
        state.user = user
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions

export default authSlice.reducer
