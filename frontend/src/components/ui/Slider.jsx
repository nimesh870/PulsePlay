import { cx } from '../../utils/cx'

/**
 * Accent-filled range slider. The fill is driven by a single CSS custom
 * property so the thumb stays native and keyboard-accessible.
 */
export default function Slider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  ariaLabel,
  className,
  disabled = false,
}) {
  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0

  return (
    <div
      className={cx(
        'slider-group relative flex h-4 w-full items-center',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-white/10"
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-accent-500 to-magenta-500"
        style={{ width: `${percent}%` }}
      />
      <input
        type="range"
        aria-label={ariaLabel}
        className="pp-slider"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(event) => onChange?.(Number(event.target.value))}
      />
    </div>
  )
}
