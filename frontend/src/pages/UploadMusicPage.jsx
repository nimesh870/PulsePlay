import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import UploadMusicForm from '../components/forms/UploadMusicForm'
import Alert from '../components/ui/Alert'
import { fetchAlbums } from '../store/slices/albumSlice'
import { uploadMusic, clearMusicError } from '../store/slices/musicSlice'

/**
 * Artist-only — upload a single audio file. The backend stores the file via
 * ImageKit and returns the streamable URI.
 */
export default function UploadMusicPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const albums = useSelector((state) => state.album.items)
  const { status, error } = useSelector((state) => state.music)

  useEffect(() => {
    if (albums.length === 0) dispatch(fetchAlbums())
  }, [dispatch, albums.length])

  const albumOptions = albums.map((album) => ({
    value: album.id,
    label: album.title,
  }))

  const onSubmit = async (data) => {
    const file = data.audioFile?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('music', file)
    formData.append('title', data.title)
    formData.append('artist', user?.name ?? 'Unknown')

    const result = await dispatch(uploadMusic(formData))
    if (uploadMusic.fulfilled.match(result)) {
      navigate('/home')
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-0 sm:text-3xl">
          Upload music
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Publish a track to the PulsePlay catalog.
        </p>
      </header>

      {error && (
        <>
          <Alert>{error}</Alert>
          <button
            type="button"
            onClick={() => dispatch(clearMusicError())}
            className="focus-ring -mt-3 text-xs font-semibold text-accent-400 hover:text-accent-300"
          >
            Dismiss
          </button>
        </>
      )}

      <div className="rounded-3xl border border-white/[0.06] bg-surface/40 p-6 sm:p-8">
        <UploadMusicForm
          onSubmit={status === 'loading' ? undefined : onSubmit}
          onCancel={() => navigate('/home')}
          albums={albumOptions}
        />
      </div>
    </div>
  )
}
