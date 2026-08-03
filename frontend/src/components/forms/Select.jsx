import { RiArrowDownSLine } from 'react-icons/ri'
import { cx } from '../../utils/cx'
import FormField from './FormField'

/**
 * Native select styled to match the input system.
 * @param {object} props
 * @param {{ value: string, label: string }[]} props.options
 */
export default function Select({
  label,
  name,
  register,
  rules,
  options = [],
  error,
  hint,
  required = false,
  placeholder = 'Select\u2026',
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
      <div className="relative">
        <select
          id={name}
          aria-invalid={Boolean(error)}
          className={cx(
            'input-base cursor-pointer appearance-none pr-10',
            error && 'border-magenta-500/60',
          )}
          {...register?.(name, {
            ...(required ? { required: 'This field is required' } : {}),
            ...rules,
          })}
          {...rest}
        >
          <option value="" className="bg-surface">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-surface"
            >
              {option.label}
            </option>
          ))}
        </select>
        <RiArrowDownSLine
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-lg text-ink-500"
        />
      </div>
    </FormField>
  )
}
