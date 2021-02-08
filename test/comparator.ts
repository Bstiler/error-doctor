import {compareResults} from '../src/utils';
import {assert} from 'chai';

describe('Testing compareResults function from the utils.ts file', () => {
  // Literal mode tests

  it('Given object, expected class, literal, equal', () => {
    assert.strictEqual(compareResults((new Error()), Error, true), true);
  });
  it('Given object, expected literal, literal, equal', () => {
    assert.strictEqual(compareResults({a: 1}, {a: 1}, true), true);
  });
  it('Given literal, expected literal, literal, equal', () => {
    assert.strictEqual(compareResults(null, null, true), true);
    assert.strictEqual(compareResults(undefined, undefined, true), true);
    assert.strictEqual(compareResults(1, 1, true), true);
  });
  it('Given literal, expected class, literal, equal', () => {
    assert.strictEqual(compareResults(3, Number, true), true);
  });
  it('Given object, expected class, literal, different', () => {
    assert.strictEqual(compareResults({message: ''}, Error, true), false);
  });
  it('Given object, expected literal, literal, different', () => {
    assert.strictEqual(compareResults({message: ''}, {a: 1}, true), false);
  });
  it('Given literal, expected literal, literal, different', () => {
    assert.strictEqual(compareResults(1, 2, true), false);
    assert.strictEqual(compareResults(1, null, true), false);
    assert.strictEqual(compareResults(1, undefined, true), false);
  });
  it('Given literal, expected class, literal, different', () => {
    assert.strictEqual(compareResults(1, String, true), false);
  });

  // Sample mode tests
  it('Given object, expected class, sample, equal', () => {
    assert.strictEqual(compareResults((new Error()), Error, false), true);
  });
  it('Given object, expected literal, sample, equal', () => {
    assert.strictEqual(compareResults({a: 1}, {a: 1}, false), true);
  });
  it('Given literal, expected literal, sample, equal', () => {
    assert.strictEqual(compareResults(null, null, false), true);
  });
  it('Given literal, expected class, sample, equal', () => {
    assert.strictEqual(compareResults(3, Number, false), true);
  });
  it('Given object, expected class, sample, different', () => {
    assert.strictEqual(compareResults({message: ''}, Error, false), false);
  });
  it('Given object, expected literal, sample, different', () => {
    assert.strictEqual(compareResults({message: ''}, null, false), false);
  });
  it('Given literal, expected literal, sample, different', () => {
    assert.strictEqual(compareResults(1, '1', false), false);
  });
  it('Given literal, expected class, sample, different', () => {
    assert.strictEqual(compareResults(1, String, false), false);
  });
});
