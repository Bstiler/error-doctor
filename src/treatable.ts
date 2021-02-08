/**
 *  An interface to represent a default process to detect
 * and fix an error.
 */
export interface Treatable<T> {
  test(result: unknown): boolean;
  treat(result: unknown): T;
}
