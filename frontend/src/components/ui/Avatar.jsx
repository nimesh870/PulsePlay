import { cx } from '../../utils/cx'

const sizes = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-20 w-20 text-lg',
  xl: 'h-32 w-32 text-2xl sm:h-36 sm:w-36',
}

/**
 * Circular avatar with a gradient ring. Falls back to initials when no image.
 */
export default function Avatar({
  name = '',
  src,
  size = 'md',
  className,
  ...rest
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className={cx(
        'relative shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-accent-500/60 to-magenta-500/60 p-[2px]',
        sizes[size],
        className,
      )}
      {...rest}
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-surface font-display font-semibold text-ink-0">
        {src ? (
          <img src={src} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden="true">{initials || '?'}</span>
        )}
      </div>
    </div>
  )
}
