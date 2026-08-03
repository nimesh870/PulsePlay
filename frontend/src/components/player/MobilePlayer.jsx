import { RiSkipForwardFill, RiMusic2Line } from 'react-icons/ri'
import { cx } from '../../utils/cx'
import IconButton from '../ui/IconButton'
import PlayButton from '../ui/PlayButton'
import Slider from '../ui/Slider'

/**
 * Compact player floating above the mobile bottom nav.
 */
export default function MobilePlayer({
  track,
  isPlaying,
  currentTime = 0,
  duration = 0,
  onPlayPause,
  onNext,
  onSeek,
  className,
}) {
  return (
    <div
      className={cx(
        'fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+4.5rem)] z-30 px-3 lg:hidden',
        className,
      )}
    >
      <div className="relative">
        {/* Seek bar riding the top edge */}
        <div className="absolute inset-x-3 -top-2 z-10">
          <Slider
            ariaLabel="Seek"
            value={currentTime}
            min={0}
            max={duration || 1}
            step={1}
            onChange={onSeek}
          />
        </div>

        <div className="glass flex items-center gap-3 rounded-2xl p-3 shadow-2xl shadow-black/60">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-raised">
            {track?.coverUrl ? (
              <img
                src={track.coverUrl}
                alt={track.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-ink-500">
                <RiMusic2Line aria-hidden="true" />
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink-0">
              {track?.title ?? 'Nothing playing'}
            </p>
            <p className="truncate text-xs text-ink-500">
              {track?.artist ?? 'Tap a track to start'}
            </p>
          </div>

          <PlayButton
            playing={isPlaying}
            size="sm"
            onClick={onPlayPause}
          />
          <IconButton
            icon={RiSkipForwardFill}
            label="Next"
            variant="soft"
            size="sm"
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  )
}
