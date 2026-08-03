import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri'
import { cx } from '../../utils/cx'

const sizes = {
  sm: 'h-8 w-8 text-base',
  md: 'h-10 w-10 text-lg',
  lg: 'h-12 w-12 text-xl',
}

/**
 * Heart toggle that flips between line and filled states.
 */
export default function LikeButton({
  liked = false,
  size = 'md',
  label,
  className,
  ...rest
}) {
  const Icon = liked ? RiHeart3Fill : RiHeart3Line
  return (
    <button
      type="button"
      aria-label={label ?? (liked ? 'Remove from Liked Songs' : 'Add to Liked Songs')}
      title={label ?? (liked ? 'Remove from Liked Songs' : 'Add to Liked Songs')}
      className={cx(
        'focus-ring inline-flex shrink-0 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-90',
        liked ? 'text-magenta-500' : 'text-ink-300 hover:text-ink-0',
        sizes[size],
        className,
      )}
      {...rest}
    >
      <Icon aria-hidden="true" />
    </button>
  )
}
