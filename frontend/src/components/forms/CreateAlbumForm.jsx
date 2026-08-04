import { useForm, useWatch } from 'react-hook-form'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import Input from './Input'
import Select from './Select'
import Textarea from './Textarea'
import Checkbox from './Checkbox'
import FileDropzone from './FileDropzone'
import { GENRES, IMAGE_ACCEPT } from '../../config/constants'

const genreOptions = GENRES.map((genre) => ({ value: genre, label: genre }))

/**
 * Create Album form — UI only, submission is wired by the parent via `onSubmit`.
 * @param {object} props
 * @param {Function} props.onSubmit - receives validated form values
 * @param {Function} props.onCancel
 * @param {{ value: string, label: string }[]} props.tracks - selectable tracks
 * @param {boolean} props.loading - shows a spinner and disables the submit button
 */
export default function CreateAlbumForm({
  onSubmit,
  onCancel,
  tracks = [],
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      artist: '',
      genre: '',
      releaseDate: '',
      cover: '',
      description: '',
      musics: [],
    },
  })

  const submit = onSubmit ? handleSubmit(onSubmit) : undefined
  const coverValue = useWatch({ control, name: 'cover' })

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Album title"
          name="title"
          register={register}
          required
          error={errors.title}
          placeholder="e.g. Midnight Signals"
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
          label="Genre"
          name="genre"
          register={register}
          required
          options={genreOptions}
          error={errors.genre}
        />
        <Input
          label="Release date"
          name="releaseDate"
          register={register}
          required
          type="date"
          error={errors.releaseDate}
        />
      </div>

      <FileDropzone
        label="Cover art"
        name="cover"
        register={register}
        error={errors.cover}
        accept={IMAGE_ACCEPT}
        meta={coverValue}
        hint="Square image recommended"
      />

      <Textarea
        label="Description"
        name="description"
        register={register}
        error={errors.description}
        hint="A short story behind the release"
      />

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-ink-100">Tracks</legend>
        {tracks.length > 0 ? (
          <div className="space-y-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
            {tracks.map((track) => (
              <Checkbox
                key={track.value}
                label={track.label}
                name="musics"
                value={track.value}
                register={register}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-500">
            No tracks selected yet \u2014 you can create the album now and add
            tracks to it later.
          </p>
        )}
        {errors.musics && (
          <p className="text-xs text-magenta-400">{errors.musics.message}</p>
        )}
      </fieldset>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading || isSubmitting}>
          {loading || isSubmitting ? (
            <>
              <Spinner size="sm" />
              Creating…
            </>
          ) : (
            'Create album'
          )}
        </Button>
      </div>
    </form>
  )
}
