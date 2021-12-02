import { Validate, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

/**
 * Validate the value is a valid object id. Could be numeric, string or another object id.
 * It could useful to pair with the [ToObjectId](https://www.npmjs.com/package/@newtral/class-transformer#toobjectid)
 * transformer in order to always convert to an object id instance
 */
export function IsObjectId(validationOptions?: ValidationOptions): PropertyDecorator {
  return Validate(IsObjectIdValidator, validationOptions);
}

@ValidatorConstraint({ name: 'isObjectId' })
export class IsObjectIdValidator implements ValidatorConstraintInterface {
  validate(objectId?: unknown): boolean {
    if (objectId == null) {
      return false;
    }

    if (typeof objectId === 'string') {
      return this.isObjectId(objectId);
    }

    if (typeof objectId === 'number') {
      return this.isObjectId(objectId.toString(16));
    }

    if (typeof objectId === 'object' && typeof (objectId as any).toHexString === 'function') {
      return this.isObjectId((objectId as any).toHexString());
    }

    if (typeof objectId === 'object') {
      return this.isObjectId(String(objectId));
    }

    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const property = validationArguments?.property ?? '';

    return `${property} must be a valid object id`.trim();
  }

  private isObjectId(objectId: string) {
    return OBJECT_ID_REGEX.test(objectId.toLowerCase());
  }
}

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;
