import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router'
import {
  RiHeart3Line,
  RiHistoryLine,
  RiFireLine,
  RiShuffleLine,
  RiTimeLine,
  RiCloseLine,
  RiDiscLine,
  RiAlbumLine,
  RiAddLine,
  RiCloseFill,
} from 'react-icons/ri'
import MusicCard from '../components/cards/MusicCard'
import AlbumCard from '../components/cards/AlbumCard'
import ArtistCard from '../components/cards/ArtistCard'
import TrackRow from '../components/cards/TrackRow'
import SectionHeader from '../components/sections/SectionHeader'
import CollectionHeader from '../components/sections/CollectionHeader'
import HeroBanner from '../components/sections/HeroBanner'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import PlayButton from '../components/ui/PlayButton'
import IconButton from '../components/ui/IconButton'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import Input from '../components/forms/Input'
import {
  SkeletonCardGrid,
  SkeletonHero,
  SkeletonList,
} from '../components/ui/Skeletons'
import { fetchMusic } from '../store/slices/musicSlice'
import { fetchAlbums, fetchAlbumById, addAlbumMusic } from '../store/slices/albumSlice'
import {
  playTrack,
  playQueue,
  setShuffle,
} from '../store/slices/playerSlice'
import { toggleLike, selectLikedIds } from '../store/slices/likesSlice'
import { withLikes } from '../utils/normalizers'
import { AUDIO_ACCEPT } from '../config/constants'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 5) return 'Up late?'
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

/**
 * Home feed — loads the catalog and drives the sections from Redux; loading
 * and empty states are handled here so the page never shows fake content.
 */
export default function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { items: tracks, status: musicStatus } = useSelector(
    (state) => state.music,
  )
  const {
    items: albums,
    current: albumDetail,
    status: albumStatus,
    error: albumError,
  } = useSelector((state) => state.album)
  const { current, isPlaying } = useSelector((state) => state.player)
  const likedIds = useSelector(selectLikedIds)
  const user = useSelector((state) => state.auth.user)

  const selectedAlbumId = searchParams.get('album')
  const [showAddTrack, setShowAddTrack] = useState(false)

  useEffect(() => {
    if (musicStatus === 'idle') dispatch(fetchMusic())
    if (albumStatus === 'idle') dispatch(fetchAlbums())
  }, [dispatch, musicStatus, albumStatus])

  useEffect(() => {
    if (selectedAlbumId) dispatch(fetchAlbumById(selectedAlbumId))
  }, [dispatch, selectedAlbumId])

  const isLoading =
    ((musicStatus === 'idle' || musicStatus === 'loading') && tracks.length === 0) ||
    ((albumStatus === 'idle' || albumStatus === 'loading') && albums.length === 0)

  const selectedAlbum = albumDetail?.id === selectedAlbumId ? albumDetail.album : undefined
  const selectedTracks =
    albumDetail?.id === selectedAlbumId ? withLikes(albumDetail.tracks, likedIds) : []
  const listAlbum = albums.find((album) => album.id === selectedAlbumId)
  const selectedAlbumData = selectedAlbum ?? listAlbum
  const albumArtistId = selectedAlbumData?.artistId
  const selectedLoading =
    Boolean(selectedAlbumId) &&
    (albumStatus === 'idle' || albumStatus === 'loading') &&
    !selectedAlbum
  const selectedError =
    Boolean(selectedAlbumId) && albumStatus === 'failed' && !selectedAlbum
      ? albumError
      : undefined

  const clearAlbum = () => setSearchParams({})

  const visibleAlbums = useMemo(() => {
    if (user?.role === 'artist') {
      return albums.filter(
        (album) => String(album.artistId) === String(user?.id),
      )
    }
    return albums
  }, [albums, user?.role, user?.id])

  const topArtists = useMemo(() => {
    const map = new Map()
    visibleAlbums.forEach((album) => {
      if (album.artistId && !map.has(album.artistId)) {
        map.set(album.artistId, {
          id: album.artistId,
          name: album.artist,
          avatarUrl: undefined,
          followers: 0,
        })
      }
    })
    return [...map.values()]
  }, [visibleAlbums])

  const tracksWithArtists = useMemo(() => {
    const names = new Map()
    albums.forEach((album) => {
      if (album.artistId && album.artist) names.set(album.artistId, album.artist)
    })
    return tracks.map((track) =>
      track.artist === 'Unknown artist' && names.has(track.artistId)
        ? { ...track, artist: names.get(track.artistId) }
        : track,
    )
  }, [tracks, albums])

  const displayTracks = useMemo(
    () => withLikes(tracksWithArtists, likedIds),
    [tracksWithArtists, likedIds],
  )

  const selectedFallbackTracks = useMemo(() => {
    if (!albumArtistId) return displayTracks
    return displayTracks.filter(
      (track) => String(track.artistId) === String(albumArtistId),
    )
  }, [displayTracks, albumArtistId])

  const onLike = (track) => dispatch(toggleLike(track.id))

  const spotlight = visibleAlbums[0]
  const headline = getGreeting()

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-0 sm:text-3xl">
          {headline}
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Here&apos;s what we&apos;ve been listening to.
        </p>
      </header>

      {selectedAlbumId ? (
        <AlbumDetailView
          album={selectedAlbumData}
          tracks={selectedTracks}
          fallbackTracks={selectedFallbackTracks}
          playingId={current?.id}
          playing={isPlaying}
          isLoading={selectedLoading}
          error={selectedError}
          canAddTrack={
            user?.role === 'artist' &&
            Boolean(selectedAlbumId) &&
            String(selectedAlbumData?.artistId) === String(user?.id)
          }
          showAddTrack={showAddTrack}
          onToggleAddTrack={() => setShowAddTrack((value) => !value)}
          onAddTrack={async ({ title, file }) => {
            if (!selectedAlbumId || !title || !file) return false
            const result = await dispatch(
              addAlbumMusic({ albumId: selectedAlbumId, title, file }),
            )
            if (addAlbumMusic.fulfilled.match(result)) {
              setShowAddTrack(false)
              return true
            }
            return false
          }}
          onPlayAll={() =>
            dispatch(
              playQueue({
                tracks:
                  selectedTracks.length > 0
                    ? selectedTracks
                    : selectedFallbackTracks,
                index: 0,
              }),
            )
          }
          onShuffle={() => {
            const queue =
              selectedTracks.length > 0 ? selectedTracks : selectedFallbackTracks
            dispatch(setShuffle(true))
            dispatch(
              playQueue({
                tracks: queue,
                index: Math.floor(Math.random() * queue.length),
              }),
            )
          }}
          onPlayTrack={(track) => {
            const queue =
              selectedTracks.length > 0 ? selectedTracks : selectedFallbackTracks
            dispatch(playTrack({ track, queue }))
          }}
          onLike={(track) => dispatch(toggleLike(track.id))}
          onClose={clearAlbum}
        />
      ) : isLoading ? (
        <div className="space-y-10">
          <SkeletonHero />
          <section>
            <Skeleton className="mb-4 h-5 w-36" />
            <SkeletonCardGrid />
          </section>
          <section>
            <Skeleton className="mb-4 h-5 w-36" />
            <SkeletonList />
          </section>
        </div>
      ) : (
        <>
          {spotlight && (
            <HeroBanner
              feature={{
                title: spotlight.title,
                subtitle: spotlight.artist,
                coverUrl: spotlight.coverUrl,
              }}
              playing={current?.id === spotlight.id}
              onPlay={() => navigate(`/home?album=${spotlight.id}`)}
              onSelect={() => navigate(`/home?album=${spotlight.id}`)}
            />
          )}

          {/* Recently played — horizontal scroll */}
          <section>
            <SectionHeader
              title="Recently played"
              icon={RiHistoryLine}
              actionLabel={tracks.length > 0 ? 'See all' : undefined}
            />
            {tracks.length > 0 ? (
              <div className="scrollbar-none flex snap-x gap-4 overflow-x-auto pb-2">
                {displayTracks.slice(0, 10).map((track) => (
                  <MusicCard
                    key={track.id}
                    track={track}
                    playing={current?.id === track.id}
                    onPlay={() => dispatch(playTrack({ track, queue: displayTracks }))}
                    onSelect={() => dispatch(playTrack({ track, queue: displayTracks }))}
                    className="w-40 shrink-0 snap-start"
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={RiHistoryLine}
                title="Nothing played yet"
                description="Tracks you listen to will show up here."
                className="py-10"
              />
            )}
          </section>

          {/* Trending tracks */}
          <section>
            <SectionHeader
              title="Trending tracks"
              subtitle="What everyone is playing"
              icon={RiFireLine}
            />
            <div className="rounded-2xl border border-white/[0.06] bg-surface/40 p-2">
              {tracks.length > 0 ? (
                displayTracks.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    index={index}
                    track={track}
                    playing={current?.id === track.id}
                    onPlay={() => dispatch(playTrack({ track, queue: displayTracks }))}
                    onSelect={() => dispatch(playTrack({ track, queue: displayTracks }))}
                    onLike={() => onLike(track)}
                  />
                ))
              ) : (
                <EmptyState
                  icon={RiFireLine}
                  title="No trending tracks"
                  description="Trending music will appear here as the community grows."
                  className="py-10"
                />
              )}
            </div>
          </section>

          {/* Albums */}
          <section>
            <SectionHeader
              title="Albums"
              subtitle={
                user?.role === 'artist'
                  ? 'Albums you have released'
                  : 'Albums from every artist'
              }
              icon={RiAlbumLine}
              actionLabel={visibleAlbums.length > 0 ? undefined : undefined}
            />
            {albums.length > 0 && visibleAlbums.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {visibleAlbums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onSelect={() => navigate(`/home?album=${album.id}`)}
                    onPlay={() => navigate(`/home?album=${album.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={RiAlbumLine}
                title={
                  user?.role === 'artist'
                    ? 'No albums yet'
                    : 'No albums yet'
                }
                description={
                  user?.role === 'artist'
                    ? 'Create an album to start building your catalog.'
                    : 'Albums will appear here once artists create them.'
                }
                className="py-10"
              />
            )}
          </section>

          {/* Top artists */}
          <section>
            <SectionHeader title="Top artists" icon={RiHeart3Line} />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {topArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  onSelect={() => navigate(`/artist/${artist.id}`)}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

/**
 * Full tracklist for a selected album, rendered inline on the home page.
 */
function AlbumDetailView({
  album,
  tracks,
  fallbackTracks = [],
  playingId,
  playing = false,
  isLoading,
  error,
  onPlayAll,
  onShuffle,
  onPlayTrack,
  onLike,
  onClose,
  canAddTrack = false,
  showAddTrack = false,
  onToggleAddTrack,
  onAddTrack,
}) {
  const trackList = tracks.length > 0 ? tracks : fallbackTracks
  const meta =
    trackList.length > 0
      ? `${trackList.length} track${trackList.length === 1 ? '' : 's'}`
      : null
  const [newTitle, setNewTitle] = useState('')
  const [newFile, setNewFile] = useState(null)
  const [adding, setAdding] = useState(false)
  const [addError, setAddError] = useState(null)

  const submitNewTrack = async () => {
    if (!newTitle.trim() || !newFile) return
    setAdding(true)
    setAddError(null)
    try {
      const ok = await onAddTrack?.({ title: newTitle.trim(), file: newFile })
      if (ok === false) {
        setAddError("Couldn't add the track. Please try again.")
        return
      }
      setNewTitle('')
      setNewFile(null)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="space-y-6">
      <CollectionHeader
        typeLabel="Album"
        title={album?.title}
        subtitle={album?.artist}
        coverUrl={album?.coverUrl}
        meta={meta}
        actions={
          <>
            <PlayButton size="lg" onClick={onPlayAll} />
            <IconButton
              icon={RiShuffleLine}
              label="Shuffle"
              size="lg"
              onClick={onShuffle}
            />
            {canAddTrack && (
              <IconButton
                icon={RiAddLine}
                label="Add track"
                size="lg"
                onClick={onToggleAddTrack}
              />
            )}
            <IconButton
              icon={RiCloseLine}
              label="Back to home"
              variant="ghost"
              size="lg"
              onClick={onClose}
            />
          </>
        }
      />

      {canAddTrack && showAddTrack && (
        <div className="rounded-2xl border border-white/[0.06] bg-surface/40 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink-0">Add a track</h2>
            <button
              type="button"
              aria-label="Close"
              className="focus-ring rounded-full p-1 text-ink-500 hover:text-ink-0"
              onClick={onToggleAddTrack}
            >
              <RiCloseFill aria-hidden="true" className="text-lg" />
            </button>
          </div>
          <div className="mt-4 space-y-4">
            <Input
              label="Track title"
              name="newTrackTitle"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="e.g. Night Drive"
            />
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-ink-200">Audio file</span>
              <span className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm transition-colors hover:border-white/25 hover:bg-white/[0.04]">
                <span className="truncate text-ink-300">
                  {newFile?.name ?? 'Choose an audio file…'}
                </span>
                <input
                  type="file"
                  accept={AUDIO_ACCEPT}
                  className="sr-only"
                  onChange={(event) => setNewFile(event.target.files?.[0] ?? null)}
                />
                <span className="shrink-0 text-accent-400">Browse</span>
              </span>
              <span className="block text-xs text-ink-500">
                High quality sources deliver the best playback
              </span>
            </label>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setNewTitle('')
                  setNewFile(null)
                  onToggleAddTrack?.()
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={submitNewTrack}
                disabled={adding || !newTitle.trim() || !newFile}
              >
                {adding ? (
                  <>
                    <Spinner size="sm" />
                    Adding…
                  </>
                ) : (
                  'Add track'
                )}
              </Button>
            </div>
            {addError && (
              <p className="text-xs text-magenta-400">{addError}</p>
            )}
          </div>
        </div>
      )}

      {isLoading ? (
        <SkeletonList count={8} />
      ) : error && tracks.length === 0 && fallbackTracks.length === 0 ? (
        <EmptyState
          icon={RiDiscLine}
          title="Couldn&apos;t load the tracks"
          description={error}
          className="py-16"
        />
      ) : trackList.length > 0 ? (
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
            {trackList.map((track, index) => (
              <TrackRow
                key={track.id}
                index={index}
                track={track}
                playing={playingId === track.id}
                isPlaying={playing}
                onPlay={() => onPlayTrack?.(track)}
                onSelect={() => onPlayTrack?.(track)}
                onLike={() => onLike?.(track)}
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
    </div>
  )
}
