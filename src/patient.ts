import {Diagnose} from './diagnose';

/**
 *  A class to represent the function that can potentially
 * raise an error.
 */
export class Patient <Input extends unknown[], Output> {
  yourFunction: (...args: Input) => Output;
  yourFunctionArgs: Input | undefined;

  /**
   * Class constructor.
   * @param {Function} yourFunction - The function that could raise an error.
   * @param {unknown[]} yourFunctionArgs - The args for your function.
   */
  constructor(
      yourFunction: (...args: Input) => Output,
      yourFunctionArgs: Input,
  ) {
    this.yourFunction = yourFunction;
    this.yourFunctionArgs = yourFunctionArgs;
  }

  /**
   * Generates a 'Diagnose' object to handle possible errors.
   * @param {Object[]} possibleErrors - The possible erros you can treat.
   * @return {Diagnose} - The 'Diagnose' object that treats the error.
   */
  case(...possibleErrors: unknown[]) {
    return new Diagnose(
        possibleErrors, this.yourFunction, this.yourFunctionArgs,
    );
  }
  expect();
}

// Async Version?

// /**
//  *  A class to represent the sync function that can potentially
//  * raise an error.
//  */
// export class AsyncPatient <Input extends unknown[], Output> {
//   action: (...args: Input) => Promise<Output>;

//   /**
//    * Class constructor
//    * @param {Function} yourFunction - The async function that could
//    * raise an error.
//    */
//   constructor(yourFunction: (...args: Input) => Promise<Output>) {
//     this.action = yourFunction;
//   }

//   case();
//   expect();
// }
