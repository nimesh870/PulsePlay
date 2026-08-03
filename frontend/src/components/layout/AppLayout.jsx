import Sidebar from './Sidebar'
import Header from './Header'
import BottomTabNavigator from './BottomTabNavigator'
import MusicPlayer from '../player/MusicPlayer'
import MobilePlayer from '../player/MobilePlayer'

/**
 * Application shell: desktop sidebar, sticky header, scrollable content,
 * sticky desktop player and the mobile bottom bar + compact player.
 *
 * `player` and `header` props are forwarded to the relevant components.
 */
export default function AppLayout({
  children,
  active,
  onSelect,
  playlists,
  user,
  searchValue,
  onSearchChange,
  onUpload,
  onNavigate,
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  muted,
  shuffle,
  repeat,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onLike,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
  onOpenQueue,
}) {
  return (
    <div className="relative flex h-dvh overflow-hidden bg-base text-ink-100">
      <Sidebar
        active={active}
        onSelect={onSelect}
        playlists={playlists}
        user={user}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          user={user}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onUpload={onUpload}
          onNavigate={onNavigate}
        />

        <main className="flex-1 overflow-y-auto scrollbar-none pb-44 lg:pb-8">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
            {children}
          </div>
        </main>

        <MusicPlayer
          track={track}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          muted={muted}
          shuffle={shuffle}
          repeat={repeat}
          onPlayPause={onPlayPause}
          onNext={onNext}
          onPrev={onPrev}
          onSeek={onSeek}
          onLike={onLike}
          onVolumeChange={onVolumeChange}
          onToggleMute={onToggleMute}
          onToggleShuffle={onToggleShuffle}
          onToggleRepeat={onToggleRepeat}
          onOpenQueue={onOpenQueue}
          className="hidden lg:flex"
        />
      </div>

      <MobilePlayer
        track={track}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={onPlayPause}
        onNext={onNext}
        onSeek={onSeek}
      />

      <BottomTabNavigator active={active} onSelect={onSelect} />
    </div>
  )
}
