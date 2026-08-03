import {
  RiShuffleLine,
  RiMore2Fill,
  RiTimeLine,
  RiPlayList2Line,
  RiHeart3Line,
} from 'react-icons/ri'
import CollectionHeader from '../components/sections/CollectionHeader'
import TrackRow from '../components/cards/TrackRow'
import MusicCard from '../components/cards/MusicCard'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import { SkeletonCardGrid, SkeletonList } from '../components/ui/Skeletons'
import PlayButton from '../components/ui/PlayButton'
import IconButton from '../components/ui/IconButton'
import LikeButton from '../components/ui/LikeButton'
import ViewToggle from '../components/ui/ViewToggle'

/**
 * Playlist detail with list / grid layout toggle.
 */
export default function PlaylistPage({
  isLoading = false,
  playlist,
  tracks = [],
  view = 'list',
  onToggleView,
  playingId,
  onPlay,
  onShuffle,
  onLike,
  onMore,
  onPlayTrack,
  onSelectTrack,
  onClearPlaylist,
}) {
  const totalSeconds = tracks.reduce((sum, track) => sum + (track.duration ?? 0), 0)
  const totalMinutes = Math.round(totalSeconds / 60)

  const meta = [
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
          {view === 'list' ? (
            <SkeletonList count={8} />
          ) : (
            <SkeletonCardGrid count={10} />
          )}
        </>
      ) : (
        <>
          <CollectionHeader
            typeLabel="Playlist"
            title={playlist?.name}
            subtitle={playlist?.owner ? `By ${playlist.owner}` : undefined}
            coverUrl={playlist?.coverUrl}
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
                <LikeButton
                  liked={Boolean(playlist?.liked)}
                  size="lg"
                  onClick={onLike}
                />
                <IconButton
                  icon={RiMore2Fill}
                  label="More options"
                  size="lg"
                  onClick={onMore}
                />
              </>
            }
          />

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <IconButton
                icon={RiHeart3Line}
                label="Like playlist"
                variant="soft"
                onClick={onLike}
              />
              {onClearPlaylist && tracks.length > 0 && (
                <button
                  type="button"
                  onClick={onClearPlaylist}
                  className="focus-ring rounded-full px-3 py-1.5 text-xs font-semibold text-ink-500 transition-colors hover:text-magenta-400"
                >
                  Clear playlist
                </button>
              )}
            </div>
            <ViewToggle view={view} onChange={onToggleView} />
          </div>

          {tracks.length > 0 ? (
            view === 'list' ? (
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
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {tracks.map((track) => (
                  <MusicCard
                    key={track.id}
                    track={track}
                    playing={playingId === track.id}
                    onPlay={() => onPlayTrack?.(track)}
                    onSelect={() => onSelectTrack?.(track)}
                  />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              icon={RiPlayList2Line}
              title="This playlist is empty"
              description="Songs you add to this playlist will show up here."
            />
          )}
        </>
      )}
    </div>
  )
}
