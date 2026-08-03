import { RiLayoutGridLine, RiListUnordered } from 'react-icons/ri'
import { cx } from '../../utils/cx'

const options = [
  { id: 'list', label: 'List view', icon: RiListUnordered },
  { id: 'grid', label: 'Grid view', icon: RiLayoutGridLine },
]

/**
 * Segmented list / grid toggle used on playlist pages.
 */
export default function ViewToggle({ view = 'list', onChange, className }) {
  return (
    <div
      role="group"
      aria-label="Layout"
      className={cx(
        'inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1',
        className,
      )}
    >
      {options.map((option) => {
        const active = view === option.id
        const Icon = option.icon
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange?.(option.id)}
            className={cx(
              'focus-ring flex h-8 w-9 items-center justify-center rounded-full text-lg transition-all duration-200',
              active
                ? 'bg-white/[0.1] text-ink-0'
                : 'text-ink-500 hover:text-ink-100',
            )}
          >
            <Icon aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
