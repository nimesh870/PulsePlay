import { cx } from '../../utils/cx'
import PlayButton from '../ui/PlayButton'

/**
 * Shared card shell. Renders media, an on-hover play control and a title /
 * subtitle block. All media cards derive from this to stay consistent.
 */
export default function CardShell({
  media,
  title,
  subtitle,
  onPlay,
  onSelect,
  playing = false,
  mediaClassName = 'aspect-square',
  className,
}) {
  return (
    <article
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
        'group/card flex flex-col rounded-2xl bg-surface/50 p-3 transition-all duration-300 hover:bg-raised hover:shadow-xl hover:shadow-black/50 focus-visible:outline-none',
        onSelect &&
          'cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-500/60',
        className,
      )}
    >
      <div className={cx('relative overflow-hidden rounded-xl', mediaClassName)}>
        {media}
        {onPlay && (
          <div className="absolute right-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 group-hover/card:translate-y-0 group-hover/card:opacity-100">
            <PlayButton
              playing={playing}
              size="md"
              onClick={(event) => {
                event.stopPropagation()
                onPlay()
              }}
            />
          </div>
        )}
      </div>
      <div className="mt-3 min-w-0 space-y-1 px-1">
        <h3 className="truncate font-display text-sm font-semibold text-ink-0">
          {title}
        </h3>
        <p className="truncate text-sm text-ink-500">{subtitle}</p>
      </div>
    </article>
  )
}
