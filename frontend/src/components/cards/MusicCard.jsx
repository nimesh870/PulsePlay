import CardShell from './CardShell'
import CoverPlaceholder from '../ui/CoverPlaceholder'

/**
 * A single track presented as a square tile.
 * @param {object} props
 * @param {object} props.track - { title, artist, coverUrl }
 */
export default function MusicCard({ track, playing, onPlay, onSelect, className }) {
  return (
    <CardShell
      media={
        track?.coverUrl ? (
          <img
            src={track.coverUrl}
            alt={track?.title ?? ''}
            className="h-full w-full object-cover"
          />
        ) : (
          <CoverPlaceholder />
        )
      }
      title={track?.title}
      subtitle={track?.artist}
      playing={playing}
      onPlay={onPlay}
      onSelect={onSelect}
      className={className}
    />
  )
}
