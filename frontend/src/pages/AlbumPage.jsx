import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
  RiShuffleLine,
  RiMore2Fill,
  RiTimeLine,
  RiDiscLine,
} from 'react-icons/ri'
import CollectionHeader from '../components/sections/CollectionHeader'
import TrackRow from '../components/cards/TrackRow'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import { SkeletonList } from '../components/ui/Skeletons'
import PlayButton from '../components/ui/PlayButton'
import IconButton from '../components/ui/IconButton'
import LikeButton from '../components/ui/LikeButton'
import { fetchAlbumById } from '../store/slices/albumSlice'
import {
  playQueue,
  playTrack,
  setShuffle,
} from '../store/slices/playerSlice'
import { toggleLike, selectLikedIds } from '../store/slices/likesSlice'
import { withLikes } from '../utils/normalizers'

/**
 * Album detail — hero header + full tracklist, loaded from the backend.
 */
export default function AlbumPage() {
  const dispatch = useDispatch()
  const { albumId } = useParams()
  const { current, status, error } = useSelector((state) => state.album)
  const { current: currentTrack, isPlaying } = useSelector((state) => state.player)
  const likedIds = useSelector(selectLikedIds)

  useEffect(() => {
    if (albumId) dispatch(fetchAlbumById(albumId))
  }, [albumId, dispatch])

  const tracks = current?.id === albumId ? current.tracks : []
  const album = current?.id === albumId ? current.album : undefined
  const isLoading = status === 'idle' || status === 'loading'
  const displayTracks = withLikes(tracks, likedIds)

  const playAll = (index = 0) => dispatch(playQueue({ tracks: displayTracks, index }))

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
      {status === 'failed' && !album ? (
        <EmptyState
          icon={RiDiscLine}
          title="Couldn&apos;t load this album"
          description={error ?? 'Something went wrong while loading this album.'}
          className="py-16"
        />
      ) : isLoading ? (
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
                <PlayButton size="lg" onClick={() => playAll(0)} />
                <IconButton
                  icon={RiShuffleLine}
                  label="Shuffle"
                  size="lg"
                  onClick={() => {
                    dispatch(setShuffle(true))
                    playAll(Math.floor(Math.random() * tracks.length))
                  }}
                />
                <LikeButton liked={Boolean(album?.liked)} size="lg" onClick={() => {}} />
                <IconButton
                  icon={RiMore2Fill}
                  label="More options"
                  size="lg"
                  onClick={() => {}}
                />
              </>
            }
          />

          {displayTracks.length > 0 ? (
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
                {displayTracks.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    index={index}
                    track={track}
                    playing={currentTrack?.id === track.id}
                    isPlaying={isPlaying}
                    onPlay={() => dispatch(playTrack({ track, queue: displayTracks }))}
                    onSelect={() => dispatch(playTrack({ track, queue: displayTracks }))}
                    onLike={() => dispatch(toggleLike(track.id))}
                    onMore={() => {}}
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
