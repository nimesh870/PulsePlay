import { cx } from '../../utils/cx'

/**
 * Sidebar navigation entry with active indicator.
 */
export default function NavItem({ item, active, onSelect }) {
  const Icon = item.icon
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect?.(item.id)}
        aria-current={active ? 'page' : undefined}
        className={cx(
          'focus-ring group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200',
          active
            ? 'bg-white/[0.07] text-ink-0'
            : 'text-ink-500 hover:bg-white/[0.04] hover:text-ink-0',
        )}
      >
        <Icon
          aria-hidden="true"
          className={cx(
            'text-xl transition-colors duration-200',
            active ? 'text-accent-400' : 'text-ink-500 group-hover:text-accent-400',
          )}
        />
        <span className="truncate">{item.label}</span>
        {active && (
          <span
            aria-hidden="true"
            className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
          />
        )}
      </button>
    </li>
  )
}
