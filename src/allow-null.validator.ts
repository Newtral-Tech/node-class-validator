import { ValidateIf, ValidationOptions } from 'class-validator';
import { ValidatorDecorator } from './validator.decorator';

/**
 * Allow null values. Useful when the value is optional (undefined) but null is also valid
 */
export function AllowNull(validationOptions?: ValidationOptions): ValidatorDecorator {
  return ValidateIf((obj, value) => value !== null, validationOptions);
}
