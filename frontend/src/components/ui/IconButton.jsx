import { cx } from '../../utils/cx'

const sizes = {
  sm: 'h-8 w-8 text-base',
  md: 'h-10 w-10 text-lg',
  lg: 'h-12 w-12 text-xl',
}

const variants = {
  solid:
    'bg-white text-base hover:scale-105 hover:bg-white/90 active:scale-95',
  soft: 'bg-white/[0.08] text-ink-0 hover:bg-white/[0.16] active:scale-95',
  ghost: 'text-ink-300 hover:text-ink-0 hover:bg-white/[0.08] active:scale-95',
}

/**
 * Circular icon-only button used across headers, cards and the player.
 */
export default function IconButton({
  icon: Icon,
  label,
  size = 'md',
  variant = 'soft',
  active = false,
  className,
  ...rest
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(
        'focus-ring inline-flex shrink-0 items-center justify-center rounded-full transition-all duration-200 disabled:pointer-events-none disabled:opacity-50',
        sizes[size],
        variants[variant],
        active && 'text-accent-400',
        className,
      )}
      {...rest}
    >
      <Icon aria-hidden="true" />
    </button>
  )
}
