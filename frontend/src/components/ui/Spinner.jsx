import { RiLoader4Line } from 'react-icons/ri'
import { cx } from '../../utils/cx'

/**
 * Minimal loading spinner.
 */
export default function Spinner({ size = 'md', className }) {
  const sizeClass = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-9 w-9',
  }[size]
  return (
    <RiLoader4Line
      aria-hidden="true"
      className={cx('animate-spin text-accent-400', sizeClass, className)}
    />
  )
}
