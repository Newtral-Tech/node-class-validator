// eslint-disable-next-line max-classes-per-file
import { IsOptional } from '@newtral/class-validator';
import { expect } from 'chai';
import { IsString, validateSync } from 'class-validator';

describe('@IsOptional()', () => {
  it('should not apply the validation when the value is "undefined"', () => {
    class Test {
      @IsOptional()
      @IsString()
      test?: string;

      constructor(test?: string) {
        this.test = test;
      }
    }

    const errors = validateSync(new Test(undefined));

    expect(errors).to.be.deep.equal([]);
  });

  it('should apply the validation when the values is "null"', () => {
    class Test {
      @IsOptional()
      @IsString()
      test?: string;

      constructor(test?: string) {
        this.test = test;
      }
    }

    // @ts-expect-error
    const errors = validateSync(new Test(null));

    expect(errors[0].constraints).to.be.deep.equal({ isString: 'test must be a string' });
  });

  it('should apply the validation when value is an empty string', () => {
    class Test {
      @IsOptional()
      @IsString()
      test?: string;

      constructor(test?: string) {
        this.test = test;
      }
    }

    const errors = validateSync(new Test(''));

    expect(errors).to.be.deep.equal([]);
  });

  it('should apply the validation when value is 0', () => {
    class Test {
      @IsOptional()
      @IsString()
      test?: string;

      constructor(test?: string) {
        this.test = test;
      }
    }

    // @ts-expect-error
    const errors = validateSync(new Test(0));

    expect(errors[0].constraints).to.be.deep.equal({ isString: 'test must be a string' });
  });
});
