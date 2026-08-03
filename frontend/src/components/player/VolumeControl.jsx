import { RiVolumeUpLine, RiVolumeDownLine, RiVolumeMuteLine } from 'react-icons/ri'
import Slider from '../ui/Slider'

/**
 * Mute toggle + volume slider.
 */
export default function VolumeControl({
  volume = 100,
  muted = false,
  onVolumeChange,
  onToggleMute,
}) {
  const Icon =
    muted || volume === 0
      ? RiVolumeMuteLine
      : volume < 50
        ? RiVolumeDownLine
        : RiVolumeUpLine

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={muted ? 'Unmute' : 'Mute'}
        title={muted ? 'Unmute' : 'Mute'}
        onClick={onToggleMute}
        className="focus-ring shrink-0 rounded-full text-ink-500 transition-colors duration-200 hover:text-ink-0"
      >
        <Icon aria-hidden="true" className="text-lg" />
      </button>
      <Slider
        ariaLabel="Volume"
        value={muted ? 0 : volume}
        min={0}
        max={100}
        onChange={onVolumeChange}
        className="w-24 sm:w-28"
      />
    </div>
  )
}
