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

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 5) return 'Up late?'
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

/**
 * Home feed — sections are driven entirely by props; loading and empty
 * states are handled here so the page never shows fake content.
 */
export default function HomePage({
  isLoading = false,
  greeting,
  recentlyPlayed = [],
  featuredAlbums = [],
  trendingTracks = [],
  topArtists = [],
  playingId,
  onPlayTrack,
  onPlayAlbum,
  onSelectAlbum,
  onSelectArtist,
  onLikeTrack,
}) {
  const headline = greeting ?? getGreeting()
  const spotlight = featuredAlbums[0]

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
              playing={playingId === spotlight.id}
              onPlay={() => onPlayAlbum?.(spotlight)}
              onSelect={() => onSelectAlbum?.(spotlight)}
            />
          )}

          {/* Recently played — horizontal scroll */}
          <section>
            <SectionHeader
              title="Recently played"
              icon={RiHistoryLine}
              actionLabel={recentlyPlayed.length > 0 ? 'See all' : undefined}
            />
            {recentlyPlayed.length > 0 ? (
              <div className="scrollbar-none flex snap-x gap-4 overflow-x-auto pb-2">
                {recentlyPlayed.map((track) => (
                  <MusicCard
                    key={track.id}
                    track={track}
                    playing={playingId === track.id}
                    onPlay={() => onPlayTrack?.(track)}
                    onSelect={() => onPlayTrack?.(track)}
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
              {featuredAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onPlay={() => onPlayAlbum?.(album)}
                  onSelect={() => onSelectAlbum?.(album)}
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
              {trendingTracks.length > 0 ? (
                trendingTracks.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    index={index}
                    track={track}
                    playing={playingId === track.id}
                    onPlay={() => onPlayTrack?.(track)}
                    onSelect={() => onPlayTrack?.(track)}
                    onLike={() => onLikeTrack?.(track)}
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
                  onSelect={() => onSelectArtist?.(artist)}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
