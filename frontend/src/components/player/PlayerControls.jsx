import { RiShuffleLine, RiSkipBackFill, RiSkipForwardFill, RiRepeat2Line } from 'react-icons/ri'
import PlayButton from '../ui/PlayButton'
import IconButton from '../ui/IconButton'

/**
 * Transport controls row shared by the desktop player.
 */
export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  shuffle = false,
  repeat = false,
  onToggleShuffle,
  onToggleRepeat,
}) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <IconButton
        icon={RiShuffleLine}
        label="Toggle shuffle"
        variant="ghost"
        size="sm"
        active={shuffle}
        onClick={onToggleShuffle}
        className="hidden sm:inline-flex"
      />
      <IconButton
        icon={RiSkipBackFill}
        label="Previous"
        variant="ghost"
        size="sm"
        onClick={onPrev}
      />
      <PlayButton playing={isPlaying} size="md" onClick={onPlayPause} />
      <IconButton
        icon={RiSkipForwardFill}
        label="Next"
        variant="ghost"
        size="sm"
        onClick={onNext}
      />
      <IconButton
        icon={RiRepeat2Line}
        label="Toggle repeat"
        variant="ghost"
        size="sm"
        active={repeat}
        onClick={onToggleRepeat}
        className="hidden sm:inline-flex"
      />
    </div>
  )
}
