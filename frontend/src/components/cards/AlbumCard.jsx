import CardShell from './CardShell'
import CoverPlaceholder from '../ui/CoverPlaceholder'

/**
 * Album tile with cover, title and artist info.
 * @param {object} props
 * @param {object} props.album - { title, artist, coverUrl, year }
 */
export default function AlbumCard({ album, playing, onPlay, onSelect, className }) {
  const subtitle = [album?.artist, album?.year].filter(Boolean).join(' \u2022 ')
  return (
    <CardShell
      media={
        album?.coverUrl ? (
          <img
            src={album.coverUrl}
            alt={album?.title ?? ''}
            className="h-full w-full object-cover"
          />
        ) : (
          <CoverPlaceholder />
        )
      }
      title={album?.title}
      subtitle={subtitle || undefined}
      playing={playing}
      onPlay={onPlay}
      onSelect={onSelect}
      className={className}
    />
  )
}
