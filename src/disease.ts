/**
 *  An interface to represent a default process to detect
 * and fix an error.
 */
export interface Treatable {
  test(result: unknown): boolean;
  treat(result: unknown): unknown;
}

/**
 * A class to represent an error with a default solution
 */
export abstract class Disease extends Error implements Treatable {
  /**
   *  A method to identify if a given result means this Disease ocurred.
   *  The default implementation of this method only returns false. Override
   * this method in the subclass to identify situations that triggers this.
   * @param {unknow} result -A result that triggers this error, could be
   *  an Error Object or any other return value, remember to test the
   *  input's type.
   * @return {boolean} - Returns a boolean defining if the result should be
   *  treated by this class.
   */
  test(result: unknown): boolean {
    return false;
  }

  /**
   *  A method to treat the results that triggers this Disease.
   *  The default implementation of the 'treat' method only rethrow errors
   * or returns normal results. Override this method in the subclass to treat
   * possible errors.
   * @param {unknown} result - The unexpected result of your function.
   * @return {unknown} - The default implementation only returns if it receives
   *  a normal value (not an Error).
   */
  treat(result: unknown) {
    if (result instanceof Error) {
      const toThrow: Error = (result as Error);
      throw toThrow;
    } else {
      return result;
    }
  }
}
