import { RiCheckLine } from 'react-icons/ri'
import { cx } from '../../utils/cx'

/**
 * Custom checkbox wired to React Hook Form.
 */
export default function Checkbox({
  label,
  name,
  register,
  rules,
  error,
  className,
  ...rest
}) {
  return (
    <div className={cx('space-y-1.5', className)}>
      <label className="flex cursor-pointer items-start gap-3">
        <span className="relative mt-0.5 inline-flex shrink-0">
          <input
            type="checkbox"
            className="peer sr-only"
            aria-invalid={Boolean(error)}
            {...register?.(name, {
              ...(name === 'terms' ? { required: 'Required' } : {}),
              ...rules,
            })}
            {...rest}
          />
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] transition-all duration-200 peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-accent-500 peer-checked:to-magenta-500 peer-focus-visible:ring-2 peer-focus-visible:ring-accent-500/70"
          >
            <RiCheckLine className="h-3.5 w-3.5 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
          </span>
        </span>
        <span className="text-sm leading-relaxed text-ink-300">{label}</span>
      </label>
      {error?.message && (
        <p className="text-xs text-magenta-400">{error.message}</p>
      )}
    </div>
  )
}
