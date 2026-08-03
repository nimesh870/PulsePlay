import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  queue: [],
  currentIndex: -1,
  current: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 100,
  muted: false,
  shuffle: false,
  repeat: false,
}

const clampIndex = (index, length) =>
  length === 0 ? -1 : ((index % length) + length) % length

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack(state, action) {
      const { track, queue } = action.payload
      state.queue = queue ?? state.queue
      const index = state.queue.findIndex((item) => item.id === track.id)
      state.currentIndex = index >= 0 ? index : 0
      state.current = state.queue[state.currentIndex] ?? null
      state.currentTime = 0
      state.isPlaying = true
    },
    playQueue(state, action) {
      const { tracks, index = 0 } = action.payload
      state.queue = tracks
      state.currentIndex = clampIndex(index, tracks.length)
      state.current = tracks[state.currentIndex] ?? null
      state.currentTime = 0
      state.isPlaying = Boolean(state.current)
    },
    togglePlay(state) {
      if (state.current) {
        state.isPlaying = !state.isPlaying
      }
    },
    pause(state) {
      state.isPlaying = false
    },
    next(state) {
      if (state.queue.length === 0) return
      let index
      if (state.shuffle && state.queue.length > 1) {
        index = Math.floor(Math.random() * state.queue.length)
        if (index === state.currentIndex) {
          index = (index + 1) % state.queue.length
        }
      } else {
        index = (state.currentIndex + 1) % state.queue.length
      }
      state.currentIndex = index
      state.current = state.queue[index]
      state.currentTime = 0
      state.isPlaying = true
    },
    prev(state) {
      if (state.queue.length === 0) return
      state.currentIndex = clampIndex(state.currentIndex - 1, state.queue.length)
      state.current = state.queue[state.currentIndex]
      state.currentTime = 0
      state.isPlaying = true
    },
    seek(state, action) {
      state.currentTime = action.payload
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload
    },
    setDuration(state, action) {
      state.duration = action.payload
    },
    setVolume(state, action) {
      state.volume = action.payload
    },
    toggleMute(state) {
      state.muted = !state.muted
    },
    toggleShuffle(state) {
      state.shuffle = !state.shuffle
    },
    setShuffle(state, action) {
      state.shuffle = action.payload
    },
    toggleRepeat(state) {
      state.repeat = !state.repeat
    },
  },
})

export const {
  playTrack,
  playQueue,
  togglePlay,
  pause,
  next,
  prev,
  seek,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleMute,
  toggleShuffle,
  setShuffle,
  toggleRepeat,
} = playerSlice.actions

export const selectCurrentTrack = (state) => state.player.current

export default playerSlice.reducer
