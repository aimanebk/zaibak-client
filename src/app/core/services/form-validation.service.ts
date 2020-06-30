import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Ce champ ne peut pas être laissé vide',
      'minlength': `Longueur minimale ${validatorValue.requiredLength}`,
      'maxlength': `Longueur maximale ${validatorValue.requiredLength}`,
      'min': `Ce champ doit être un nombre positif et supérieur à ${validatorValue.min}`,
    };

    return config[validatorName];
  }
}
