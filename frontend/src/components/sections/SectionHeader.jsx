import { cx } from '../../utils/cx'

/**
 * Consistent section heading with optional "See all" action.
 */
export default function SectionHeader({
  title,
  subtitle,
  actionLabel = 'See all',
  onAction,
  icon: Icon,
  className,
}) {
  return (
    <div
      className={cx(
        'mb-4 flex items-end justify-between gap-4',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300">
            <Icon aria-hidden="true" className="text-lg" />
          </span>
        )}
        <div className="min-w-0">
          <h2 className="truncate font-display text-lg font-bold tracking-tight text-ink-0 sm:text-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="truncate text-xs text-ink-500 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="focus-ring shrink-0 rounded-full px-2 py-1 text-xs font-semibold tracking-wide text-ink-500 uppercase transition-colors duration-200 hover:text-ink-0"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
