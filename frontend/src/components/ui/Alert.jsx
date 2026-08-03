import { RiErrorWarningLine } from 'react-icons/ri'
import { cx } from '../../utils/cx'

/**
 * Inline feedback banner for form/page errors.
 */
export default function Alert({ tone = 'error', children, className }) {
  return (
    <div
      role="alert"
      className={cx(
        'flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm',
        tone === 'error'
          ? 'border-magenta-500/40 bg-magenta-500/10 text-magenta-400'
          : 'border-accent-500/40 bg-accent-500/10 text-accent-300',
        className,
      )}
    >
      <RiErrorWarningLine aria-hidden="true" className="mt-0.5 shrink-0 text-base" />
      <p className="min-w-0">{children}</p>
    </div>
  )
}
