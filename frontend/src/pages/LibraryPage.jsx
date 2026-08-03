import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RiPlayList2Line } from 'react-icons/ri'
import AlbumCard from '../components/cards/AlbumCard'
import TrackRow from '../components/cards/TrackRow'
import SectionHeader from '../components/sections/SectionHeader'
import EmptyState from '../components/ui/EmptyState'
import { fetchMusic } from '../store/slices/musicSlice'
import { fetchAlbums } from '../store/slices/albumSlice'
import { playTrack } from '../store/slices/playerSlice'

/**
 * Your Library — the full catalog grouped into albums and tracks.
 */
export default function LibraryPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tracks = useSelector((state) => state.music.items)
  const albums = useSelector((state) => state.album.items)
  const { current } = useSelector((state) => state.player)

  useEffect(() => {
    if (tracks.length === 0) dispatch(fetchMusic())
    if (albums.length === 0) dispatch(fetchAlbums())
  }, [dispatch, tracks.length, albums.length])

  const hasContent = albums.length > 0 || tracks.length > 0

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-0 sm:text-3xl">
          Your Library
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Everything available on PulsePlay.
        </p>
      </header>

      {!hasContent ? (
        <EmptyState
          icon={RiPlayList2Line}
          title="Your library is empty"
          description="Albums and tracks will appear here once artists start uploading."
          className="py-16"
        />
      ) : (
        <>
          {albums.length > 0 && (
            <section>
              <SectionHeader title="Albums" />
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
          )}

          {tracks.length > 0 && (
            <section>
              <SectionHeader title="Tracks" />
              <div className="rounded-2xl border border-white/[0.06] bg-surface/40 p-2">
                {tracks.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    index={index}
                    track={track}
                    playing={current?.id === track.id}
                    onPlay={() => dispatch(playTrack({ track, queue: tracks }))}
                    onSelect={() => dispatch(playTrack({ track, queue: tracks }))}
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
