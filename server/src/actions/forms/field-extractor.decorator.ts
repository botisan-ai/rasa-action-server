import { FormValidationAction } from './form-validation.action';

export function FieldExtractor(fieldName: string): PropertyDecorator {
  return (target: FormValidationAction, propertyKey: string | symbol) => {
    if (!(target instanceof FormValidationAction)) {
      throw new Error('@FieldExtractor can only be used on FormValidationAction');
    }

    target.addValidator(fieldName, propertyKey);
  };
}
