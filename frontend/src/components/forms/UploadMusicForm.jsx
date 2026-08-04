import { useForm, useWatch } from 'react-hook-form'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import Input from './Input'
import Select from './Select'
import FileDropzone from './FileDropzone'
import {
  GENRES,
  AUDIO_ACCEPT,
  IMAGE_ACCEPT,
} from '../../config/constants'

const genreOptions = GENRES.map((genre) => ({ value: genre, label: genre }))

/**
 * Upload Music form — UI only. `albums` is optional; when no albums exist a
 * disabled state is shown so users create one first.
 * @param {object} props
 * @param {object[]} props.albums - [{ value, label }]
 * @param {boolean} props.loading - shows a spinner and disables the submit button
 */
export default function UploadMusicForm({
  onSubmit,
  onCancel,
  albums = [],
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      audioFile: '',
      title: '',
      artist: '',
      album: '',
      genre: '',
      cover: '',
    },
  })

  const submit = onSubmit ? handleSubmit(onSubmit) : undefined
  const audioValue = useWatch({ control, name: 'audioFile' })
  const coverValue = useWatch({ control, name: 'cover' })

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <FileDropzone
        label="Audio file"
        name="audioFile"
        register={register}
        required
        error={errors.audioFile}
        accept={AUDIO_ACCEPT}
        meta={audioValue}
        hint="High quality sources deliver the best playback"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Track title"
          name="title"
          register={register}
          required
          error={errors.title}
          placeholder="e.g. Night Drive"
        />
        <Input
          label="Artist name"
          name="artist"
          register={register}
          required
          error={errors.artist}
          placeholder="Artist or band"
        />
        <Select
          label="Album"
          name="album"
          register={register}
          options={albums}
          error={errors.album}
          hint={
            albums.length === 0
              ? 'No albums yet \u2014 create one first to attach tracks'
              : undefined
          }
        />
        <Select
          label="Genre"
          name="genre"
          register={register}
          required
          options={genreOptions}
          error={errors.genre}
        />
      </div>

      <FileDropzone
        label="Cover art"
        name="cover"
        register={register}
        error={errors.cover}
        accept={IMAGE_ACCEPT}
        meta={coverValue}
        hint="Optional \u2014 falls back to the album cover"
      />

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading || isSubmitting}>
          {loading || isSubmitting ? (
            <>
              <Spinner size="sm" />
              Uploading…
            </>
          ) : (
            'Upload track'
          )}
        </Button>
      </div>
    </form>
  )
}
