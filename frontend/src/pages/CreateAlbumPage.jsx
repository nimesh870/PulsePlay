import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import CreateAlbumForm from '../components/forms/CreateAlbumForm'
import Alert from '../components/ui/Alert'
import { fetchMusic } from '../store/slices/musicSlice'
import { createAlbum } from '../store/slices/albumSlice'

/**
 * Artist-only — create an album from the current user's uploaded tracks.
 */
export default function CreateAlbumPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const tracks = useSelector((state) => state.music.items)
  const { status, error } = useSelector((state) => state.album)

  useEffect(() => {
    if (tracks.length === 0) dispatch(fetchMusic())
  }, [dispatch, tracks.length])

  const myTracks = tracks.filter(
    (track) => String(track.artistId) === String(user?.id),
  )
  const trackOptions = myTracks.map((track) => ({
    value: track.id,
    label: track.title,
  }))

  const onSubmit = async (data) => {
    const result = await dispatch(
      createAlbum({
        title: data.title,
        musics: data.musics ?? [],
        artist: user?.name ?? '',
      }),
    )
    if (createAlbum.fulfilled.match(result)) {
      navigate('/home')
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-0 sm:text-3xl">
          Create album
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Group your uploaded tracks into a release.
        </p>
      </header>

      {error && <Alert>{error}</Alert>}

      <div className="rounded-3xl border border-white/[0.06] bg-surface/40 p-6 sm:p-8">
        <CreateAlbumForm
          onSubmit={status === 'loading' ? undefined : onSubmit}
          onCancel={() => navigate('/home')}
          tracks={trackOptions}
        />
      </div>
    </div>
  )
}
