import {compareResults} from './utils';

export interface DiagnoseOptions {
  fullCheck: boolean ;
  literal: boolean;
}

const defaultOptions: DiagnoseOptions = {
  fullCheck: false,
  literal: false,
};

/**
 * A class to represent what happend after the execution of a function.
 */
class ExamResults {
  sick: boolean;
  data: unknown;
  /**
   * Class Constructor
   * @param {boolena} sick - If true the value needs treatment.
   * @param {unknown} data - The value itself.
   */
  constructor(sick: boolean, data: unknown) {
    this.sick = sick;
    this.data = data;
  }
}

/**
 *  A class for when a Patient encounters a problem
 *  A.K.A when your function encounters an error that
 * isn't an instance of the Disease class.
 */
export class Diagnose<
    Input extends unknown[],
    Output extends unknown,
    PossibleError extends unknown,
  > {
  yourFunction: (...args: Input) => Output;
  expectedErrors: PossibleError[];
  yourFunctionArgs: Input | [];
  options: DiagnoseOptions;

  /**
   *  Class constructor.
   * @param {Error[]} expectedErrors - The possible errors that could occur.
   * @param {Function} yourFunction - The function you expect to raise an error.
   * @param {unknown[]} yourFunctionArgs - Optional. The arguments of
   *  your function.
   */
  constructor(
      expectedErrors: PossibleError[],
      yourFunction: (...args: Input) => Output,
      yourFunctionArgs?: Input,
  ) {
    this.yourFunction = yourFunction;
    this.expectedErrors = expectedErrors;
    this.yourFunctionArgs = yourFunctionArgs ?? [];
    this.options = defaultOptions;
  }

  /**
   * A function to chain option definitions.
   * @param {DiagnoseOptions} optionsToSet - New options to be used
   *  in the treatment.
   * @return {Diagnose} - The same object inwhich the function was called.
   */
  setOptions(optionsToSet: DiagnoseOptions) {
    this.options = optionsToSet;
    return this;
  }

  /**
   *  A method to treat the possible errors or just return the original
   * function return value.
   * @param {Function} treatmentFunction - The callback function to treat
   *  the possible errors.
   * @return {unknown} - If your functionis async, this method returns a promise
   * when resolved this promise could give a result from your treatment
   * function. If your function is not async, this function returns a result
   * from your function, from tour treatment function.
   */
  do(treatmentFunction: (result: unknown) => Output) {
    let yourFunctionResult: unknown;

    try {
      yourFunctionResult = this.yourFunction(
          ...(this.yourFunctionArgs as Input),
      );
    } catch (someError) {
      yourFunctionResult = someError;
    }

    if (yourFunctionResult instanceof Promise) {
      // Treating async functions
      const treatThis = function(result: ExamResults) {
        if (result.sick) {
          return treatmentFunction(result.data);
        } else {
          return result.data;
        }
      };

      if (!(this.options.fullCheck)) {
        return ((yourFunctionResult as Promise<unknown>)
            .catch(this.examine.bind(this))
            .then((result: unknown) => {
              if (result instanceof ExamResults) {
                return treatThis(result);
              } else {
                return result;
              }
            }) as Output);
      } else {
        return ((yourFunctionResult as Promise<unknown>)
            .catch((someError) => someError)
            .then(this.examine.bind(this))
            .then(treatThis) as Output);
      }
    } else {
      // Treating normal functions
      if (
        !(yourFunctionResult instanceof Error) &&
        !(this.options.fullCheck)
      ) {
        return yourFunctionResult;
      }

      const result = this.examine(yourFunctionResult);
      if (result.sick) {
        return treatmentFunction(result.data);
      } else {
        return (result.data as Output);
      }
    }
  }

  /**
   *  Verifies if a given result is compatible with any of the possible errors.
   * @param {unknown} result - The result of your function.
   * @return {[boolean, result]} - A boolean to indicate if an error you were
   *  expecting happened and the result itself.
   */
  private examine(result: unknown): ExamResults {
    const literal = this.options.literal;

    return new ExamResults(
        this.expectedErrors.some(
            (someError) => {
              return compareResults(result, someError, literal);
            },
        ), result);
  }
}

