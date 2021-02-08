import {Diagnose} from '../src/diagnose';
import {assert} from 'chai';

describe('Tests for the Diagnose Class', () => {
  // Generated Tests

  it('Normal Function, Literal, Check Results, Return right type', () => {
    const shouldWork = true;
    const yourFunction = (): number | null => (shouldWork)? 3:null;
    const diagnoseObject = new Diagnose([], yourFunction);
    diagnoseObject.setOptions({fullCheck: true, literal: true});

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 3);
  });

  it('Normal Function, Literal, Check Results, Return wrong type', () => {
    const shouldWork = false;
    const yourFunction = (): number | null => (shouldWork)? 3:null;
    const diagnoseObject = new Diagnose([null], yourFunction);
    diagnoseObject.setOptions({fullCheck: true, literal: true});

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 4);
  });

  it('Normal Function, Literal, Check Results, Raise Error', () => {
    const shouldWork = false;
    const yourFunction = (): number | null => {
      throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);
    diagnoseObject.setOptions({fullCheck: true, literal: true});

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 4);
  });

  it('Normal Function, Literal, Only Errors, Return right type', () => {
    const shouldWork = true;
    const yourFunction = (): number | null => {
      throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);
    diagnoseObject.setOptions({literal: true});

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 4);
  });

  it('Normal Function, Literal, Only Errors, Return wrong type', () => {
    const shouldWork = false;
    const yourFunction = (): number | null => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([null, undefined], yourFunction);
    diagnoseObject.setOptions({literal: true});

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 4);
  });

  it('Normal Function, Literal, Only Errors, Raise Error', () => {
    const shouldWork = false;
    const yourFunction = (): number | null => {
      throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);
    diagnoseObject.setOptions({literal: true});

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 4);
  });

  it('Normal Function, Sample, Check Results, Return right type', () => {
    const shouldWork = true;
    const yourFunction = (): number | null => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);
    diagnoseObject.setOptions({fullCheck: true});

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 3);
  });

  it('Normal Function, Sample, Check Results, Return wrong type', () => {
    const shouldWork = false;
    const yourFunction = (): number | null => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([null], yourFunction);
    diagnoseObject.setOptions({fullCheck: true});

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 4);
  });

  it('Normal Function, Sample, Check Results, Raise Error', () => {
    const shouldWork = false;
    const yourFunction = (): number | null => {
      throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);
    diagnoseObject.setOptions({fullCheck: true});

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 4);
  });

  it('Normal Function, Sample, Only Errors, Return right type', () => {
    const shouldWork = true;
    const yourFunction = (): number | null => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 3);
  });

  it('Normal Function, Sample, Only Errors, Return wrong type', () => {
    const shouldWork = false;
    const yourFunction = (): number | null => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([null], yourFunction);

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 4);
  });

  it('Normal Function, Sample, Only Errors, Raise Error', () => {
    const shouldWork = false;
    const yourFunction = (): number | null => {
      throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);

    const result = diagnoseObject.do(() => 4);

    assert.strictEqual(result, 4);
  });

  it('Async Function, Literal, Check Results, Return right type', async () => {
    const shouldWork = true;
    const yourFunction = async (): Promise<number | null> => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);
    diagnoseObject.setOptions({fullCheck: true, literal: true});

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 3);
  });

  it('Async Function, Literal, Check Results, Return wrong type', async () => {
    const shouldWork = false;
    const yourFunction = async (): Promise<number | null> => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([null], yourFunction);
    diagnoseObject.setOptions({fullCheck: true, literal: true});

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 4);
  });

  it('Async Function, Literal, Check Results, Raise Error', async () => {
    const shouldWork = false;
    const yourFunction = async (): Promise<number | null> => {
      throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);
    diagnoseObject.setOptions({fullCheck: true, literal: true});

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 4);
  });

  it('Async Function, Literal, Only Errors, Return right type', async () => {
    const shouldWork = true;
    const yourFunction = async (): Promise<number | null> => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([null], yourFunction);
    diagnoseObject.setOptions({literal: true});

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 3);
  });

  it('Async Function, Literal, Only Errors, Return wrong type', async () => {
    const shouldWork = false;
    const yourFunction = async (): Promise<number | null> => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([null], yourFunction);
    diagnoseObject.setOptions({literal: true});

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 4);
  });

  it('Async Function, Literal, Only Errors, Raise Error', async () => {
    const shouldWork = true;
    const yourFunction = async (): Promise<number | null> => {
      throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error], yourFunction);
    diagnoseObject.setOptions({literal: true});

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 4);
  });

  it('Async Function, Sample, Check Results, Return right type', async () => {
    const shouldWork = true;
    const yourFunction = async (): Promise<number | null> => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error], yourFunction);
    diagnoseObject.setOptions({fullCheck: true});

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 3);
  });

  it('Async Function, Sample, Check Results, Return wrong type', async () => {
    const shouldWork = false;
    const yourFunction = async (): Promise<number | null> => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([null], yourFunction);
    diagnoseObject.setOptions({fullCheck: true});

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 4);
  });

  it('Async Function, Sample, Check Results, Raise Error', async () => {
    const shouldWork = false;
    const yourFunction = async (): Promise<number | null> => {
      throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);
    diagnoseObject.setOptions({fullCheck: true});

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 4);
  });

  it('Async Function, Sample, Only Errors, Return right type', async () => {
    const shouldWork = true;
    const yourFunction = async (): Promise<number | null> => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([null], yourFunction);

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 3);
  });

  it('Async Function, Sample, Only Errors, Return wrong type', async () => {
    const shouldWork = false;
    const yourFunction = async (): Promise<number | null> => {
      // throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([null], yourFunction);

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 4);
  });

  it('Async Function, Sample, Only Errors, Raise Error', async () => {
    const shouldWork = false;
    const yourFunction = async (): Promise<number | null> => {
      throw new Error();
      return (shouldWork)? 3:null;
    };
    const diagnoseObject = new Diagnose([new Error()], yourFunction);

    const result = await diagnoseObject.do(async () => 4);

    assert.strictEqual(result, 4);
  });
});
