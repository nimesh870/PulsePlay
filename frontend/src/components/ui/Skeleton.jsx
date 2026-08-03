import { cx } from '../../utils/cx'

/**
 * Shimmering placeholder used while content is loading.
 * Control size + shape via `className` (e.g. `h-40 w-40 rounded-2xl`).
 */
export default function Skeleton({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        'relative overflow-hidden rounded-xl bg-white/[0.06]',
        className,
      )}
    >
      <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>
  )
}
