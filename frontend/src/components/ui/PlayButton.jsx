import { RiPlayFill, RiPauseFill } from 'react-icons/ri'
import { cx } from '../../utils/cx'

const sizes = {
  sm: 'h-9 w-9 text-base',
  md: 'h-11 w-11 text-lg',
  lg: 'h-14 w-14 text-2xl',
  xl: 'h-16 w-16 text-3xl',
}

/**
 * The signature gradient play/pause control with a soft pulse ring.
 */
export default function PlayButton({
  playing = false,
  size = 'md',
  label = 'Play',
  className,
  ...rest
}) {
  const Icon = playing ? RiPauseFill : RiPlayFill
  return (
    <button
      type="button"
      aria-label={playing ? 'Pause' : label}
      title={playing ? 'Pause' : label}
      className={cx(
        'focus-ring group/play inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-magenta-500 text-white shadow-lg shadow-accent-500/30 transition-all duration-200 hover:scale-105 hover:shadow-accent-500/50 active:scale-95',
        playing && 'animate-pulse-ring',
        sizes[size],
        className,
      )}
      {...rest}
    >
      <Icon
        aria-hidden="true"
        className={cx(!playing && 'translate-x-[1px] transition-transform duration-200 group-hover/play:translate-x-0')}
      />
    </button>
  )
}
