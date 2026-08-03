import { cx } from '../../utils/cx'

const variants = {
  primary:
    'bg-gradient-to-b from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25 hover:from-accent-400 hover:to-accent-500 hover:shadow-accent-500/40 active:scale-[0.98]',
  soft: 'bg-white/[0.06] text-ink-0 hover:bg-white/[0.12] active:scale-[0.98]',
  ghost: 'text-ink-300 hover:bg-white/[0.06] hover:text-ink-0 active:scale-[0.98]',
  outline:
    'border border-white/15 text-ink-0 hover:border-white/30 hover:bg-white/[0.06] active:scale-[0.98]',
  danger:
    'bg-magenta-500/15 text-magenta-400 hover:bg-magenta-500/25 active:scale-[0.98]',
}

const sizes = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-sm',
}

/**
 * Reusable button with consistent variant + size system.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={cx(
        'focus-ring inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
