/**
 * Wraps the provided value in an array, unless the provided value is an array.
 *
 * @param value - The value to coerce to an array
 * @return An array
 *
 * @example
 * coerceArray<string>('foo'); // Returns: ['foo']
 * coerceArray(['foo']);       // Returns: ['foo']
 */
export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
