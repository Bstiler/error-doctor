import {isEqual} from 'lodash';

/**
 *  A function that tries to compare two thigs in some way and returns false if
 * an error is raised.
 * @param {Function} comparison - A function to compare the two things.
 * @return {boolean} - A boolean to indicate if the two things are compatible
 */
export function tryToCompare(
    comparison: () => boolean,
): boolean {
  let toReturn = false;

  try {
    toReturn = comparison();
  } catch (err) {
    toReturn = false;
  }

  return toReturn;
}


/**
 *  The function that compares given results with possible results.
 * @param {unknown} given - Usually the result of the function given by
 *  the user.
 * @param {unknown} expected - Some expected type of value, could be anything
 *  the function is coded to be able to compare even with classes
 * @param {boolean} literal - Verifies compatibility with the value itself,
 *  not only the class.
 * @return {boolean} - A boolean to indicate if the two things are compatible.
 */
export function compareResults(
    given: unknown, expected: unknown, literal: boolean,
): boolean {
  if (literal) {
    if (!(given instanceof Object)) {
      return given === expected || tryToCompare(
          () => Object.getPrototypeOf(given).constructor === expected,
      );
    } else {
      return isEqual(given, expected) || tryToCompare(
          () => given instanceof (expected as Function),
      );
    }
  } else {
    let expectedToCompare: unknown;
    let givenToCompare: unknown;

    // Setting the expected value
    if (
      expected !== null &&
      expected !== undefined &&
      !(expected instanceof Function)
    ) {
      expectedToCompare = Object.getPrototypeOf(expected).constructor;
    } else {
      expectedToCompare = expected;
    }

    // Setting the given value
    if (
      given !== null &&
      given !== undefined &&
      !(given instanceof Object)
    ) {
      givenToCompare = Object.getPrototypeOf(given).constructor;
    } else {
      givenToCompare = given;
    }

    // Do the comparrison for the non-literal case
    return expectedToCompare === givenToCompare ||
      tryToCompare(
          () => givenToCompare instanceof (expectedToCompare as Function),
      );
  }
}

