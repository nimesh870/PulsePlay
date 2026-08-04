import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import musicReducer from './slices/musicSlice'
import albumReducer from './slices/albumSlice'
import artistReducer from './slices/artistSlice'
import playerReducer from './slices/playerSlice'
import likesReducer from './slices/likesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    music: musicReducer,
    album: albumReducer,
    artist: artistReducer,
    player: playerReducer,
    likes: likesReducer,
  },
})
