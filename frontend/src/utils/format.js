/**
 * Format a duration in seconds to `m:ss`.
 * @param {number} seconds
 * @returns {string}
 */
export function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

/**
 * Compact number formatting (e.g. 1240000 -> "1.2M").
 * @param {number} value
 * @returns {string}
 */
export function formatCount(value) {
  if (!Number.isFinite(value)) return '0'
  const units = [
    { limit: 1e9, suffix: 'B' },
    { limit: 1e6, suffix: 'M' },
    { limit: 1e3, suffix: 'K' },
  ]
  for (const { limit, suffix } of units) {
    if (Math.abs(value) >= limit) {
      const scaled = value / limit
      return `${scaled >= 100 ? Math.round(scaled) : scaled.toFixed(1)}${suffix}`
    }
  }
  return String(value)
}
