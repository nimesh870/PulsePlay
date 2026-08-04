import { Routes, Route, Navigate } from 'react-router'
import ProtectedLayout from './ProtectedLayout'
import RoleBasedRoute from './RoleBasedRoute'
import AppLayout from '../components/layout/AppLayout'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import LibraryPage from '../pages/LibraryPage'
import LikedSongsPage from '../pages/LikedSongsPage'
import AlbumPage from '../pages/AlbumPage'
import ArtistPage from '../pages/ArtistPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import CreateAlbumPage from '../pages/CreateAlbumPage'
import UploadMusicPage from '../pages/UploadMusicPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<ProtectedLayout />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/liked-songs" element={<LikedSongsPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
          <Route path="/artist/:artistId" element={<ArtistPage />} />

          <Route element={<RoleBasedRoute role="artist" />}>
            <Route path="/create-album" element={<CreateAlbumPage />} />
            <Route path="/upload-music" element={<UploadMusicPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
