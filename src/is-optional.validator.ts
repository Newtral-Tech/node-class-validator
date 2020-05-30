import { ValidateIf, ValidationOptions } from 'class-validator';
import { ValidatorDecorator } from './validator.decorator';

/**
 * Validate when the original value is not undefined. Unlike the class-validator one that allows both null and undefined
 */
export function IsOptional(validationOptions?: ValidationOptions): ValidatorDecorator {
  return ValidateIf((obj, value) => typeof value !== 'undefined', validationOptions);
}
