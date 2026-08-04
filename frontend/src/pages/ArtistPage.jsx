import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import { RiShuffleLine, RiMore2Fill, RiUserStarLine } from 'react-icons/ri'
import TrackRow from '../components/cards/TrackRow'
import AlbumCard from '../components/cards/AlbumCard'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import { SkeletonCardGrid, SkeletonList } from '../components/ui/Skeletons'
import SectionHeader from '../components/sections/SectionHeader'
import Avatar from '../components/ui/Avatar'
import PlayButton from '../components/ui/PlayButton'
import IconButton from '../components/ui/IconButton'
import Button from '../components/ui/Button'
import { formatCount } from '../utils/format'
import { fetchArtist } from '../store/slices/artistSlice'
import {
  playQueue,
  playTrack,
  setShuffle,
} from '../store/slices/playerSlice'
import { toggleLike, selectLikedIds } from '../store/slices/likesSlice'
import { withLikes } from '../utils/normalizers'

/**
 * Artist profile — banner, popular tracks and discography, derived from the
 * catalog GETs since the backend exposes no artist-scoped endpoints.
 */
export default function ArtistPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { artistId } = useParams()
  const { byId, status } = useSelector((state) => state.artist)
  const { current: currentTrack, isPlaying } = useSelector((state) => state.player)
  const likedIds = useSelector(selectLikedIds)

  useEffect(() => {
    if (artistId) dispatch(fetchArtist(artistId))
  }, [artistId, dispatch])

  const bundle = byId[artistId]
  const artist = bundle?.artist
  const popularTracks = bundle?.tracks ?? []
  const albums = bundle?.albums ?? []
  const isLoading = status === 'idle' || status === 'loading' || !bundle
  const displayTracks = withLikes(popularTracks, likedIds)

  const playAll = (index = 0) => dispatch(playQueue({ tracks: displayTracks, index }))

  return (
    <div className="space-y-10">
      {isLoading ? (
        <>
          <Skeleton className="h-72 w-full rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-40" />
            <SkeletonList count={5} />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-5 w-40" />
            <SkeletonCardGrid count={6} />
          </div>
        </>
      ) : (
        <>
          {/* Banner */}
          <section className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-accent-600/35 via-surface to-magenta-500/20"
            />
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-10 h-52 w-52 rounded-full bg-magenta-500/25 blur-3xl"
            />
            <div className="relative flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:items-end sm:gap-8 sm:p-10 sm:text-left">
              <Avatar
                name={artist?.name}
                src={artist?.avatarUrl}
                size="xl"
                className="h-36 w-36 ring-4 ring-white/10 sm:h-44 sm:w-44"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-[0.25em] text-ink-300 uppercase">
                  Artist
                </p>
                <h1 className="mt-2 font-display text-4xl leading-tight font-bold text-ink-0 sm:text-5xl">
                  {artist?.name}
                </h1>
                <p className="mt-3 text-sm text-ink-500">
                  {formatCount(artist?.followers)} followers
                </p>
                <div className="mt-6 flex items-center justify-center gap-3 sm:justify-start">
                  <PlayButton size="lg" onClick={() => playAll(0)} />
                  <IconButton
                    icon={RiShuffleLine}
                    label="Shuffle"
                    size="lg"
                    onClick={() => {
                      dispatch(setShuffle(true))
                      playAll(Math.floor(Math.random() * popularTracks.length))
                    }}
                  />
                  <Button
                    variant="soft"
                    onClick={() => {}}
                  >
                    Follow
                  </Button>
                  <IconButton
                    icon={RiMore2Fill}
                    label="More options"
                    size="lg"
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Popular tracks */}
          <section>
            <SectionHeader title="Popular" icon={RiUserStarLine} />
            <div className="rounded-2xl border border-white/[0.06] bg-surface/40 p-2">
              {popularTracks.length > 0 ? (
                displayTracks.slice(0, 5).map((track, index) => (
                  <TrackRow
                    key={track.id}
                    index={index}
                    track={track}
                    playing={currentTrack?.id === track.id}
                    isPlaying={isPlaying}
                    onPlay={() => dispatch(playTrack({ track, queue: displayTracks }))}
                    onSelect={() => dispatch(playTrack({ track, queue: displayTracks }))}
                    onLike={() => dispatch(toggleLike(track.id))}
                  />
                ))
              ) : (
                <EmptyState
                  icon={RiUserStarLine}
                  title="No popular tracks"
                  description="The most-played tracks by this artist will appear here."
                  className="py-10"
                />
              )}
            </div>
          </section>

          {/* Discography */}
          <section>
            <SectionHeader title="Discography" />
            {albums.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onSelect={() => navigate(`/home?album=${album.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No releases yet"
                description="Albums by this artist will appear here once published."
                className="py-10"
              />
            )}
          </section>
        </>
      )}
    </div>
  )
}
