import { cx } from '../../utils/cx'
import FormField from './FormField'

const requiredRule = { required: 'This field is required' }

/**
 * Text-style input wired to React Hook Form.
 * @param {object} props
 * @param {Function} props.register - useForm().register
 * @param {object} props.error - errors[name]
 * @param {object} props.rules - extra RHF rules merged over `required`
 */
export default function Input({
  label,
  name,
  register,
  rules,
  error,
  hint,
  required = false,
  type = 'text',
  leftIcon: LeftIcon,
  className,
  ...rest
}) {
  const fieldProps = register?.(name, {
    ...(required ? requiredRule : {}),
    ...rules,
  })

  return (
    <FormField
      label={label}
      htmlFor={name}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <div className="relative">
        {LeftIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-ink-500"
          >
            <LeftIcon />
          </span>
        )}
        <input
          id={name}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={cx(
            'input-base',
            LeftIcon && 'pl-11',
            error && 'border-magenta-500/60',
          )}
          {...fieldProps}
          {...rest}
        />
      </div>
    </FormField>
  )
}
