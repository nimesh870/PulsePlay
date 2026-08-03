import { useState } from 'react'
import { RiUploadCloud2Line, RiFileMusicLine } from 'react-icons/ri'
import { cx } from '../../utils/cx'
import FormField from './FormField'

/**
 * Drag-and-drop file picker wired to React Hook Form.
 * `meta` is React Hook Form's field meta (preview / selected file name).
 */
export default function FileDropzone({
  label,
  name,
  register,
  error,
  hint,
  accept,
  meta,
  className,
}) {
  const [dragActive, setDragActive] = useState(false)

  const file = meta?.value
  const fileName =
    typeof file === 'string' ? file : file?.[0]?.name ?? file?.name

  return (
    <FormField
      label={label}
      htmlFor={name}
      error={error}
      hint={hint}
      className={className}
    >
      <label
        htmlFor={name}
        onDragOver={(event) => {
          event.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragActive(false)
        }}
        className={cx(
          'group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors duration-200',
          dragActive
            ? 'border-accent-500/70 bg-accent-500/10'
            : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]',
        )}
      >
        {fileName ? (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300">
              <RiFileMusicLine aria-hidden="true" className="text-xl" />
            </span>
            <span className="text-sm font-medium break-all text-ink-0">
              {fileName}
            </span>
            <span className="text-xs text-ink-500">Tap to replace</span>
          </>
        ) : (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-ink-300 transition-colors duration-200 group-hover:bg-accent-500/15 group-hover:text-accent-300">
              <RiUploadCloud2Line aria-hidden="true" className="text-xl" />
            </span>
            <span className="text-sm font-medium text-ink-0">
              Drag &amp; drop here or{' '}
              <span className="text-accent-400">browse</span>
            </span>
            <span className="text-xs text-ink-500">Accepted: {accept}</span>
          </>
        )}
        <input
          id={name}
          type="file"
          accept={accept}
          className="sr-only"
          aria-invalid={Boolean(error)}
          {...register?.(name)}
        />
      </label>
    </FormField>
  )
}
