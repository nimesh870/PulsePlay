import { RiListUnordered, RiMusic2Line } from 'react-icons/ri'
import { cx } from '../../utils/cx'
import LikeButton from '../ui/LikeButton'
import IconButton from '../ui/IconButton'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'
import VolumeControl from './VolumeControl'

/**
 * Full desktop player — sticky bar at the bottom of the app column.
 * Renders a calm "nothing playing" state when no track is provided.
 */
export default function MusicPlayer({
  track,
  isPlaying,
  currentTime = 0,
  duration = 0,
  volume = 100,
  muted = false,
  shuffle = false,
  repeat = false,
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
  className,
}) {
  return (
    <footer
      className={cx(
        'relative z-20 flex h-20 shrink-0 items-center gap-4 border-t border-white/[0.06] bg-overlay/85 px-4 backdrop-blur-2xl',
        className,
      )}
    >
      {/* Track info */}
      <div className="flex w-1/4 min-w-0 items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-raised">
          {track?.coverUrl ? (
            <img
              src={track.coverUrl}
              alt={track.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-ink-500">
              <RiMusic2Line aria-hidden="true" className="text-xl" />
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink-0">
            {track?.title ?? 'Nothing playing'}
          </p>
          <p className="truncate text-xs text-ink-500">
            {track?.artist ?? 'Pick a track to start listening'}
          </p>
        </div>
        <LikeButton
          liked={Boolean(track?.liked)}
          size="sm"
          onClick={onLike}
          className={cx(!track && 'pointer-events-none opacity-0')}
        />
      </div>

      {/* Transport + timeline */}
      <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
          onNext={onNext}
          onPrev={onPrev}
          shuffle={shuffle}
          repeat={repeat}
          onToggleShuffle={onToggleShuffle}
          onToggleRepeat={onToggleRepeat}
        />
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={onSeek}
          className="w-full max-w-xl"
        />
      </div>

      {/* Queue + volume */}
      <div className="flex w-1/4 min-w-0 items-center justify-end gap-3">
        <IconButton
          icon={RiListUnordered}
          label="Open queue"
          variant="ghost"
          size="sm"
          onClick={onOpenQueue}
          className="hidden md:inline-flex"
        />
        <VolumeControl
          volume={volume}
          muted={muted}
          onVolumeChange={onVolumeChange}
          onToggleMute={onToggleMute}
        />
      </div>
    </footer>
  )
}
