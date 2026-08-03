import { RiShuffleLine, RiMore2Fill, RiTimeLine, RiDiscLine } from 'react-icons/ri'
import CollectionHeader from '../components/sections/CollectionHeader'
import TrackRow from '../components/cards/TrackRow'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import { SkeletonList } from '../components/ui/Skeletons'
import PlayButton from '../components/ui/PlayButton'
import IconButton from '../components/ui/IconButton'
import LikeButton from '../components/ui/LikeButton'

/**
 * Album detail — hero header + full tracklist.
 */
export default function AlbumPage({
  isLoading = false,
  album,
  tracks = [],
  playingId,
  onPlay,
  onShuffle,
  onLike,
  onMore,
  onPlayTrack,
  onSelectTrack,
}) {
  const totalSeconds = tracks.reduce((sum, track) => sum + (track.duration ?? 0), 0)
  const totalMinutes = Math.round(totalSeconds / 60)

  const meta = [
    album?.year,
    tracks.length > 0 ? `${tracks.length} track${tracks.length === 1 ? '' : 's'}` : null,
    totalSeconds > 0 ? `${totalMinutes} min` : null,
  ]
    .filter(Boolean)
    .join(' \u2022 ')

  return (
    <div className="space-y-6">
      {isLoading ? (
        <>
          <Skeleton className="h-64 w-full rounded-3xl sm:h-72" />
          <SkeletonList count={8} />
        </>
      ) : (
        <>
          <CollectionHeader
            typeLabel="Album"
            title={album?.title}
            subtitle={album?.artist}
            coverUrl={album?.coverUrl}
            meta={meta}
            actions={
              <>
                <PlayButton size="lg" onClick={onPlay} />
                <IconButton
                  icon={RiShuffleLine}
                  label="Shuffle"
                  size="lg"
                  onClick={onShuffle}
                />
                <LikeButton liked={Boolean(album?.liked)} size="lg" onClick={onLike} />
                <IconButton
                  icon={RiMore2Fill}
                  label="More options"
                  size="lg"
                  onClick={onMore}
                />
              </>
            }
          />

          {tracks.length > 0 ? (
            <div className="rounded-2xl border border-white/[0.06] bg-surface/40 p-2">
              <div className="hidden items-center gap-3 px-3 py-2 text-[11px] font-semibold tracking-widest text-ink-500 uppercase md:flex">
                <span className="w-8 shrink-0 text-center">#</span>
                <span className="flex-1">Title</span>
                <span className="w-36 shrink-0">Album</span>
                <span className="w-10 shrink-0 text-right">
                  <RiTimeLine aria-hidden="true" />
                </span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {tracks.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    index={index}
                    track={track}
                    playing={playingId === track.id}
                    onPlay={() => onPlayTrack?.(track)}
                    onSelect={() => onSelectTrack?.(track)}
                    onLike={() => onLike?.(track)}
                    onMore={() => onMore?.(track)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={RiDiscLine}
              title="No tracks yet"
              description="Tracks from this album will appear here once uploaded."
            />
          )}
        </>
      )}
    </div>
  )
}
