import {Diagnose} from '../src/diagnose';
import {assert} from 'chai';

describe('Testing the diagnose class', () => {
  // it('', () => {});
  it('Normal, sample, no error', () => {
    const testedFunction = (arg: number) => arg;
    const expectedErrors = [new Error()];

    const diagnose = new Diagnose(
        expectedErrors, testedFunction, [3],
    );

    const result = diagnose.do(() => 0);
    assert.strictEqual(result, 3);
  });
});
