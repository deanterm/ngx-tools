/**
 * Determine if all array elements are of a certain type
 *
 * @param x - The array to test
 * @param guard - The function to test for the specific type
 * @return The result
 *
 * @example
 * isArrayOfType<number>([1, 5], isNumber)     // Returns: true
 * isArrayOfType<number>([1, 'foo'], isNumber) // Returns: false
 */
// tslint:disable-next-line no-any
export function isArrayOfType<T>(x: any[], guard: (y: any) => y is T): x is T[] {
  for (const value of x) {
    if (!guard(value)) {
      return false;
    }
  }
  return true;
}
