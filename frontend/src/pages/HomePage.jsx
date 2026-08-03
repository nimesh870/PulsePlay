import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  RiHeart3Line,
  RiHistoryLine,
  RiSparkling2Line,
  RiFireLine,
} from 'react-icons/ri'
import MusicCard from '../components/cards/MusicCard'
import AlbumCard from '../components/cards/AlbumCard'
import ArtistCard from '../components/cards/ArtistCard'
import TrackRow from '../components/cards/TrackRow'
import SectionHeader from '../components/sections/SectionHeader'
import HeroBanner from '../components/sections/HeroBanner'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import {
  SkeletonCardGrid,
  SkeletonHero,
  SkeletonList,
} from '../components/ui/Skeletons'
import { fetchMusic } from '../store/slices/musicSlice'
import { fetchAlbums } from '../store/slices/albumSlice'
import { playTrack } from '../store/slices/playerSlice'

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
  const { items: tracks, status: musicStatus } = useSelector(
    (state) => state.music,
  )
  const { items: albums, status: albumStatus } = useSelector(
    (state) => state.album,
  )
  const { current } = useSelector((state) => state.player)

  useEffect(() => {
    if (musicStatus === 'idle') dispatch(fetchMusic())
    if (albumStatus === 'idle') dispatch(fetchAlbums())
  }, [dispatch, musicStatus, albumStatus])

  const isLoading =
    ((musicStatus === 'idle' || musicStatus === 'loading') && tracks.length === 0) ||
    ((albumStatus === 'idle' || albumStatus === 'loading') && albums.length === 0)

  const topArtists = useMemo(() => {
    const map = new Map()
    albums.forEach((album) => {
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
  }, [albums])

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

  const spotlight = albums[0]
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

      {isLoading ? (
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
              onPlay={() => navigate(`/album/${spotlight.id}`)}
              onSelect={() => navigate(`/album/${spotlight.id}`)}
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
                {tracksWithArtists.slice(0, 10).map((track) => (
                  <MusicCard
                    key={track.id}
                    track={track}
                    playing={current?.id === track.id}
                    onPlay={() => dispatch(playTrack({ track, queue: tracks }))}
                    onSelect={() => dispatch(playTrack({ track, queue: tracks }))}
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

          {/* Featured albums */}
          <section>
            <SectionHeader
              title="Featured albums"
              subtitle="Fresh out of the studio"
              icon={RiSparkling2Line}
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onPlay={() => navigate(`/album/${album.id}`)}
                  onSelect={() => navigate(`/album/${album.id}`)}
                />
              ))}
            </div>
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
                tracksWithArtists.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    index={index}
                    track={track}
                    playing={current?.id === track.id}
                    onPlay={() => dispatch(playTrack({ track, queue: tracks }))}
                    onSelect={() => dispatch(playTrack({ track, queue: tracks }))}
                    onLike={() => {}}
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
