import { FormValidationAction } from './form-validation.action';

export function FieldValidator(fieldName: string): MethodDecorator {
  return (target: FormValidationAction, propertyKey: string | symbol) => {
    if (!(target instanceof FormValidationAction)) {
      throw new Error('@FieldValidator can only be used on FormValidationAction');
    }

    target.addValidator(fieldName, propertyKey);
  };
}
