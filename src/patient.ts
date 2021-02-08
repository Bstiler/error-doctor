import {Diagnose} from './diagnose';
import {Treatable} from './treatable';

type ExpectedTreatment<T> = T extends Promise<infer U>
  ? Treatable<U> | Treatable<T>
  : Treatable<T>;

/**
 *  A class to represent the function that can potentially
 * raise an error.
 */
export class Patient <Input extends unknown[], Output> {
  yourFunction: (...args: Input) => Output;
  yourFunctionArgs: Input | [];

  /**
   * Class constructor.
   * @param {Function} yourFunction - The function that could raise an error.
   * @param {unknown[]} yourFunctionArgs - The args for your function.
   */
  constructor(
      yourFunction: (...args: Input) => Output,
      yourFunctionArgs?: Input,
  ) {
    this.yourFunction = yourFunction;
    this.yourFunctionArgs = yourFunctionArgs ?? [];
  }

  /**
   * Generates a 'Diagnose' object to handle possible errors.
   * @param {Object[]} possibleErrors - The possible erros you can treat.
   * @return {Diagnose} - The 'Diagnose' object that treats the error.
   */
  case(...possibleErrors: unknown[]) {
    return new Diagnose(
        possibleErrors,
        (this.yourFunction as (...args: any[]) => Output),
        this.yourFunctionArgs,
    );
  }

  /**
   *   A method to check yuor function against a list of possible
   * Disease objects.
   * @param {Disease} possibleDiseases - The list of Disease objects.
   * @return {Output | unknown} - The return value of your function or
   *  the tratment given to it in case of error.
   */
  expect( // Continue daqui, estude a keyword infer e tipos condicionais
      ...possibleDiseases: ExpectedTreatment<Output | never>[]
  ): Output | never {
    const result = this.getFunctionResult();

    if (result instanceof Promise) {
      return (((result as Promise<Output>)
          .catch((someError) => someError)
          .then(
              (result) => this.testHypothesys(
                  result, (possibleDiseases as Treatable<Output>[]),
              ),
          )) as unknown as Output);
    } else {
      return this.testHypothesys(
          result, (possibleDiseases as Treatable<Output>[]),
      );
    }
  }

  /**
   * A simple method to get your function's result.
   * @return {unknown} - Your function's outcome, be it a error or a value.
   */
  private getFunctionResult(): unknown {
    let result: unknown;

    try {
      result = this.yourFunction(
          ...(this.yourFunctionArgs as Input),
      );
    } catch (someError) {
      result = someError;
    }

    return result;
  }

  /**
   *  A small method to test if a function's return value fits
   * into some hypothetical error.
   * @param {unknown} result -
   * @param {Treatable[]} possibleDiseases -
   * @return {Output | unknown} - If no error is found, your function result is
   *  returned, if some error is found the treatment for that error is excecuted
   *  and its value returned.
   */
  private testHypothesys(
      result: unknown, possibleDiseases: Treatable<Output | never>[],
  ): Output | never {
    for (const hypothesys of possibleDiseases) {
      if (hypothesys.test(result)) {
        return hypothesys.treat(result);
      }
    }
    if (result instanceof Error) {
      throw result;
    } else {
      return (result as Output);
    }
  }
}
