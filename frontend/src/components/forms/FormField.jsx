import { cx } from '../../utils/cx'

/**
 * Label + control + helper/error wrapper used by every field.
 */
export default function FormField({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  className,
  children,
}) {
  return (
    <div className={cx('space-y-1.5', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-ink-100"
        >
          {label}
          {required && (
            <span aria-hidden="true" className="text-magenta-400">
              {' '}
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error?.message ? (
        <p id={`${htmlFor}-error`} className="text-xs text-magenta-400">
          {error.message}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-500">{hint}</p>
      ) : null}
    </div>
  )
}
