import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiHeart3Line } from 'react-icons/ri'
import TrackRow from '../components/cards/TrackRow'
import EmptyState from '../components/ui/EmptyState'
import { fetchMusic } from '../store/slices/musicSlice'
import { playTrack } from '../store/slices/playerSlice'
import { toggleLike, selectLikedIds } from '../store/slices/likesSlice'
import { withLikes } from '../utils/normalizers'

/**
 * Liked Songs — the current user's locally saved tracks.
 */
export default function LikedSongsPage() {
  const dispatch = useDispatch()
  const tracks = useSelector((state) => state.music.items)
  const likedIds = useSelector(selectLikedIds)
  const { current, isPlaying } = useSelector((state) => state.player)

  useEffect(() => {
    if (tracks.length === 0) dispatch(fetchMusic())
  }, [dispatch, tracks.length])

  const likedTracks = withLikes(
    tracks.filter((track) => likedIds.includes(track.id)),
    likedIds,
  )

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-0 sm:text-3xl">
          Liked Songs
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          {likedTracks.length} liked track{likedTracks.length === 1 ? '' : 's'}
        </p>
      </header>

      {likedTracks.length > 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-surface/40 p-2">
          {likedTracks.map((track, index) => (
            <TrackRow
              key={track.id}
              index={index}
              track={track}
              playing={current?.id === track.id}
              isPlaying={isPlaying}
              onPlay={() => dispatch(playTrack({ track, queue: likedTracks }))}
              onSelect={() => dispatch(playTrack({ track, queue: likedTracks }))}
              onLike={() => dispatch(toggleLike(track.id))}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={RiHeart3Line}
          title="No liked songs yet"
          description="Tap the heart on any track to save it here."
          className="py-16"
        />
      )}
    </div>
  )
}
