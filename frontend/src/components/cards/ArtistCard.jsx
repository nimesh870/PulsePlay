import { cx } from '../../utils/cx'
import { formatCount } from '../../utils/format'
import Avatar from '../ui/Avatar'
import PlayButton from '../ui/PlayButton'

/**
 * Artist tile with circular avatar.
 * @param {object} props
 * @param {object} props.artist - { name, avatarUrl, followers }
 */
export default function ArtistCard({
  artist,
  onPlay,
  onSelect,
  className,
}) {
  return (
    <article
      onClick={onSelect}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      className={cx(
        'group/card flex flex-col items-center gap-3 rounded-2xl bg-surface/50 p-4 text-center transition-all duration-300 hover:bg-raised hover:shadow-xl hover:shadow-black/50',
        onSelect &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60',
        className,
      )}
    >
      <div className="relative">
        <Avatar
          name={artist?.name}
          src={artist?.avatarUrl}
          size="xl"
          className="transition-transform duration-300 group-hover/card:scale-105"
        />
        {onPlay && (
          <div className="absolute -right-1 -bottom-1 translate-y-2 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
            <PlayButton
              size="sm"
              onClick={(event) => {
                event.stopPropagation()
                onPlay()
              }}
            />
          </div>
        )}
      </div>
      <div className="min-w-0 space-y-1">
        <h3 className="truncate font-display text-sm font-semibold text-ink-0">
          {artist?.name}
        </h3>
        <p className="truncate text-xs text-ink-500">
          {formatCount(artist?.followers)} followers
        </p>
      </div>
    </article>
  )
}
