import {assert} from 'chai';
import {Patient} from '../src/patient';
import {Treatable} from '../src/treatable';

interface TreatableWithMessage extends Treatable<string> {
  message: string;
}

const nullTreatment: TreatableWithMessage = {
  message: 'Null Occurred',
  test: (result: unknown) => result === null,
  treat: function() {
    return this.message;
  },
};

const unallowedValueTreatment: TreatableWithMessage = {
  message: 'Fixed value',
  test: (result) => result === 'Unallowed value',
  treat: function() {
    return this.message;
  },
};

const errorTreatment: TreatableWithMessage = {
  message: 'Error Occurred',
  test: (result: unknown) => result instanceof Error,
  treat: function() {
    return this.message;
  },
};

const undefinedTreatment: TreatableWithMessage = {
  message: 'Undefined Occurred',
  test: (result: unknown) => result === undefined,
  treat: function() {
    return this.message;
  },
};

describe('Tests for the Diagnose Class', () => {
  // tests

  it('Normal Function, Raise Error, Use Treatment', () => {
    const currentPatient = new Patient(
        (): string => {
          throw new Error();
        },
    );

    const result = currentPatient.expect(
        errorTreatment, undefinedTreatment, nullTreatment,
    );

    assert.strictEqual(result, errorTreatment.message);
  });

  it('Normal Function, Raise Error, Don\'t Use Treatment', () => {
    const currentPatient = new Patient(
        () => {
          throw new Error();
        },
    );

    assert.throw(
        () => currentPatient.expect(),
    );
  });

  it('Normal Function, Don\'t Raise Error, Use Treatment', () => {
    const currentPatient = new Patient(
        (): string | null => null,
    );

    const result = currentPatient.expect(
        errorTreatment, undefinedTreatment, nullTreatment,
    );

    assert.strictEqual(result, nullTreatment.message);
  });

  it('Normal Function, Don\'t Raise Error, Don\'t Use Treatment', () => {
    const currentPatient = new Patient(
        () => `${2 + 2}`,
    );

    const result = currentPatient.expect(
        errorTreatment, undefinedTreatment, nullTreatment,
    );

    assert.strictEqual(result, '4');
  });

  it('Async Function, Raise Error, Use Treatment', async () => {
    const currentPatient = new Patient(
        async (): Promise<string> => {
          throw new Error();
        },
    );

    const result = await currentPatient.expect(
        errorTreatment, undefinedTreatment, nullTreatment,
    );

    assert.strictEqual(result, errorTreatment.message);
  });

  it('Async Function, Raise Error, Don\'t Use Treatment', async () => {
    const expectedError = new Error('Expected Error');

    const currentPatient = new Patient(
        async () => {
          throw expectedError;
        },
    );
    let givenError: Error = new Error('Wrong Error');

    try {
      await currentPatient.expect();
    } catch (someError) {
      givenError = someError;
    }

    assert.strictEqual(givenError, expectedError);
  });

  it('Async Function, Don\'t Raise Error, Use Treatment', async () => {
    const currentPatient = new Patient(
        async (): Promise<string> => {
          return 'Unallowed value';
        },
    );

    const result = await currentPatient.expect(
        errorTreatment, undefinedTreatment, unallowedValueTreatment,
    );

    assert.strictEqual(result, unallowedValueTreatment.message);
  });

  it('Async Function, Don\'t Raise Error, Don\'t Use Treatment', async () => {
    const currentPatient = new Patient(
        async (): Promise<string> => {
          return 'Ok Value';
        },
    );

    const result = await currentPatient.expect(
        errorTreatment, undefinedTreatment, unallowedValueTreatment,
    );

    assert.strictEqual(result, 'Ok Value');
  });
});
