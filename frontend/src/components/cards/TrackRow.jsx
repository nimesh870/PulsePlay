import { RiPlayFill, RiMore2Fill } from 'react-icons/ri'
import { cx } from '../../utils/cx'
import { formatDuration } from '../../utils/format'
import LikeButton from '../ui/LikeButton'
import Equalizer from '../ui/Equalizer'

/**
 * Horizontal track row used in tracklists and albums.
 * The row index morphs into a play control on hover.
 * @param {object} props
 * @param {object} props.track - { title, artist, coverUrl, duration, liked }
 */
export default function TrackRow({
  index = 0,
  track,
  playing = false,
  onPlay,
  onSelect,
  onLike,
  onMore,
  className,
}) {
  return (
    <div
      onClick={onSelect}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={
        onSelect
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect()
              }
            }
          : undefined
      }
      className={cx(
        'group/row flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-200 focus-visible:outline-none',
        onSelect && 'cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-500/50',
        playing ? 'bg-white/[0.05]' : 'hover:bg-white/[0.05]',
        className,
      )}
    >
      {/* Index / play / equalizer */}
      <div className="relative flex h-9 w-8 shrink-0 items-center justify-center">
        <span
          className={cx(
            'text-sm tabular-nums text-ink-500 transition-opacity duration-200',
            onPlay && 'group-hover/row:opacity-0',
            playing && 'text-accent-400',
          )}
        >
          {playing ? <Equalizer /> : String(index + 1).padStart(2, '0')}
        </span>
        {onPlay && (
          <button
            type="button"
            aria-label={`Play ${track?.title ?? 'track'}`}
            className="focus-ring absolute inset-0 flex items-center justify-center text-ink-0 opacity-0 transition-all duration-200 group-hover/row:opacity-100"
            onClick={(event) => {
              event.stopPropagation()
              onPlay()
            }}
          >
            <RiPlayFill aria-hidden="true" className="translate-x-[1px]" />
          </button>
        )}
      </div>

      {/* Cover thumbnail */}
      {track?.coverUrl && (
        <img
          src={track.coverUrl}
          alt=""
          className="h-10 w-10 shrink-0 rounded-lg object-cover"
        />
      )}

      {/* Title + artist */}
      <div className="min-w-0 flex-1">
        <p
          className={cx(
            'truncate text-sm font-medium text-ink-0',
            playing && 'text-accent-400',
          )}
        >
          {track?.title}
        </p>
        <p className="truncate text-sm text-ink-500">{track?.artist}</p>
      </div>

      {/* Album */}
      <p className="hidden w-36 shrink-0 truncate text-sm text-ink-500 lg:block">
        {track?.album}
      </p>

      {/* Like + duration + more */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <LikeButton
          liked={Boolean(track?.liked)}
          size="sm"
          onClick={onLike}
          className={cx(
            !track?.liked && 'sm:opacity-0 sm:transition-opacity sm:group-hover/row:opacity-100',
          )}
        />
        <span className="w-10 text-right text-sm tabular-nums text-ink-500 sm:group-hover/row:hidden">
          {formatDuration(track?.duration)}
        </span>
        {onMore && (
          <button
            type="button"
            aria-label={`More options for ${track?.title ?? 'track'}`}
            className="focus-ring hidden h-8 w-8 items-center justify-center rounded-full text-ink-300 transition-colors hover:text-ink-0 sm:flex sm:opacity-0 sm:group-hover/row:opacity-100"
            onClick={onMore}
          >
            <RiMore2Fill aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
