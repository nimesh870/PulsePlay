import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router'
import { RiSearchLine } from 'react-icons/ri'
import TrackRow from '../components/cards/TrackRow'
import AlbumCard from '../components/cards/AlbumCard'
import SectionHeader from '../components/sections/SectionHeader'
import EmptyState from '../components/ui/EmptyState'
import { playTrack } from '../store/slices/playerSlice'

/**
 * Client-side search across the loaded catalog (no search endpoint).
 */
export default function SearchPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tracks = useSelector((state) => state.music.items)
  const albums = useSelector((state) => state.album.items)
  const { current } = useSelector((state) => state.player)

  const query = (searchParams.get('q') ?? '').toLowerCase().trim()

  const filteredTracks = useMemo(
    () =>
      tracks.filter(
        (track) =>
          track.title?.toLowerCase().includes(query) ||
          track.artist?.toLowerCase().includes(query),
      ),
    [tracks, query],
  )

  const filteredAlbums = useMemo(
    () =>
      albums.filter(
        (album) =>
          album.title?.toLowerCase().includes(query) ||
          album.artist?.toLowerCase().includes(query),
      ),
    [albums, query],
  )

  const hasResults = filteredTracks.length > 0 || filteredAlbums.length > 0

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-0 sm:text-3xl">
          Search
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          {query
            ? `${filteredTracks.length + filteredAlbums.length} result${
                filteredTracks.length + filteredAlbums.length === 1 ? '' : 's'
              } for “${query}”`
            : 'Find tracks, albums and artists.'}
        </p>
      </header>

      {!query ? (
        <EmptyState
          icon={RiSearchLine}
          title="Start searching"
          description="Type in the search bar to explore the PulsePlay catalog."
          className="py-16"
        />
      ) : !hasResults ? (
        <EmptyState
          icon={RiSearchLine}
          title="No matches"
          description={`Nothing found for “${query}”. Try a different search.`}
          className="py-16"
        />
      ) : (
        <>
          {filteredAlbums.length > 0 && (
            <section>
              <SectionHeader title="Albums" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredAlbums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onSelect={() => navigate(`/album/${album.id}`)}
                  />
                ))}
              </div>
            </section>
          )}

          {filteredTracks.length > 0 && (
            <section>
              <SectionHeader title="Tracks" />
              <div className="rounded-2xl border border-white/[0.06] bg-surface/40 p-2">
                {filteredTracks.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    index={index}
                    track={track}
                    playing={current?.id === track.id}
                    onPlay={() =>
                      dispatch(playTrack({ track, queue: filteredTracks }))
                    }
                    onSelect={() =>
                      dispatch(playTrack({ track, queue: filteredTracks }))
                    }
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
