/**
 * Merge conditional class names. Accepts strings and falsy values.
 * @param  {...(string | false | null | undefined)} classes
 * @returns {string}
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}
