import { cx } from '../../utils/cx'

/**
 * Friendly empty state used when a list has no content yet.
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center',
        className,
      )}
    >
      {Icon && (
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/20 to-magenta-500/20 text-accent-300">
          <Icon className="h-8 w-8" aria-hidden="true" />
        </span>
      )}
      <div className="space-y-1.5">
        <h3 className="font-display text-base font-semibold text-ink-0">
          {title}
        </h3>
        {description && (
          <p className="max-w-sm text-sm text-ink-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
