import { createSlice } from '@reduxjs/toolkit'

const LIKES_KEY = 'pp_likes'

function loadLikes() {
  try {
    const raw = localStorage.getItem(LIKES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persist(ids) {
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify(ids))
  } catch {
    /* storage unavailable */
  }
}

/**
 * Liked track ids. The backend has no like endpoint, so likes are stored
 * locally and merged into the catalog at render time.
 */
const initialState = { ids: loadLikes() }

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike(state, action) {
      const id = action.payload
      const index = state.ids.indexOf(id)
      if (index >= 0) {
        state.ids.splice(index, 1)
      } else {
        state.ids.push(id)
      }
      persist(state.ids)
    },
    clearLikes(state) {
      state.ids = []
      persist(state.ids)
    },
  },
})

export const { toggleLike, clearLikes } = likesSlice.actions

export const selectLikedIds = (state) => state.likes.ids

export default likesSlice.reducer
