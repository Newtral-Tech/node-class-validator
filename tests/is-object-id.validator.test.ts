import { IsObjectId } from '@newtral/class-validator';
import { ObjectId } from 'bson';
import { expect } from 'chai';
import { validateSync } from 'class-validator';
import { faker } from '@faker-js/faker';

describe('@IsObjectId()', () => {
  it('should validate a string object id', () => {
    const id = new ObjectId().toHexString();
    const errors = validateSync(new Test(id));

    expect(errors).to.be.deep.equals([]);
  });

  it('should validate a numeric object id', () => {
    const id = parseInt(new ObjectId().toHexString(), 16);
    const errors = validateSync(new Test(id));

    expect(errors).to.be.deep.equals([]);
  });

  it('should return false when the value is null', () => {
    // @ts-expect-error
    const errors = validateSync(new Test(null));

    expect(errors[0].constraints).to.be.deep.equal({ isObjectId: 'test must be a valid object id' });
  });

  it('should return false when the value is undefined', () => {
    // @ts-expect-error
    const errors = validateSync(new Test(undefined));

    expect(errors[0].constraints).to.be.deep.equal({ isObjectId: 'test must be a valid object id' });
  });

  it('should validate an object id ', () => {
    const id = new ObjectId();
    const errors = validateSync(new Test(id));

    expect(errors).to.be.deep.equals([]);
  });

  it('should return an error when the value is not an object id', () => {
    const id = faker.string.uuid();
    const errors = validateSync(new Test(id));

    expect(errors[0].constraints).to.be.deep.equal({ isObjectId: 'test must be a valid object id' });
  });
});

class Test {
  @IsObjectId()
  test!: ObjectId | string | number;

  constructor(test: ObjectId | string | number) {
    this.test = test;
  }
}
