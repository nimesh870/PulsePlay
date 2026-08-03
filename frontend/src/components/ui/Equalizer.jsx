import { cx } from '../../utils/cx'

/**
 * Three animated bars signalling that a track is playing.
 */
export default function Equalizer({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cx('flex h-3.5 items-end gap-[3px]', className)}
    >
      <span className="h-2 w-[3px] origin-bottom animate-eq rounded-full bg-accent-400" />
      <span className="h-3.5 w-[3px] origin-bottom animate-eq rounded-full bg-magenta-400 [animation-delay:0.25s]" />
      <span className="h-2.5 w-[3px] origin-bottom animate-eq rounded-full bg-accent-300 [animation-delay:0.5s]" />
    </span>
  )
}
