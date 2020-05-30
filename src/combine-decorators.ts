import { ValidatorDecorator } from './validator.decorator';

export function combineDecorators(...decorators: ValidatorDecorator[]): ValidatorDecorator {
  return (...args) => decorators.forEach(decorator => decorator(...args));
}
