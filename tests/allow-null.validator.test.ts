// eslint-disable-next-line max-classes-per-file
import { AllowNull, IsOptional } from '@newtral/class-validator';
import { expect } from 'chai';
import { IsString, validateSync } from 'class-validator';

describe('@AllowNull()', () => {
  it('should pass the validation when value is "null"', async () => {
    class Test {
      @AllowNull()
      @IsString()
      test: string | null;

      constructor(test: string | null) {
        this.test = test;
      }
    }

    const errors = validateSync(new Test(null));

    expect(errors).to.be.deep.equal([]);
  });

  it('should pass the validation when the value is "null" and the property is optional', () => {
    class Test {
      @AllowNull()
      @IsOptional()
      @IsString()
      test?: string | null;

      constructor(test?: string | null) {
        this.test = test;
      }
    }

    const errors = validateSync(new Test(null));

    expect(errors).to.be.deep.equal([]);
  });

  it('should pass the validation when the value is "undefined" and the property is optional', () => {
    class Test {
      @AllowNull()
      @IsOptional()
      @IsString()
      test?: string | null;

      constructor(test?: string | null) {
        this.test = test;
      }
    }

    const errors = validateSync(new Test(undefined));

    expect(errors).to.be.deep.equal([]);
  });

  it('should pass the validation when value is not null but it passes a different validator rule', () => {
    class Test {
      @AllowNull()
      @IsOptional()
      @IsString()
      test?: string | null;

      constructor(test?: string | null) {
        this.test = test;
      }
    }

    const errors = validateSync(new Test(''));

    expect(errors).to.be.deep.equal([]);
  });

  it('should not pass the validation when value is not null and it does not pass a different validator rule', () => {
    class Test {
      @AllowNull()
      @IsOptional()
      @IsString()
      test?: string | null;

      constructor(test?: string | null) {
        this.test = test;
      }
    }

    // @ts-expect-error
    const errors = validateSync(new Test(1));

    expect(errors[0].constraints).to.be.deep.equal({ isString: 'test must be a string' });
  });
});
