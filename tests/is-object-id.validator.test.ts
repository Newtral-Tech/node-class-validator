// eslint-disable-next-line max-classes-per-file
import { IsObjectId } from '@newtral/class-validator';
import { ObjectId } from 'bson';
import { expect } from 'chai';
import { validateSync } from 'class-validator';
import faker from 'faker';

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

  it('should validate an object id ', () => {
    const id = new ObjectId();
    const errors = validateSync(new Test(id));

    expect(errors).to.be.deep.equals([]);
  });

  it('should return an error when the value is not an object id', () => {
    const id = faker.random.uuid();
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
