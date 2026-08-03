/**
 * Pull a human-readable message out of an axios error.
 * @param {unknown} error
 * @param {string} fallback
 * @returns {string}
 */
export function extractErrorMessage(
  error,
  fallback = 'Something went wrong. Please try again.',
) {
  const data = error?.response?.data
  return data?.error || data?.message || error?.message || fallback
}
