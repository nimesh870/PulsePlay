import {
  RiHome5Line,
  RiSearchLine,
  RiPlayList2Line,
  RiHeart3Line,
  RiUpload2Line,
  RiAlbumLine,
  RiUserLine,
} from 'react-icons/ri'

/**
 * App navigation structure shared by the desktop sidebar and the mobile
 * bottom tab bar. UI configuration only — no content data.
 */
export const primaryNav = [
  { id: 'home', label: 'Home', icon: RiHome5Line },
  { id: 'search', label: 'Search', icon: RiSearchLine },
  { id: 'library', label: 'Your Library', icon: RiPlayList2Line },
]

export const createNav = [
  { id: 'liked-songs', label: 'Liked Songs', icon: RiHeart3Line },
  { id: 'upload', label: 'Upload Music', icon: RiUpload2Line },
  { id: 'create-album', label: 'Create Album', icon: RiAlbumLine },
]

export const mobileNav = [
  { id: 'home', label: 'Home', icon: RiHome5Line },
  { id: 'search', label: 'Search', icon: RiSearchLine },
  { id: 'library', label: 'Library', icon: RiPlayList2Line },
  { id: 'profile', label: 'Profile', icon: RiUserLine },
]
