import { cx } from '../../utils/cx'
import { formatDuration } from '../../utils/format'
import Slider from '../ui/Slider'

/**
 * Timeline with elapsed / total time labels.
 */
export default function ProgressBar({
  currentTime = 0,
  duration = 0,
  onSeek,
  className,
}) {
  return (
    <div className={cx('flex items-center gap-3', className)}>
      <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-ink-500">
        {formatDuration(currentTime)}
      </span>
      <Slider
        ariaLabel="Seek"
        value={currentTime}
        min={0}
        max={duration || 1}
        step={1}
        onChange={onSeek}
        className="flex-1"
      />
      <span className="w-10 shrink-0 text-[11px] tabular-nums text-ink-500">
        {formatDuration(duration)}
      </span>
    </div>
  )
}
