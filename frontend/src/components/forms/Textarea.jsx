import { cx } from '../../utils/cx'
import FormField from './FormField'

/**
 * Multiline input wired to React Hook Form.
 */
export default function Textarea({
  label,
  name,
  register,
  rules,
  error,
  hint,
  required = false,
  rows = 4,
  className,
  ...rest
}) {
  return (
    <FormField
      label={label}
      htmlFor={name}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <textarea
        id={name}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={cx(
          'input-base resize-none leading-relaxed',
          error && 'border-magenta-500/60',
        )}
        {...register?.(name, {
          ...(required ? { required: 'This field is required' } : {}),
          ...rules,
        })}
        {...rest}
      />
    </FormField>
  )
}
