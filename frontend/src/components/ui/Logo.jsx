import { cx } from '../../utils/cx'

/**
 * PulsePlay brand mark — a pulsing waveform in a rounded gradient tile.
 */
export default function Logo({ compact = false, className }) {
  return (
    <div className={cx('flex items-center gap-2.5', className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-accent-500 to-magenta-500 shadow-lg shadow-accent-500/30">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 10.5a1 1 0 0 1 2 0v3a1 1 0 0 1-2 0v-3Zm4.25-4a1 1 0 0 1 2 0v11a1 1 0 0 1-2 0v-11Zm4.25-3a1 1 0 0 1 2 0v17a1 1 0 0 1-2 0v-17Zm4.25 2.5a1 1 0 0 1 2 0v12a1 1 0 0 1-2 0v-12Z" />
        </svg>
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-accent-400 to-magenta-500 opacity-0 transition-opacity duration-300"
        />
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight text-ink-0">
          Pulse<span className="text-gradient">Play</span>
        </span>
      )}
    </div>
  )
}
