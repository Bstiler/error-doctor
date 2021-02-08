import {Patient} from './patient';

/**
 *  A function to receive the action that may possibly
 * raise an error and return a 'Patient' object.
 * @param {Function} yourFunction - The function you want to execute safely.
 * @param {unknown[]} yourFunctionArgs - The arguments to your function.
 * @return {Patient} - A 'Patient' object;
 */
export function check<Input extends unknown[], Output>(
    yourFunction: (...args: Input) => Output,
    ...yourFunctionArgs: Input): Patient<Input, Output> {
  return new Patient(yourFunction, yourFunctionArgs);
}
