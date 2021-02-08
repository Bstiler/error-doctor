import {assert} from 'chai';
import doctor from '../src/index';

describe('Integration Tests with common use cases', () => {
  it('Case Method', () => {
    const result = doctor.check((arg1: string) => arg1, 'Wrong value')
        .case('Wrong value')
        .setOptions({literal: true, fullCheck: true})
        .do(() => 'Correct value');

    assert.strictEqual(result, 'Correct value');
  });
  it('Expect Method', () => {});
});
