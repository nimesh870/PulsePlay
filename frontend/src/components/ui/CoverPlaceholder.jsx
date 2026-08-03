import { RiMusic2Line } from 'react-icons/ri'
import { cx } from '../../utils/cx'

/**
 * Gradient placeholder used when an item has no cover image yet.
 */
export default function CoverPlaceholder({ icon: Icon = RiMusic2Line, className }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'flex h-full w-full items-center justify-center bg-gradient-to-br from-surface via-raised to-accent-500/20 text-ink-300',
        className,
      )}
    >
      <Icon className="h-1/3 w-1/3 opacity-70" />
    </span>
  )
}
