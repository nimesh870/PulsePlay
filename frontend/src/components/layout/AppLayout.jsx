import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import Header from './Header'
import BottomTabNavigator from './BottomTabNavigator'
import MusicPlayer from '../player/MusicPlayer'
import MobilePlayer from '../player/MobilePlayer'
import GlobalAudio from '../player/GlobalAudio'
import { logout } from '../../store/slices/authSlice'
import {
  togglePlay,
  next,
  prev,
  seek,
  setVolume,
  toggleMute,
  toggleShuffle,
  toggleRepeat,
} from '../../store/slices/playerSlice'
import { toggleLike, selectLikedIds } from '../../store/slices/likesSlice'

const navRoutes = {
  home: '/home',
  search: '/search',
  library: '/library',
  'liked-songs': '/liked-songs',
  upload: '/upload-music',
  'create-album': '/create-album',
  profile: '/library',
}

const menuRoutes = {
  Profile: '/library',
  'Liked Songs': '/liked-songs',
  'Create Album': '/create-album',
  'Upload Music': '/upload-music',
  Settings: '/library',
  'Log out': 'logout',
}

function getActiveId(pathname) {
  if (pathname.startsWith('/search')) return 'search'
  if (pathname.startsWith('/library')) return 'library'
  if (pathname.startsWith('/liked-songs')) return 'liked-songs'
  if (pathname.startsWith('/create-album')) return 'create-album'
  if (pathname.startsWith('/upload-music')) return 'upload'
  return 'home'
}

/**
 * Application shell: desktop sidebar, sticky header, scrollable routed
 * content, sticky desktop player, the mobile bottom bar + compact player and
 * the hidden global <audio> engine. All state comes from Redux.
 */
export default function AppLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const user = useSelector((state) => state.auth.user)
  const player = useSelector((state) => state.player)
  const likedIds = useSelector(selectLikedIds)
  const isArtist = user?.role === 'artist'

  const active = getActiveId(location.pathname)
  const searchValue = searchParams.get('q') ?? ''
  const currentTrack = player.current
    ? { ...player.current, liked: likedIds.includes(player.current.id) }
    : null

  useEffect(() => {
    const onUnauthorized = () => {
      dispatch(logout())
      navigate('/login', { replace: true })
    }
    window.addEventListener('auth:unauthorized', onUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized)
  }, [dispatch, navigate])

  const onSelect = (id) => navigate(navRoutes[id] ?? '/home')

  const onNavigate = (label) => {
    const target = menuRoutes[label]
    if (target === 'logout') {
      dispatch(logout())
      navigate('/login', { replace: true })
    } else if (target) {
      navigate(target)
    }
  }

  const onSearchChange = (value) => {
    if (location.pathname !== '/search') {
      navigate(`/search?q=${encodeURIComponent(value)}`)
    } else {
      setSearchParams(value ? { q: value } : {})
    }
  }

  return (
    <div className="relative flex h-dvh overflow-hidden bg-base text-ink-100">
      <GlobalAudio />

      <Sidebar active={active} onSelect={onSelect} user={user} isArtist={isArtist} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          user={user}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onUpload={() => navigate('/upload-music')}
          onNavigate={onNavigate}
          isArtist={isArtist}
        />

        <main className="flex-1 overflow-y-auto scrollbar-none pb-44 lg:pb-8">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
            <Outlet />
          </div>
        </main>

        <MusicPlayer
          track={currentTrack}
          isPlaying={player.isPlaying}
          currentTime={player.currentTime}
          duration={player.duration}
          volume={player.volume}
          muted={player.muted}
          shuffle={player.shuffle}
          repeat={player.repeat}
          onPlayPause={() => dispatch(togglePlay())}
          onNext={() => dispatch(next())}
          onPrev={() => dispatch(prev())}
          onSeek={(time) => dispatch(seek(time))}
          onLike={() => {
            if (player.current) dispatch(toggleLike(player.current.id))
          }}
          onVolumeChange={(value) => dispatch(setVolume(value))}
          onToggleMute={() => dispatch(toggleMute())}
          onToggleShuffle={() => dispatch(toggleShuffle())}
          onToggleRepeat={() => dispatch(toggleRepeat())}
          onOpenQueue={() => {}}
          className="hidden lg:flex"
        />
      </div>

      <MobilePlayer
        track={player.current}
        isPlaying={player.isPlaying}
        currentTime={player.currentTime}
        duration={player.duration}
        onPlayPause={() => dispatch(togglePlay())}
        onNext={() => dispatch(next())}
        onSeek={(time) => dispatch(seek(time))}
      />

      <BottomTabNavigator active={active} onSelect={onSelect} />
    </div>
  )
}
